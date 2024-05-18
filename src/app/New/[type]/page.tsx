"use client"
import React from 'react'
import "./Newpage.css"
import Image from "next/image";
import male from "@/assets/male.png";
import female from "@/assets/female.jpeg";

import Header from "@/Components/Header/Header";


const Page = () => {
  const [workouts1, setWorkouts1] = React.useState<any[] | null>(null)

  const getworkouts1 = async () => {
    let data: any = [
      {
        type: 'ABS ',
        imageUrl: 'https://images.pexels.com/photos/12895269/pexels-photo-12895269.jpeg?auto=compress&cs=tinysrgb&w=600',
        durationInMin: 20,
        exercises: 16
      },
      {
        type: 'CHEST ',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgKMCiDCVbHoDEh9rEu0wOBQxb2G1dx7DEhA&usqp=CAU',
        durationInMin: 7,
        exercises: 11
      },
      {
        type: 'ARM ',
        imageUrl: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/10/arm-workout-scaled.jpg?fit=2560%2C1704&ssl=1',
        durationInMin: 17,
        exercises: 19
      },
      {
        type: 'LEG ',
        imageUrl: 'https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/06/2-walking-lunge-1109.jpg?quality=86&strip=all',
        durationInMin: 26,
        exercises: 23
      },
      {
        type: 'SHOULDER & BACK ',
        imageUrl: 'https://www.setforset.com/cdn/shop/articles/back_and_shoulders_workout_2000x.jpg?v=1656669044',
        durationInMin: 17,
        exercises: 17
      }
    ]
    setWorkouts1(data)
  }
  React.useEffect(() => {
    getworkouts1()
  }, [])

  const [workouts2, setWorkouts2] = React.useState<any[] | null>(null)

  const getworkouts2 = async () => {
    let data2: any = [
      {
        type: 'ABS ',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlP3uO4POpoJsKCeRrcW5GwoaMR3kE6G4KoA&usqp=CAU',
        durationInMin: 20,
        exercises: 16
      },
      {
        type: 'CHEST ',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm3t52ymWtIdIgrrSxcvtAk-i3rTBLYMVYTw&usqp=CAU',
        durationInMin: 7,
        exercises: 11
      },
      {
        type: 'ARM ',
        imageUrl: 'https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/07/Juan-Morel-Preacher-Curl-Arms.jpg?quality=86&strip=all',
        durationInMin: 17,
        exercises: 19
      },
      {
        type: 'LEG ',
        imageUrl: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcmRpbyUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D',  
        durationInMin: 26,
        exercises: 23
      },
      {
        type: 'SHOULDER & BACK ',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5oEwzqJkYmIaWdHuFHJ7bnrb0ryIhPLcABQ&usqp=CAU',
        durationInMin: 17,
        exercises: 17
      }
    ]
    setWorkouts2(data2)

  }
  React.useEffect(() => {
    getworkouts2()
  }, [])

  const [workouts3, setWorkouts3] = React.useState<any[] | null>(null)
  const getworkouts3 = async () => {
    let data3: any = [
      {
        type: 'ABS ',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1664477098603-042afd7d70de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWJzJTIwd29ya291dHN8ZW58MHx8MHx8fDA%3D',
        durationInMin: 20,
        exercises: 16
      },
      {
        type: 'CHEST ',
        imageUrl: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        durationInMin: 7,
        exercises: 11
      },
      {
        type: 'ARM ',
        imageUrl: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvdWxkZXIlMjB3b3Jrb3V0fGVufDB8fDB8fHww',
        durationInMin: 17,
        exercises: 19
      },
      {
        type: 'LEG ',
        imageUrl: 'https://www.bodybuilding.com/images/2016/june/leg-workouts-for-men-7-best-workouts-for-quads-glutes-hams-header-v2-960x540.jpg',
        durationInMin: 26,
        exercises: 23
      },
      {
        type: 'SHOULDER & BACK ',
        imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmljZXBzJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D',
        durationInMin: 17,
        exercises: 17
      }
    ]
    setWorkouts3(data3)
  }
  React.useEffect(() => {
    getworkouts3()
  }, [])
  return (
    <div className="container">
      <h1>BEGINNER</h1>
      <div className='main'>
        {
          workouts1 && workouts1.map((item, index) => {
            return (
              <div className='swiper-slide' key={index} style={{ backgroundImage: `url(${item.imageUrl})` }}
                onClick={() => { window.location.href = `/plan/${item.type}` }}>
                <div className='swiper-slide-content'>
                  <h2>{item.type}</h2>
                  <p>{item.durationInMin} min</p>
                  <p>{item.exercises} exercises</p>
                </div>
              </div>
            )
          }
          )
        }
      </div>
      <h1>INTERMEDIATE</h1>
      <div className='main'>
        {
          workouts2 && workouts2.map((item, index) => {
            return (
              <div className='swiper-slide' key={index} style={{ backgroundImage: `url(${item.imageUrl})` }}
                onClick={() => { window.location.href = `/plan/${item.type}` }}>
                <div className='swiper-slide-content'>
                  <h2>{item.type}</h2>
                  <p>{item.durationInMin} min</p>
                  <p>{item.exercises} exercises</p>
                </div>
              </div>
            )
          }
          )
        }
      </div>
      <h1>ADVANCED</h1>
      <div className='main'>
        {
          workouts3 && workouts3.map((item, index) => {
            return (
              <div className='swiper-slide' key={index} style={{ backgroundImage: `url(${item.imageUrl})` }}
                onClick={() => { window.location.href = `/plan/${item.type}` }}>
                <div className='swiper-slide-content'>
                  <h2>{item.type}</h2>
                  <p>{item.durationInMin} min</p>
                  <p>{item.exercises} exercises</p>
                </div>
              </div>
            )
          }
          )
        }
      </div>

    </div>

  )
}

export default Page