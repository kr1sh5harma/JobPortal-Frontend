import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany, setFilterCompany] = useState(companies)
    const navigate = useNavigate()

    useEffect(() => {
        const filtered = companies?.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) return true
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filtered)
    }, [companies, searchCompanyByText])

    if (!filterCompany || filterCompany.length === 0) {
        return (
            <div className="text-center py-10">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🏢</span>
                </div>
                <p className="text-sm text-muted-foreground">No companies registered yet</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-violet-500/10">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Logo</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filterCompany.map((company) => (
                        <tr key={company._id} className="border-b border-violet-500/5 hover:bg-violet-500/5 transition-colors">
                            <td className="py-3 px-4">
                                <Avatar className="w-9 h-9 ring-1 ring-violet-500/10">
                                    <AvatarImage src={company.logo} />
                                </Avatar>
                            </td>
                            <td className="py-3 px-4 font-medium">{company.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{company.createdAt?.split('T')[0]}</td>
                            <td className="py-3 px-4 text-right">
                                <Popover>
                                    <PopoverTrigger className="cursor-pointer p-1.5 rounded-lg hover:bg-violet-500/10 transition-colors">
                                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 glass-strong border-violet-500/10 rounded-xl p-2">
                                        <button
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-violet-300 hover:bg-violet-500/10 transition-colors cursor-pointer"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                            Edit
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CompaniesTable