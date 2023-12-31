const apiUrl = process?.env.CLIENT_URL;

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://192.168.1.161:5173",
  "http://192.168.2.106:5173",
  new URL(apiUrl).origin,
];

module.exports = allowedOrigins;
