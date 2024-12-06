import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';
import useUserProfileStore from '../store/userProfileStore';

const useGetUserProfileByUsername = (username) => {
    const [isLoading, setIsLoading] = useState(true);
    const { userProfile, setUserProfile } = useUserProfileStore();
    
    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true); // Start loading
            try {
                // Create a query to filter users by username
                const q = query(
                    collection(firestore, "users"),
                    where("username", "==", username) // Assuming the user documents have a "username" field
                );

                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    setUserProfile(null); // No user found
                    return;
                }

                // Retrieve the first user document that matches the username
                const userDoc = querySnapshot.docs[0].data(); // Get the first matching document

                setUserProfile(userDoc); // Set the user profile state
                console.log(userDoc);
                
            } catch (error) {
                alert(`Error: ${error.message}`);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        getUserProfile();
    }, [setUserProfile, username]);

    return { userProfile, isLoading };
};

export default useGetUserProfileByUsername;
