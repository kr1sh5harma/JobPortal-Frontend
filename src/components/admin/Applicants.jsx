import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT, apiClient } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { Toaster } from 'sonner'

const Applicants = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { applicants } = useSelector(store => store.application)

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await apiClient.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`)
        dispatch(setAllApplicants(res.data.job))
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllApplicants()
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-violet-400" />
            Applicants
            <span className="text-lg font-normal text-muted-foreground">
              ({applicants?.applications?.length || 0})
            </span>
          </h1>
        </div>
        <div className="glass rounded-xl p-5">
          <ApplicantsTable />
        </div>
      </div>
      <Toaster theme="dark" richColors position="bottom-right" />
    </motion.div>
  )
}

export default Applicants