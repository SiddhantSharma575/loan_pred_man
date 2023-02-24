import React from 'react'
import Header from '../components/Header'
import './team.css'
import Sid54Img from "../images/sid54img.jpg"
import Sid55Img from "../images/sid55.jpeg";
import Anus10 from "../images/anus_10.jpg"
import ManojSir from "../images/manoj_sir.jpg"


const Team = () => {
    return (
        <>
            <div className="team_main">
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
                <div className="mentor_view">
                    <img src={ManojSir} alt="" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                    <h3>Manoj Kumar Gupta</h3>
                    <p>Project Guide</p>
                    <p>Assistant Professor AITR Indore</p>
                </div>
            </div>
        </>
    )
}

export default Team