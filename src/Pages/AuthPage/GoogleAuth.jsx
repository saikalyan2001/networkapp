import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = () => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if(!newUser && error) {
        alert("Error", error.message, "error");
        return;
      }
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if(userSnap.exists()) {
        // login
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
        } else {
          // signup
          const userDoc = {
            uid: newUser.user.uid,
            email: newUser.user.email,
            username: newUser.user.email.split("@")[0],
            fullName: newUser.user.displayName,
            bio: "",
            profilePicURL: newUser.user.photoURL,
            followers: [],
            following: [],
            posts: [],
            createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }

    } catch (error) {
      alert("Error", error.message,"error")
    }
  };


  return (
    <>
      <div className="form-bottom-content" onClick={handleGoogleAuth}>
        <div className="login-fb">Log in with Google</div>
      </div>
    </>
  );
}

export default GoogleAuth;
