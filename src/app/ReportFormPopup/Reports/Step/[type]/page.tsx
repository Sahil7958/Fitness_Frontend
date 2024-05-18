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

const Page = () => {
  const [date, setDate] = React.useState<any>(dayjs(new Date()))
  // const [time, setTime] = React.useState<any>(dayjs(new Date()))

  const [stepIntake, setStepIntake] = React.useState<any>({
    date: '',
    steps: ''
  })

  const [items, setItems] = React.useState<any>([])

  const saveStepIntake = async () => {
    let tempdate = date.format('YYYY-MM-DD')
    let finaldatetime = new Date(tempdate)
    console.log(finaldatetime + " finaldatetime")

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/steptrack/addstepentry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date: finaldatetime,
        steps: stepIntake.steps
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          toast.success("step intake added successfully")
          getStepIntake()
        }
        else {
          toast.error(data.message)
        }
      })
      .catch(err => {
        toast.error('Error in adding step intake')
        console.log(err)
      })
  }
  const getStepIntake = async () => {
    setItems([])
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/steptrack/getstepbydate', {
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
          console.log(data.data, "step intake data for date")
          setItems(data.data)
        }
        else {
          toast.error('Error in getting step intake')
        }
      })
      .catch(err => {
        toast.error('Error in getting step intake')
        console.log(err)
      })
  }
  const deleteStepIntake = async (item: any) => {
    // console.log(item)
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/steptrack/deletestepentry', {
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
          toast.success("Step Intake deleted sucessfully")
          console.log("Step Intake deleted sucessfully")
          getStepIntake()
        }
        else {
          toast.error('Error in deleting step intake')
        }
      })
      .catch(err => {
        toast.error('Error in deleting step intake')
        console.log(err)
      })
  }

  React.useEffect(() => {
    getStepIntake()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const selectedDay = (val: any) => {
    setDate(val)
  };

  return (
    <div className='popupout'>
      <div className="popupbox">
        <div className="closebtn">
          <Link className='close' href="/Reports/Step"><AiOutlineClose /></Link>
        </div>
        {/* <button className='close' onClick={() => {
            window.location.href = `/Reports/Step`
          }}><AiOutlineClose /></button> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label='Select Date' value={date} onChange={(newValue: any) => { selectedDay(newValue) }} />
        </LocalizationProvider>

        <TextField id="outlined-basic" label="Steps" variant="outlined" color="warning"
          type='number' onChange={(e) => { setStepIntake({ ...stepIntake, steps: e.target.value }) }} />

        <Button variant="contained" color="warning" onClick={saveStepIntake}>Save</Button>

        <div className="hrline"></div>
        <div className="items">
          {
            items.map((item: any, index: number) => {
              return (
                <div className="item" key={index}>
                  <h3>{item.steps} Steps</h3>
                  <button onClick={() => deleteStepIntake(item)}><AiFillDelete /></button>
                </div>
              )
            })
          }
        </div>
        {/* </div> */}

      </div>
    </div>
  )

}

export default Page