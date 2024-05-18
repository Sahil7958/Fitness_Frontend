"use client"
import React from 'react'
import "./workoutPage.css"
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
const Page = () => {
    const [data, setData] = React.useState<any>(null)
    
    const searchParams = useSearchParams()
    const workoutid = searchParams.get('id')
    // console.log(workoutid)

    const getWorkout = async () => {
        // let data: any = {
        //     type: "Chest",
        //     imageUrl: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //     durationInMin: 30,
        //     exercises: [
        //         {
        //             exercise: "Assisted Chest Dip (kneeling)",
        //             videoUrl:"https://newlife.com.cy/wp-content/uploads/2019/11/00091301-Assisted-Chest-Dip-kneeling_Chest_360.gif",
        //             sets: 3,
        //             reps: 10,
        //             rest: 60,
        //             descripition: "(1)With your arms fully extended, grab both handles with your palms facing inwards towards your body and place your knees on the pad.(2)Keeping your forearms perpendicular to the ground,inhale and lower yourself down.(3)Continue lowering yourself down until your upper arms are parallel with the floor.(4)Exhale and push yourself up until your arms are fully extended, returning to the starting position."
        //         },
        //         {
        //             exercise: "Bench Press",
        //             videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif",
        //             sets: 3,
        //             reps: 10,
        //             rest: 60,
        //             descripition: "(1) Lie on your back on a flat bench. Lift the bar off the rack and hold it straight over you, keeping your arms locked. This is the starting position.(2)Next, inhale and bring the barbell down in a slow and controlled manner until it reaches your mid-chest.(3) Pause briefly before raising the barbell back to your starting position as you exhale. Your focus should be on using your chest muscles to move the bar. Lock your arms at the top of the movement and squeeze your chest before slowly bringing the barbell down again. This step should take twice as long raising the weight to get the maximum benefit."
        //         },
        //         {
        //             exercise: "Assisted Wide Grip Chest Dip",
        //             videoUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXjDUGz_s2jiGmwQR-A_hh_Nt-GvC216JR2Bu0A-F9tJIbhNpygM1pl46H21PziVc6giLGRDKjnOd1NTf3zpsclJE-xTCC79BGxNQ8lqMhI7cVDKGik-hX9tTaOcAjo8xyapNdKpIBJKnbmJcwXgADVQMX50J3vY0vzYtSNnps6YksZ1E_d8hqERbx/s360/chest%20dips.gif",
        //             sets: 3,
        //             reps: 10,
        //             rest: 60,
        //             descripition: "(1)Place your hands on the handles and ensure your wrists are straight.(2)Step on the platform and lower your body until your arms are at a 90-degree angle.(3)Push your body up and away from the handles until your arms are fully extended."
        //         },
        //         {
        //             exercise: "Chest Dip",
        //             videoUrl:"https://fitnessprogramer.com/wp-content/uploads/2021/06/Chest-Dips.gif",                 
        //             sets: 3,
        //             reps: 10,
        //             rest: 60,
        //             descripition: "(1)With your arms fully extended, grab both handles with your palms facing inwards towards your body.(2)Keeping your forearms perpendicular to the ground, )inhale and lower yourself down.(3)Continue lowering yourself down until your upper arms are parallel with the floor.(4)Exhale and push yourself up until your arms are fully extended, returning to the starting position."
        //         }

        //     ]
        // }
        // setWorkout(data)
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutplans/exercisesofWorkout/' + workoutid, {
            method: `GET`,
            credentials: 'include',

        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.ok) {
                    setData(data.data)
                }
                else {
                    setData([])
                }
            })
            .catch(err => {
                console.log(err)
            })

    }
    React.useEffect(() => {
        getWorkout()
    })
    return (
        <>
            {
                data &&
                <div className='workout'>
                    <h1 className='mainhead1'>{data?.name} DAY</h1>
                    <div className="workout_exercises">
                        {
                            data?.exercises.map((item: any, index: number) => {
                                return (
                                    <div key={index} className='workout_exercise '>
                                        <h3>{index + 1}</h3>
                                        <div className="workout_exercise_image">
                                            <img src={item.imageURL} alt=''/>
                                        </div>
                                        <div className="workout_exercise_content">
                                            <h2>{item.name}</h2>
                                            <span>{item.sets} sets X {item.reps} reps </span>
                                            <p>{item.description} </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Page