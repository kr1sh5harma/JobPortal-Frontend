import React, { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { Mail, Phone, Pen, FileText, ExternalLink } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'
import Footer from './Footer'
import { Toaster } from 'sonner'

const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth || {})

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-background"
        >
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Card */}
                <div className="glass rounded-xl p-6 sm:p-8 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20 ring-2 ring-violet-500/20">
                                <AvatarImage src={user?.profile?.profilePhoto || '/user.png'} />
                            </Avatar>
                            <div>
                                <h1 className="font-bold text-xl">{user?.fullname}</h1>
                                <p className="text-sm text-muted-foreground mt-0.5">{user?.profile?.bio || 'No bio added yet'}</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setOpen(true)}
                            variant="ghost"
                            className="cursor-pointer border border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300 shrink-0"
                        >
                            <Pen className="w-4 h-4 mr-1.5" />
                            Edit
                        </Button>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-violet-500/5 border border-violet-500/5">
                            <Mail className="w-4 h-4 text-violet-400" />
                            <span className="text-sm">{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-violet-500/5 border border-violet-500/5">
                            <Phone className="w-4 h-4 text-violet-400" />
                            <span className="text-sm">{user?.phoneNumber || 'Not added'}</span>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-6">
                        <h2 className="font-semibold text-sm text-muted-foreground mb-3">Skills</h2>
                        <div className="flex flex-wrap items-center gap-2">
                            {user?.profile?.skills?.length > 0 ? (
                                user.profile.skills.map((skill, i) => (
                                    <Badge key={i} className="bg-violet-500/10 text-violet-300 border-violet-500/20 text-xs">
                                        {skill}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-sm text-muted-foreground">No skills added</span>
                            )}
                        </div>
                    </div>

                    {/* Resume */}
                    <div className="mt-6">
                        <h2 className="font-semibold text-sm text-muted-foreground mb-2">Resume</h2>
                        {user?.profile?.resume ? (
                            <a
                                href={user.profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm hover:bg-violet-500/20 transition-all"
                            >
                                <FileText className="w-4 h-4" />
                                {user.profile.resumeOriginalName || 'View Resume'}
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        ) : (
                            <span className="text-sm text-muted-foreground">No resume uploaded</span>
                        )}
                    </div>
                </div>

                {/* Applied Jobs */}
                <div className="glass rounded-xl p-6 sm:p-8">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 bg-violet-500 rounded-full" />
                        Applied Jobs
                    </h2>
                    <AppliedJobTable />
                </div>
            </div>
            <Footer />
            <UpdateProfileDialog open={open} setOpen={setOpen} />
            <Toaster theme="dark" richColors position="bottom-right" />
        </motion.div>
    )
}

export default Profile