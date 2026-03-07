import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { SlidersHorizontal } from 'lucide-react'

const filterData = [
    {
        type: 'Location',
        options: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Chennai', 'Mumbai'],
    },
    {
        type: 'Industry',
        options: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer'],
    },
    {
        type: 'Salary',
        options: ['0-5 LPA', '5-10 LPA', '10-15 LPA', '15-20 LPA', '20+ LPA'],
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('')
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <div className="glass rounded-xl p-5 sticky top-20">
            <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="w-4 h-4 text-violet-400" />
                <h2 className="font-bold text-base">Filter Jobs</h2>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-violet-500/30 to-transparent mb-5" />

            {filterData.map((section) => (
                <div key={section.type} className="mb-5 last:mb-0">
                    <h3 className="font-semibold text-sm text-violet-300 mb-3">{section.type}</h3>
                    <div className="space-y-2">
                        {section.options.map((option) => {
                            const isSelected = selectedValue === option
                            return (
                                <label
                                    key={option}
                                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm transition-all duration-200 ${isSelected
                                            ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20'
                                            : 'text-muted-foreground hover:bg-violet-500/5 hover:text-foreground border border-transparent'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="filter"
                                        value={option}
                                        checked={isSelected}
                                        onChange={() => changeHandler(option)}
                                        className="accent-violet-500 w-3.5 h-3.5"
                                    />
                                    {option}
                                </label>
                            )
                        })}
                    </div>
                </div>
            ))}

            {selectedValue && (
                <button
                    onClick={() => { setSelectedValue(''); dispatch(setSearchedQuery('')) }}
                    className="cursor-pointer w-full mt-4 py-2 px-3 text-sm text-muted-foreground hover:text-red-400 border border-violet-500/10 rounded-lg hover:bg-red-500/5 transition-all"
                >
                    Clear Filter
                </button>
            )}
        </div>
    )
}

export default FilterCard