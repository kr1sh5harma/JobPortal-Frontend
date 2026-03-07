import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector, useDispatch } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'
import Footer from './Footer'
import { Toaster } from 'sonner'

const Browse = () => {
    useGetAllJobs()
    const { allJobs } = useSelector(store => store.job)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(''))
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-background"
        >
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">
                        Search Results <span className="text-muted-foreground text-lg font-normal">({allJobs?.length || 0})</span>
                    </h1>
                </div>

                {allJobs?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {allJobs.map((job, i) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
                            <span className="text-3xl">🔍</span>
                        </div>
                        <p className="font-medium text-muted-foreground">No results found</p>
                        <p className="text-sm text-muted-foreground/60 mt-1">Try searching with different keywords</p>
                    </div>
                )}
            </div>
            <Footer />
            <Toaster theme="dark" richColors position="bottom-right" />
        </motion.div>
    )
}

export default Browse