import React, { useState } from 'react'
import './login.css'
import { useNavigate } from "react-router-dom"
import { auth, db } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { collection, doc, getDocs, query, where } from "firebase/firestore"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [per, setPer] = useState(20)

    const handleSignIn = async () => {
        if (email === "" || password === "") {
            setError("Please fill all the details")
            return
        }
        setLoading(true);
        setPer(60)
        try {
            await signInWithEmailAndPassword(auth, email, password).then(async (userCredentials) => {
                const uuid = userCredentials.user.uid;
                console.log(uuid)
                const q = query(collection(db, "users"), where("uid", "==", uuid))
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    if (doc.data() !== null) {
                        localStorage.setItem("user", JSON.stringify(doc.data()))
                        navigate("/")
                        setPer(0)
                        setLoading(false);
                    }
                })

                // await getDocs(collection(db, "users"))
                //     .then((querySnapshot) => {
                //         // const newData = querySnapshot.docs.map((doc) => {
                //         //     if (doc.data().uid === uuid) {
                //         //         // console.log(doc.data())
                //         //         return doc.data()
                //         //     }
                //         // })
                //         // console.log(newData[1])
                //         // console.log(newData)
                //     })
            })
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    return (
        <div className="login_container">
            {loading && <CircularProgressbar value={66} className="circ_prog" />}
            {error && <h3>{error}</h3>}
            <h4>Login</h4>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button onClick={handleSignIn}>Login</button>
            <button onClick={() => navigate("/register")}>Create Account</button>
        </div>
    )
}

export default Login