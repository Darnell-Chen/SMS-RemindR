import React from 'react';
import accordionData from './AccordianData';
import Accordian from './Accordian';


// if we want to add more data, then add it in AccordianData.js
function AboutUs() {
    return (
        <div className="aboutUs-Section">
            <div className="accordion">
                {accordionData.map(({ title, content }, index) => (
                    <Accordian key={index} title={title} content={content} />
                ))}
            </div>
        </div>
    );
}

export default AboutUs;
