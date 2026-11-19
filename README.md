# ALIPAI DB - Web Database Bot (Vercel + Firebase)

## Setup
1. Firebase Console > Build > Realtime Database > Create. Rules biarkan `{".read":false,".write":false}`.
2. Project settings > Service accounts > Generate new private key (unduh file JSON).
3. Upload folder ini ke GitHub (atau `vercel` CLI), import ke Vercel.
4. Buka `api/config.js`, isi `FIREBASE_DB_URL`, `SESSION_SECRET`, dan `client_email` + `private_key` dari file JSON tadi.
5. Deploy. Login: username bebas, password sesuai role.

## Password awal
Dev / PT / Reseller sudah diset sesuai permintaan. Dev bisa ganti dari menu Pengaturan (tersimpan hash di Firebase).

## Validasi bot
Menu "Link Validate" (dev) memberi link:
- `GET /api/validate?key=KEY` -> daftar semua nomor aktif (JSON, tambah `&format=txt` untuk teks)
- `GET /api/validate?key=KEY&number=628xxx` -> `{"valid":true|false}`
Contoh di bot: `fetch(LINK+"&number="+sender)`.
Nomor yang di-ban atau dihapus otomatis tidak valid.
