import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react'
import { firestore } from '../firebase/firebase';

const useSearchUser = () => {
    const [user, setUser] = useState(null);
    

    const getUserProfile = async (username) => {
        setUser(null);
        try {
            const q = query(collection(firestore, "users"), where("username", "==", username));

            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) return alert("User not found");

            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (error) {
            alert("ikadena", error.message);
            setUser(null);
        }
    };

    return { getUserProfile, user, setUser}
}

export default useSearchUser;
