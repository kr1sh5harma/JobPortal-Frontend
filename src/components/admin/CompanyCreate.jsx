import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT, apiClient } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [companyName, setCompanyName] = useState('')

    const registerNewCompany = async () => {
        try {
            const res = await apiClient.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
            })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                navigate(`/admin/companies/${res.data.company._id}`)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Failed to create company')
        }
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button onClick={() => navigate('/admin/companies')} className="cursor-pointer inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-violet-400 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Companies
                </button>

                <div className="glass rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-violet-400" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl">Register Company</h1>
                            <p className="text-sm text-muted-foreground">What would you like to name your company?</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label className="text-sm font-medium mb-1.5 block">Company Name</Label>
                            <Input
                                type="text"
                                placeholder="e.g. Google, Microsoft"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="bg-muted/50 border-violet-500/10 focus:border-violet-500/30 h-11"
                            />
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <Button
                                onClick={registerNewCompany}
                                className="cursor-pointer bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/25"
                            >
                                Continue
                            </Button>
                            <Button
                                onClick={() => navigate('/admin/companies')}
                                variant="ghost"
                                className="cursor-pointer border border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster theme="dark" richColors position="bottom-right" />
        </motion.div>
    )
}

export default CompanyCreate