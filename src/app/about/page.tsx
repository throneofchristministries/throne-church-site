"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Church, Heart, ArrowLeft, Sun, Moon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {

  const [darkMode, setDarkMode] = useState(false)

  const team = [
    { name: "Pastor John Doe", role: "Senior Pastor", photo: "/team/pastor.jpg" },
    { name: "Jane Smith", role: "Youth Minister", photo: "/team/jane.jpg" },
    { name: "Mark Johnson", role: "Music Director", photo: "/team/mark.jpg" },
  ]

  const history = [
    { year: "2005", event: "Founded Throne of Christ Ministries" },
    { year: "2010", event: "Built our first church campus" },
    { year: "2015", event: "Launched community outreach programs" },
    { year: "2020", event: "Started online services" },
  ]

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"} transition-colors duration-500 font-sans min-h-screen`}>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-slate-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:rotate-12 transition-transform">
              <ArrowLeft size={20} />
            </div>
            <span className="font-bold text-lg hidden sm:block">
              Back to Home
            </span>
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? <Sun className="text-yellow-400"/> : <Moon className="text-slate-600"/>}
          </button>

        </div>
      </nav>


      {/* HERO */}
      <header className="py-24 text-center px-6">

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 text-blue-700 dark:text-blue-400 flex items-center justify-center gap-4"
        >
          <Church size={50}/> About Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg"
        >
          Throne of Christ Ministries is dedicated to raising believers,
          transforming lives, and impacting communities through Christ’s love.
        </motion.p>

      </header>


      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 py-20 items-center">

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
            A world where every person experiences God’s grace,
            purpose, and empowerment through a thriving Christian community.
          </p>

        </motion.div>


        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >

          <Image
            src="/about-church.jpg"
            alt="Throne of Christ Ministries"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
          />

        </motion.div>

      </section>
      {/* CORE VALUES */}

<section className="py-24 bg-gray-50 dark:bg-gray-800">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center mb-16 text-blue-700 dark:text-blue-400">
Our Core Values
</h2>

<div className="grid md:grid-cols-4 gap-10 text-center">

<div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow hover:scale-105 transition">
<h3 className="font-bold text-xl mb-3">Faith</h3>
<p>Living and trusting in God's word daily.</p>
</div>

<div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow hover:scale-105 transition">
<h3 className="font-bold text-xl mb-3">Love</h3>
<p>Serving others with compassion.</p>
</div>

<div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow hover:scale-105 transition">
<h3 className="font-bold text-xl mb-3">Community</h3>
<p>Growing together in Christ.</p>
</div>

<div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow hover:scale-105 transition">
<h3 className="font-bold text-xl mb-3">Service</h3>
<p>Impacting lives through ministry.</p>
</div>

</div>

</div>
</section>


      {/* HISTORY TIMELINE */}
      <section className="bg-slate-50 dark:bg-gray-800 py-20">

        <h2 className="text-4xl font-bold text-center mb-16 text-blue-700 dark:text-blue-400">
          Our History
        </h2>

        <div className="max-w-5xl mx-auto relative">

          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-blue-300 dark:border-blue-500"></div>

          {history.map((item, idx) => {

            const isLeft = idx % 2 === 0

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12 flex items-center w-full"
              >

                {isLeft && (
                  <div className="w-1/2 text-right pr-10 font-bold text-lg">
                    {item.year}
                  </div>
                )}

                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg w-1/2">
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.event}
                  </p>
                </div>

                {!isLeft && (
                  <div className="w-1/2 pl-10 font-bold text-lg">
                    {item.year}
                  </div>
                )}

              </motion.div>
            )
          })}

        </div>

      </section>
      {/* CHURCH GALLERY */}

<section className="py-24">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center mb-16 text-blue-700 dark:text-blue-400">
Church Life
</h2>

<div className="grid md:grid-cols-3 gap-6">

<Image src="/gallery/1.jpg" width={400} height={300} alt="Church" className="rounded-xl shadow"/>

<Image src="/gallery/2.jpg" width={400} height={300} alt="Worship" className="rounded-xl shadow"/>

<Image src="/gallery/3.jpg" width={400} height={300} alt="Service" className="rounded-xl shadow"/>

</div>

</div>

</section>
{/* PASTOR MESSAGE */}

<section className="py-24 bg-gray-50 dark:bg-gray-800">

<div className="max-w-5xl mx-auto text-center px-6">

<h2 className="text-4xl font-bold mb-10 text-blue-700 dark:text-blue-400">
Message from the Pastor
</h2>

<p className="text-lg leading-relaxed">
Welcome to Throne of Christ Ministries. Our prayer is that you
experience God's love and grow spiritually as part of our
community. We believe God has a purpose for every life.
</p>

</div>

</section>


      {/* TEAM */}
      <section className="py-20 max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16 text-blue-700 dark:text-blue-400">
          Meet Our Team
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg text-center"
            >

              <Image
                src={member.photo}
                alt={member.name}
                width={130}
                height={130}
                className="rounded-full mx-auto mb-6 object-cover"
              />

              <h3 className="font-bold text-xl">
                {member.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                {member.role}
              </p>

            </motion.div>
          ))}

        </div>

      </section>
      {/* MINISTRIES */}

<section className="py-24">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center mb-16 text-blue-700 dark:text-blue-400">
Our Ministries
</h2>

<div className="grid md:grid-cols-4 gap-8 text-center">

<div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow">
<h3 className="font-bold">Youth Ministry</h3>
</div>

<div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow">
<h3 className="font-bold">Children Ministry</h3>
</div>

<div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow">
<h3 className="font-bold">Music Ministry</h3>
</div>

<div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow">
<h3 className="font-bold">Outreach Ministry</h3>
</div>

</div>

</div>

</section>
{/* SERVICE TIMES */}

<section className="py-24 bg-gray-50 dark:bg-gray-800">

<div className="max-w-6xl mx-auto text-center px-6">

<h2 className="text-4xl font-bold mb-12 text-blue-700 dark:text-blue-400">
Service Times
</h2>

<div className="grid md:grid-cols-3 gap-8">

<div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow">
<h3 className="font-bold text-lg">Sunday Worship</h3>
<p>9:00 AM - 12:00 PM</p>
</div>

<div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow">
<h3 className="font-bold text-lg">Midweek Service</h3>
<p>Wednesday 6:00 PM</p>
</div>

<div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow">
<h3 className="font-bold text-lg">Prayer Meeting</h3>
<p>Friday 6:00 PM</p>
</div>

</div>

</div>

</section>


      {/* CTA */}
      <section className="py-20 bg-blue-950 text-white text-center px-6">

        <Heart className="mx-auto mb-6 text-blue-300" size={40}/>

        <h2 className="text-4xl font-bold mb-6">
          Join Us in Our Mission
        </h2>

        <p className="mb-8 text-lg max-w-2xl mx-auto">
          Become part of our growing ministry. Attend services,
          join a ministry, or support our outreach programs.
        </p>

        <button className="bg-blue-500 hover:bg-blue-400 px-10 py-4 rounded-full font-bold transition">
          Get Involved
        </button>

      </section>
      {/* LOCATION MAP */}

<section className="py-24">

<h2 className="text-4xl font-bold text-center mb-10 text-blue-700 dark:text-blue-400">
Visit Us
</h2>

<div className="max-w-6xl mx-auto px-6">

<iframe
src="https://www.google.com/maps?q=Accra,Ghana&output=embed"
className="w-full h-96 rounded-xl"
loading="lazy"
/>

</div>

</section>


      {/* FOOTER */}
      <footer className="py-10 text-center border-t border-slate-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">

        © {new Date().getFullYear()} Throne of Christ Ministries International

      </footer>

    </div>
  )
}