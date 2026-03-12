"use client"
import React, { useState } from "react"
import { Sun, Moon, Menu, X } from "lucide-react" // Added Menu and X icons for better look
import { Link as ScrollLink } from "react-scroll"
import Image from "next/image"

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b p-4 md:p-6 flex justify-between items-center w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        
        {/* Logo and Name */}
        <div className="flex items-center gap-3 font-bold text-lg md:text-xl text-blue-700 dark:text-blue-400">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={40} 
            height={40} 
            className="rounded-full"
          />
          <span className="leading-tight">Throne of Christ Ministries Int'l</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-medium">
          <ScrollLink to="about" smooth duration={500} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition">About</ScrollLink>
          <ScrollLink to="sermons" smooth duration={500} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition">Sermons</ScrollLink>
          <ScrollLink to="events" smooth duration={500} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition">Events</ScrollLink>
          <ScrollLink to="contact" smooth duration={500} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition">Contact</ScrollLink>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 items-center">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 bg-gray-200 dark:bg-gray-700 rounded">
            {isOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </div>

      {/* Mobile Links Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border-t md:hidden flex flex-col items-center gap-6 py-8 shadow-xl">
          <ScrollLink to="about" smooth duration={500} className="text-lg cursor-pointer" onClick={()=>setIsOpen(false)}>About</ScrollLink>
          <ScrollLink to="sermons" smooth duration={500} className="text-lg cursor-pointer" onClick={()=>setIsOpen(false)}>Sermons</ScrollLink>
          <ScrollLink to="events" smooth duration={500} className="text-lg cursor-pointer" onClick={()=>setIsOpen(false)}>Events</ScrollLink>
          <ScrollLink to="contact" smooth duration={500} className="text-lg cursor-pointer" onClick={()=>setIsOpen(false)}>Contact</ScrollLink>
        </div>
      )}
    </nav>
  )
}
