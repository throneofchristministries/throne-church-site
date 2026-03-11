"use client"

import React, { useState, useEffect } from "react"
import { client } from "../sanity/lib/sanityClient" // import your configured Sanity client

import {
  Church,
  MapPin,
  Heart,
  PlayCircle,
  Calendar,
  User,
  Phone,
  Mail,
  Sun,
  Moon
} from "lucide-react"

import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

import Link from "next/link"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// TYPES
type Sermon = {
  title: string
  preacher: string
  date: string
  videoUrl?: string
}

type Event = {
  title: string
  date: string
  location: string
}

type Testimonial = {
  name: string
  message: string
}


export default function Home() {

  const [latestSermon, setLatestSermon] = useState<Sermon | null>(null)
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  const [isLive, setIsLive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [countdown, setCountdown] = useState("")


  // LIVE STATUS
  useEffect(() => {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()
    setIsLive(day === 0 && hour >= 9 && hour <= 12)
  }, [])


  // FETCH SANITY DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const latest = await client.fetch(`
          *[_type == "sermon"] | order(date desc)[0]{
            title,
            preacher,
            date,
            videoUrl
          }
        `)

        const sermonsList = await client.fetch(`
          *[_type == "sermon"] | order(date desc)[0..3]{
            title,
            preacher,
            date
          }
        `)

        const eventsList = await client.fetch(`
          *[_type == "event"] | order(date asc)[0..3]{
            title,
            date,
            location
          }
        `)

        const testimonialsList = await client.fetch(`
          *[_type == "testimonial"] | order(_createdAt desc){
            name,
            message
          }
        `)

        setLatestSermon(latest)
        setSermons(sermonsList)
        setEvents(eventsList)
        setTestimonials(testimonialsList)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  // YOUTUBE EMBED
  const getEmbedUrl = (url?: string) => {
    if (!url) return ""
    if (url.includes("watch?v=")) return `https://www.youtube.com/embed/${url.split("watch?v=")[1].split("&")[0]}`
    if (url.length === 11) return `https://www.youtube.com/embed/${url}`
    return url
  }


  // DATE FORMAT
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })


  // COUNTDOWN TIMER
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const nextSunday = new Date(now)
      const daysUntilSunday = (7 - now.getDay()) % 7
      nextSunday.setDate(now.getDate() + daysUntilSunday)
      nextSunday.setHours(9, 0, 0, 0)

      const diff = nextSunday.getTime() - now.getTime()
      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const m = Math.floor((diff / (1000 * 60)) % 60)
      const s = Math.floor((diff / 1000) % 60)

      setCountdown(`${d}d ${h}h ${m}m ${s}s`)
    }, 1000)

    return () => clearInterval(interval)
  }, [])


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-700 text-xl font-bold">
        Loading Throne of Christ Ministries...
      </div>
    )
  }


  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"} transition-colors duration-500`}>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-700 dark:text-blue-400">
          <Church size={30}/> Throne of Christ
        </div>

        <div className="hidden md:flex gap-8">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/sermons">Sermons</Link>
          <Link href="/events">Events</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          {isLive && <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm">🔴 LIVE NOW</span>}
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="py-24 text-center">
        <motion.h1 initial={{y:-40, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}} className="text-6xl font-extrabold mb-6">
          Welcome to the <span className="text-blue-700 dark:text-blue-400">Throne</span>
        </motion.h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Raising believers, transforming lives and advancing the Kingdom of God.
        </p>

        <a href="#latest-sermon" className="bg-blue-700 text-white px-10 py-4 rounded-xl font-bold inline-flex gap-2">
          <PlayCircle/> Watch Latest Sermon
        </a>

        <p className="mt-6 text-gray-500">
          Next Sunday Service: <strong>{countdown}</strong>
        </p>
      </header>
      {/* MISSION & VISION */}
<section className="py-20 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    <h2 className="text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400">
      Our Mission
    </h2>
    <p className="mb-4 text-lg leading-relaxed">
      To nurture faith, equip believers, and spread the Gospel globally
      with love, integrity, and compassion.
    </p>

    <h2 className="text-4xl font-bold mt-10 mb-6 text-blue-700 dark:text-blue-400">
      Our Vision
    </h2>
    <p className="text-lg leading-relaxed">
      A world where every person experiences God’s grace, purpose,
      and empowerment through a thriving Christian community.
    </p>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="flex justify-center"
  >
    <img
      src="/about-church.jpg"
      alt="Throne of Christ Ministries"
      className="rounded-2xl shadow-lg object-cover max-w-full"
    />
  </motion.div>
</section>
{/* HISTORY TIMELINE */}
<section className="bg-slate-50 dark:bg-gray-800 py-20">
  <h2 className="text-4xl font-bold text-center mb-16 text-blue-700 dark:text-blue-400">
    Our History
  </h2>
  <div className="max-w-5xl mx-auto relative">
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-blue-300 dark:border-blue-500"></div>

    {[
      { year: "2005", event: "Founded Throne of Christ Ministries" },
      { year: "2010", event: "Built our first church campus" },
      { year: "2015", event: "Launched community outreach programs" },
      { year: "2020", event: "Started online services" },
    ].map((item, idx) => {
      const isLeft = idx % 2 === 0;
      return (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-center w-full"
        >
          {isLeft && <div className="w-1/2 text-right pr-10 font-bold text-lg">{item.year}</div>}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg w-1/2">{item.event}</div>
          {!isLeft && <div className="w-1/2 pl-10 font-bold text-lg">{item.year}</div>}
        </motion.div>
      );
    })}
  </div>
</section>
{/* TEAM MEMBERS */}
<section className="py-20 max-w-7xl mx-auto px-6">
  <h2 className="text-4xl font-bold text-center mb-16 text-blue-700 dark:text-blue-400">
    Meet Our Team
  </h2>
  <div className="grid md:grid-cols-3 gap-10">
    {[
      { name: "Pastor John Doe", role: "Senior Pastor", photo: "/team/pastor.jpg" },
      { name: "Jane Smith", role: "Youth Minister", photo: "/team/jane.jpg" },
      { name: "Mark Johnson", role: "Music Director", photo: "/team/mark.jpg" },
    ].map((member, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: idx * 0.2 }}
        className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg text-center"
      >
        <img
          src={member.photo}
          alt={member.name}
          className="rounded-full mx-auto mb-6 w-32 h-32 object-cover"
        />
        <h3 className="font-bold text-xl">{member.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
      </motion.div>
    ))}
  </div>
</section>

      {/* LATEST SERMON */}
      {latestSermon && latestSermon.videoUrl && (
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <iframe
              src={getEmbedUrl(latestSermon.videoUrl)}
              className="w-full aspect-video rounded-xl shadow-lg"
              allowFullScreen
            />
            <div>
              <h2 className="text-3xl font-bold mb-4">{latestSermon.title}</h2>
              <p className="flex gap-2 items-center mb-2"><User size={16}/> {latestSermon.preacher}</p>
              <p className="flex gap-2 items-center text-gray-500"><Calendar size={16}/> {formatDate(latestSermon.date)}</p>
            </div>
          </div>
        </section>
      )}

      {/* GIVING */}
      <section className="py-20 bg-blue-950 text-white text-center">
        <Heart className="mx-auto mb-6 text-blue-300"/>
        <h2 className="text-4xl font-bold mb-6">Support the Ministry</h2>
        <button className="bg-blue-500 hover:bg-blue-400 px-10 py-4 rounded-full font-bold">Give Online</button>
      </section>

      {/* CONTACT */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Contact Us</h2>
        <div className="flex justify-center gap-10 flex-wrap">
          <div className="flex items-center gap-2"><Phone size={18}/> +233 XXX XXX XXX</div>
          <div className="flex items-center gap-2"><Mail size={18}/> info@throneofchrist.org</div>
          <div className="flex items-center gap-2"><MapPin size={18}/> Accra, Ghana</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 border-t">
        © {new Date().getFullYear()} Throne of Christ Ministries International
      </footer>
    </div>
  )
}