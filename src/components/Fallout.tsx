import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import RandomizerButton from "./RandomizerButton.tsx";

// --- Logic section ---

const morality = ["Good", "Evil", "Neutral"]

const sexOptions = ["Male", "Female"]

// Builds categorized by game with their wiki links
const builds = {
    "Fallout 4": [
        { name: "Gunslinger", link: "https://fallout.fandom.com/wiki/Forum:Fallout_4_character_builds#Gunslinger" },
        { name: "Commando", link: "https://fallout.fandom.com/wiki/Forum:Fallout_4_character_builds#Commando" },
        { name: "Heavy Gunner", link: "https://fallout.fandom.com/wiki/Forum:Fallout_4_character_builds#Heavy_Gunner" },
        { name: "Sniper", link: "https://fallout.fandom.com/wiki/Forum:Fallout_4_character_builds#Sniper" },
        { name: "Melee", link: "https://fallout.fandom.com/wiki/Forum:Fallout_4_character_builds#Melee" },
        { name: "Unarmed", link: "https://fallout.fandom.com/wiki/Forum:Fallout_4_character_builds#Unarmed" },
        { name: "Demolition Expert", link: "https://fallout.fandom.com/wiki/Forum:Fallout_4_character_builds#Demolition_Expert" },
        { name: "Stealth", link: "https://fallout.fandom.com/wiki/Forum:Fallout_4_character_builds#Stealth" },
        { name: "Power Armor", link: "https://fallout.fandom.com/wiki/Forum:Fallout_4_character_builds#Power_Armor" },
        { name: "V.A.T.S. Specialist", link: "https://fallout.fandom.com/wiki/Forum:Fallout_4_character_builds#VATS_Specialist" }
    ],
    "Fallout: New Vegas": [
        { name: "Cowboy", link: "https://fallout.fandom.com/wiki/Forum:Fallout:_New_Vegas_character_builds#Cowboy" },
        { name: "Laser Commander", link: "https://fallout.fandom.com/wiki/Forum:Fallout:_New_Vegas_character_builds#Laser_Commander" },
        { name: "Crit Hunter", link: "https://fallout.fandom.com/wiki/Forum:Fallout:_New_Vegas_character_builds#Crit_Hunter" },
        { name: "Explosives Expert", link: "https://fallout.fandom.com/wiki/Forum:Fallout:_New_Vegas_character_builds#Explosives_Expert" },
        { name: "Energy Weapons Specialist", link: "https://fallout.fandom.com/wiki/Forum:Fallout:_New_Vegas_character_builds#Energy_Weapons" },
        { name: "Unarmed Fighter", link: "https://fallout.fandom.com/wiki/Forum:Fallout:_New_Vegas_character_builds#Unarmed" },
        { name: "Legion Assassin", link: "https://fallout.fandom.com/wiki/Forum:Fallout:_New_Vegas_character_builds#Legion_Assassin" },
        { name: "NCR Ranger", link: "https://fallout.fandom.com/wiki/Forum:Fallout:_New_Vegas_character_builds#NCR_Ranger" },
        { name: "House Loyalist", link: "https://fallout.fandom.com/wiki/Forum:Fallout:_New_Vegas_character_builds#House_Loyalist" },
        { name: "Yes Man Independent", link: "https://fallout.fandom.com/wiki/Forum:Fallout:_New_Vegas_character_builds#Independent" }
    ],
    "Fallout 3": [
        { name: "Near-Perfection", link: "https://fallout.fandom.com/wiki/Forum:Fallout_3_character_builds#%22Near-Perfection%22" },
        { name: "Brotherhood Knight", link: "https://fallout.fandom.com/wiki/Forum:Fallout_3_character_builds#Brotherhood_Knight" },
        { name: "Wasteland Surgeon", link: "https://fallout.fandom.com/wiki/Forum:Fallout_3_character_builds#Wasteland_Surgeon" },
        { name: "Sneak Thief", link: "https://fallout.fandom.com/wiki/Forum:Fallout_3_character_builds#Sneak_Thief" },
        { name: "Enclave Agent", link: "https://fallout.fandom.com/wiki/Forum:Fallout_3_character_builds#Enclave_Agent" },
        { name: "Radiation King", link: "https://fallout.fandom.com/wiki/Forum:Fallout_3_character_builds#Radiation_King" },
        { name: "Super Mutant Hunter", link: "https://fallout.fandom.com/wiki/Forum:Fallout_3_character_builds#Super_Mutant_Hunter" },
        { name: "Ghoul Sympathizer", link: "https://fallout.fandom.com/wiki/Forum:Fallout_3_character_builds#Ghoul_Sympathizer" },
        { name: "Big Guns Expert", link: "https://fallout.fandom.com/wiki/Forum:Fallout_3_character_builds#Big_Guns_Expert" },
        { name: "Small Guns Expert", link: "https://fallout.fandom.com/wiki/Forum:Fallout_3_character_builds#Small_Guns_Expert" }
    ]
}

// Build colors based on fallout pip-boy green theme
const buildColors = {
    // Fallout 4
    "Gunslinger": "text-yellow-300",
    "Commando": "text-green-500",
    "Heavy Gunner": "text-red-600",
    "Sniper": "text-cyan-300",
    "Melee": "text-orange-500",
    "Unarmed": "text-pink-300",
    "Demolition Expert": "text-red-500",
    "Stealth": "text-purple-400",
    "Power Armor": "text-amber-600",
    "V.A.T.S. Specialist": "text-emerald-400",

    // Fallout: New Vegas
    "Cowboy": "text-yellow-300",
    "Laser Commander": "text-green-500",
    "Crit Hunter": "text-orange-500",
    "Explosives Expert": "text-red-500",
    "Energy Weapons Specialist": "text-cyan-300",
    "Unarmed Fighter": "text-pink-300",
    "Legion Assassin": "text-red-600",
    "NCR Ranger": "text-emerald-400",
    "House Loyalist": "text-amber-600",
    "Yes Man Independent": "text-purple-400",

    // Fallout 3
    "Near-Perfection": "text-emerald-600",
    "Brotherhood Knight": "text-cyan-300",
    "Wasteland Surgeon": "text-emerald-400",
    "Sneak Thief": "text-purple-400",
    "Enclave Agent": "text-red-600",
    "Radiation King": "text-green-500",
    "Super Mutant Hunter": "text-orange-500",
    "Ghoul Sympathizer": "text-yellow-300",
    "Big Guns Expert": "text-red-500",
    "Small Guns Expert": "text-pink-300"
}

const moralityColors = {
    "Good": "text-blue-500",
    "Evil": "text-red-500",
    "Neutral": "text-green-500",
}

function randomizeMorality() {
    const index = Math.floor(Math.random() * morality.length)
    return morality[index]
}

function randomizeSex() {
    return sexOptions[Math.floor(Math.random() * sexOptions.length)]
}

function randomizeBuild(game) {
    const gameBuilds = builds[game]
    return gameBuilds[Math.floor(Math.random() * gameBuilds.length)]
}

const Fallout = () => {
    const [selectedGame, setSelectedGame] = useState("Fallout 4")
    const [currentMorality, setMorality] = useState('')
    const [sex, setSex] = useState('')
    const [build, setBuild] = useState(null)
    const [isRolling, setIsRolling] = useState(true)

    const rollCharacter = () => {
        setIsRolling(true)

        setTimeout(() => {
            const newMorality = randomizeMorality()
            const newSex = randomizeSex()
            const newBuild = randomizeBuild(selectedGame)

            setMorality(newMorality)
            setSex(newSex)
            setBuild(newBuild)
            setIsRolling(false)
        }, 500)
    }

    useEffect(() => {
        rollCharacter()
    }, [selectedGame])

    // Morality image paths
    const moralityImageSrc = {
        "Evil": "src/assets/FalloutMisc/Devil.webp",
        "Good": "src/assets/FalloutMisc/good.webp",
        "Neutral": "src/assets/FalloutMisc/neutral.webp",
    }[currentMorality] || "src/assets/FalloutMisc/neutral.jpg";

    // Sex image paths
    const getSexImageSrc = () => {
        const sexMap = {
            "Male": "src/assets/FalloutMisc/vaultBoy.png",
            "Female": "src/assets/FalloutMisc/vaultGirl.png",
        }
        return sexMap[sex] || "src/assets/FalloutCharacters/placeholder.png"
    }

    // Build image paths
    const getBuildImageSrc = () => {
        if (!build) return "src/assets/FalloutBuilds/placeholder.png";

        const buildMap = {
            // Fallout 4
            "Gunslinger": "src/assets/FalloutBuilds/gunslinger.png",
            "Commando": "src/assets/FalloutBuilds/commando.png",
            "Heavy Gunner": "src/assets/FalloutBuilds/heavy.png",
            "Sniper": "src/assets/FalloutBuilds/sniper.png",
            "Melee": "src/assets/FalloutBuilds/melee.png",
            "Unarmed": "src/assets/FalloutBuilds/unarmed.png",
            "Demolition Expert": "src/assets/FalloutBuilds/demolition.png",
            "Stealth": "src/assets/FalloutBuilds/stealth.png",
            "Power Armor": "src/assets/FalloutBuilds/powerarmor.png",
            "V.A.T.S. Specialist": "src/assets/FalloutBuilds/vats.png",

            // New Vegas
            "Cowboy": "src/assets/FalloutBuilds/cowboy.png",
            "Laser Commander": "src/assets/FalloutBuilds/laser.png",
            "Crit Hunter": "src/assets/FalloutBuilds/crit.png",
            "Explosives Expert": "src/assets/FalloutBuilds/explosives.png",
            "Energy Weapons Specialist": "src/assets/FalloutBuilds/energy.png",
            "Unarmed Fighter": "src/assets/FalloutBuilds/unarmed.png",
            "Legion Assassin": "src/assets/FalloutBuilds/legion.png",
            "NCR Ranger": "src/assets/FalloutBuilds/ncr.png",
            "House Loyalist": "src/assets/FalloutBuilds/house.png",
            "Yes Man Independent": "src/assets/FalloutBuilds/yesman.png",

            // Fallout 3
            "Near-Perfection": "src/assets/FalloutBuilds/perfection.png",
            "Brotherhood Knight": "src/assets/FalloutBuilds/brotherhood.png",
            "Wasteland Surgeon": "src/assets/FalloutBuilds/surgeon.png",
            "Sneak Thief": "src/assets/FalloutBuilds/thief.png",
            "Enclave Agent": "src/assets/FalloutBuilds/enclave.png",
            "Radiation King": "src/assets/FalloutBuilds/radiation.png",
            "Super Mutant Hunter": "src/assets/FalloutBuilds/mutant.png",
            "Ghoul Sympathizer": "src/assets/FalloutBuilds/ghoul.png",
            "Big Guns Expert": "src/assets/FalloutBuilds/bigguns.png",
            "Small Guns Expert": "src/assets/FalloutBuilds/smallguns.png"
        }
        return buildMap[build.name] || "src/assets/FalloutBuilds/placeholder.png"
    }

    // Fallout game logos
    const gameImageSrc = {
        "Fallout 4": "src/assets/Fallout4/fo4Logo.png",
        "Fallout: New Vegas": "src/assets/FalloutNV/fonvLogo.webp",
        "Fallout 3": "src/assets/Fallout3/fo3Logo.png"
    }

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{
                backgroundImage: `url(src/assets/FalloutMisc/${selectedGame.toLowerCase().replace(/[:\s]/g, '')}.jpg)`,
                backgroundColor: "#111111"
            }}
        >
            <div className="text-center mt-6">
                <img className="mx-auto max-h-36 w-auto drop-shadow-xl" src={gameImageSrc[selectedGame]} alt={selectedGame} />
            </div>

            {/* Game Toggle */}
            <div className="flex justify-center my-6">
                <div className="bg-gray-800 bg-opacity-80 rounded-lg p-2 flex gap-2">
                    {Object.keys(builds).map((game) => (
                        <button
                            key={game}
                            className={`px-4 py-2 rounded-md transition-all ${
                                selectedGame === game
                                    ? "bg-green-700 text-white font-medium"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                            onClick={() => setSelectedGame(game)}
                        >
                            {game}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-4 md:p-8 gap-6 max-w-2xl mx-auto w-full">
                {/* Character Info */}
                <div className="space-y-8 w-full">
                    {/* Morality */}
                    <motion.div
                        className="bg-gray-900 bg-opacity-80 rounded-lg p-6 border-2 border-green-800 shadow-lg"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: isRolling ? -100 : 0, opacity: isRolling ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                                <img
                                    src={moralityImageSrc}
                                    alt={currentMorality}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm uppercase tracking-wider">Morality</h3>
                                <p className={`text-2xl font-medium ${moralityColors[currentMorality] || "text-white"}`}>{currentMorality}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sex */}
                    <motion.div
                        className="bg-gray-900 bg-opacity-80 rounded-lg p-6 border-2 border-green-800 shadow-lg"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: isRolling ? -100 : 0, opacity: isRolling ? 0 : 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                                <img
                                    src={getSexImageSrc()}
                                    alt={sex}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm uppercase tracking-wider">Sex</h3>
                                <p className="text-2xl text-green-300 font-medium">{sex}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Build with Link */}
                    {build && (
                        <motion.div
                            className="bg-gray-900 bg-opacity-80 rounded-lg p-6 border-2 border-green-800 shadow-lg"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: isRolling ? -100 : 0, opacity: isRolling ? 0 : 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="flex flex-col">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                                        <img
                                            src={getBuildImageSrc()}
                                            alt={build.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-400 text-sm uppercase tracking-wider">Build</h3>
                                        <p className={`text-2xl font-medium ${buildColors[build.name] || "text-white"}`}>
                                            {build.name}
                                        </p>
                                    </div>
                                </div>

                                {/* Build Link */}
                                <div className="mt-2 bg-gray-800 p-3 rounded-md">
                                    <div className="flex items-center">
                                        <span className="text-gray-400 text-sm mr-2">Build Guide:</span>
                                        <a
                                            href={build.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-400 hover:text-green-300 hover:underline text-sm truncate flex-1"
                                        >
                                            {build.link}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>

            {/* Footer with Roll Button */}
            <div className="bg-gradient-to-b from-transparent to-black py-8 px-4 text-center shadow-lg">
                <RandomizerButton onRoll={() => rollCharacter()} />
            </div>
        </div>
    )
}

export default Fallout