"use client"
import React from 'react'
import Image from 'next/image';
import CircularProgress from '@mui/joy/CircularProgress';
import { AiOutlineEye } from "react-icons/ai";
import "./Homebanner1.css";
import NoUser from "@/assets/no_user.png"
// import XLSX from "xlsx";
import * as XLSX from "xlsx";

const Homebanner1 = () => {
    const [data, setData] = React.useState<any>(null)
    const getData = async () => {
        let temp = [
            {
                "name": "CaloriesIntake",
                "unit": "kcal",
                "goal": 2500,
                "goalUnit": "kcal"
            },
            {
                "name": "Sleep",
                "unit": "hrs",
                "goal": 8,
                "goalUnit": "hrs"
            },
            {
                "name": "Step",
                "unit": "steps",
                "goal": 10000,
                "goalUnit": "steps"
            },
            {
                "name": "Water",
                "unit": "ml",
                "goal": 3000,
                "goalUnit": "ml"
            },
            {
                "name": "Weight",
                "unit": "kg",
                "goal": 70,
                "goalUnit": "kg"
            },
            {
                "name": "Workout",
                "unit": "days",
                "goal": 6,
                "goalUnit": "days"
            }
        ]
        setData(temp)
    }
    React.useEffect(() => {
        getData()
    }, [])

    function simplifyFraction(numerator: number, denominator: number): [number, number] {
        function gcd(a: number, b: number): number {
            return b === 0 ? a : gcd(b, a % b);
        }
        const commonDivisor: number = gcd(numerator, denominator);

        const simplifyNumerator: number = numerator / commonDivisor;
        const simpliyDenominator: number = denominator / commonDivisor;

        return [simplifyNumerator, simpliyDenominator]
    }

    // to read data
    const [excelFile, setExcelFile] = React.useState<any>(null);
    const [typeError, setTypeError] = React.useState<any>(null);

    const [excelData, setExcelData] = React.useState<any>(null);

    const handleFile = (e: any) => {
        let fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv']
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            // console.log(selectedFile.type)
            if (selectedFile && fileType.includes(selectedFile.type)) {
                setTypeError(null)
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e: any) => {
                    setExcelFile(e.target.result)
                }
            }
            else {
                setTypeError('Please select only excel file types')
                setExcelFile(null)
            }
        }
        else {
            console.log("Please select your file")
        }
    }
    const handleFileSubmit = (e: any) => {
        e.preventDefault()
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0, 10));
        }
    }

    const [trainer, setTrainer] = React.useState<any>(null);
    const trainerData = async () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/trainerData/fetchtrainerdata', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.ok) {
                    setTrainer(data.data)
                }
                else {
                    setTrainer([])
                }
            })
            .catch(err => {
                console.log(err)
                setTrainer([])
            })
    }
    React.useEffect(() => {
        trainerData()
    }, [])
    // console.log(trainer.name)
    return (
        <div className="homebanner1">
            <div className="box" >
                <form className="form" onSubmit={handleFileSubmit}>
                    <h3>UPLOAD YOUR DATA</h3>
                    <input type="file" className='' onChange={handleFile} required />
                    {typeError && (
                        <div className="errorMessage">{typeError}</div>
                    )}
                    <button type='submit' className='btn1'>UPLOAD</button>
                </form>
                <div className="view-data">
                    {
                        excelData && excelData.map((item1: any, index: any) =>
                            <div className='new' key={index}>
                                <div className='meters'>
                                    {
                                        data?.length > 0 && data.map((item: any, index: number,) => {
                                            return (
                                                <div className='card' key={index}>
                                                    <div className='card-header'>
                                                        <div className='card-header-box'>
                                                            <div className='card-header-box-name'>{item.name}
                                                            </div>
                                                            <div className='card-header-box-value'>{item1[item.name]} {item.unit}</div>
                                                        </div>
                                                        <div className='card-header-box'>
                                                            <div className='card-header-box-name'>Target</div>
                                                            <div className='card-header-box-value'>{item.goal} {item.goalUnit}</div>
                                                        </div>
                                                    </div>
                                                    <CircularProgress color="neutral" determinate size="lg" variant="soft" value={(item1[item.name] / item.goal) * 100}>
                                                        <span className='textincircle'>{
                                                            simplifyFraction(item1[item.name], item.goal)[0] + '/' + simplifyFraction(item1[item.name], item.goal)[1]
                                                        }</span>
                                                    </CircularProgress>
                                                    <button onClick={() => {
                                                        window.location.href = `/Reports/${item.name}`
                                                    }}>Show Report<AiOutlineEye /></button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                        )
                    }
                </div>
            </div>
            {
                trainer &&
                <div className="trainer">
                    <h3>YOUR TRAINER</h3>
                    <div className="trainer-card" >
                        {trainer.imageURL ?
                            <Image src={`${trainer.imageURL}`} alt="userimage" width={80} height={80} />
                            :
                            <Image src={NoUser} alt="nouuser" width={80} height={80} />

                        }
                        {/* <img src={`${trainer.imageURL}`} alt={NoUser} width={80} height={80} /> */}
                        <div className="trainer-box">
                            <h2>Name:{trainer.name}</h2>
                            <p>Contact No:{trainer.contactNo}</p>
                            <p>Email: {trainer.email}</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Homebanner1
