import React, {useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import LandingNav from '../Navigation/LandingNav';
import './Landing.css';
import intro from '../../assets/intro.mp4';

const LandingPage = observer(() => {

    return (
        <div>
            <LandingNav/>
            <div className="buffer">
                <div className="Swap-Intro shadow">
                    <div className="textContent">
                        <h2>Finding a replacement can be hard.</h2>
                        <p>Swap is an easy to use shift trading tool built for the convenience of both Employees and Management.</p>
                        <div className='signupButton'>
                            <Link to='/SignUp'>Sign Up Now</Link>
                        </div>
                    </div>
                    <div className="imgContent">
                        <video autoPlay loop muted>
                            <source src={intro} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div className="Swap-Benefits shadow">
                    <div className="benefitsHeader">
                        <h2>Introducing Swap</h2>
                    </div>
                    <div className="cardsList">
                        <div className="card">
                            <h3>Simple Trading</h3>
                            <p>No more having to go through the hassle of going from person to person trying to find someone to cover your shift. With Swap all you need to do is create a request and wait.</p>
                        </div>
                        <div className="card">
                            <h3>Information on Hand</h3>
                            <p>Want to checkout your upcoming shifts? Rather than depending on a piece of paper and a clipboard, Swap stores that information for you.</p>
                        </div>
                        <div className="card">
                            <h3>Live Chatting</h3>
                            <p>Don't have a coworkers number? Not a problem. With Swap you can find and chat with that coworker in an instant.</p>
                        </div>
                    </div>


                </div>
                <div className="Swap-Pricing shadow">
                    <h2>Pricing</h2>
                    <div className="cardsList">
                        <div className="card">
                            <div className="cardHeader">
                                <h3>Basic Plan</h3>
                                <p>Free</p>
                            </div>
                            <div className="cardContent">
                                <p>One group</p>
                                <p>Up to 4 employees per group</p>
                                <p>Access to all main features.</p>
                                <div className='signupButton'>
                                    <Link to='/Register'>Sign Up Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="cardHeader">
                                <h3>Pro Plan</h3>
                                <p>$30 / Month</p>
                            </div>
                            <div className="cardContent">
                                <p>Five groups</p>
                                <p>Up to 20 employees per group</p>
                                <p>Access to all main features.</p>
                                <div className='signupButton'>
                                    <Link to='/Register'>Sign Up Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                        <div className="cardHeader">
                                <h3>Enterprise Plan</h3>
                                <p>$80 / Month</p>
                            </div>
                            <div className="cardContent">
                                <p>Unlimited groups</p>
                                <p>Unlimited employees per group</p>
                                <p>Access to all main features.</p>
                                <div className='signupButton'>
                                    <Link to='/Register'>Sign Up Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default LandingPage;