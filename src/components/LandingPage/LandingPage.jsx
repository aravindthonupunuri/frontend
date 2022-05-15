import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Services from '../Services/Services';
require('./LandingPage.css');

// AOS.init({
//     duration: 2000,
// });

class LandingPage extends Component {
    render() {
        return (
            <div className="row landing">
                <div className="col-md-12 text-center" style={{"height":"100%"}}>
                    <h2  style={{ color: "white", fontSize: "100px" }}>
                        MOTEL BOOKING
                    </h2>
                    <h1 style={{ color: "white" }}>
                        Luxury is not a place, it's an experience.
                    </h1>
                    <Link to="/home">
                        <button className="btn btn-primary landingBtn">Get Started</button>
                    </Link>
                </div>
                <Services />
            </div>
        );
    }
}

export default LandingPage;