import React from 'react'
import Header from '../components/Header'
import './team.css'
import Sid54Img from "../images/sid54img.jpg"
import Sid55Img from "../images/sid55.jpg";
import Anus10 from "../images/anus_10.jpg"
import ManojSir from "../images/manoj_sir.jpg"
import deplogo from "../images/csit.jpg"
import ShilpaMam from "../images/shilpa_mam.jpg"
import NidhiMam from "../images/nidhi_mam.jpg"



const Team = () => {
    return (
        <>
            <div className="team_main">
                <div className='header_section'>
                    <h3>Special Thanks to : Department of CSIT, AITR Indore</h3>
                    <img src={deplogo} alt="" />
                </div>
                <div className='dept_team'>
                    <div className="each_person">
                        <img src={ShilpaMam} alt="" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                        <h3>Dr. Shilpa Bhalerao</h3>
                        <p>HOD , CSIT Department</p>
                    </div>
                    <div className="each_person">
                        <img src={NidhiMam} alt="" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                        <h3>Prof: Nidhi Nigam</h3>
                        <p>Project Co-ordinator</p>
                    </div>
                    <div className="each_person">
                        <img src={ManojSir} alt="" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                        <h3>Prof : Manoj Gupta </h3>
                        <p>Project Guide</p>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <h3>Project Team</h3>
                </div>
                <div className="team_prof">
                    <div className="each_person">
                        <img src={Sid54Img} alt="" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                        <h3>Siddhant Sharma</h3>
                        <p>Front-End+ Team Lead</p>
                    </div>
                    <div className="each_person">
                        <img src={Anus10} alt="" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                        <h3>Anushka Rathore</h3>
                        <p>UI Design + Front-End</p>
                    </div>
                    <div className="each_person">
                        <img src={Sid55Img} alt="" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                        <h3>Siddhant Sharma</h3>
                        <p>Machine Learning + Back-end</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Team