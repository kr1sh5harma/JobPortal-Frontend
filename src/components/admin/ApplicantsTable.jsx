import React from 'react'
import { MoreHorizontal, FileText, ExternalLink } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT, apiClient } from '@/utils/constant'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const shortListingStatus = ['accepted', 'rejected']

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application)

  const statusHandler = async (status, id) => {
    try {
      const res = await apiClient.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status })
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update status')
    }
  }

  if (!applicants?.applications || applicants.applications.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">👤</span>
        </div>
        <p className="text-sm text-muted-foreground">No applicants yet</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-violet-500/10">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resume</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants.applications.map((item) => (
            <tr key={item._id} className="border-b border-violet-500/5 hover:bg-violet-500/5 transition-colors">
              <td className="py-3 px-4 font-medium">{item?.applicant?.fullname}</td>
              <td className="py-3 px-4 text-muted-foreground">{item?.applicant?.email}</td>
              <td className="py-3 px-4 text-muted-foreground">{item?.applicant?.phoneNumber}</td>
              <td className="py-3 px-4">
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {item.applicant.profile.resumeOriginalName || 'Resume'}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-muted-foreground">N/A</span>
                )}
              </td>
              <td className="py-3 px-4 text-muted-foreground">{item?.applicant?.createdAt?.split('T')[0]}</td>
              <td className="py-3 px-4 text-right">
                <Popover>
                  <PopoverTrigger className="cursor-pointer p-1.5 rounded-lg hover:bg-violet-500/10 transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 glass-strong border-violet-500/10 rounded-xl p-2">
                    {shortListingStatus.map((status) => (
                      <button
                        key={status}
                        onClick={() => statusHandler(status, item._id)}
                        className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm capitalize transition-colors cursor-pointer ${status === 'accepted'
                            ? 'text-emerald-400 hover:bg-emerald-500/10'
                            : 'text-red-400 hover:bg-red-500/10'
                          }`}
                      >
                        {status}
                      </button>
                    ))}
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

export default ApplicantsTable