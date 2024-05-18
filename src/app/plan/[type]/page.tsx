"use client"
import React from 'react'
import "./planpage.css"

const Page = () => {
    const [workout, setWorkout] = React.useState<any>(null)

    const getworkout = async () => {
        let data: any = {
            type: "Abs",
            imageUrl: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            durationInMin: 20,
            exercises: [
                {
                    exercise: "JUMPING JACKS",
                    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Jumping-jack.gif",
                    reps: "20 sec"
                },
                {
                    exercise: "ABDOMINAL CRUNCHES",
                    videoUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/knee-touch-crunch.gif",
                    reps: "x16"
                },
                {
                    exercise: "RUSSIAN TWIST",
                    videoUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/09/russian-twist.gif",
                    reps: "x20"
                },
                {
                    exercise: "MOUNTAIN CLIMBER",
                    videoUrl: "https://homeworkouts.org/wp-content/uploads/anim-mountain-climbers.gif",
                    reps: "x16"
                },
                {
                    exercise: "HEEL TOUCH",
                    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Heel-Touch.gif",
                    reps: "x20"
                },
                {
                    exercise: "LEG RAISES",
                    videoUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2021/10/supine-leg-raises.gif",
                    reps: "x16"
                },
                {
                    exercise: "PLANK",
                    videoUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/plank.gif",
                    reps: "20 sec"
                },
                {
                    exercise: "ABDOMINAL CRUNCHES",
                    videoUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/12/knee-touch-crunch.gif",
                    reps: "x16"
                },
                {
                    exercise: "RUSSIAN TWIST",
                    videoUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2023/09/russian-twist.gif",
                    reps: "x20"
                },
                {
                    exercise: "MOUNTAIN CLIMBER",
                    videoUrl: "https://homeworkouts.org/wp-content/uploads/anim-mountain-climbers.gif",
                    reps: "x16"
                },
                {
                    exercise: "HEEL TOUCH",
                    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Heel-Touch.gif",
                    reps: "x20"
                },
                {
                    exercise: "LEG RAISES",
                    videoUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2021/10/supine-leg-raises.gif",
                    reps: "x16"
                },
                {
                    exercise: "PLANK",
                    videoUrl: "https://www.inspireusafoundation.org/wp-content/uploads/2022/01/plank.gif",
                    reps: "20 sec"
                },

                {
                    exercise: "COBRA STRETCH",
                    videoUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/06/abdominal-stretch.gif",
                    reps: "30 sec"
                },
                {
                    exercise: "SPINE LUMBAR TWIST STRETCH LEFT",
                    videoUrl: "https://homeworkouts.org/wp-content/uploads/anim-supine-spinal-twist-pose.gif",
                    reps: "30 sec"
                },
                {
                    exercise: "SPINE LUMBAR TWIST STRETCH RIGHT",
                    videoUrl: "https://homeworkouts.org/wp-content/uploads/anim-supine-spinal-twist-pose.gif",
                    reps: "30 sec"
                }
            ]
        }
        setWorkout(data)
    }
    React.useEffect(() => {
        getworkout()
    })
    return (
        <div className='workout'>
            <h1 className='mainhead1'>{workout?.type} DAY</h1>
            <div className="workout_exercises">
                {
                    workout?.exercises.map((item: any, index: number) => {
                        return (
                            <div key={index} className='workout_exercise'>
                                <h3>{index + 1}</h3>
                                <div className="workout_exercise_image">
                                    <img src={item.videoUrl} alt="" />
                                </div>
                                <div className="workout_exercise_content">
                                    <h2>{item.exercise} </h2>
                                    <span> {item.reps} </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Page