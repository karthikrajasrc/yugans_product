import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebaseConfig";

export const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
};