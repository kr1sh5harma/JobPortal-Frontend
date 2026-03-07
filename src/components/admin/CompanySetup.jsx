import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Upload, Building2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { COMPANY_API_END_POINT, apiClient } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'

const CompanySetup = () => {
    const params = useParams()
    useGetCompanyById(params.id)
    const [input, setInput] = useState({ name: '', description: '', website: '', location: '', file: null })
    const { singleCompany } = useSelector(store => store.company)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
    const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] })

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', input.name)
        formData.append('description', input.description)
        formData.append('website', input.website)
        formData.append('location', input.location)
        if (input.file) formData.append('file', input.file)

        try {
            setLoading(true)
            const res = await apiClient.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            if (res?.data?.success) {
                toast.success(res.data.message)
                navigate('/admin/companies')
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Update failed')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || '',
            description: singleCompany?.description || '',
            website: singleCompany?.website || '',
            location: singleCompany?.location || '',
            file: null,
        })
    }, [singleCompany])

    const fields = [
        { name: 'name', label: 'Company Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'website', label: 'Website', type: 'text' },
        { name: 'location', label: 'Location', type: 'text' },
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button onClick={() => navigate('/admin/companies')} className="cursor-pointer inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-violet-400 transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Companies
                </button>

                <div className="glass rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-violet-400" />
                        </div>
                        <h1 className="font-bold text-xl">Company Setup</h1>
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
                                        className="bg-muted/50 border-violet-500/10 focus:border-violet-500/30 h-10"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <Label className="text-sm font-medium mb-1.5 block">Logo</Label>
                            <label className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl border border-violet-500/10 bg-muted/30 hover:bg-violet-500/5 transition-all">
                                <Upload className="w-4 h-4 text-violet-400 shrink-0" />
                                <span className="text-sm text-muted-foreground truncate">
                                    {input.file?.name || 'Choose a logo...'}
                                </span>
                                <input type="file" accept="image/*" onChange={changeFileHandler} className="sr-only" />
                            </label>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-lg shadow-violet-600/25 cursor-pointer mt-2"
                        >
                            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : 'Update Company'}
                        </Button>
                    </form>
                </div>
            </div>
            <Toaster theme="dark" richColors position="bottom-right" />
        </motion.div>
    )
}

export default CompanySetup