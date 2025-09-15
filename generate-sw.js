// scripts/generate-sw.js
import fs from "fs";
import dotenv from "dotenv";
const swTemplate = fs.readFileSync("sw-template.js", "utf8");
dotenv.config();
const config = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};
console.log(config)
const out = swTemplate
  .replace('__API_KEY__', config.apiKey)
  .replace('__AUTH_DOMAIN__', config.authDomain)
  .replace('__PROJECT_ID__', config.projectId)
  .replace('__STORAGE_BUCKET__', config.storageBucket)
  .replace('__MESSAGING_SENDER_ID__', config.messagingSenderId)
  .replace('__APP_ID__', config.appId);

fs.writeFileSync("public/firebase-messaging-sw.js", out);
console.log("SW generated");
