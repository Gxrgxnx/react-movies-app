import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase.config";
import { addDoc, collection } from "firebase/firestore";

export const signUp = async (name: string, email: string, password: string) => {
  const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
  await addDoc(collection(db, "users"), {
    uid: userCredentials.user.uid,
    name,
    email,
    role: "user"
  });
};

export const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};
