
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge'
import CurrencyFormat from 'react-currency-format';

import { useFetch } from './useFetch';
import COUNTRY_CODES from './utils/country_code';
import TimeSeries from './time-series/TimeSeries';
import IndiaState from './IndiaState';
import IndiaStateCharts from './IndiaStateCharts';

import Loader from 'react-loader-spinner';

const Country = props => {
    // console.log(props);
    const [indiaData, indiaDataLoading] = useFetch('https://api.covid19india.org/data.json');
    
    let countryName;
    if (props.location) {
        countryName = new URLSearchParams(props.location.search).get('name');
    } else {
        countryName = props.countryName;
    }
    const countryCoronaData = useSelector(state => state.covid19);
    const getCountryCode = country => {
        let selectedCountry = COUNTRY_CODES.filter( elem => {
            return elem.name === country;
        });
        // console.log('selectedCountry', selectedCountry);
        let countryCode = '';
        if (selectedCountry.length > 0) {
            countryCode = selectedCountry[0]['alpha2code'];
        }
        return countryCode;
    }

    let covid = countryCoronaData.filter(elem => {
        return elem.country.toLowerCase() === countryName.toLowerCase();
    });
    // console.log('covid data', covid);

    let stateData = [];
    if (!indiaDataLoading) {
        let stateWise = indiaData['statewise'];
        stateData = stateWise.filter((elem, i) => i > 0);
        console.log('stateData', stateData);
    }
   
    return(
       <Container className="country" fluid >
            <Row>
                <Col>
                    <h1>
                        <img 
                            src={`https://www.countryflags.io/${getCountryCode(countryName)}/flat/64.png`} 
                            alt={countryName} 
                            className="flag"/>
                        {countryName}
                    </h1>
                </Col>
            </Row>
            {
            covid.length > 0 ? 
                <Row className="stat">
                    <Col sm={3}>
                            <Badge variant="info" className="total">
                                <h3 className="label">Total</h3>
                                <CurrencyFormat 
                                    value={covid[0].cases} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    renderText={value => <div className="value">{value}</div>} />
                            </Badge>
                    </Col>
                    <Col sm={3}>
                            <Badge variant="warning" className="active">
                                <h3 className="label">Active</h3>
                                <CurrencyFormat 
                                    value={covid[0].active} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    renderText={value => <div className="value">{value}</div>} />
                                <div className="extra">(Today: {covid[0].todayCases})</div>
                            </Badge>
                    </Col>
                    <Col sm={3}>
                        <Badge variant="success" className="recovered">
                            <h3 className="label">Recovered</h3>
                            <CurrencyFormat 
                                    value={covid[0].recovered} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    renderText={value => <div className="value">{value}</div>} />
                        </Badge>
                    </Col> 
                    <Col sm={3}>
                        <Badge variant="danger" className="deaths">
                            <h3 className="label">Deaths</h3>
                            <CurrencyFormat 
                                    value={covid[0].deaths} 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    renderText={value => <div className="value">{value}</div>} />
                            <div className="extra">(Today: {covid[0].todayDeaths})</div>
                        </Badge>
                    </Col>
                </Row> : null
            }
                
                <Row className="trends">
                    <Col>
                        <TimeSeries country={countryName} />
                    </Col>
                </Row>
            {
                indiaDataLoading ? 
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    /> :
                (countryName === 'India' ) ?
                 <>
                    <Row>
                        <Col>
                            <IndiaStateCharts data={stateData} />
                            
                        </Col>
                    </Row> 
                    <Row>
                        <Col>
                            <IndiaState data={stateData}/>
                        </Col>
                    </Row> 
                </> : null
               
            }
                
        </Container>
    )
};

export default Country;