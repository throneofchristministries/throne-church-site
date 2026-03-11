"use client"
import React, { useState } from "react"
import { Church, Sun, Moon } from "lucide-react"
import { Link as ScrollLink } from "react-scroll"

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b p-6 flex justify-between items-center max-w-7xl mx-auto">
      
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-xl text-blue-700 dark:text-blue-400">
        <Church size={30}/> Throne of Christ Ministries
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 font-medium">
        <ScrollLink to="about" smooth duration={500} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition">About</ScrollLink>
        <ScrollLink to="sermons" smooth duration={500} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition">Sermons</ScrollLink>
        <ScrollLink to="events" smooth duration={500} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition">Events</ScrollLink>
        <ScrollLink to="contact" smooth duration={500} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition">Contact</ScrollLink>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex gap-4 items-center">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
          {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border-t md:hidden flex flex-col items-center gap-4 py-4">
          <ScrollLink to="about" smooth duration={500} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition" onClick={()=>setIsOpen(false)}>About</ScrollLink>
          <ScrollLink to="sermons" smooth duration={500} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition" onClick={()=>setIsOpen(false)}>Sermons</ScrollLink>
          <ScrollLink to="events" smooth duration={500} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition" onClick={()=>setIsOpen(false)}>Events</ScrollLink>
          <ScrollLink to="contact" smooth duration={500} className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition" onClick={()=>setIsOpen(false)}>Contact</ScrollLink>
        </div>
      )}
    </nav>
  )
}