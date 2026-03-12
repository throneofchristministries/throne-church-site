"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "next-sanity"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Clock, Search, Moon, Sun, ArrowLeft, Bell, Share2 } from "lucide-react"
import Link from 'next/link';

// SANITY CLIENT
const client = createClient({
  projectId: "lhudqnko",
  dataset: "production",
  apiVersion: "2026-03-11",
  useCdn: false,
})

// FORMAT DATE UTILITY
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { 
    weekday: 'long', 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  })

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetching events and sorting by date
        const query = `*[_type == "event"] | order(date asc){title, date, location, description, time}`
        const allEvents = await client.fetch(query)
        setEvents(allEvents)
      } catch (err) {
        console.error("Sanity Fetch Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const filteredEvents = events.filter(
    (e) =>
      e.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-blue-600 font-bold animate-pulse text-lg">Loading Calendar...</p>
    </div>
  )

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-slate-100" : "bg-slate-50 text-slate-900"} transition-colors duration-500 font-sans min-h-screen pb-20`}>
      
      {/* NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:rotate-12 transition-transform">
              <ArrowLeft size={20} />
            </div>
            <span className="font-bold text-lg hidden sm:block">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-slate-600" />}
            </button>
          </div>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <header className="py-24 text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10 dark:opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent blur-3xl"></div>
        </div>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Bell size={16} className="animate-bounce" /> Throne of Christ Calendar
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Upcoming <span className="text-blue-700 dark:text-blue-400">Events.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Join us as we gather for worship, fellowship, and special programs. Save the dates and be part of our community.
          </p>

          <div className="mt-10 relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search events or locations..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>
      </header>
      {/* EVENT CATEGORIES */}

<div className="flex justify-center gap-4 mt-8 flex-wrap">

<button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold">
All
</button>

<button className="px-4 py-2 rounded-full bg-slate-200 dark:bg-gray-700 text-sm">
Services
</button>

<button className="px-4 py-2 rounded-full bg-slate-200 dark:bg-gray-700 text-sm">
Conferences
</button>

<button className="px-4 py-2 rounded-full bg-slate-200 dark:bg-gray-700 text-sm">
Youth
</button>

</div>
      {/* FEATURED EVENT */}

<section className="max-w-7xl mx-auto px-6 mb-20">

{events[0] && (

<div className="bg-blue-600 text-white rounded-[3rem] p-10 shadow-xl">

<h2 className="text-3xl font-black mb-4">
Next Big Event
</h2>

<h3 className="text-4xl font-bold mb-4">
{events[0].title}
</h3>

<p className="mb-6 opacity-90">
{events[0].description || "Join us for this powerful gathering."}
</p>

<div className="flex flex-wrap gap-6 text-sm font-medium">

<span className="flex items-center gap-2">
<Calendar size={16}/> {formatDate(events[0].date)}
</span>

<span className="flex items-center gap-2">
<MapPin size={16}/> {events[0].location}
</span>

<span className="flex items-center gap-2">
<Clock size={16}/> {events[0].time || "TBA"}
</span>

</div>

</div>

)}

</section>

      {/* EVENTS GRID */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredEvents.map((event, idx) => (
              <motion.div 
                key={idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 dark:border-gray-700"
              >
                {/* Status Badge */}
                <div className="absolute top-6 right-8">
                   <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold uppercase tracking-widest">
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                     Upcoming
                   </div>
                </div>

                <div className="mb-6 w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Calendar size={28} />
                </div>

                <h3 className="text-2xl font-black mb-4 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <Clock size={18} className="text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">{event.time || "TBA"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <Calendar size={18} className="text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <MapPin size={18} className="text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 line-clamp-3">
                  {event.description || "Join us for this special gathering as we grow together in Christ."}
                </p>

               <div className="flex items-center justify-between border-t border-slate-100 dark:border-gray-700 pt-6">

<button className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
Register
</button>

<div className="flex gap-3">

<button className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-full transition">
<Share2 size={18}/>
</button>

<button className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-full transition">
<Bell size={18}/>
</button>

</div>

</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-32">
            <div className="w-20 h-20 bg-slate-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No matching events</h3>
            <p className="text-slate-500">Try searching for a different month or location.</p>
          </div>
        )}
      </section>
      {/* PAST EVENTS */}

<section className="max-w-7xl mx-auto px-6 mt-24">

<h2 className="text-3xl font-bold mb-10 text-center">
Past Events
</h2>

<div className="text-center text-slate-500">
<p>Previous events will appear here.</p>
</div>

</section>
      {/* CALENDAR VIEW */}

<section className="max-w-7xl mx-auto px-6 mt-24 text-center">

<h2 className="text-3xl font-black mb-10">
Event Calendar
</h2>

<div className="bg-white dark:bg-gray-800 p-10 rounded-[2rem] shadow">

<p className="text-slate-500">
Full monthly calendar coming soon.
</p>

</div>

</section>
{/* EVENT NEWSLETTER */}

<section className="max-w-4xl mx-auto px-6 mt-24 text-center">

<h2 className="text-3xl font-bold mb-6">
Never Miss an Event
</h2>

<p className="text-slate-500 dark:text-slate-400 mb-6">
Subscribe to receive event updates and ministry announcements.
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

      {/* FOOTER */}
      <footer className="mt-20 py-12 text-center text-slate-400 border-t border-slate-200 dark:border-gray-800 mx-6">
        <p>© {new Date().getFullYear()} Throne of Christ Ministries. All dates are in Ghana GMT.</p>
      </footer>
    </div>
  )
}
