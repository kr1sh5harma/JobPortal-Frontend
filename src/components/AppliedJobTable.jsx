import React from 'react'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job)

    const statusColors = {
        rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
        pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        accepted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    }

    if (!allAppliedJobs || allAppliedJobs.length === 0) {
        return (
            <div className="text-center py-10">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📋</span>
                </div>
                <p className="text-sm text-muted-foreground">You haven't applied to any jobs yet</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-violet-500/10">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Job Role</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allAppliedJobs.map((app) => (
                        <tr key={app._id} className="border-b border-violet-500/5 hover:bg-violet-500/5 transition-colors">
                            <td className="py-3 px-4 text-muted-foreground">{app?.createdAt?.split('T')[0]}</td>
                            <td className="py-3 px-4 font-medium">{app.job?.title}</td>
                            <td className="py-3 px-4 text-muted-foreground">{app.job?.company?.name}</td>
                            <td className="py-3 px-4 text-right">
                                <Badge className={statusColors[app?.status] || statusColors.pending}>
                                    {app.status?.toUpperCase()}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AppliedJobTable