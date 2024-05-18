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

  const [waterIntake, setWaterIntake] = React.useState<any>({
    date: '',
    amountInMilliliters: '',
  })

  const [items, setItems] = React.useState<any>([])

  const saveWaterIntake = async () => {
    let tempdate = date.format('YYYY-MM-DD')
    let finaldatetime = new Date(tempdate)
    console.log(finaldatetime + " finaldatetime")

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/addwaterentry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date: finaldatetime,
        amountInMilliliters: waterIntake.amountInMilliliters
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          toast.success("Water intake added successfully")
          getWaterIntake()
        }
        else {
          toast.error(data.message)
        }
      })
      .catch(err => {
        toast.error('Error in adding water intake')
        console.log(err)
      })
  }
  const getWaterIntake = async () => {
    setItems([])
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/getwaterbydate', {
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
          console.log(data.data, "Water intake data for date")
          setItems(data.data)
        }
        else {
          toast.error('Error in getting water intake')
        }
      })
      .catch(err => {
        toast.error('Error in getting water intake')
        console.log(err)
      })
  }
  const deleteWaterIntake = async (item: any) => {
    // console.log(item)
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/deletewaterentry', {
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
          toast.success("Water Intake deleted sucessfully")
          console.log("Water Intake deleted sucessfully")
          getWaterIntake()
        }
        else {
          toast.error('Error in deleting water intake')
        }
      })
      .catch(err => {
        toast.error('Error in deleting water intake')
        console.log(err)
      })
  }

  React.useEffect(() => {
    getWaterIntake()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const selectedDay = (val: any) => {
    setDate(val)
  };

  return (
    <div className='popupout'>
      <div className="popupbox">
        <div className="closebtn">
          <Link className='close' href="/Reports/Water"><AiOutlineClose /></Link>
        </div>
        {/* <button className='close' onClick={() => {
            window.location.href = `/Reports/Water`
          }}><AiOutlineClose /></button> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label='Select Date' value={date} onChange={(newValue: any) => { selectedDay(newValue) }} />
        </LocalizationProvider>

        <TextField id="outlined-basic" label="Water(in ml)" variant="outlined" color="warning"
          type='number' onChange={(e) => { setWaterIntake({ ...waterIntake, amountInMilliliters: e.target.value }) }} />

        <Button variant="contained" color="warning" onClick={saveWaterIntake}>Save</Button>

        <div className="hrline"></div>
        <div className="items">
          {
            items.map((item: any, index: number) => {
              return (
                <div className="item" key={index}>
                  <h3>{item.amountInMilliliters} Milliliters</h3>
                  <button onClick={() => deleteWaterIntake(item)}><AiFillDelete /></button>
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