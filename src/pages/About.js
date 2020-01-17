import React from 'react';
import queryString from 'query-string';


import RealNote from '../components/RealNote';
import Board from "../components/Board";
import Stickies from "../components/Stickies";
//import "./style.scss";

const About = ({location, match}) => {
    const query = queryString.parse(location.search);

    const detail = query.detail === 'true';

    return (
        <div>
            <h2>About {match.params.name}</h2>
            {detail && 'detail: blahblah'}
            <Stickies/>
        </div>
    );
};

export default About;

