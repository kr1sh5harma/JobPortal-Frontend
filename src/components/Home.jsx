import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'

const Home = () => {
  useGetAllJobs()
  const { user } = useSelector(store => store.auth || {})
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies')
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
      <Toaster theme="dark" richColors position="bottom-right" />
    </motion.div>
  )
}

export default Home