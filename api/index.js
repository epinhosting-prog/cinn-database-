const crypto=require('crypto');
const C=require('./config');
const DB=(C.FIREBASE_DB_URL||process.env.FIREBASE_DB_URL||'').replace(/\/$/,''),SIGN=C.SESSION_SECRET||process.env.SESSION_SECRET||'ganti-secret-ini';
const DEF={dev:'aku cinn',pt:'cinn miaw 25',reseller:'cinn cute 25'};
const CAN={dev:['add','del','ban'],pt:['add','del','ban'],reseller:['add']};
const H=x=>crypto.createHash('sha256').update('s:'+x).digest('hex');
const SA=C.SERVICE_ACCOUNT||{};let TK={t:'',e:0};
const getTok=async()=>{if(TK.t&&TK.e>Date.now()+60000)return TK.t;if(!DB||DB.includes('NAMA-PROJECT'))throw new Error('FIREBASE_DB_URL belum diisi di api/config.js');if(!SA.client_email||!SA.private_key||SA.private_key.includes('ISI_PRIVATE_KEY'))throw new Error('SERVICE_ACCOUNT belum diisi di api/config.js');const n=Math.floor(Date.now()/1000),b=o=>Buffer.from(JSON.stringify(o)).toString('base64url');const u=b({alg:'RS256',typ:'JWT'})+'.'+b({iss:SA.client_email,scope:'https://www.googleapis.com/auth/firebase.database https://www.googleapis.com/auth/userinfo.email',aud:'https://oauth2.googleapis.com/token',iat:n,exp:n+3600});const sig=crypto.createSign('RSA-SHA256').update(u).sign(SA.private_key.replace(/\\n/g,'\n'),'base64url');const r=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type='+encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')+'&assertion='+u+'.'+sig});const j=await r.json();if(!j.access_token)throw new Error('Gagal ambil token Google: '+(j.error_description||j.error||r.status));TK={t:j.access_token,e:Date.now()+(j.expires_in||3600)*1000};return TK.t};
const fb=async(m,p,b)=>{const t=await getTok();const r=await fetch(`${DB}/${p}.json`,{method:m,headers:{'Content-Type':'application/json',Authorization:'Bearer '+t},body:b===undefined?undefined:JSON.stringify(b)});if(!r.ok)throw new Error('Firebase error '+r.status);return r.json()};
const norm=n=>{let d=String(n).replace(/\D/g,'');if(d.startsWith('0'))d='62'+d.slice(1);else if(d.startsWith('8'))d='62'+d;return d.length>=9&&d.length<=15?d:null};
const sign=o=>{const p=Buffer.from(JSON.stringify(o)).toString('base64url');return p+'.'+crypto.createHmac('sha256',SIGN).update(p).digest('base64url')};
const verify=t=>{try{const[p,s]=String(t).split('.');if(s!==crypto.createHmac('sha256',SIGN).update(p).digest('base64url'))return null;const o=JSON.parse(Buffer.from(p,'base64url'));return o.exp>Date.now()?o:null}catch{return null}};
const getS=async()=>{const s=(await fb('GET','settings'))||{};if(!s.vkey){s.vkey=crypto.randomBytes(12).toString('hex');await fb('PATCH','settings',{vkey:s.vkey})}return{maint:!!s.maint,run:s.run||'',emg:s.emg||'083842692794',name:s.name||'Cinn Database',vkey:s.vkey,pw:s.pw||{}}};
const pub=S=>({maint:S.maint,run:S.run,emg:S.emg,name:S.name});
module.exports=async(req,res)=>{
res.setHeader('Cache-Control','no-store');
try{
const Q=new URL(req.url,'http://x').searchParams,S=await getS();
if(Q.get('validate')){
 if(Q.get('key')!==S.vkey)return res.status(401).json({ok:false,error:'key salah'});
 const all=Object.values((await fb('GET','numbers'))||{}).filter(n=>!n.banned).map(n=>n.num),n=Q.get('number');
 if(n){const x=norm(n);return res.json({ok:true,number:x,valid:!!x&&all.includes(x)})}
 return Q.get('format')==='txt'?res.send(all.join('\n')):res.json({ok:true,total:all.length,numbers:all});
}
if(req.method!=='POST')return res.json(pub(S));
const b=typeof req.body==='string'?JSON.parse(req.body||'{}'):req.body||{},a=b.action;
const log=(me,act,num)=>fb('POST','logs',{at:Date.now(),name:me.name,role:me.role,act,num:num||''});
if(a==='login'){
 const role=Object.keys(DEF).find(r=>S.pw[r]?S.pw[r]===H(b.password||''):DEF[r]===b.password);
 if(!role||!String(b.username||'').trim())return res.status(401).json({error:'Username atau password salah'});
 if(S.maint&&role!=='dev')return res.status(503).json({maintenance:true,...pub(S)});
 const me={role,name:String(b.username).trim().slice(0,24),exp:Date.now()+864e5};
 await log(me,'login');return res.json({token:sign(me)});
}
const me=verify(b.token);
if(!me)return res.status(401).json({error:'Sesi habis, login lagi'});
if(S.maint&&me.role!=='dev')return res.status(503).json({maintenance:true,...pub(S)});
const dev=me.role==='dev',need=x=>{if(!CAN[me.role].includes(x)){res.status(403).json({error:'Tidak punya akses'});return false}return true};
if(a==='state'){
 const nums=Object.values((await fb('GET','numbers'))||{}).sort((x,y)=>y.at-x.at),wib=t=>new Date(t+252e5).toISOString().slice(0,10);
 const week=[...Array(7)].map((_,i)=>{const k=wib(Date.now()-(6-i)*864e5);return{d:k.slice(8)+'/'+k.slice(5,7),n:nums.filter(x=>wib(x.at)===k).length}});
 const out={me:{name:me.name,role:me.role,can:CAN[me.role]},pub:pub(S),total:nums.length,today:week[6].n,banned:nums.filter(x=>x.banned).length,week,numbers:nums};
 if(dev){out.vkey=S.vkey;out.logs=Object.values((await fb('GET','logs'))||{}).slice(-60).reverse()}
 return res.json(out);
}
if(a==='add'&&need('add')){
 const list=[...new Set(String(b.numbers||'').split(/[\s,;]+/).filter(Boolean).map(norm))];
 let add=0,skip=0,bad=String(b.numbers||'').split(/[\s,;]+/).filter(Boolean).length-list.length;
 for(const n of list){if(!n){bad++;continue}if(await fb('GET','numbers/'+n)){skip++;continue}await fb('PUT','numbers/'+n,{num:n,by:me.name,role:me.role,at:Date.now(),banned:false});add++;await log(me,'add',n)}
 return res.json({add,skip,bad:Math.max(0,bad)});
}
if(a==='del'&&need('del')){const n=norm(b.num);await fb('DELETE','numbers/'+n);await log(me,'hapus',n);return res.json({ok:1})}
if(a==='ban'&&need('ban')){const n=norm(b.num),c=await fb('GET','numbers/'+n);if(!c)return res.status(404).json({error:'Nomor tidak ada'});await fb('PATCH','numbers/'+n,{banned:!c.banned});await log(me,c.banned?'unban':'ban',n);return res.json({ok:1})}
if(dev){
 if(a==='save'){const p={};if('maint'in b)p.maint=!!b.maint;if('run'in b)p.run=String(b.run).slice(0,300);if('emg'in b)p.emg=String(b.emg).replace(/[^\d+]/g,'').slice(0,16);if('name'in b)p.name=String(b.name).slice(0,24)||'Cinn Database';await fb('PATCH','settings',p);await log(me,'ubah pengaturan');return res.json({ok:1})}
 if(a==='setpw'){if(!DEF[b.role]||String(b.pw||'').length<4)return res.status(400).json({error:'Password minimal 4 karakter'});await fb('PATCH','settings/pw',{[b.role]:H(b.pw)});await log(me,'ganti password '+b.role);return res.json({ok:1})}
 if(a==='newkey'){await fb('PATCH','settings',{vkey:crypto.randomBytes(12).toString('hex')});await log(me,'key validate baru');return res.json({ok:1})}
 if(a==='wipe'){await fb('DELETE','numbers');await log(me,'hapus semua nomor');return res.json({ok:1})}
 if(a==='clearlog'){await fb('DELETE','logs');return res.json({ok:1})}
}
return res.status(400).json({error:'Aksi tidak dikenal / tidak diizinkan'});
}catch(e){res.status(500).json({error:e.message})}};
