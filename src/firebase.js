import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi4cg4TeP9hnG9ptluDi4tpwOIj0k7gog",

  authDomain: "user-manipulation.firebaseapp.com",

  projectId: "user-manipulation",

  storageBucket: "user-manipulation.appspot.com",

  messagingSenderId: "339372410957",

  appId: "1:339372410957:web:102b6dd05546cb285e7404",

  measurementId: "G-163REWX7DY",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
