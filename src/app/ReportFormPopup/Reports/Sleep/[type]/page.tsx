"use client"
import React, { useEffect } from 'react'
import "@/app/ReportFormPopup/popup.css"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import { toast } from "react-toastify";
import Link from 'next/link';
import { error } from 'console';


const Page = () => {

  const [date, setDate] = React.useState<any>(dayjs(new Date()))

  const [sleepIntake, setSleepIntake] = React.useState<any>({
    date: '',
    durationInHrs: '',
  })

  const [items, setItems] = React.useState<any>([])

  const saveSleepIntake = async () => {
    let tempdate = date.format('YYYY-MM-DD')
    let finaldatetime = new Date(tempdate)
    console.log(finaldatetime + " finaldatetime")

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/sleeptrack/addsleepentry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date: finaldatetime,
        durationInHrs: sleepIntake.durationInHrs
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          toast.success("Sleep intake added successfully")
          getSleepIntake()
        }
        else {
          toast.error(data.message)
        }
      })
      .catch(err => {
        toast.error('Error in adding sleep intake')
        console.log(err)
      })
  }
  const getSleepIntake = async () => {
    setItems([])
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/sleeptrack/getsleepbydate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date: date
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          console.log(data.data, "sleep intake data for date")
          setItems(data.data)
        }
        else {
          toast.error('Error in getting sleep intake')
        }
      })
      .catch(err => {
        toast.error('Error in getting sleep intake')
        console.log(err)
      })
  }
  const deleteSleepIntake = async (item: any) => {
    // console.log(item)
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/sleeptrack/deletesleepentry', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        item: item,
        date: item.date
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          toast.success("Sleep Intake deleted sucessfully")
          console.log("Sleep Intake deleted sucessfully")
          getSleepIntake()
        }
        else {
          toast.error('Error in deleting sleep intake')
        }
      })
      .catch(err => {
        toast.error('Error in deleting sleep intake')
        console.log(err)
      })
  }

  React.useEffect(() => {
    getSleepIntake()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const selectedDay = (val: any) => {
    setDate(val)
  };

  return (
    <div className='popupout'>
      <div className="popupbox">
        <div className="closebtn">
          <Link className='close' href="/Reports/Sleep"><AiOutlineClose /></Link>
        </div>
        {/* <button className='close' onClick={() => {
          window.location.href = `/Reports/Sleep`
        }}><AiOutlineClose /></button> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label='Select Date' value={date} onChange={(newValue: any) => { selectedDay(newValue) }} />
        </LocalizationProvider>

        <TextField id="outlined-basic" label="Sleep(in hrs)" variant="outlined" color="warning"
          type='number' onChange={(e) => { setSleepIntake({ ...sleepIntake, durationInHrs: e.target.value }) }} />

        <Button variant="contained" color="warning" onClick={saveSleepIntake}>Save</Button>

        <div className="hrline"></div>
        <div className="items">
          {
            items.map((item: any, index: number) => {
              return (
                <div className="item" key={index}>
                  <h3>{item.durationInHrs} Hrs</h3>
                  <button onClick={() => deleteSleepIntake(item)}><AiFillDelete /></button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )

}

export default Page