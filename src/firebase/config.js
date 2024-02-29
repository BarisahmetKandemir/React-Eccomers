// burada google firebase ile etkileşimlere girilir.

import { initializeApp } from "firebase/app"

// giriş kontrol yetkilendirme
import { getAuth } from "firebase/auth"

// verileri kaydetme
import { getFirestore } from "firebase/firestore"

// resimleri kaydetme
import { getStorage } from "firebase/storage"

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "react-eshop-4040f.firebaseapp.com",
  projectId: "react-eshop-4040f",
  storageBucket: "react-eshop-4040f.appspot.com",
  messagingSenderId: "682506709972",
  appId: "1:682506709972:web:95e1eee953b15a1c8e8441",
  measurementId: "G-4VTW56QVC0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
