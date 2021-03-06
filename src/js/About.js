/*
 * Created on Sun Apr 12 2020
 *
 * Copyright (c) 2020 https://tapasadhikary.com
 */

import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const About = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="about">
          <Button className="link" variant="link" onClick={handleShow}>
            About
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>About</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>🙏 Stay Home, Stay Safe! 🙏</h2>
                <br />
                <p>
                    Only motivation behind building this app was to kill time at home over a weekend. 😏
                    <br />
                    My sincere thanks to followings 👍:
                    <ul>
                        <li>
                            Coronavirus Ninja API: corona.ioma.ninja
                        </li>
                        <li>
                            Corona timeseries API: pomber.github
                        </li>
                        <li>
                            Corona State Data(India): corona.covid19
                        </li>
                        <li>
                            API for News: newsapi.org
                        </li>
                    </ul>
                    <br />
                    <h3>💻 Technologies 💻</h3>
                    <p>
                        This app is built from the scratch using following User Interface Technologies:
                        <ul>
                            <li>
                                <a href="https://reactjs.org/" target="_blank">ReactJs</a>
                            </li>
                            <li>
                                <a href="https://react-bootstrap.netlify.com/" target="_blank">Bootstrap</a>
                            </li>
                            <li>
                                <a href="http://recharts.org/en-US/" target="_blank">Recharts</a>
                            </li>
                            <li>
                                <a href="http://netlify.com/" target="_blank">Hosted on Netlify</a>
                            </li>
                        </ul>
                    </p>
                    <br />
                    <a href="https://www.tapasadhikary.com" target="_blank">
                    Contact me
                    </a> for any further questions.
                </p>
            </Modal.Body>
          </Modal>
        </div>
    );
};

export default About;