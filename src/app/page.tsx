"use client"

import React, { useState, useEffect } from "react"
import { client } from "../sanity/lib/sanityClient"
import Image from "next/image"
import Link from "next/link"

import {
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
    if (url.includes("watch?v=")) {
      return `https://www.youtube.com/embed/${url.split("watch?v=")[1].split("&")[0]}`
    }
    if (url.length === 11) {
      return `https://www.youtube.com/embed/${url}`
    }
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

      <nav className="flex items-center justify-between px-6 py-4 border-b">

        <div className="flex items-center gap-3 font-bold text-lg text-blue-700 dark:text-blue-400">
          <Image
            src="/logo.png"
            alt="Church Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          Throne of Christ Ministries
        </div>

        <div className="hidden md:flex gap-8 font-medium">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/sermons">Sermons</Link>
          <Link href="/events">Events</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="flex items-center gap-4">

          {isLive && (
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">
              🔴 LIVE NOW
            </span>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
          </button>

        </div>

      </nav>

      {/* HERO */}

      <header className="py-24 text-center">

        <motion.h1
          initial={{y:-40, opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{duration:1}}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          Welcome to the{" "}
          <span className="text-blue-700 dark:text-blue-400">
            Throne of Christ Ministries
          </span>
        </motion.h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Raising believers, transforming lives and advancing the Kingdom of God.
        </p>

        <a
          href="#latest-sermon"
          className="bg-blue-700 text-white px-10 py-4 rounded-xl font-bold inline-flex gap-2"
        >
          <PlayCircle/> Watch Latest Sermon
        </a>

        <p className="mt-6 text-gray-500">
          Next Sunday Service: <strong>{countdown}</strong>
        </p>

      </header>

      {/* MISSION */}

      <section className="py-20 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        <div>

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
            A world where every person experiences God’s grace and purpose
            through a thriving Christian community.
          </p>

        </div>

        <div className="flex justify-center">

          <Image
            src="/about-church.jpg"
            alt="Church"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
          />

        </div>

      </section>

      {/* LATEST SERMON */}

      {latestSermon && latestSermon.videoUrl && (

        <section id="latest-sermon" className="py-20 max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <iframe
              src={getEmbedUrl(latestSermon.videoUrl)}
              className="w-full aspect-video rounded-xl shadow-lg"
              allowFullScreen
            />

            <div>

              <h2 className="text-3xl font-bold mb-4">
                {latestSermon.title}
              </h2>

              <p className="flex gap-2 items-center mb-2">
                <User size={16}/> {latestSermon.preacher}
              </p>

              <p className="flex gap-2 items-center text-gray-500">
                <Calendar size={16}/> {formatDate(latestSermon.date)}
              </p>

            </div>

          </div>

        </section>

      )}

      {/* GIVING */}

      <section className="py-20 bg-blue-950 text-white text-center">

        <Heart className="mx-auto mb-6 text-blue-300"/>

        <h2 className="text-4xl font-bold mb-6">
          Support the Ministry
        </h2>

        <button className="bg-blue-500 hover:bg-blue-400 px-10 py-4 rounded-full font-bold">
          Give Online
        </button>

      </section>

      {/* CONTACT */}

      <section className="py-20 text-center">

        <h2 className="text-3xl font-bold mb-10">
          Contact Us
        </h2>

        <div className="flex justify-center gap-10 flex-wrap">

          <div className="flex items-center gap-2">
            <Phone size={18}/> +233 XXX XXX XXX
          </div>

          <div className="flex items-center gap-2">
            <Mail size={18}/> info@throneofchrist.org
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18}/> Accra, Ghana
          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="py-10 text-center text-gray-500 border-t">

        © {new Date().getFullYear()} Throne of Christ Ministries International

      </footer>

    </div>
  )
}