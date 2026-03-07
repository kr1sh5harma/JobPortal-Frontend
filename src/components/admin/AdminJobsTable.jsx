import React, { useEffect, useState } from 'react'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()

    useEffect(() => {
        const filtered = allAdminJobs?.filter((job) => {
            if (!searchJobByText) return true
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            )
        })
        setFilterJobs(filtered)
    }, [allAdminJobs, searchJobByText])

    if (!filterJobs || filterJobs.length === 0) {
        return (
            <div className="text-center py-10">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💼</span>
                </div>
                <p className="text-sm text-muted-foreground">No jobs posted yet</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-violet-500/10">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterJobs.map((job) => (
                        <tr key={job._id} className="border-b border-violet-500/5 hover:bg-violet-500/5 transition-colors">
                            <td className="py-3 px-4 font-medium">{job?.company?.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{job?.title}</td>
                            <td className="py-3 px-4 text-muted-foreground">{job?.createdAt?.split('T')[0]}</td>
                            <td className="py-3 px-4 text-right">
                                <Popover>
                                    <PopoverTrigger className="cursor-pointer p-1.5 rounded-lg hover:bg-violet-500/10 transition-colors">
                                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 glass-strong border-violet-500/10 rounded-xl p-2">
                                        <button
                                            onClick={() => navigate(`/admin/companies/${job._id}`)}
                                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-violet-300 hover:bg-violet-500/10 transition-colors cursor-pointer"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-violet-300 hover:bg-violet-500/10 transition-colors cursor-pointer"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            Applicants
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminJobsTable