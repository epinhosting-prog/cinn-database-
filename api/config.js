// Isi nilai di bawah. Tidak perlu .env / Environment Variables Vercel.
// JANGAN upload ke GitHub public (private_key ikut terbaca).
module.exports = {
  // Realtime Database > tab Data > URL di bagian atas
FIREBASE_DB_URL: 'https://ccin-7e6fe-default-rtdb.asia-southeast1.firebasedatabase.app',

  // String acak panjang bebas (untuk tanda tangan sesi login)
  SESSION_SECRET: 'cinn809000008088',

  // Firebase Console > Project settings > Service accounts > Generate new private key
  // Buka file JSON yang terunduh, salin 2 nilai ini.
  SERVICE_ACCOUNT: {
    client_email: 'firebase-adminsdk-fbsvc@ccin-7e6fe.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDdId0odLDY3a9k\nNRFv/e2VHHfHSTebEjdwfg7skJRmqH5c4m9OGZmLbZyt0VOrOvpRi2cUM0kVmPTk\nQMCfajhR9bTaT36G18FHe9GEXJwLo0+RTZ8X74RusoWuwfLUYLfqG0V4QhQDeO8T\nRGV8tdPSoJ9pU8d956L6SQC9gKUoQNJDN0LbBgBmruH3ZIywc6qx1w+bdv9fFNS+\nWq5StEeR+9glfIa5w965DEPN7+MDw/fkN76eXAICPk/QJokqy8mnuUZ9Vb5zdo+c\nl/ZT4d8tY/woGvj4sl0r+m3q2f4TgtwU178NdMElk5kmF+vj12VUVWQW9OOWR3Zm\nxrOr08IXAgMBAAECggEAANHmUwcTvModo157ARJM9jeTzh5cYWvQ3s7o2UGz+yl2\nxntkdEKuChFO+moDSGhAk1rT+AQ0qirWBZ6j2DN5n/wsPn769h8IrW4tGbOKNJTX\nb698/oa50/s/eaVodBcjt2+Ac3CzSEwDfuvLAIpgDbDgxnA0Fihst0bcBNfcROju\n2q8Zv1eeZ6SoqG9Azu22DbCJsOdsp3sTJCGF8Lz+dTHuDcEtv+qxj2wMYVuXlyCu\n3TxrWaLcTCRrqJze8+UpPP51qEM+CkOCztSzYG0fp+m64b3eE78AZcnQu9nBuRxK\n3sIK4LUCxPYmOwsuKPox2+YMdtJjuM/agxjEtRMkIQKBgQD2ZUDSf8qI1oD91dJf\nOvPN5Y0H6rF7cb4ks9rYbhDdK0m6pdBE3FcqRrP2mu/86SnNeSuIKMFy14lWjgT+\n6nnL6i2TzjAQIT5eHk9MdnkpA6piPlbk5dZGCUNv0hWwgWbatetIt+ENsTnK2YRg\nOJXAqUZE14diNnMd+l/+cLatkQKBgQDlwIMnMtBG04k6a2jV08Rb2VyXjeJs2ZuQ\nOCdEPCXXxAx0N8pHCCar5ZaqiFypS9Qd3IbavyBsZf/7VIk9l6QGAUmx7FsXI0j5\nTDvNjNDr2k5cUDgncZd2K/jQGEAC6YiJOAlKWeiISkvobuiqDelSZaAfYljqgwrJ\nMzeBxlXBJwKBgQCPiwVsnI49kdmsB3l7iTin5ud2iT/EjssbTrxcAiNI9gMJ/beL\npmIRewc0z6aoTJ3R2pmFxViNswuLpUk7yRYTueW7ig9uFi/jXP0NqqeDQWNtwKuW\nxl9ChfsHlfiUz45ANGNSBe3SsEDe8EGyXMTBbNxHFtkEWnxOJqLt9HQ4QQKBgQCN\nKrhrQWGP4zISXyTPHYstFGU8CcXyM9LNznLyDjMCXEd6sTzsYCnCvRLSPW8R5rGy\nl2mUxpLZh+K9PrgEzEPQHMJ3PE7L7LZN13V3WuqTwFMdjXyzX6w8w8/hrMTIBU4L\nYg7zTEMAWwZBDsSOmHWgVykHn5oaneHmtj2I06ClSQKBgQCie2ZIQRPYmtvmi8LT\nzBHHW92mYDJHMOr3rik0Mwkrad9k7sTuGKVBn91Hb4u5WWtvXS/VrJtF5dLmlxjG\nZ41C9xmnDqtrw/EAYfI7WB2Gu7qHnCp21Y3Qcq218MKkkcCwQQRIK1gbVwn8zjYz\nCc0lx+NkGIGQ3uhi1ezeKF2uRA==\n-----END PRIVATE KEY-----\n'
  }
};
