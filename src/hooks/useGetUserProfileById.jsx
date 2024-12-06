import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase';

const useGetUserProfileById = (userId) => {
    const [userProfile, setUserProfile] = useState(null);


    useEffect(() => {
        const getUserProfile = async () => {
            setUserProfile(null);
            try {
                const userRef = await getDoc(doc(firestore, 'users', userId));
                if(userRef.exists()) {
                    setUserProfile(userRef.data());
                }

            } catch (error) {
                alert(error.message)
            }
        }
        getUserProfile();
    },[setUserProfile,userId])

    return { userProfile,setUserProfile };
}

export default useGetUserProfileById;
