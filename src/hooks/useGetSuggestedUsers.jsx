import { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useGetSuggestedUsers = () => {

    const [suggestedUsers,setSuggestedUsers] = useState([])
    const authUser = useAuthStore(state => state.user)

    useEffect(() => {
        const useGetSuggestedUsers = async () => {
            try {
                const usersRef = collection(firestore,"users")
                const q = query(
                    usersRef,
                    where("uid","not-in", [authUser.uid, ...authUser.following]),
                    orderBy("uid"),
                    limit(3)
                )

                const querySnapshot = await getDocs(q)
                const users = [];
                querySnapshot.forEach(doc => {
                    users.push({...doc.data(), id: doc.id})
                })

                setSuggestedUsers(users)

            } catch (error) {
                alert(error.message)
            }
        }
        if(authUser) useGetSuggestedUsers()
    },[authUser])

    return {suggestedUsers}
}

export default useGetSuggestedUsers;
