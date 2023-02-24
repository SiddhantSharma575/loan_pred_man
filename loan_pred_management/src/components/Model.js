import React from 'react'
import './model.css'
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from "../firebase"
import { collection, getDocs } from 'firebase/firestore';


const Model = ({ setIsModel, res }) => {
    const navigate = useNavigate();
    const [length, setLen] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            let count = 0;
            const querySnapshot = await getDocs(collection(db, "documents"))
            querySnapshot.forEach((doc) => {
                count++;
            })
            setLen(count)
        }
        fetchData()
    }, [])

    console.log(length)

    return (
        <div className="main">
            <div className="main_model">
                {/* <p>{res.res}</p> */}
                {res.res === 1 ? <div className='res_section'>
                    <h1>According to Prediction you get loan</h1>
                    <p>😍 ✅</p>
                </div> : <div className='res_section'>
                    <h1>Sorry ! You Can't get loan</h1>
                    <p>😢 ❎</p>
                </div>}

                {res.res === 1 && <button onClick={() => navigate("/loan_detail", {
                    state: {
                        size: length
                    }
                })}>Continue</button>}
                <button onClick={() => {
                    setIsModel(false)
                }}>Cancel</button>
            </div>
        </div>
    )
}

export default Model;