import React from 'react';
import { useState } from 'react';


const Accordian = ({ title, content }) => {

  const [isActive, setIsActive] = useState(false);

  return (
    <React.Fragment>
          <div className="accordion-item">
            <div className="accordion-title-div row" onClick={() => setIsActive(!isActive)}>
              <p className='accordianTitle col'>{title}</p>
              <p className="accordianSign col">{isActive ? '-' : '+'}</p>
            </div>
            {isActive && <div className="accordion-content">{content}</div>}
          </div>
    </React.Fragment>
  );
};

export default Accordian;