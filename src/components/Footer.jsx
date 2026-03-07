import React from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Github, Linkedin, Twitter, Heart, Target, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative border-t border-violet-500/10 bg-[#06080f]">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Briefcase className="w-6 h-6 text-violet-400" />
              <h2 className="text-xl font-bold">Job<span className="gradient-text">Portal</span></h2>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              India's #1 job hunt platform connecting exceptional talent with top companies.
              Search, apply, and land your dream job today.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: <Github className="w-4 h-4" />, href: 'https://github.com/kr1sh5harma' },
                { icon: <Linkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/harsh-sharma-26b151306/' },
                { icon: <Mail className="w-4 h-4" />, href: 'https://mail.google.com/mail/u/0/?fs=1&to=krish9515274@gmail.com&tf=cm' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-violet-400 hover:border-violet-500/30 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">For Job Seekers</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Browse Jobs', to: '/jobs' },
                { label: 'Companies', to: '/browse' },
                { label: 'My Profile', to: '/profile' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-violet-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recruiter Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">For Recruiters</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Post a Job', to: '/admin/jobs/create' },
                { label: 'Manage Companies', to: '/admin/companies' },
                { label: 'View Applicants', to: '/admin/jobs' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-violet-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-violet-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
