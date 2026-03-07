import React from 'react'
import { useSelector } from 'react-redux'
import LatestJobCards from './LatestJobCards'
import { motion } from 'framer-motion'

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job)

    return (
        <section className="py-16 relative">
            {/* BG accent */}
            <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold">
                        <span className="gradient-text">Latest</span> Job Openings
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Fresh opportunities added daily – don't miss out
                    </p>
                </motion.div>

                {allJobs?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {allJobs.slice(0, 6).map((job, i) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.08 }}
                            >
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🔍</span>
                        </div>
                        <p className="text-muted-foreground font-medium">No jobs available right now</p>
                        <p className="text-sm text-muted-foreground/60 mt-1">Check back soon for new opportunities</p>
                    </motion.div>
                )}
            </div>
        </section>
    )
}

export default LatestJobs