import { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import statement
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    Address: '',
    City: '',
    State: '',
    PinCode: '',
    Country: '',
    ProfilePic: '',
  });
  

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const fetchUserData = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/auth/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              },
              withCredentials: true
            });
            setUserInfo(response.data);
            console.log(setUserInfo)
          } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Error fetching user data.');
          }
        };

        fetchUserData();
      } catch (error) {
        console.error('Error decoding token:', error);
        toast.error('Invalid token. Please log in again.');
      }
    } else {
      toast.error('No token found. Please log in again.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('ProfilePic', file);
      
      try {
        const response = await axios.put(`http://localhost:8000/auth/${userInfo._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          withCredentials: true,
        });
        
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          ProfilePic: response.data.userData.ProfilePic
        }));
        toast.success('Image uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Error uploading image.');
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8000/auth/${userInfo._id}`, userInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      });
      if (response.status === 200) {
        setUserInfo(response.data.userData);
        toast.success('User information updated successfully!');
        setIsEditing(false);
        localStorage.setItem('username',JSON.stringify(response.data.userData))
      } else {
        toast.error('Failed to update user information.');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
      toast.error('Error updating user information.');
    }
  };

  return (
    <div className="main-profile-rounding">
      <ToastContainer transition={Flip}/>
      <div className="user-profile-form">
        <div className="profile-pic-section">
          <img src={`http://localhost:8000/${userInfo.ProfilePic}`} alt="Profile" className="profile-pic" />
          <form className="update-profile-forms">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
              id="file-input"
              disabled={!isEditing} 
            />
            <label htmlFor="file-input" className="file-input-label">
              Add Image
            </label>
          </form>
        </div>
        <form onSubmit={handleSubmit} className="profile-form">
          <h2>Change User Information Here</h2>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="Name"
              value={userInfo.Name}
              onChange={handleChange}
              readOnly={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="Email"
              value={userInfo.Email}
              onChange={handleChange}
              readOnly={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="Mobile"
              value={userInfo.Mobile}
              onChange={handleChange}
              readOnly={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="Address"
              value={userInfo.Address}
              onChange={handleChange}
              readOnly={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="City"
              value={userInfo.City}
              onChange={handleChange}
              readOnly={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>State/Province</label>
            <input
              type="text"
              name="State"
              value={userInfo.State}
              onChange={handleChange}
              readOnly={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              name="PinCode"
              value={userInfo.PinCode}
              onChange={handleChange}
              readOnly={!isEditing} 
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="Country"
              value={userInfo.Country}
              onChange={handleChange}
              readOnly={!isEditing} 
            />
          </div>
          {!isEditing ? (
            <span  className="edit-button" onClick={handleEditClick}>Edit</span>
          ) : (
            <button type="submit" className="update-button" >Update Information</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;


