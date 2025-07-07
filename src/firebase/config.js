import {initalizeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAGokcG-gl2Yuxpg9oNGwjRZ0U8XYteLh4",
    authDomain: "budget-app-7d5b7.firebaseapp.com",
    projectId: "budget-app-7d5b7",
    storageBucket: "budget-app-7d5b7.firebasestorage.app",
    messagingSenderId: "307964052069",
    appId: "1:307964052069:web:26753e0ec1105d335efc8c"
  };

const app = initalizeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
