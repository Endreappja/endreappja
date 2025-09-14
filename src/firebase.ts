import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDeJ-UuJ_ZSzUIsfUm0exK5GQx3iFH8qbU",
  authDomain: "endreappja82.firebaseapp.com",
  projectId: "endreappja82",
  storageBucket: "endreappja82.firebasestorage.app",
  messagingSenderId: "948525594042",
  appId: "1:948525594042:web:444787ac68df93519e9983"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const registerFCMToken = async (sendTokenToBackend: (token: string) => void) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY });
      if (token) sendTokenToBackend(token);
      console.log("FCM token:", token);
    }
  } catch (err) {
    console.error("FCM token error:", err);
  }
};

export const listenFCMMessages = (callback: (payload: any) => void) => {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    callback(payload);
  });
};
