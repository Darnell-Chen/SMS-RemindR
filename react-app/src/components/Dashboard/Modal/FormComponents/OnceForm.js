import React from 'react';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

function OnceForm() {
    let currDate = new Date();

    return (
        <>
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker className="dateTimePicker" ampm={false} name="datetime" defaultValue={dayjs(currDate)} slotProps={{textField: {required: true,},}}/>
            </DemoContainer>
        </>
    );
}

// slotsProps attribute had requirment that mimics "required" attribute except the user can still put in bs, so its not helpful here

export default OnceForm;
