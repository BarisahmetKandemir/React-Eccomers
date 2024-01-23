//// burada google firebase ile etkileşime buradan girilecek.
import { initializeApp } from "firebase/app";

// Giriş kontrol ve yetkilendirme
import {getAuth} from "firebase/auth"

// Verilerin kayıt yerine erişmek için 
import {getFireStore} from "firebase/firestore"

// resimlerin kayıt yeri
import {geyStorage} from "firebase/storage"


export const firebaseConfig = {
  apiKey: "AIzaSyBUMP6IFoDMOm1aBsn3s1pFfWINO7ZZAgY",
  authDomain: "eshop-ae60a.firebaseapp.com",
  projectId: "eshop-ae60a",
  storageBucket: "eshop-ae60a.appspot.com",
  messagingSenderId: "1014134149600",
  appId: "1:1014134149600:web:624b30e5b2bb9a80a75b85"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeApp(firebaseConfig)
export const db = getFireStore(app)
export const storage = getStorage(app)

export default app