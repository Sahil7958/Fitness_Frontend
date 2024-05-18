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

  const [weight, setWeight] = React.useState<any>({
    date: '',
    weightInKg: '',
  })

  const [items, setItems] = React.useState<any>([])

  const saveWeight = async () => {
    let tempdate = date.format('YYYY-MM-DD')
    let finaldatetime = new Date(tempdate)
    console.log(finaldatetime + " finaldatetime")

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/weighttrack/addweightentry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date: finaldatetime,
        weightInKg: weight.weightInKg
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          toast.success("Weight data added successfully")
          getWeight()
        }
        else {
          toast.error(data.message)
        }
      })
      .catch(err => {
        toast.error('Error in adding weight data')
        console.log(err)
      })
  }
  const getWeight = async () => {
    setItems([])
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/weighttrack/getweightbydate', {
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
          console.log(data.data, "Weight data data for date")
          setItems(data.data)
        }
        else {
          toast.error('Error in getting weight data')
        }
      })
      .catch(err => {
        toast.error('Error in getting weight data')
        console.log(err)
      })
  }
  const deleteWeight = async (item: any) => {
    // console.log(item)
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/weighttrack/deleteweightentry', {
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
          toast.success("Weight data deleted sucessfully")
          console.log("Weight data deleted sucessfully")
          getWeight()
        }
        else {
          toast.error('Error in deleting weight data')
        }
      })
      .catch(err => {
        toast.error('Error in deleting weight data')
        console.log(err)
      })
  }

  React.useEffect(() => {
    getWeight()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const selectedDay = (val: any) => {
    setDate(val)
  };

  return (
    <div className='popupout'>
      <div className="popupbox">
        <div className="closebtn">
          <Link className='close' href="/Reports/Weight"><AiOutlineClose /></Link>
        </div>
        {/* <button className='close' onClick={() => {
          window.location.href = `/Reports/Weight`
        }}><AiOutlineClose /></button> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label='Select Date' value={date} onChange={(newValue: any) => { selectedDay(newValue) }} />
        </LocalizationProvider>

        <TextField id="outlined-basic" label="Weight(in Kgs)" variant="outlined" color="warning"
          type='number' onChange={(e) => { setWeight({ ...weight, weightInKg: e.target.value }) }} />

        <Button variant="contained" color="warning" onClick={saveWeight}>Save</Button>

        <div className="hrline"></div>
        <div className="items">
          {
            items.map((item: any, index: number) => {
              return (
                <div className="item" key={index}>
                  <h3>{item.weight} kgs</h3>
                  <button onClick={() => deleteWeight(item)}><AiFillDelete /></button>
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