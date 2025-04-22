import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import bgImage from '../assets/GameIcons/bg3wall.jpg'
import bgTitle from '../assets/GameIcons/bg3title.png'
import wowRetailTitle from "../assets/GameIcons/wowRetailLogo.png";
import RandomizerButton from "./RandomizerButton.tsx";

// --- Logic section ---

const morality = ["Hero", "Villain", "Neutral"]

const races = [
    "Human",
    "Elf",
    "Drow",
    "Half-Elf",
    "Half-Orc",
    "Halfling",
    "Dwarf",
    "Gnome",
    "Tiefling",
    "Githyanki",
    "Dragonborn"
];

const classes = [
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard"
];


// Class colors based on WoW color scheme
const classColors = {
    "Barbarian": "text-orange-500",
    "Paladin": "text-pink-300",
    "Ranger": "text-green-500",
    "Rogue": "text-yellow-300",
    "Cleric": "text-gray-200",
    "Shaman": "text-blue-300",
    "Sorcerer": "text-cyan-300",
    "Warlock": "text-purple-400",
    "Druid": "text-amber-600",
    "Fighter": "text-red-600",
    "Monk": "text-emerald-400",
    "Bard": "text-purple-600",
    "Wizard": "text-emerald-600"
}

const moralityColors = {
    "Hero": "text-blue-500",
    "Villain": "text-red-500",
    "Neutral": "text-green-500",
}

function randomizeFaction() {
    const index = Math.floor(Math.random() * morality.length)
    return morality[index]
}

function randomizeRace() {
    return races[Math.floor(Math.random() * races.length)]
}

function randomizeClass() {
    return classes[Math.floor(Math.random() * classes.length)]
}


// New function for Dark Surge randomization
function randomizeDarkSurge() {
    return Math.random() > 0.5 // 50% chance
}

const BG3 = () => {
    const [morality, setFaction] = useState('')
    const [race, setRace] = useState('')
    const [className, setClassName] = useState('')
    const [hasDarkSurge, setHasDarkSurge] = useState(false)
    const [isRolling, setIsRolling] = useState(true)

    const rollCharacter = () => {
        setIsRolling(true)

        setTimeout(() => {
            const newMorality = randomizeFaction()
            const newRace = randomizeRace()
            const newClass = randomizeClass()
            const newDarkSurge = randomizeDarkSurge()

            console.log("Rolling character with Dark Surge:", newDarkSurge)

            setFaction(newMorality)
            setRace(newRace)
            setClassName(newClass)
            setHasDarkSurge(newDarkSurge)
            setIsRolling(false)
        }, 500)
    }

    useEffect(() => {
        rollCharacter()
    }, [])

    // Morality image paths
    const moralityImageSrc = {
        "Villain": "src/assets/BG3Misc/bg3bad.jpg",
        "Hero": "src/assets/BG3Misc/bg3good.avif",
        "Neutral": "src/assets/BG3Misc/bg3neutral.jpg",
    }[morality] || "src/assets/BG3Misc/bg3neutral.jpg";

    // Race image paths
    const getRaceImageSrc = () => {
        const raceMap = {
            "Human": "src/assets/BG3Races/Race_Human.png",
            "Elf": "src/assets/BG3Races/Race_Elf.png",
            "Drow": "src/assets/BG3Races/Race_Drow.png",
            "Half-Elf": "src/assets/BG3Races/Race_Half-Elf.png",
            "Half-Orc": "src/assets/BG3Races/Race_Half-Orc.png",
            "Halfling": "src/assets/BG3Races/Race_Halfling.png",
            "Dwarf": "src/assets/BG3Races/Race_Dwarf.png",
            "Gnome": "src/assets/BG3Races/Race_Gnome.png",
            "Tiefling": "src/assets/BG3Races/Race_Tiefling.png",
            "Githyanki": "src/assets/BG3Races/Race_Githyanki.png",
            "Dragonborn": "src/assets/BG3Races/Race_Dragonborn.png"
        }
        return raceMap[race] || "src/assets/races/placeholder.png"
    }


    const getClassImageSrc = () => {
        const classMap = {
            "Barbarian": "src/assets/BG3Classes/barbarian.png",
            "Bard": "src/assets/BG3Classes/bard.png",
            "Cleric": "src/assets/BG3Classes/cleric.png",
            "Druid": "src/assets/BG3Classes/druid.png",
            "Fighter": "src/assets/BG3Classes/fighter.png",
            "Monk": "src/assets/BG3Classes/monk.png",
            "Paladin": "src/assets/BG3Classes/paladin.png",
            "Ranger": "src/assets/BG3Classes/ranger.png",
            "Rogue": "src/assets/BG3Classes/rogue.png",
            "Sorcerer": "src/assets/BG3Classes/sorc.png",
            "Warlock": "src/assets/BG3Classes/warlock.png",
            "Wizard": "src/assets/BG3Classes/wizard.png"
        }
        return classMap[className] || "src/assets/classes/placeholder.png"
    }

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <div className="invisible text-center">
                <img className="mx-auto max-h-36 w-auto drop-shadow-xl visible" src={bgTitle} alt="Title" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-4 md:p-8 gap-6 max-w-2xl mx-auto w-full">
                {/* Character Info */}
                <div className="space-y-8 w-full">
                    {/* Morality */}
                    <motion.div
                        className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700 shadow-lg"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: isRolling ? -100 : 0, opacity: isRolling ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                                <img
                                    src={moralityImageSrc}
                                    alt={morality}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm uppercase tracking-wider">Morality</h3>
                                <p className={`text-2xl font-medium ${moralityColors[morality] || "text-white"}`}>{morality}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Race */}
                    <motion.div
                        className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700 shadow-lg"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: isRolling ? -100 : 0, opacity: isRolling ? 0 : 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                                <img
                                    src={getRaceImageSrc()}
                                    alt={race}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm uppercase tracking-wider">Race</h3>
                                <p className="text-2xl text-yellow-200 font-medium">{race}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Class */}
                    <motion.div
                        className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700 shadow-lg"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: isRolling ? -100 : 0, opacity: isRolling ? 0 : 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                                <img
                                    src={getClassImageSrc()}
                                    alt={className}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm uppercase tracking-wider">Class</h3>
                                <p className={`text-2xl font-medium ${classColors[className] || "text-white"}`}>{className}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Dark Surge */}
                    <motion.div
                        className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700 shadow-lg"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: isRolling ? -100 : 0, opacity: isRolling ? 0 : 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Character Details</h3>
                        <div className="grid grid-cols-2 gap-4">


                            {/* Dark Surge on the right */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex-shrink-0 flex items-center justify-center">
                                    {hasDarkSurge ? (
                                        <span className="text-green-500 text-2xl">✓</span>
                                    ) : (
                                        <span className="text-red-500 text-2xl">✗</span>
                                    )}
                                </div>
                                <p className="text-lg text-yellow-200">Dark Urge</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer with Roll Button */}
            <div className="bg-gradient-to-b from-black to-gray-900 py-8 px-4 text-center shadow-lg">
                <RandomizerButton onRoll={() => rollCharacter()} />
            </div>
        </div>
    )
}

export default BG3