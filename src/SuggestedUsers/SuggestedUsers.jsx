import React from 'react';
import "./SuggestedUsers.css";
import SuggestedHeader from './SuggestedHeader';
import SuggestedUser from './SuggestedUser';
import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers';

const  SuggestedUsers = () => {
  const {suggestedUsers} = useGetSuggestedUsers();

  const users = [
    {
      id: 1,
      profilePicURL: "https://media.istockphoto.com/id/1409155424/photo/head-shot-portrait-of-millennial-handsome-30s-man.jpg?s=1024x1024&w=is&k=20&c=SzKNE15nrLgbBKLv9TzcC2kVmcpw4nf0HM-OmPZ1Ygw=",
      fullName: 'John Doe',
      followers: 0
    },
    {
      id: 2,
      profilePicURL: "https://cdn.pixabay.com/photo/2020/06/26/14/46/india-5342927_1280.jpg",
      fullName: 'Jane Smith',
      followers: 0
    },
    {
      id: 3,
      profilePicURL: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=1024x1024&w=is&k=20&c=iGtRKCTRSvPVl3eOIpzzse5SvQFfImkV0TZuFh-74ps=",
      fullName: 'Alisy Johnson',
      followers: 0
    },
    {
      id: 4,
      profilePicURL: "https://media.istockphoto.com/id/673410916/photo/business-life.jpg?s=1024x1024&w=is&k=20&c=vL9Haz4gWFOn_vQbXpKHlNcGnSA1qDS9kDZXywfvipo=",
      fullName: 'Bob Brown',
      followers: 0
    }
  ];
  



  
  return (
    <div className='suggested-container'>
        <SuggestedHeader />

        {users.length !== 0 && (
                 <div className='suggested-user-content'>
                 <p className='suggested-p-p'>Suggested for you</p>
                 <p className='suggested-see-all'>See All</p>
               </div>
        )}
 

        {suggestedUsers.map((user) => (
          <SuggestedUser user={user} key={user.id} />
        ))}

        <div className='copy-right'>
        © 2024 Instagram from Meta
        </div>
    </div>
  )
}

export default SuggestedUsers


