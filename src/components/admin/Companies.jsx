import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { motion } from 'framer-motion'
import { Plus, Search, Building2 } from 'lucide-react'
import { Toaster } from 'sonner'

const Companies = () => {
    useGetAllCompanies()
    const [input, setInput] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input])

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Building2 className="w-6 h-6 text-violet-400" />
                            Companies
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">Manage your registered companies</p>
                    </div>
                    <Button
                        onClick={() => navigate('/admin/companies/create')}
                        className="cursor-pointer bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/25"
                    >
                        <Plus className="w-4 h-4 mr-1.5" />
                        New Company
                    </Button>
                </div>

                <div className="glass rounded-xl p-5 mb-6">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search companies..."
                            onChange={(e) => setInput(e.target.value)}
                            className="pl-9 bg-muted/50 border-violet-500/10 focus:border-violet-500/30 h-10"
                        />
                    </div>
                </div>

                <div className="glass rounded-xl p-5">
                    <CompaniesTable />
                </div>
            </div>
            <Toaster theme="dark" richColors position="bottom-right" />
        </motion.div>
    )
}

export default Companies