"use client"
import React from 'react'
import { LineChart } from "@mui/x-charts/LineChart";
import "./ReportPage.css";
import { AiFillEdit } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Link from "next/link";

const Page = () => {
    const color = '#ff1414'
    const pathName = usePathname()
    // console.log(pathName)
    const ChartParams = {
        height: 300,
    }
    const [dataS1, setDataS1] = React.useState<any>(null)
    const [limit, setLimit] = React.useState<number>(1)

    const getDataForS1 = async () => {
        if (pathName == '/Reports/CaloriesIntake') {
            fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/getcalorieintakebylimit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ limit: limit })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        // console.log(data)
                        let temp = data.data.map((item: any) => {
                            return {
                                date: item.date,
                                value: item.calorieIntake,
                                unit: 'kcal'
                            }
                        })
                        let dataForLineChart = temp.map((item: any) => {
                            let val = JSON.stringify(item.value)
                            return val
                        })
                        let dataForXAxis = temp.map((item: any) => {
                            let val = new Date(item.date)
                            return val
                        })
                        setDataS1({
                            data: dataForLineChart,
                            title: 'Calorie Intake',
                            color: color,
                            xAxis: {
                                data: dataForXAxis,
                                label: 'Date & Time',
                                scaleType: 'time'
                            }
                        })
                    }
                    else {
                        setDataS1([])
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (pathName == '/Reports/Sleep') {
            fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/sleeptrack/getsleepbylimit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ limit: limit })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        let temp = data.data.map((item: any) => {
                            return {
                                date: item.date,
                                value: item.durationInHrs,
                                unit: 'hrs'
                            }
                        })
                        let dataForLineChart = temp.map((item: any) => {
                            let val = JSON.stringify(item.value)
                            return val
                        })
                        let dataForXAxis = temp.map((item: any) => {
                            let val = new Date(item.date)
                            return val
                        })
                        setDataS1({
                            data: dataForLineChart,
                            title: 'Sleep(in Hrs)',
                            color: color,
                            xAxis: {
                                data: dataForXAxis,
                                label: '1 Day',
                                scaleType: 'time'
                            }
                        })
                    }
                    else {
                        setDataS1([])
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (pathName == '/Reports/Step') {
            fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/steptrack/getstepbylimit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ limit: limit })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        let temp = data.data.map((item: any) => {
                            return {
                                date: item.date,
                                value: item.steps,
                                unit: 'steps'
                            }
                        })
                        let dataForLineChart = temp.map((item: any) => {
                            let val = JSON.stringify(item.value)
                            return val
                        })
                        let dataForXAxis = temp.map((item: any) => {
                            let val = new Date(item.date)
                            return val
                        })
                        setDataS1({
                            data: dataForLineChart,
                            title: 'Steps',
                            color: color,
                            xAxis: {
                                data: dataForXAxis,
                                label: '1 Day',
                                scaleType: 'time'
                            }
                        })
                    }
                    else {
                        setDataS1([])
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (pathName == '/Reports/Water') {
            fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/getwaterbylimit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ limit: limit })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        let temp = data.data.map((item: any) => {
                            return {
                                date: item.date,
                                value: item.amountInMilliliters,
                                unit: 'Milliiters'
                            }
                        })
                        let dataForLineChart = temp.map((item: any) => {
                            let val = JSON.stringify(item.value)
                            return val
                        })
                        let dataForXAxis = temp.map((item: any) => {
                            let val = new Date(item.date)
                            return val
                        })
                        setDataS1({
                            data: dataForLineChart,
                            title: 'Water(in ml)',
                            color: color,
                            xAxis: {
                                data: dataForXAxis,
                                label: '1 Day',
                                scaleType: 'time'
                            }
                        })
                    }
                    else {
                        setDataS1([])
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (pathName == '/Reports/Weight') {
            fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/weighttrack/getweightbylimit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ limit: limit })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        let temp = data.data.map((item: any) => {
                            return {
                                date: item.date,
                                value: item.weight,
                                unit: 'Kgs'
                            }
                        })
                        let dataForLineChart = temp.map((item: any) => {
                            let val = JSON.stringify(item.value)
                            return val
                        })
                        let dataForXAxis = temp.map((item: any) => {
                            let val = new Date(item.date)
                            return val
                        })
                        setDataS1({
                            data: dataForLineChart,
                            title: 'Weight(in Kgs)',
                            color: color,
                            xAxis: {
                                data: dataForXAxis,
                                label: '1 Day',
                                scaleType: 'time'
                            }
                        })
                    }
                    else {
                        setDataS1([])
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else if (pathName == '/Reports/Workout') {
            fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workouttrack/getworkoutsbylimit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ limit: limit })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        let temp = data.data.map((item: any) => {
                            return {
                                date: item.date,
                                exercise: item.exercise,
                                value: item.durationInMinutes,
                                unit: 'Days'
                            }
                        })

                        let dataForLineChart = temp.map((item: any) => {
                            // let val1 =JSON.stringify(item.exercise)
                            // let val2 = JSON.stringify(item.value)
                            // return val1+val2
                            let val = JSON.stringify(item.value)
                            return val
                        })
                        let dataForXAxis = temp.map((item: any) => {
                            let val = new Date(item.date)
                            return val
                        })
                        setDataS1({
                            data: dataForLineChart,
                            title: 'Workout',
                            color: color,
                            xAxis: {
                                data: dataForXAxis,
                                label: '1 Day',
                                scaleType: 'time'
                            }
                        })
                    }
                    else {
                        setDataS1([])
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            alert('get data for other reports')
        }
    }
    React.useEffect(() => {
        getDataForS1()
    })
    return (
        <div className='reportpage'>

            <div className="s1">
                <Select onChange={(
                    event: React.SyntheticEvent | null,
                    newValue: string | null,) => {
                    setLimit(newValue)
                }}>
                    <Option value={1}>Today</Option>
                    <Option value={10}>Last 10 days</Option>
                    <Option value={30}>Last 30 days</Option>
                </Select>
                {
                    dataS1 &&
                    <LineChart sx={{
                    }}
                        xAxis={[{
                            id: 'Day',
                            data: dataS1.xAxis.data,
                            scaleType: dataS1.xAxis.scaleType,
                            label: dataS1.xAxis.label,
                        }]}
                        series={[{
                            data: dataS1.data,
                            label: dataS1.title,
                            color: dataS1.color,
                        }]}
                        {...ChartParams}
                    />
                }
            </div>
            <Link className="editbutton" href={`/ReportFormPopup/${pathName}/page.tsx`}><AiFillEdit /></Link>
        </div>
    )
}
export default Page
