import React from 'react'
import { useState } from 'react'
import './laonDetail.css'
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useLocation } from 'react-router-dom';
const LoanDetail = () => {
    const location = useLocation()
    const [aadharCardNo, setAadharCardNo] = useState("");
    const [adharPic, setAdharPic] = useState(null);
    const [creditCardNo, setCreditCard] = useState("");
    const [accNo, setAccNo] = useState("");
    const [passBookPhoto, setPassBookPhoto] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const userObj = JSON.parse(localStorage.getItem("user"))
    const uuid = userObj.uid
    const loan_id = location.state !== null ? location.state.size + 1 : 1;
    let addharLink = `documents/$adharPic--${aadharCardNo}`;
    let accLink = `documents/$passBookPhoto.name--${accNo}`;
    const [success, setSuccess] = useState(false);

    const uploadFile = async () => {
        if (aadharCardNo === "" || adharPic === null || creditCardNo === "" || accNo === "" || passBookPhoto === null) {
            setError("Please Fill All the details")
            return
        }
        setLoading(true)
        try {
            const adharRef = ref(storage, `documents/${adharPic.name}--${aadharCardNo}`)
            const uploadTaskOne = uploadBytesResumable(adharRef, adharPic);
            await uploadTaskOne.on("state_changed", (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress)
            }, (error) => {
                console.log(error)
            }, () => {
                getDownloadURL(uploadTaskOne.snapshot.ref).then(async (downloadUrl) => {
                    addharLink = downloadUrl
                })
            })

            const accRef = ref(storage, `documents/${passBookPhoto.name}--${accNo}`)
            const uploadTaskTwo = uploadBytesResumable(accRef, passBookPhoto);
            await uploadTaskOne.on("state_changed", (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress)
            }, (error) => {
                console.log(error)
            }, () => {
                getDownloadURL(uploadTaskTwo.snapshot.ref).then(async (downloadUrl) => {
                    accLink = downloadUrl
                    // console.log(downloadUrl)
                })
            })

            // console.log(accLink, addharLink)
            try {
                await addDoc(collection(db, "documents"), {
                    uid: uuid,
                    id: loan_id,
                    adhar_no: aadharCardNo,
                    credit_no: creditCardNo,
                    acc_no: accNo,
                    acc_img_link: accLink,
                    add_img_link: addharLink,
                    status: "pending"
                })
                setLoading(false)
                setSuccess(true)
            } catch (error) {
                setError(error)
                setLoading(false)
            }


        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }
    return (
        <div className='loan_container'>
            {loading && <div className='loader'> <h1>Loading...</h1></div>}
            {error && <div className='loader'> <h1>{error}</h1></div>}
            <div className="order_status">
                <div className='each_process'>
                    <p></p>
                    <h4 className='blur'>Elligliblity Check</h4>
                </div>
                <div className='each_process'>
                    <p></p>
                    <h4 className={`${success && "blur"}`}>Document Verification</h4>
                </div>
                <div className='each_process'>
                    <p></p>
                    <h4>Loan Approved</h4>
                </div>
            </div>
            <div className='prog_main'>
                <div className={`dummy_progress ${success && 'docver'}`} ></div>
                <div className='circle_prog'></div>
            </div>
            <div className='right_section'>
                <div className="input_s">
                    <div className='each_sec'>
                        <label htmlFor="adharId">Enter Aadhar Number</label>
                        <input type="number" id='adharId' placeholder='Enter Adhar Number' value={aadharCardNo} onChange={(e) => setAadharCardNo(e.target.value)} />
                    </div>
                    <div className='each_sec'>
                        <label htmlFor="adharpic">Select Aadhar Photo</label>
                        <input type="file" name='adharpic' id='adharpic' placeholder='Select Aadhar Pic' onChange={(e) => setAdharPic(e.target.files[0])} />
                    </div>
                    <div className='each_sec'>
                        <label htmlFor="creditId">Enter Credit Card No</label>
                        <input type="number" id='creditId' placeholder='Enter Credit Card No' value={creditCardNo} onChange={(e) => setCreditCard(e.target.value)} />
                    </div>
                    <div className='each_sec'>
                        <label htmlFor="accNo">Enter Account Number</label>
                        <input type="text" id='accNo' placeholder='Enter Account Number' value={accNo} onChange={(e) => setAccNo(e.target.value)} />
                    </div>
                    <div className='each_sec'>
                        <label htmlFor="accPic">Select PassBook Photo</label>
                        <input type="file" name='accpic' id='accPic' placeholder='Select Passbook Pic' onChange={(e) => setPassBookPhoto(e.target.files[0])} />
                    </div>
                    <div className='btn_sec'>
                        <button onClick={uploadFile}>Upload Documents</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoanDetail