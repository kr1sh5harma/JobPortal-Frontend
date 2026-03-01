import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT, apiClient } from '@/utils/constant'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await apiClient.get(`${COMPANY_API_END_POINT}/get/${companyId}`);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch])
}

export default useGetCompanyById