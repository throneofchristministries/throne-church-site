"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "next-sanity"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Calendar,
  PlayCircle,
  Search,
  Moon,
  Sun,
  ArrowLeft,
  Share2,
  Filter,
} from "lucide-react"
import Link from "next/link"

// SANITY CLIENT
const client = createClient({
  projectId: "lhudqnko",
  dataset: "production",
  apiVersion: "2026-03-11",
  useCdn: false,
})

// YOUTUBE HELPER
const getEmbedUrl = (url: string) => {
  if (!url) return ""

  let videoId = ""

  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0]
  } else if (url.includes("v=")) {
    videoId = url.split("v=")[1]?.split("&")[0]
  } else {
    videoId = url
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}`
}

export default function SermonsPage() {
  const [sermons, setSermons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const query = `*[_type == "sermon"] | order(date desc){
          title,
          preacher,
          date,
          videoUrl
        }`

        const allSermons = await client.fetch(query)
        setSermons(allSermons)
      } catch (err) {
        console.error("Sanity Fetch Error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSermons()
  }, [])

  const filteredSermons = sermons.filter(
    (s) =>
      s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.preacher?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const featuredSermon = sermons[0]

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-blue-600 font-bold animate-pulse text-lg">
          Preparing the Word...
        </p>
      </div>
    )

  return (
    <div
      className={`${
        darkMode
          ? "dark bg-gray-900 text-slate-100"
          : "bg-slate-50 text-slate-900"
      } transition-colors duration-500 font-sans min-h-screen pb-20`}
    >
      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:rotate-12 transition-transform">
              <ArrowLeft size={20} />
            </div>
            <span className="font-bold text-lg hidden sm:block">
              Back to Home
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Find a sermon..."
                className="pl-10 pr-4 py-2 rounded-full border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="text-yellow-400" />
              ) : (
                <Moon className="text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* FEATURED SERMON */}

      {!searchTerm && featuredSermon && (
        <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10" />

          <div className="absolute inset-0 scale-110 blur-sm opacity-50">
            <iframe
              src={`${getEmbedUrl(featuredSermon.videoUrl)}?autoplay=1&mute=1&controls=0&loop=1`}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-20 text-center px-6 max-w-4xl"
          >
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
              Featured Message
            </span>

            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
              {featuredSermon.title}
            </h1>

            <div className="flex items-center justify-center gap-6 text-slate-200 mb-8 font-medium">
              <span className="flex items-center gap-2">
                <User size={20} className="text-blue-400" />
                {featuredSermon.preacher}
              </span>

              <span className="flex items-center gap-2">
                <Calendar size={20} className="text-blue-400" />
                {new Date(featuredSermon.date).toLocaleDateString()}
              </span>
            </div>

            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto hover:scale-105 transition shadow-2xl">
              <PlayCircle size={24} />
              Start Watching
            </button>
          </motion.div>
        </section>
      )}

      {/* SERMON GRID */}

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12 border-b border-slate-200 dark:border-gray-800 pb-8">
          <div>
            <h2 className="text-3xl font-extrabold flex items-center gap-3">
              <Filter className="text-blue-600" />
              {searchTerm
                ? `Results for "${searchTerm}"`
                : "Sermon Archive"}
            </h2>

            <p className="text-slate-500 mt-2">
              {filteredSermons.length} messages found
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredSermons.map((sermon, idx) => (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-gray-700"
              >
                <div className="relative aspect-video overflow-hidden">
                  <iframe
                    src={getEmbedUrl(sermon.videoUrl)}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                  />

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white/90 backdrop-blur rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-black text-xl mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {sermon.title}
                  </h3>

                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium mb-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <span>{sermon.preacher}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center">
                      <Calendar size={14} className="text-blue-600" />
                    </div>

                    {new Date(sermon.date).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredSermons.length === 0 && (
          <div className="text-center py-20 bg-slate-100 dark:bg-gray-800 rounded-[3rem]">
            <Search size={60} className="mx-auto text-slate-300 mb-6" />
            <h3 className="text-2xl font-bold">No results found</h3>
            <p className="text-slate-500 mt-2">
              Try adjusting your search terms.
            </p>
          </div>
        )}
      </section>

      {/* FOOTER */}

      <footer className="text-center py-10 text-slate-400 text-sm border-t border-slate-200 dark:border-gray-800 mx-6">
        <p>
          © {new Date().getFullYear()} Throne of Christ Ministries. All
          sermons recorded live in Accra.
        </p>
      </footer>
    </div>
  )
}