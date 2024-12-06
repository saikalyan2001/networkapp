import React, { useRef, useState } from "react";
import "./EditProfile.css";
import { MdClose } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import useAuthStore from "../../store/authStore";
import usePreviewimg from "../../hooks/usePreviewimg";
import useEditProfile from "../../hooks/useEditProfile";
import { FaUserCircle } from "react-icons/fa";

const EditProfile = ({ isOpen, setIsOpen }) => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    bio: "",
  });

  const authUser = useAuthStore((state) => state.user);
  const fileRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewimg();
  const { isUpdating, editProfile } = useEditProfile();

  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCloseEditProfile = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="editprofile-info">
      <h3>Edit Profile</h3>

      <div className="edit-profile-pic">
        {selectedFile || authUser?.profilePicURL ? (
          <img
            className="edit-profile"
            src={selectedFile || authUser.profilePicURL}
            alt="profile-pic"
          />
        ) : (
          <FaUserCircle className="default-icon" />
        )}{" "}
        <button
          className="edit-profile-btn"
          onClick={() => fileRef.current.click()}
        >
          Edit Profile Picture
        </button>
        <input type="file" ref={fileRef} hidden onChange={handleImageChange} />
      </div>

      <div className="edit-profile-details">
        <p>Full Name</p>
        <input
          type="text"
          value={inputs.fullName || authUser.fullName}
          onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
        />
        <p>User Name</p>
        <input
          type="text"
          value={inputs.username || authUser.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />
        <p>Bio</p>
        <input
          type="text"
          value={inputs.bio || authUser.bio}
          onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
        />
      </div>

      <div className="edit-btns">
        <button className="cancel-btn" onClick={handleCloseEditProfile}>
          Cancel
        </button>
        <button onClick={handleEditProfile} className="submit-btn">
          Submit
        </button>
      </div>
      <MdClose
        className="pro-edit-close-icon"
        onClick={handleCloseEditProfile}
      />
    </div>
  );
};

export default EditProfile;
