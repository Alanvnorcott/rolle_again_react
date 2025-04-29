// components/Home.tsx

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const games = [
    {
        title: "Elder Scrolls",
        description: "Randomize your character in Skyrim, Oblivion, or Elder Scrolls Online",
        image: "src/assets/ElderScrollsMisc/skyrim.webp",
        link: "/elder-scrolls",
        color: "bg-blue-600 hover:bg-blue-700"
    },
    {
        title: "Fallout",
        description: "Create your wasteland survivor in Fallout 3, New Vegas, or Fallout 4",
        image: "src/assets/FalloutMisc/fallout4.jpg",
        link: "/fallout",
        color: "bg-green-600 hover:bg-green-700"
    },
    {
        title: "Baldur's Gate 3",
        description: "Forge your destiny in the Forgotten Realms",
        image: "src/assets/BG3Misc/bg3good.avif",
        link: "/bg3",
        color: "bg-purple-600 hover:bg-purple-700"
    },
    {
        title: "World of Warcraft",
        description: "Create your hero in Azeroth, choose between Retail or Classic",
        image: "src/assets/WoWRaces/human.jpg",
        link: "/wow",
        color: "bg-amber-600 hover:bg-amber-700"
    }
]

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isAutoScrolling, setIsAutoScrolling] = useState(true)
    const cardWidth = 384 // w-96 = 384px
    const totalWidth = cardWidth * games.length

    const scrollTo = (position: number) => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                left: position,
                behavior: 'smooth'
            })
        }
    }

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        let animationFrame: number
        let startTime: number | null = null
        const duration = 20000 // 20 seconds for a full scroll

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = (timestamp - startTime) / duration
            const scrollPosition = (progress * totalWidth) % totalWidth

            if (!isHovered && isAutoScrolling) {
                container.scrollLeft = scrollPosition
            }

            animationFrame = requestAnimationFrame(animate)
        }

        animationFrame = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationFrame)
        }
    }, [isHovered, isAutoScrolling])

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl font-bold mb-4 font-['Cinzel']">Roll Again</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Discover your next character build in your favorite RPG games. 
                        Let fate decide your path to adventure!
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => {
                            setIsAutoScrolling(false)
                            if (containerRef.current) {
                                const newPosition = Math.max(0, containerRef.current.scrollLeft - cardWidth)
                                scrollTo(newPosition)
                            }
                        }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-gray-800/50 hover:bg-gray-700/50 p-4 rounded-full transition-colors z-10"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => {
                            setIsAutoScrolling(false)
                            if (containerRef.current) {
                                const newPosition = Math.min(totalWidth, containerRef.current.scrollLeft + cardWidth)
                                scrollTo(newPosition)
                            }
                        }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-gray-800/50 hover:bg-gray-700/50 p-4 rounded-full transition-colors z-10"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div 
                        ref={containerRef}
                        className="relative overflow-hidden"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="flex space-x-8 min-w-max">
                            {games.map((game, index) => (
                                <motion.div
                                    key={`${game.title}-1`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex-shrink-0 w-96"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={game.image}
                                            alt={game.title}
                                            className="w-full h-full object-cover object-center"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
                                        <p className="text-gray-400 mb-4">
                                            {game.description}
                                        </p>
                                        <a
                                            href={game.link}
                                            className={`inline-block ${game.color} text-white px-4 py-2 rounded-md transition-colors`}
                                        >
                                            Roll Character
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                            {games.map((game, index) => (
                                <motion.div
                                    key={`${game.title}-2`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex-shrink-0 w-96"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={game.image}
                                            alt={game.title}
                                            className="w-full h-full object-cover object-center"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
                                        <p className="text-gray-400 mb-4">
                                            {game.description}
                                        </p>
                                        <a
                                            href={game.link}
                                            className={`inline-block ${game.color} text-white px-4 py-2 rounded-md transition-colors`}
                                        >
                                            Roll Character
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        {/* Gradient overlays */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    )
}
