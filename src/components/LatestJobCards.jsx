import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import { MapPin, Clock, IndianRupee } from 'lucide-react'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group cursor-pointer p-5 rounded-xl glass hover:border-violet-500/30 transition-all duration-300 hover:glow-violet-sm"
    >
      {/* Company Row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 overflow-hidden">
          {job?.company?.logo ? (
            <img src={job.company.logo} alt={job.company.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span className="text-violet-400 font-bold text-sm">
              {job?.company?.name?.charAt(0) || 'C'}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm text-foreground truncate">{job?.company?.name}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {job?.location || 'India'}
          </p>
        </div>
      </div>

      {/* Job Title */}
      <h2 className="font-bold text-lg text-foreground group-hover:text-violet-300 transition-colors mb-2">
        {job?.title}
      </h2>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job?.description}</p>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
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
    </div>
  )
}

export default LatestJobCards