import React, { useState } from 'react';
import Login from './Login'
import Registration from './Registration';

function Home() {
    // we'll use this to decide whether to display login or register page
    const [myForm, setForm] = useState();

    return (
        <React.Fragment>
            <div className="introDiv justify-content-center">
                <section className="container justify-content-center introSection">
                    <div className="row">
                        <div className="col left-side">
                            <h1>Welcome to SMS-RemindR</h1>
                            <p>We're a simple and user-friendly app that enables planning and reminders using SMS messages! Stop using traditional planners, and start using SMS-RemindR to manage your day - and your family's.</p>                        
                        </div>

                        <div className="col right-side">
                            <Registration />
                        </div>

                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}

export default Home;