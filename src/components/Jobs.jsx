import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Footer from './Footer'
import { Toaster } from 'sonner'

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)

    // Parse salary filter strings like "0-5 LPA", "5-10 LPA", "20+ LPA" into { min, max }
    const getSalaryRange = (query) => {
        if (!query) return null;
        const rangeMatch = query.match(/^(\d+)-(\d+)\s*LPA$/i);
        if (rangeMatch) return { min: Number(rangeMatch[1]), max: Number(rangeMatch[2]) };
        const aboveMatch = query.match(/^(\d+)\+\s*LPA$/i);
        if (aboveMatch) return { min: Number(aboveMatch[1]), max: Infinity };
        const belowMatch = query.match(/^<(\d+)\s*LPA$/i);
        if (belowMatch) return { min: 0, max: Number(belowMatch[1]) };
        return null;
    };

    useEffect(() => {
        if (searchedQuery) {
            const salaryRange = getSalaryRange(searchedQuery);
            const filtered = allJobs.filter((job) => {
                if (salaryRange) {
                    const salary = Number(job?.salary);
                    return salary >= salaryRange.min && salary <= salaryRange.max;
                }
                return (
                    job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job?.location?.toLowerCase().includes(searchedQuery.toLowerCase())
                )
            })
            setFilterJobs(filtered)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-background"
        >
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 shrink-0">
                        <FilterCard />
                    </aside>

                    {/* Jobs Grid */}
                    <main className="flex-1">
                        {filterJobs?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                {filterJobs.map((job, i) => (
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
                                    <span className="text-3xl">📭</span>
                                </div>
                                <p className="font-medium text-muted-foreground">No Jobs Found</p>
                                <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your filters</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
            <Footer />
            <Toaster theme="dark" richColors position="bottom-right" />
        </motion.div>
    )
}

export default Jobs