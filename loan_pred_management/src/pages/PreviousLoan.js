import React, { useEffect, useState } from 'react'
import "./previous_loan.css"
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const PreviousLoan = () => {
    const [prevLoans, setPrevLoans] = useState([]);
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [filteredLoan, setFilteredLoans] = useState([])

    const fetchLoans = async () => {

        await getDocs(collection(db, "documents"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setPrevLoans(newData);
            })

    }

    useEffect(() => {
        const user = localStorage.getItem("user");
        setUser(JSON.parse(user))
    }, [localStorage.getItem("user")])

    console.log(user)

    useEffect(() => {
        fetchLoans()
    }, [])
    useEffect(() => {
        const newLoan = prevLoans.filter((pr) => pr.uid === user.uid);
        setFilteredLoans(newLoan)
    }, [prevLoans])
    return (
        <div className='prev_loan_cont'>
            {
                filteredLoan.map((loan) => (
                    <div className='each_loan'>
                        <h3>Loan Id :  {loan.id}</h3>
                        <p>User name :  {user.name}</p>
                        <p>Aadhar No :  {loan.adhar_no}</p>
                        <p>Status  : {loan.status}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default PreviousLoan;