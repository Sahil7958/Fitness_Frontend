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
  const [time, setTime] = React.useState<any>(dayjs(new Date()))

  const [workout, setWorkout] = React.useState<any>({
    date: '',
    exercise: '',
    durationInMinutes: ''
  })

  const [items, setItems] = React.useState<any>([])

  const saveWorkout = async () => {
    let tempdate = date.format('YYYY-MM-DD')
    let temptime = time.format('HH:MM')
    let tempdatetime = tempdate + ' ' + temptime
    let finaldatetime = new Date(tempdatetime)
    console.log(finaldatetime + " finaldatetime")

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workouttrack/addworkoutentry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date: finaldatetime,
        exercise: workout.exercise,
        durationInMinutes: workout.durationInMinutes
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          toast.success("Workout data added successfully")
          getWorkout()
        }
        else {
          toast.error(data.message)
        }
      })
      .catch(err => {
        toast.error('Error in adding workout data')
        console.log(err)
      })
  }
  const getWorkout = async () => {
    setItems([])
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workouttrack/getworkoutsbydate', {
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
          console.log(data.data, "workout data data for date")
          setItems(data.data)
        }
        else {
          toast.error('Error in getting workout data')
        }
      })
      .catch(err => {
        toast.error('Error in getting workout data')
        console.log(err)
      })
  }
  const deleteWorkout = async (item: any) => {
    // console.log(item)
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workouttrack/deleteworkoutentry', {
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
          toast.success("Workout data deleted sucessfully")
          console.log("Workout data deleted sucessfully")
          getWorkout()
        }
        else {
          toast.error('Error in deleting workout data')
        }
      })
      .catch(err => {
        toast.error('Error in deleting workout data')
        console.log(err)
      })
  }

  React.useEffect(() => {
    getWorkout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const selectedDay = (val: any) => {
    setDate(val)
  };

  return (
    <div className='popupout'>
      <div className="popupbox">
        <div className="closebtn">
          <Link className='close' href="/Reports/Workout"><AiOutlineClose /></Link>
        </div>
        {/* <button className='close' onClick={() => {
          window.location.href = `/Reports/Workout`
        }}><AiOutlineClose /></button> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label='Select Date' value={date} onChange={(newValue: any) => { selectedDay(newValue) }} />
        </LocalizationProvider>

        <TextField id="outlined-basic" label="Exercise" variant="outlined" color="warning"
          onChange={(e) => { setWorkout({ ...workout, exercise: e.target.value }) }} />

        <TextField id="outlined-basic" label="duraion(in mins)" variant="outlined" color="warning"
          type='number' onChange={(e) => { setWorkout({ ...workout, durationInMinutes: e.target.value }) }} />

        <div className='timebox'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label="With Time Clock"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }} value={time} onChange={(newValue: any) => setTime(newValue)}
            />
          </LocalizationProvider>
        </div>

        <Button variant="contained" color="warning" onClick={saveWorkout}>Save</Button>

        <div className="hrline"></div>
        <div className="items">
          {
            items.map((item: any, index: number) => {
              return (
                <div className="item" key={index}>
                  <h3>{item.exercise}</h3>
                  <h3>{item.durationInMinutes} Mins</h3>
                  <button onClick={() => deleteWorkout(item)}><AiFillDelete /></button>
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