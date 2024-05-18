import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './Homebanner2.css';


const Homebanner2 = () => {
  // const [workouts, setWorkouts] = React.useState<any[] | null>(null)
  const [data, setData] = React.useState<any[] | null>(null)

  // const getworkouts = async () => {
  //   let data: any = [
  //     {
  //       type: 'Chest',
  //       imageUrl: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       durationInMin: 30
  //     },
  //     {
  //       type: 'Abs',
  //       imageUrl: 'https://plus.unsplash.com/premium_photo-1664477098603-042afd7d70de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWJzJTIwd29ya291dHN8ZW58MHx8MHx8fDA%3D',
  //       durationInMin: 90
  //     },
  //     {
  //       type: 'Shoulder',
  //       imageUrl: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvdWxkZXIlMjB3b3Jrb3V0fGVufDB8fDB8fHww',
  //       durationInMin: 40
  //     },
  //     {
  //       type: 'back',
  //       imageUrl: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFjayUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D',
  //       durationInMin: 70
  //     },
  //     {
  //       type: 'Biceps',
  //       imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmljZXBzJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D',
  //       durationInMin: 50
  //     },
  //     {
  //       type: 'Triceps',
  //       imageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJpY2VwcyUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D',
  //       durationInMin: 60
  //     },
  //     {
  //       type: 'Cardio',
  //       imageUrl: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcmRpbyUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D',
  //       durationInMin: 100
  //     },
  //     {
  //       type: 'Forearms',
  //       imageUrl: 'https://plus.unsplash.com/premium_photo-1661681758457-87d4a8f3243a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9yZWFybXN8ZW58MHx8MHx8fDA%3D',
  //       durationInMin: 110
  //     }
  //   ]
  //   setWorkouts(data)
  // }

  const getData = async () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutplans/workouts', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.ok) {
          setData(data.data)
        }
        else {
          setData([])
        }
      })
      .catch(err => {
        console.log(err)
        setData([])
      })
  }
  React.useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {
        data &&
        <div>
          <h1 className='mainhead1'>WORKOUTS</h1>
          <Swiper slidesPerView={1} spaceBetween={10} pagination={{ clickable: true, }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 60,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1324: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {
              data && data.map((item, index) => {
                return (
                  <SwiperSlide key={index} >
                    <div className='swiper-slide'
                      style={{
                        backgroundImage: `url(${item.imageURL})`,
                      }}
                    onClick={() => {
                      window.location.href = `/workout?id=${item._id}`
                    }}
                    >
                    <div className='swiper-slide-content'>
                      <h2>{item.name}</h2>
                      <p>{item.durationInMinutes} min</p>
                    </div>
                  </div>
                  </SwiperSlide>
          )
              })
            }
        </Swiper>
        </div >
      }
    </>
  )
}

export default Homebanner2
