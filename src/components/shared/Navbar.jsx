import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X, Briefcase, Building2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT, apiClient } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await apiClient.get(`${USER_API_END_POINT}/logout`);
      if (res.data.success) {
        localStorage.removeItem('token');
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Logout failed');
    }
  };

  const navLinks = user?.role === 'recruiter'
    ? [
        { to: '/admin/companies', label: 'Companies', icon: <Building2 className="w-4 h-4" /> },
        { to: '/admin/jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/jobs', label: 'Jobs' },
        { to: '/browse', label: 'Browse' },
      ];

  return (
    <nav className="sticky top-0 z-50 glass-strong">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <Briefcase className="w-6 h-6 text-violet-400" />
          <h1 className="text-xl font-bold tracking-tight">
            Job<span className="gradient-text">Portal</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground hover:text-violet-400 transition-colors duration-200 flex items-center gap-1.5"
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="cursor-pointer text-sm border border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-300">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="cursor-pointer text-sm bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/25">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative cursor-pointer rounded-full ring-2 ring-violet-500/30 hover:ring-violet-500/60 transition-all duration-300">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={user?.profile?.profilePhoto || '/user.png'} alt={user?.fullname} />
                  </Avatar>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0d1117]" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 glass-strong rounded-xl p-4 border-violet-500/10" sideOffset={8}>
                <div className="flex items-center gap-3 pb-3 border-b border-violet-500/10">
                  <Avatar className="w-10 h-10 ring-2 ring-violet-500/20">
                    <AvatarImage src={user?.profile?.profilePhoto || '/user.png'} alt={user?.fullname} />
                  </Avatar>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm truncate">{user?.fullname}</h4>
                    <p className="text-xs text-muted-foreground truncate">{user?.profile?.bio || user?.email}</p>
                  </div>
                </div>
                <div className="flex flex-col mt-3 gap-1">
                  {user?.role === 'student' && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-violet-300 hover:bg-violet-500/10 transition-colors"
                    >
                      <User2 className="w-4 h-4" />
                      View Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-violet-400 transition-colors cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden glass-strong border-t border-violet-500/10"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-violet-300 hover:bg-violet-500/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {!user ? (
                <div className="flex gap-3 pt-3 border-t border-violet-500/10">
                  <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full border border-violet-500/20 cursor-pointer">Login</Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-violet-600 hover:bg-violet-500 text-white cursor-pointer">Sign Up</Button>
                  </Link>
                </div>
              ) : (
                <div className="pt-3 border-t border-violet-500/10 space-y-1">
                  {user?.role === 'student' && (
                    <Link to="/profile" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-violet-500/10">
                      View Profile
                    </Link>
                  )}
                  <button onClick={() => { logoutHandler(); setMobileOpen(false); }} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 cursor-pointer">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;