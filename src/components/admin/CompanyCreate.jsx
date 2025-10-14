import React, { use, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const [companyName, setCompanyName] = useState();
    const registerNewCompany = async() => {
        try{
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if(res?.data?.success){
                dispath(setSingleCompany(res?.data?.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What could you like to name your company?</p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type='text'
                    className='my-2'
                    placeholder="Create your company name"
                    onChange={(e)=>setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button onClick={registerNewCompany}>Continue</Button>
                    <Button onClick={() => navigate('/admin/companies')} variant="outline">Cancel</Button>

                </div>
            </div>
        </div>
    )
}

export default CompanyCreate