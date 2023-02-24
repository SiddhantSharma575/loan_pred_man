import React from 'react'
import { useState } from 'react'
import './header.css';
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import { useEffect } from 'react';


const Header = () => {
    // const [isLogin, setLogin] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem("user"));
    useEffect(() => {
        const user = localStorage.getItem("user");
        setUser(JSON.parse(user))
    }, [localStorage.getItem("user")])

    console.log(user)

    const singOutHandle = () => {
        signOut(auth).then(() => {
            localStorage.clear("user");
            setUser(null)
            navigate("/login")
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className="header_main">
            <div className="header_left">
                <h3 onClick={() => navigate("/")}>Bank Loan Prediction & Management</h3>
            </div>
            <div className="header_right">
                <div className='nav'>
                    <ul>
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/about")}>About</li>
                        <li onClick={() => navigate("/team")}>Team</li>
                        {user !== null && <li onClick={() => navigate("/prev_loan")}>Previous Loans</li>}
                        {user !== null && <li onClick={singOutHandle}>Logout</li>}
                    </ul>
                </div>
            </div>
            <div className="profile_header_ele">
                {
                    user !== null ? <div>
                        <img style={{ borderRadius: "50%", width: "65px", height: "65px", cursor: "pointer" }} src={user.profileUrl} alt="" onClick={() => navigate("/profile")} />
                    </div> : <div >
                        <button style={{ width: "100%" }} className='loginbtn' onClick={() => navigate("/login")}>Login/Register</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header