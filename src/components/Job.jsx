import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Clock, IndianRupee, ArrowRight } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Job = ({ job }) => {
    const navigate = useNavigate()

    const daysAgo = (mongodbTime) => {
        const created = new Date(mongodbTime)
        const now = new Date()
        return Math.floor((now - created) / (1000 * 60 * 60 * 24))
    }

    const days = daysAgo(job?.createdAt)

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="group p-5 rounded-xl glass hover:border-violet-500/30 transition-all duration-300 hover:glow-violet-sm flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {days === 0 ? 'Today' : `${days}d ago`}
                </span>
                <button className="cursor-pointer w-8 h-8 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-violet-400 hover:border-violet-500/30 transition-colors">
                    <Bookmark className="w-4 h-4" />
                </button>
            </div>

            {/* Company */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0 overflow-hidden ring-1 ring-violet-500/10">
                    {job?.company?.logo ? (
                        <img src={job.company.logo} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-violet-400 font-bold">{job?.company?.name?.charAt(0)}</span>
                    )}
                </div>
                <div className="min-w-0">
                    <h3 className="font-semibold text-sm truncate">{job?.company?.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job?.location || 'India'}
                    </p>
                </div>
            </div>

            {/* Job Info */}
            <h2 className="font-bold text-lg group-hover:text-violet-300 transition-colors mb-1">{job?.title}</h2>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{job?.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-violet-500/10 text-violet-300 border-violet-500/20 text-xs">
                    {job?.position} Positions
                </Badge>
                <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20 text-xs">
                    {job?.jobType}
                </Badge>
                <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20 text-xs flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="ghost"
                    className="cursor-pointer flex-1 border border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300 text-sm"
                >
                    Details
                </Button>
                <Button className="cursor-pointer flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm shadow-lg shadow-violet-600/20">
                    Save <Bookmark className="w-3.5 h-3.5 ml-1" />
                </Button>
            </div>
        </motion.div>
    )
}

export default Job