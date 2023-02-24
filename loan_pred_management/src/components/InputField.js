import React from 'react'
import { useState } from 'react'
import './InputField.css'
import axios from "axios";
import Model from './Model';

const InputField = () => {
    const [accNo, setAccNo] = useState("");
    const [gender, setGender] = useState("Male");
    const [marStatus, setMarStatus] = useState("Yes");
    const [depe, setDep] = useState("0");
    const [educat, setEdu] = useState("Graduate");
    const [emplo, setEmp] = useState("Yes")
    const [appInc, setAppInc] = useState(0)
    const [coInc, setCoInc] = useState(0);
    const [loanAmt, setLoanAmt] = useState(0);
    const [loanAmtTerm, setLoanAmtTerm] = useState("1");
    const [creditHis, setCreditHis] = useState("0");
    const [property, setPropery] = useState("Rural");
    const [isModel, setIsModel] = useState(false);
    const [res, setRes] = useState("")

    const handleClick = async () => {
        let gen = 1;
        if (gender === "Male") {
            gen = 1;
        } else {
            gen = 0;
        }

        let mar = marStatus === "Yes" ? 1 : 0
        let dep = depe === "0" ? 0 : (depe === "1" ? 1 : 2)
        let edu = educat === "Graduate" ? 1 : 0;
        let emp = emplo === "Yes" ? 1 : 0
        let mon_income = Number(appInc)
        let co_mon_income = Number(coInc)
        let loan_amt = Number(loanAmt)
        let duration = loanAmtTerm === "1" ? 360 : 720;
        let cred = Number(creditHis)
        let prop = property === "Rural" ? 0 : (property === "Urban" ? 2 : 0)

        console.log(gen, mar, dep, edu, emp, mon_income, co_mon_income, loan_amt, duration, cred, prop)
        console.log(accNo, gender, marStatus, dep, edu, emp, appInc, coInc, loanAmt, creditHis, property)
        const result = await axios.post("http://127.0.0.1:5000/add",
            {
                "dep": gen,
                "edu": edu,
                "emp": emp,
                "gen": gen,
                "mar": mar,
                "mon_income": mon_income,
                "co_mon_income": co_mon_income,
                "loan_amt": loan_amt,
                "duration": duration,
                "cred": cred,
                "prop": prop
            }
        )
        console.log(result.data)
        setRes(result.data)
        setIsModel(true);
    }
    return (
        <div>
            {isModel && <Model setIsModel={setIsModel} res={res} />}
            <div className="form_area">
                <div className="form_left_area">
                    <div class="form-group">
                        <label for="inputLoanID">Account No</label>
                        <input type="text" value={accNo} onChange={(e) => setAccNo(e.target.value)} class="form-control" id="inputLoanID" placeholder="Account No"
                            name="loan_id" required />
                    </div>
                    <div class="form-group">
                        <label for="inputGender">Gender</label>
                        <select value={gender} onChange={(e) => {
                            setGender(e.target.value)
                        }} id="inputGender" class="form-control" name="gender">
                            <option disabled selected>Choose...</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="inputMarried">Married</label>
                        <select value={marStatus} onChange={(e) => setMarStatus(e.target.value
                        )} id="inputMarried" class="form-control" name="married">
                            <option selected disabled>Choose...</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="inputDependents">Dependents</label>
                        <select value={depe} onChange={(e) => setDep(e.target.value)} id="inputDependents" class="form-control" name="dependents">
                            <option selected disabled>Choose...</option>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3+</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="inputEducation">Education</label>
                        <select value={educat} onChange={(e) => setEdu(e.target.value)} id="inputEducation" class="form-control" name="education">
                            <option selected disabled>Choose...</option>
                            <option>Graduate</option>
                            <option>Not Graduate</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputSelf_Employed">Self Employed</label>
                        <select value={emplo} onChange={(e) => setEmp(e.target.value)} id="inputSelf_Employed" class="form-control" name="self_employed">
                            <option selected disabled>Choose...</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                </div>
                <div className='form_right_area'>

                    <div class="form-group">
                        <label for="inputApplicant_Income">Applicant Monthly Income</label>
                        <input value={appInc} onChange={(e) => setAppInc(e.target.value)} type="number" class="form-control" id="inputApplicant_Income"
                            placeholder="Applicant Income" name="applicant_income" required />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputCoApplicant_Income">Co-Applicant Income</label>
                        <input value={coInc} onChange={(e) => setCoInc(e.target.value)} type="number" class="form-control" id="inputCoApplicant_Income"
                            placeholder="Co-Applicant Income" name="co_applicant_income" required />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputLoan_Amount">Loan Amount</label>
                        <input value={loanAmt} onChange={(e) => setLoanAmt(e.target.value)} type="number" class="form-control" id="inputLoan_Amount"
                            placeholder="Loan Amount" name="loan_amount_term" required />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputLoan_Amount_term">Loan Amount Term(Year)</label>
                        <select value={loanAmtTerm} onChange={(e) => setLoanAmtTerm(e.target.value)} id="inputLoan_Amount_term" class="form-control" name="credit_history"
                            required>
                            <option selected disabled>Choose...</option>
                            <option>1</option>
                            <option>2+</option>
                        </select>
                    </div>
                    <div class="form-group col-md-8">
                        <label for="inputCredit_history">Credit History</label>
                        <select value={creditHis} onChange={(e) => setCreditHis(e.target.value)} id="inputCredit_history" class="form-control" name="credit_history"
                            required>
                            <option selected disabled>Choose...</option>
                            <option>0</option>
                            <option>1</option>
                        </select>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputProperty_Area">Property Area</label>
                        <select value={property} onChange={(e) => setPropery(e.target.value)} id="inputProperty_Area" class="form-control" name="property_area">
                            <option selected disabled>Choose...</option>
                            <option>Urban</option>
                            <option>Semi-Urban</option>
                            <option>Rural</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button onClick={handleClick}>Predict</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputField