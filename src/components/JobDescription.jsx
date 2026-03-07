import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT, apiClient } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import Navbar from './shared/Navbar'
import Footer from './Footer'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'
import { MapPin, Clock, IndianRupee, Briefcase, Users, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job || {})
    const { user } = useSelector(store => store.auth)

    const isInitiallyApplied = singleJob?.applications?.some(app => app.applicant === user?._id) || false
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)
    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const res = await apiClient.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`)
            if (res.data.success) {
                setIsApplied(true)
                const updated = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updated))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await apiClient.get(`${JOB_API_END_POINT}/get/${jobId}`)
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    const details = [
        { icon: <Briefcase className="w-4 h-4" />, label: 'Role', value: singleJob?.title },
        { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: singleJob?.location },
        { icon: <Clock className="w-4 h-4" />, label: 'Experience', value: `${singleJob?.experience} years` },
        { icon: <IndianRupee className="w-4 h-4" />, label: 'Salary', value: `${singleJob?.salary} LPA` },
        { icon: <Users className="w-4 h-4" />, label: 'Applicants', value: singleJob?.applications?.length },
        { icon: <Calendar className="w-4 h-4" />, label: 'Posted', value: singleJob?.createdAt?.split('T')[0] },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-background"
        >
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Link */}
                <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-violet-400 transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Jobs
                </Link>

                {/* Header Card */}
                <div className="glass rounded-xl p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold mb-3">{singleJob?.title}</h1>
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge className="bg-violet-500/10 text-violet-300 border-violet-500/20">
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20 flex items-center gap-1">
                                    <IndianRupee className="w-3 h-3" />
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`shrink-0 px-8 cursor-pointer ${isApplied
                                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                    : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/25'
                                }`}
                        >
                            {isApplied ? (
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Applied
                                </span>
                            ) : 'Apply Now'}
                        </Button>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="glass rounded-xl p-6 mb-6">
                    <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 bg-violet-500 rounded-full" />
                        Job Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-violet-500/5 border border-violet-500/5">
                                <span className="text-violet-400">{detail.icon}</span>
                                <div>
                                    <p className="text-xs text-muted-foreground">{detail.label}</p>
                                    <p className="text-sm font-medium">{detail.value || 'N/A'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="glass rounded-xl p-6 mb-6">
                    <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <span className="w-1 h-5 bg-violet-500 rounded-full" />
                        Description
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{singleJob?.description}</p>
                </div>

                {/* Requirements */}
                {singleJob?.requirements?.length > 0 && (
                    <div className="glass rounded-xl p-6">
                        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-violet-500 rounded-full" />
                            Requirements
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {singleJob.requirements.map((req, i) => (
                                <Badge key={i} className="bg-violet-500/10 text-violet-300 border-violet-500/20 text-sm py-1.5 px-3">
                                    {req}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
            <Toaster theme="dark" richColors position="bottom-right" />
        </motion.div>
    )
}

export default JobDescription
