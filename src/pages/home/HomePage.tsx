import Hero from '@features/home/hero/Hero'
import HomeCategries from '@features/home/homeCategories/HomeCategries'
import ServiceSection from '@features/home/serviceSection/ServiceSection'
import { useAppDispatch } from '@redux/hooks'
import { setSearchQuery } from '@redux/slices/appSlice'
import { useEffect } from 'react'

function HomePage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setSearchQuery(''))
  }, [])
  
  return (
    <>
      <Hero />
      {/* <HomeCategries /> */}
      {/* <ServiceSection /> */}
    </>
  )
}

export default HomePage
