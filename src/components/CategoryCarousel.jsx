import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'
import {
    Code2, Server, Database, Cloud, Palette, BarChart3, Shield, Smartphone
} from 'lucide-react'

const categories = [
    { name: 'Frontend Developer', icon: <Code2 className="w-5 h-5" /> },
    { name: 'Backend Developer', icon: <Server className="w-5 h-5" /> },
    { name: 'Data Scientist', icon: <Database className="w-5 h-5" /> },
    { name: 'DevOps Engineer', icon: <Cloud className="w-5 h-5" /> },
    { name: 'UI/UX Designer', icon: <Palette className="w-5 h-5" /> },
    { name: 'Data Analyst', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Cybersecurity', icon: <Shield className="w-5 h-5" /> },
    { name: 'Mobile Developer', icon: <Smartphone className="w-5 h-5" /> },
]

const CategoryCarousel = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCategoryClick = (cat) => {
        dispatch(setSearchedQuery(cat))
        navigate('/browse')
    }

    return (
        <section className="py-16 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold">
                        Explore by <span className="gradient-text">Category</span>
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">Find jobs that match your expertise</p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {categories.map((cat, i) => (
                        <motion.button
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            whileHover={{ y: -4 }}
                            onClick={() => handleCategoryClick(cat.name)}
                            className="group cursor-pointer flex flex-col items-center gap-3 p-5 rounded-xl glass hover:border-violet-500/30 hover:glow-violet-sm transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 group-hover:text-violet-300 transition-colors duration-300">
                                {cat.icon}
                            </div>
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                {cat.name}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CategoryCarousel