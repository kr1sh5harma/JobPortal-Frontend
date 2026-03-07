import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { JOB_API_END_POINT, apiClient } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, ArrowLeft, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'

const PostJob = () => {
    const [input, setInput] = useState({
        title: '', description: '', requirements: '', salary: '',
        location: '', jobType: '', experience: '', position: 0, companyId: '',
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { companies } = useSelector(store => store.company)

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const selectChangeHandler = (value) => {
        const selected = companies.find((c) => c.name.toLowerCase() === value)
        setInput({ ...input, companyId: selected._id })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await apiClient.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/jobs')
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Failed to post job')
        } finally {
            setLoading(false)
        }
    }

    const fields = [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'requirements', label: 'Requirements', type: 'text', placeholder: 'React, Node, MongoDB...' },
        { name: 'salary', label: 'Salary (LPA)', type: 'text' },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'jobType', label: 'Job Type', type: 'text', placeholder: 'Full-time, Part-time...' },
        { name: 'experience', label: 'Experience (yrs)', type: 'text' },
        { name: 'position', label: 'No. of Positions', type: 'number' },
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button onClick={() => navigate('/admin/jobs')} className="cursor-pointer inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-violet-400 transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Jobs
                </button>

                <div className="glass rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-violet-400" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl">Post a New Job</h1>
                            <p className="text-sm text-muted-foreground">Fill in the details to create a job listing</p>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {fields.map((field) => (
                                <div key={field.name}>
                                    <Label className="text-sm font-medium mb-1.5 block">{field.label}</Label>
                                    <Input
                                        type={field.type}
                                        name={field.name}
                                        value={input[field.name]}
                                        onChange={changeEventHandler}
                                        placeholder={field.placeholder}
                                        className="bg-muted/50 border-violet-500/10 focus:border-violet-500/30 h-10"
                                    />
                                </div>
                            ))}
                        </div>

                        {companies?.length > 0 && (
                            <div>
                                <Label className="text-sm font-medium mb-1.5 block">Select Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="bg-muted/50 border-violet-500/10 focus:border-violet-500/30 h-10">
                                        <SelectValue placeholder="Choose a company" />
                                    </SelectTrigger>
                                    <SelectContent className="glass-strong border-violet-500/10">
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-600/25 cursor-pointer mt-2"
                        >
                            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Posting...</> : 'Post Job'}
                        </Button>

                        {companies?.length === 0 && (
                            <p className="text-xs text-red-400 font-medium text-center mt-3">
                                * Please register a company first before posting a job
                            </p>
                        )}
                    </form>
                </div>
            </div>
            <Toaster theme="dark" richColors position="bottom-right" />
        </motion.div>
    )
}

export default PostJob