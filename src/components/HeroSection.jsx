import React, { useState } from 'react'
import { Search, Sparkles, TrendingUp, Building2, Users } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const stats = [
  { icon: <TrendingUp className="w-5 h-5" />, value: '10K+', label: 'Active Jobs' },
  { icon: <Building2 className="w-5 h-5" />, value: '500+', label: 'Companies' },
  { icon: <Users className="w-5 h-5" />, value: '50K+', label: 'Job Seekers' },
]

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') searchJobHandler()
  }

  return (
    <section className="relative overflow-hidden gradient-bg mesh-bg">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-800/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet-500/20 text-sm font-medium text-violet-300 mb-6 animate-pulse-glow"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            No. 1 Job Hunt Platform
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
          >
            Search, Apply &{' '}
            <br className="hidden sm:block" />
            Get Your <span className="gradient-text">Dream Job</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Discover thousands of job opportunities with the best companies.
            Your next career move starts right here.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-xl mx-auto"
          >
            <div className="flex items-center gap-0 glass rounded-full p-1.5 glow-violet-sm focus-within:glow-violet transition-all duration-300">
              <Search className="w-5 h-5 text-muted-foreground ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Job title, company, or keyword..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground px-3 py-2.5"
              />
              <button
                onClick={searchJobHandler}
                className="cursor-pointer shrink-0 px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40"
              >
                Search
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center mb-1 text-violet-400">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection