import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Header from '../components/Header';
import UseUser from '../hooks/UseUser';
import { getBase64 } from '../services/Default';
import { updateUser, updateUserProfile } from '../services/Firbase';
import { ToastContainer, toast, zoom, bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProfile() {
    const { user } = UseUser();
    return (
        <>
            <Header />
            <div className="container max-w-screen-lg mt-16 mx-auto bg-gray-100 items-center justify-center">
                <ToastContainer
                    position="top-center"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <EditProfilePicture user={user} />
                <EditDetails user={user} />
            </div>
        </>
    )
}

export default EditProfile;

const EditProfilePicture = ({ user }) => {

    const imageSelectHandler = (e) => {
        getBase64(e.target.files[0])
            .then(result => {
                updateUserProfile(user.docId, result)
            })
            .catch(err => {
            });

    }

    return (
        <div className="flex items-center justify-center py-5 sm:m-10">
            <div className='flex items-center justify-between mr-10 rounded-full w-16 h-16 '>

                <img src={user.profilePicture ? user.profilePicture : process.env.PUBLIC_URL + "/images/avatars/dali.jpg"}
                    alt="profile pic"
                    id="dp"
                    className="rounded-full object-cover w-full h-full" />
            </div>
            <div className="col-span-3">
                <p className="font-bold text-md text-gray-700">{user.username} </p>
                <label for="edit-profile-pic">
                    <p className="text-md font-bold text-blue-600">
                        Edit Profile Picture
                    </p>
                </label>
            </div>
            <input id="edit-profile-pic" type="file" className="hidden" onChange={imageSelectHandler} />
        </div>
    )
}

const EditDetails = ({ user }) => {
    const [fullName, setFullName] = useState(user.fullName);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [email, setEmail] = useState(user.email);
    const [mobile, setMobile] = useState(user.mobile);
    const [gender, setGender] = useState(user.gender);
    useEffect(() => {
        document.title = "Edit Profile-Insta"

        setFullName(user.fullName);
        setUsername(user.username);
        setBio(user.bio);
        setEmail(user.email);
        setMobile(user.mobile);
        setGender(user.gender);

    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedUser = {
            "fullName": fullName,
            "username": username,
            "bio": bio,
            "email": email,
            "mobile": mobile,
            "gender": gender
        }
        let isUpdated = updateUser(user.docId, updatedUser)
    }

    return (
        <>
            <div className="grid grid-cols-4 items-center px-auto content-center mx-auto px-auto w-3/4 md:w-1/2 my-10">
                <label for="userFullname">
                    <p className="font-bold text-gray-700 ">Name</p>
                </label>
                <input type="text" id="userFullname" onChange={(e) => setFullName(e.target.value)} value={fullName}
                    className=" text-md col-span-4 sm:col-span-3 rounded text-start border border-gray-500 bg-gray-200 w-full   py-5 px-4 h-1.5 " />
            </div>
            <div className="grid grid-cols-4  items-center px-auto content-center mx-auto px-auto w-3/4 md:w-1/2 my-10">
                <label for="username">
                    <p className="font-bold text-gray-700 ">Username</p>
                </label>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} value={username}
                    className=" text-md col-span-4 sm:col-span-3 rounded text-start border border-gray-500 bg-gray-200 w-full  py-5 px-4 h-1.5 " />
            </div>
            <div className="grid grid-cols-4  items-center px-auto content-center mx-auto px-auto w-3/4 md:w-1/2 my-10">
                <label for="bio">
                    <p className="font-bold text-gray-700 ">Bio</p>
                </label>
                <textarea rows={3} id="bio" onChange={(e) => setBio(e.target.value)} value={bio}
                    className=" text-md col-span-4 sm:col-span-3 rounded text-start border border-gray-500 bg-gray-200 w-full  py-3 px-4 h-3.0 " />
            </div>
            <div className="grid grid-cols-4  items-center px-auto content-center mx-auto px-auto w-3/4 md:w-1/2 my-10">
                <label for="email">
                    <p className="font-bold text-gray-700 ">Email</p>
                </label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email}
                    className=" text-md col-span-4 sm:col-span-3 rounded text-start border border-gray-500 bg-gray-200 w-full  py-5 px-4 h-1.5 " />
            </div>
            <div className="grid grid-cols-4  items-center px-auto content-center mx-auto px-auto w-3/4 md:w-1/2 my-10">
                <label for="mobile">
                    <p className="font-bold text-gray-700 ">Mobile</p>
                </label>
                <input type="text" id="mobile" maxLength={10}
                    onChange={(e) => setMobile(e.target.value)} value={mobile}
                    className="phone validate text-md col-span-4 sm:col-span-3 rounded text-start border border-gray-500 bg-gray-200 w-full  py-5 px-4 h-1.5 " />
            </div>
            <div className="grid grid-cols-4  items-center px-auto content-center mx-auto px-auto w-3/4 md:w-1/2 my-10">
                <label for="gender">
                    <p className="font-bold text-gray-700 ">Gender</p>
                </label>
                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}
                    placeholder="Select.."
                    className=" text-md col-span-4 sm:col-span-3 rounded text-start border border-gray-500 bg-gray-200 w-full  py-2 px-4  " >
                    <option disabled selected value="">Select..</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="flex justify-center px-auto pb-8 md:mb-4 ">
                <button type="button" onClick={handleSubmit}
                    className="bg-blue-500 px-3 py-1 text-white rounded">
                    Submit
                </button>
            </div>
        </>
    )
}
