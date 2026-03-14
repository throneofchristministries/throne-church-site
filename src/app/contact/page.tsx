"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, MapPin, Send, Sun, Moon, ArrowLeft, Facebook, Instagram, Youtube, MessageSquare } from "lucide-react"
import Link from 'next/link';

export default function ContactPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", subject: "General Inquiry", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Integration logic here (e.g., Formspree, EmailJS, or custom API)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setFormData({ name: "", email: "", subject: "General Inquiry", message: "" })
  }

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-slate-100" : "bg-slate-50 text-slate-900"} transition-colors duration-500 font-sans min-h-screen pb-20`}>
      
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:rotate-12 transition-transform">
              <ArrowLeft size={20} />
            </div>
            <span className="font-bold text-lg hidden sm:block">Back to Home</span>
          </Link>
          
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-slate-600" />}
          </button>
        </div>
      </nav>

      {/* HERO HEADER */}
      <header className="py-24 text-center px-6 relative overflow-hidden">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <MessageSquare size={16} /> Get In Touch
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Connect With <span className="text-blue-700 dark:text-blue-400">Us.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Have a prayer request or a question about our ministry? We are here to support you in your journey of faith.
          </p>
        </motion.div>
      </header>

      {/* MAIN CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT COLUMN: CONTACT INFO & SOCIALS */}
        <div className="space-y-12">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-[2rem] border border-slate-100 dark:border-gray-700 shadow-sm">
              <Phone className="text-blue-600 mb-4" size={32} />
              <h3 className="font-bold text-xl mb-2">Call Us</h3>
              <p className="text-slate-500 dark:text-slate-400">+233 20 000 0000</p>
              <p className="text-slate-500 dark:text-slate-400">+233 55 000 0000</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-[2rem] border border-slate-100 dark:border-gray-700 shadow-sm">
              <Mail className="text-blue-600 mb-4" size={32} />
              <h3 className="font-bold text-xl mb-2">Email Us</h3>
              <p className="text-slate-500 dark:text-slate-400">info@throneofchrist.org</p>
              <p className="text-slate-500 dark:text-slate-400">prayer@throneofchrist.org</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-[2rem] border border-slate-100 dark:border-gray-700 shadow-sm sm:col-span-2">
              <MapPin className="text-blue-600 mb-4" size={32} />
              <h3 className="font-bold text-xl mb-2">Visit Us</h3>
              <p className="text-slate-500 dark:text-slate-400">Main Auditorium, East Legon, Accra, Ghana</p>
            </div>
          </div>

          <div className="p-8">
            <h3 className="font-bold text-2xl mb-6">Follow Our Ministry</h3>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition"><Facebook size={20}/></button>
              <button className="w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center hover:scale-110 transition"><Instagram size={20}/></button>
              <button className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-110 transition"><Youtube size={20}/></button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 p-10 rounded-[3rem] border border-slate-100 dark:border-gray-700 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {submitted && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }}
                  className="p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-2xl text-center font-bold"
                >
                  Message Sent Successfully! 🙏
                </motion.div>
              )}
              {/* PRAYER REQUEST BUTTON */}

<div className="mt-8 text-center">

<p className="text-slate-500 dark:text-slate-400 mb-4">
Need prayer? Our team is ready to pray for you.
</p>

<button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold transition">
Submit Prayer Request
</button>

</div>
            </AnimatePresence>

            <div>
              <label className="block text-sm font-bold mb-2 ml-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 ml-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 ml-2">Subject</label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                <option>General Inquiry</option>
                <option>Prayer Request</option>
                <option>Testimony</option>
                <option>Ministry Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 ml-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all h-32"
                placeholder="How can we help you?"
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-bold shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
              <Send size={20}/> Send Message
            </button>
          </form>
        </motion.div>
      </section>
      {/* SERVICE HOURS */}

<div className="p-8 bg-white dark:bg-gray-800 rounded-[2rem] border border-slate-100 dark:border-gray-700 shadow-sm">

<h3 className="font-bold text-xl mb-4">Service Hours</h3>

<div className="space-y-2 text-slate-500 dark:text-slate-400">
<p><strong>Sunday:</strong> 7:00 AM – 10:00 AM</p>
<p><strong>Wednesday:</strong> 6:00 PM – 8:00 PM</p>
<p><strong>All Night:</strong> 10:00 PM</p>
</div>

</div>
{/* FAQ */}

<section className="max-w-6xl mx-auto px-6 mt-24">

<h2 className="text-3xl font-bold mb-10 text-center">
Frequently Asked Questions
</h2>

<div className="space-y-6">

<div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
<h3 className="font-bold mb-2">
What time is Sunday service?
</h3>
<p className="text-slate-500 dark:text-slate-400">
Our Sunday worship service starts at 7:00 AM.
</p>
</div>

<div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
<h3 className="font-bold mb-2">
Can I submit a prayer request?
</h3>
<p className="text-slate-500 dark:text-slate-400">
Yes, use the contact form above and select Prayer Request.
</p>
</div>

</div>

</section>

      {/* MAP SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black">Our Location</h2>
          <div className="h-px bg-slate-200 dark:bg-gray-800 flex-grow mx-8 hidden sm:block"></div>
          <MapPin className="text-blue-600" />
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.509601773808!2d-0.18696418426287033!3d5.603717395800929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b6e1f2a02b3%3A0x1b75f9b5a5a70d06!2sAccra!5e0!3m2!1sen!2sgh!4v1677859254089!5m2!1sen!2sgh"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </motion.div>
      </section>
      {/* OFFICE HOURS */}

<section className="max-w-7xl mx-auto px-6 mt-24 text-center">

<h2 className="text-3xl font-bold mb-8">
Church Office Hours
</h2>

<div className="grid md:grid-cols-3 gap-8">

<div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
<h3 className="font-bold">Monday - Friday</h3>
<p>9:00 AM - 5:00 PM</p>
</div>

<div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
<h3 className="font-bold">Saturday</h3>
<p>10:00 AM - 2:00 PM</p>
</div>

<div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
<h3 className="font-bold">Sunday</h3>
<p>After Service</p>
</div>

</div>

</section>
{/* NEWSLETTER */}

<section className="max-w-4xl mx-auto px-6 mt-24 text-center">

<h2 className="text-3xl font-bold mb-6">
Stay Connected
</h2>

<p className="text-slate-500 dark:text-slate-400 mb-6">
Subscribe to receive church updates and devotionals.
</p>

<div className="flex gap-4 justify-center flex-wrap">

<input
type="email"
placeholder="Enter your email"
className="px-6 py-3 rounded-xl border"
/>

<button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
Subscribe
</button>

</div>

</section>

      <footer className="mt-24 py-12 text-center text-slate-400 border-t border-slate-200 dark:border-gray-800 mx-6">
        <p>© {new Date().getFullYear()} Throne of Christ Ministries. Built for the Kingdom.</p>
      </footer>
    </div>
  )
}
