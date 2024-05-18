"use client"
import React from 'react'
import "./Authpopup.css"
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { ToastContainer, toast } from "react-toastify";

interface AuthPopupProps {
    setShowpopup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignupFormData {
    name: String | null,
    email: String | null,
    password: String | null,
    weight: Number | null,
    height: Number | null,
    goal: String | null,
    gender: String | null,
    dob: Date | null,
    activityLevel: String | null
}

const Authpopup: React.FC<AuthPopupProps> = ({ setShowpopup }) => {
    const [showsSignup, setShowSignup] = React.useState<boolean>(false)
    const [signupFormData, setSignupFormData] = React.useState<SignupFormData>({
        name: '',
        email: '',
        password: '',
        weight: 0.0,
        height: 0.0,
        goal: '',
        gender: '',
        dob: new Date(),
        activityLevel: '',
    })

    const [loginFormData, SetLoginFormData] = React.useState({
        email: '',
        password: '',
    })
    const handlelogin = () => {
        console.log(loginFormData)

        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginFormData),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.ok) {
                    toast.success(data.message)
                    window.location.href='/'
                    // setShowpopup(false)
                }
                else {
                    toast.error(data.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    const handlesignup = () => {
        console.log(signupFormData);
        // console.log(process.env.NEXT_PUBLIC_BACKEND_API);

        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupFormData),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.ok) {
                    toast.success(data.message)
                    setShowSignup(false)
                }
                else {
                    toast.error(data.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='popup'>
            <div className='wrapper'>
                <div className="closebtn">
                    <button className='icon-close' onClick={() => { setShowpopup(false) }}><AiOutlineClose />
                    </button>
                </div>
                {
                    showsSignup ? (
                        <div className="form-box register">
                            <h2>Signup to become a freak</h2>
                            <form action="">
                                <div className="input-box">
                                    <input type="text" required onChange={(e) => {
                                        setSignupFormData({
                                            ...signupFormData,
                                            name: e.target.value
                                        })
                                    }} />
                                    <label>Name</label>
                                </div>
                                <div className="input-box" >
                                    <input type="text" required onChange={(e) => {
                                        setSignupFormData({
                                            ...signupFormData,
                                            email: e.target.value
                                        })
                                    }} />
                                    <label>Email</label>
                                </div>
                                <div className="input-box">
                                    <input type="password" required onChange={(e) => {
                                        setSignupFormData({
                                            ...signupFormData,
                                            password: e.target.value
                                        })
                                    }} />
                                    <label>Password</label>
                                </div>
                                <div className="input-box">
                                    <input type="text" required onChange={(e) => {
                                        setSignupFormData({
                                            ...signupFormData,
                                            weight: parseInt(e.target.value)
                                        })
                                    }} />
                                    <label>Weight</label>
                                </div>
                                <div className="input-box" >
                                    <input type='text' required onChange={(e) => {
                                        setSignupFormData({
                                            ...signupFormData,
                                            height: parseFloat(e.target.value)
                                        })
                                    }} />
                                    <label>Height</label>
                                </div>
                                <div className="dob-input-box1">
                                    <p>Date of Birth</p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        {/* defaultValue={dayjs(new Date())} */}
                                        <DesktopDatePicker
                                            sx={{ backgroundColor: "white", width: "100%" }}
                                            onChange={(newValue: any) => (
                                                setSignupFormData({
                                                    ...signupFormData,
                                                    dob: new Date(newValue as any)
                                                })
                                            )}
                                        />
                                    </LocalizationProvider>
                                    {/* <label>Date of Birth</label> */}
                                </div>
                                <div className="input-box">
                                    <Select color="danger" placeholder='Gender' 
                                    onChange={(
                                        event: React.SyntheticEvent | null,
                                        newValue: string | null,) => {
                                        setSignupFormData({
                                            ...signupFormData,
                                            gender: newValue?.toString() || ''
                                        })
                                    }}>
                                        <Option value="Male">Male</Option>
                                        <Option value="Female">Female</Option>
                                        <Option value="Other">Other</Option>
                                    </Select>
                                    {/* <label>Gender</label> */}
                                </div>
                                <div className="input-box" >
                                    <Select color="danger" placeholder='Activity Level' onChange={(
                                        event: React.SyntheticEvent | null,
                                        newValue: string | null,
                                    ) => {
                                        setSignupFormData({
                                            ...signupFormData,
                                            activityLevel: newValue?.toString() || ''
                                        })
                                    }}>
                                        <Option value="sedentary">Sedentary</Option>
                                        <Option value="light">Light</Option>
                                        <Option value="moderate">Moderate</Option>
                                        <Option value="active">Active</Option>
                                        <Option value="veryActive">Very Active</Option>
                                    </Select>
                                    {/* <label>Activity Level</label> */}
                                </div>
                                <div className="input-box">
                                    <Select color="danger" placeholder='Goal' onChange={(
                                        event: React.SyntheticEvent | null,
                                        newValue: string | null,
                                    ) => {
                                        setSignupFormData({
                                            ...signupFormData,
                                            goal: newValue?.toString() || ''
                                        })
                                    }}>
                                        <Option value="Weight Loss">Weight Loss</Option>
                                        <Option value="Weight Maintain">Maintain</Option>
                                        <Option value="Weight Gain">Weight Gain</Option>
                                    </Select>
                                    {/* <label>Goal</label> */}
                                </div>
                                
                                <button className='btn' onClick={(e) => {
                                    handlesignup()
                                    e.preventDefault()
                                }}>Signup</button>
                            </form>
                            <div className="register-link">
                                <p>Already have an account?<button className='' onClick={() => {
                                    setShowSignup(false)
                                }}>Login</button></p>
                            </div>
                        </div>
                    ) :
                        (
                            <div className="form-box login">
                                <h2>Login to become a freak</h2>
                                <form action="">
                                    <div className="input-box" >
                                        <input type="text" required onChange={(e) => {
                                            SetLoginFormData({
                                                ...loginFormData,
                                                email: e.target.value
                                            })
                                        }} />
                                        <label>Email</label>
                                    </div>
                                    <div className="input-box">
                                        <input type="password" required onChange={(e) => {
                                            SetLoginFormData({
                                                ...loginFormData,
                                                password: e.target.value
                                            })
                                        }} />
                                        <label>Password</label>
                                    </div>

                                    <button className='btn' onClick={(e) => {
                                        e.preventDefault()
                                        handlelogin()
                                    }}>Login</button>
                                </form>
                                <div className="register-link">
                                    <p>Dont have an account?<button onClick={() => {
                                        setShowSignup(true)
                                    }}>Signup</button></p>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default Authpopup
