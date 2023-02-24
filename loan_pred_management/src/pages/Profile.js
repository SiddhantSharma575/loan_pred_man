import React from 'react'
import { useState } from 'react'
import './profile.css'

const Profile = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    return (
        <div className='profile_container'>
            <div className='pr_img_cont'>
                <img src={user.profileUrl} alt="" width={200} height={200} style={{ borderRadius: "50%" }} />
            </div>
            <div className='other_info'>
                <h4>Name  : {user.name}</h4>
                <h5>Email  : {user.email}</h5>
            </div>
        </div>
    )
}

export default Profile