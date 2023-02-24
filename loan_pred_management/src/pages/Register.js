import React from 'react'
import './register.css'
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { auth, db, storage } from "../firebase"
import { useState } from 'react'
// import { CircularProgressbar } from "react-circular-progressbar"
// import "react-circular-progressbar/dist/styles.css"

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const [loading, setLoading] = useState(false)

    const signInHandler = async () => {
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            if (user) {
                const imageRef = ref(storage, `images/${imageUpload.name} -- ${name}`)
                const uploadTask = uploadBytesResumable(imageRef, imageUpload);

                uploadTask.on("state_changed", (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log(progress)
                }, (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                        try {
                            await addDoc(collection(db, "users"), {
                                uid: user.uid,
                                name: name,
                                email: email,
                                password: password,
                                profileUrl: downloadUrl
                            })
                            navigate("/login")
                            setLoading(false)
                        } catch (error) {
                            console.log(error)
                        }
                    })
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="register_container">
            {loading && <div className='circ_prog'>
                <h1>Loading...</h1>
            </div>}
            <h4>Create New Account</h4>
            <div className="input_container">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Full Name' />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                <label htmlFor="img">Select Profile Image</label>
                <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} id="img" />
                <button onClick={signInHandler}>Register</button>
                <button onClick={() => navigate("/login")}>Login</button>
            </div>
        </div>
    )
}

export default Register