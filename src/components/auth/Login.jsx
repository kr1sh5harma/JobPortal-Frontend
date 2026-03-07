import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Briefcase, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'

const Login = () => {
    const [input, setInput] = useState({ email: '', password: '', role: '' })
    const { loading, user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            if (res.data.success) {
                localStorage.setItem('token', res.data.token)
                dispatch(setUser(res.data.user))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Login failed')
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
                            Welcome <span className="gradient-text">Back</span>
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Sign in to access your dashboard, manage job applications, and stay connected with top companies.
                        </p>
                    </div>
                </div>

                {/* Right Panel — Form */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
                    <div className="w-full max-w-md">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold mb-2">Sign In</h1>
                            <p className="text-sm text-muted-foreground">Enter your credentials to continue</p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-5">
                            <div>
                                <Label className="text-sm font-medium mb-1.5 block">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    placeholder="you@example.com"
                                    className="bg-muted/50 border-violet-500/10 focus:border-violet-500/30 h-11"
                                />
                            </div>
                            <div>
                                <Label className="text-sm font-medium mb-1.5 block">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
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
                                                type="radio"
                                                name="role"
                                                value={role}
                                                checked={input.role === role}
                                                onChange={changeEventHandler}
                                                className="sr-only"
                                            />
                                            {role === 'student' ? '🎓 Job Seeker' : '💼 Recruiter'}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-600/25 cursor-pointer"
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait</>
                                ) : (
                                    <>Sign In <ArrowRight className="w-4 h-4 ml-1" /></>
                                )}
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Toaster theme="dark" richColors position="bottom-right" />
        </motion.div>
    )
}

export default Login