import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import RandomizerButton from "./RandomizerButton.tsx";

// --- Logic section ---

const morality = ["Good", "Evil", "Neutral"]

const sexOptions = ["Male", "Female"]

// Builds categorized by game with their wiki links
const builds = {
    "Fallout 4": [
        { name: "Too Strong", link: "http://www.rpg-gaming.com/fo4.html" },
        { name: "V.A.T.S", link: "http://www.rpg-gaming.com/fo4.html" },
        { name: "Lucky", link: "http://www.rpg-gaming.com/fo4.html" },
        { name: "Charisma Guru", link: "http://www.rpg-gaming.com/fo4.html" },
        { name: "Agile", link: "http://www.rpg-gaming.com/fo4.html" },
        { name: "Genius", link: "http://www.rpg-gaming.com/fo4.html" },
        { name: "Perceptive", link: "http://www.rpg-gaming.com/fo4.html" },
        { name: "Stealth", link: "http://www.rpg-gaming.com/fo4.html" },
        { name: "Power Armor", link: "http://www.rpg-gaming.com/fo4.html" },
        { name: "Jack o' All", link: "http://www.rpg-gaming.com/fo4.html" }
    ],
    "Fallout: New Vegas": [
        { name: "Brawler", link: "https://gamestegy.com/post/fallout-new-vegas/854/unarmed-fist-build" },
        { name: "Pistol Toter", link: "https://gamestegy.com/fallout-new-vegas/builds#:~:text=NCR%20Ranger%20Build,0" },
        { name: "Gunslinger", link: "https://gamestegy.com/post/fallout-new-vegas/851/pistol-build" },
        { name: "Shotgun Specialist", link: "https://gamestegy.com/post/fallout-new-vegas/845/shotgun-build" },
        { name: "Sniper", link: "https://gamestegy.com/post/fallout-new-vegas/843/sniper-build" },
        { name: "Laser Weapons", link: "https://gamestegy.com/fallout-new-vegas/builds#:~:text=Energy%20Weapon%20Laser,4" },
        { name: "Explosives!", link: "https://gamestegy.com/post/fallout-new-vegas/840/explosives-build" },
        { name: "Super-human", link: "https://fallout.fandom.com/wiki/Forum:New_Vegas_character_builds#The_Super_Human" },
        { name: "Sweet Talker", link: "https://fallout.fandom.com/wiki/Forum:New_Vegas_character_builds#Charismatic" },
        { name: "Balanced", link: "https://fallout.fandom.com/wiki/Forum:New_Vegas_character_builds#Balanced" }
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
    "Too Strong": "text-yellow-300",
    "V.A.T.S": "text-green-500",
    "Lucky": "text-red-600",
    "Charisma Guru": "text-cyan-300",
    "Agile": "text-orange-500",
    "Genius": "text-pink-300",
    "Perceptive": "text-red-500",
    "Stealth": "text-purple-400",
    "Power Armor": "text-amber-600",
    "Jack o' All": "text-emerald-400",



    // Fallout: New Vegas
    "Brawler": "text-yellow-300",
    "Pistol Toter": "text-green-500",
    "Gunslinger": "text-orange-500",
    "Shotgun Specialist": "text-red-500",
    "Sniper": "text-cyan-300",
    "Laser Weapons": "text-pink-300",
    "Explosives!": "text-red-600",
    "Super-human": "text-emerald-400",
    "Sweet Talker": "text-amber-600",
    "Balanced": "text-purple-400",

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
            "Too Strong": "src/assets/Fallout4/icons/strong.webp",
            "V.A.T.S": "src/assets/Fallout4/icons/vats.webp",
            "Lucky": "src/assets/Fallout4/icons/lucky.webp",
            "Charisma Guru": "src/assets/Fallout4/icons/charisma.webp",
            "Agile": "src/assets/Fallout4/icons/agile.webp",
            "Genius": "src/assets/Fallout4/icons/genius.webp",
            "Perceptive": "src/assets/Fallout4/icons/perceptive.webp",
            "Stealth": "src/assets/Fallout4/icons/stealth.webp",
            "Power Armor": "src/assets/Fallout4/icons/armor.webp",
            "Jack o' All": "src/assets/Fallout4/icons/balanced.webp",


            // New Vegas
            "Brawler": "src/assets/FalloutNV/icons/brawler.webp",
            "Pistol Toter": "src/assets/FalloutNV/icons/pistol.webp",
            "Gunslinger": "src/assets/FalloutNV/icons/gunslinger.webp",
            "Shotgun Specialist": "src/assets/FalloutNV/icons/shotgunspec.webp",
            "Sniper": "src/assets/FalloutNV/icons/sniper.webp",
            "Laser Weapons": "src/assets/FalloutNV/icons/laser.webp",
            "Explosives!": "src/assets/FalloutNV/icons/explosives.webp",
            "Super-human": "src/assets/FalloutNV/icons/super.webp",
            "Sweet Talker": "src/assets/FalloutNV/icons/sweet.webp",
            "Balanced": "src/assets/FalloutNV/icons/balanced.webp",


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