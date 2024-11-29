'use client'

import { useEffect, useState, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '@/components/custom/navbar'
import Hero from '@/components/custom/hero'
import MobileHome from '@/components/custom/mobileHome'
import PhilatelyInfo from '@/components/custom/philatelyinfo'
import Footer from '../components/custom/Footer'
import { useRouter } from 'next/navigation'



export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const lenisRef = useRef()
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  useEffect(() => {
    // Check if the screen is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768) // Adjust this breakpoint as needed
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    lenisRef.current = new Lenis({
      duration: 2.5, // Increased from 1.2 to 2.5
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8, // Decreased from 1 to 0.8
      smoothTouch: false,
      touchMultiplier: 1.5, // Decreased from 2 to 1.5
      infinite: false,
    })

    function raf(time) {
      lenisRef.current.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const handleScroll = (e) => {
      setScrollY(e.scroll)
    }

    lenisRef.current.on('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', checkMobile)
      lenisRef.current.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      {/* <div className="bg-[#E7D4B5] text-white py-4 text-center">
        <p className="mb-2 text-secondary"> <span className="text-xl font-bold mb-2 text-secondary">Note : </span>This website is still under development. you can visit the government site or user profile to know more about the project.</p>
        <div className="space-x-4">
          <button 
            onClick={() => router.push('/profile')}
            className="bg-primary text-black px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            Government Site
          </button>
          <button 
            onClick={() => router.push('/shop')}
            className="bg-primary text-black px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            User Profile
          </button>
        </div>
      </div> */}
      <div className="relative">
        {isMobile ? (
          <MobileHome />
        ) : (
          <motion.div 
            ref={heroRef}
            className="absolute inset-0 z-0"
            style={{ opacity }}
          >
            <Hero scrollY={scrollY} />
          </motion.div>
        )}
        <div className="relative z-10">
          <motion.div
            className="parallax-section"
            style={{
              y: useTransform(scrollYProgress, [0, 1], ['100vh', '0vh'])
            }}
          >
            <PhilatelyInfo />
            <Footer />
          </motion.div>
        </div>
      </div>
    </div>
  )
}