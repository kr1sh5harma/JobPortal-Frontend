import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, Briefcase, ArrowRight, Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '', email: '', phoneNumber: '', password: '', role: '', file: ''
    })
    const { loading, user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullname', input.fullname)
        formData.append('email', input.email)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('password', input.password)
        formData.append('role', input.role)
        if (input.file) formData.append('file', input.file)

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            })
            if (res?.data?.success) {
                toast.success(res.data.message || 'Signup successful!')
                navigate('/login')
            } else {
                toast.error(res?.data?.message || 'Signup failed!')
            }
        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message || 'Something went wrong')
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        if (user) navigate('/')
    }, [])

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
            <Navbar />
            <div className="flex min-h-[calc(100vh-4rem)]">
                {/* Left Panel */}
                <div className="hidden lg:flex flex-1 gradient-bg mesh-bg items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-800/15 rounded-full blur-[140px]" />
                    <div className="relative text-center max-w-md">
                        <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="w-8 h-8 text-violet-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">
                            Start Your <span className="gradient-text">Journey</span>
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Join thousands of professionals who found their dream job through JobPortal.
                            Create your account and get started today.
                        </p>
                    </div>
                </div>

                {/* Right Panel — Form */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
                    <div className="w-full max-w-md">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold mb-2">Create Account</h1>
                            <p className="text-sm text-muted-foreground">Fill in your details to get started</p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium mb-1.5 block">Full Name</Label>
                                <Input
                                    type="text" name="fullname" value={input.fullname} onChange={changeEventHandler}
                                    placeholder="John Doe"
                                    className="bg-muted/50 border-violet-500/10 focus:border-violet-500/30 h-11"
                                />
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-1.5 block">Email</Label>
                                <Input
                                    type="email" name="email" value={input.email} onChange={changeEventHandler}
                                    placeholder="you@example.com"
                                    className="bg-muted/50 border-violet-500/10 focus:border-violet-500/30 h-11"
                                />
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-1.5 block">Phone Number</Label>
                                <Input
                                    type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler}
                                    placeholder="+91 9876543210"
                                    className="bg-muted/50 border-violet-500/10 focus:border-violet-500/30 h-11"
                                />
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-1.5 block">Password</Label>
                                <Input
                                    type="password" name="password" value={input.password} onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className="bg-muted/50 border-violet-500/10 focus:border-violet-500/30 h-11"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <Label className="text-sm font-medium mb-3 block">I am a</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['student', 'recruiter'].map((role) => (
                                        <label
                                            key={role}
                                            className={`cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${input.role === role
                                                    ? 'border-violet-500 bg-violet-500/10 text-violet-300'
                                                    : 'border-violet-500/10 bg-muted/30 text-muted-foreground hover:bg-violet-500/5'
                                                }`}
                                        >
                                            <input
                                                type="radio" name="role" value={role}
                                                checked={input.role === role} onChange={changeEventHandler}
                                                className="sr-only"
                                            />
                                            {role === 'student' ? '🎓 Job Seeker' : '💼 Recruiter'}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Profile Photo */}
                            <div>
                                <Label className="text-sm font-medium mb-1.5 block">Profile Photo</Label>
                                <label className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl border border-violet-500/10 bg-muted/30 hover:bg-violet-500/5 transition-all">
                                    <Upload className="w-4 h-4 text-violet-400 shrink-0" />
                                    <span className="text-sm text-muted-foreground truncate">
                                        {input.file ? input.file.name : 'Choose a file...'}
                                    </span>
                                    <input
                                        type="file" accept="image/*" onChange={changeFileHandler}
                                        className="sr-only"
                                    />
                                </label>
                            </div>

                            <Button
                                type="submit" disabled={loading}
                                className="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-600/25 cursor-pointer"
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait</>
                                ) : (
                                    <>Create Account <ArrowRight className="w-4 h-4 ml-1" /></>
                                )}
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Toaster theme="dark" richColors position="bottom-right" />
        </motion.div>
    )
}

export default Signup