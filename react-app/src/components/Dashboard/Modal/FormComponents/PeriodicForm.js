import React, { useState } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';


function PeriodicForm() {
    let currDate = new Date();

    return (
        <>
            <div className="select-week">
                <input type="checkbox" name="mon" id="mon" value="mon" />
                <input type="checkbox" name="tue" id="tue" value="tue" />
                <input type="checkbox" name="wed" id="wed" value="wed" />
                <input type="checkbox" name="thu" id="thu" value="thu" />
                <input type="checkbox" name="fri" id="fri" value="fri" />
                <input type="checkbox" name="sat" id="sat" value="sat" />
                <input type="checkbox" name="sun" id="sun" value="sun" />

                <label htmlFor="mon">Mon</label>
                <label htmlFor="tue">Tue</label>
                <label htmlFor="wed">Wed</label>
                <label htmlFor="thu">Thu</label>
                <label htmlFor="fri">Fri</label>
                <label htmlFor="sat">Sat</label>
                <label htmlFor="sun">Sun</label>
            </div>

            <DemoContainer components={['TimePicker']}>
                <TimePicker className="timePicker" name="time" defaultValue={dayjs(currDate)} slotProps={{textField: {required: true,},}}/>
            </DemoContainer>
        </>
    );
}

export default PeriodicForm;
