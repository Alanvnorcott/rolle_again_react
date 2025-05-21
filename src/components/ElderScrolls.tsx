import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import RandomizerButton from "./RandomizerButton.tsx";

// --- Logic section ---

const morality = ["Good", "Evil", "Neutral"] as const;
type Morality = typeof morality[number];

const sexOptions = ["Male", "Female"] as const;
type Sex = typeof sexOptions[number];

interface Build {
    name: string;
    link: string;
}

// Builds categorized by game with their wiki links
const builds: Record<string, Build[]> = {
    "Oblivion": [
        { "name": "Custom class", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Custom_class" },
        { "name": "Acrobat", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Acrobat" },
        { "name": "Agent", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Agent" },
        { "name": "Archer", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Archer" },
        { "name": "Assassin", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Assassin" },
        { "name": "Barbarian", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Barbarian" },
        { "name": "Bard", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Bard" },
        { "name": "Battlemage", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Battlemage" },
        { "name": "Paladin", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Paladin" },
        { "name": "Healer", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Healer" },
        { "name": "Knight", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Knight" },
        { "name": "Mage", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Mage" },
        { "name": "Monk", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Monk" },
        { "name": "Nightblade", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Nightblade" },
        { "name": "Pilgrim", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Pilgrim" },
        { "name": "Rogue", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Rogue" },
        { "name": "Scout", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Scout" },
        { "name": "Sorcerer", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Sorcerer" },
        { "name": "Spellsword", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Spellsword" },
        { "name": "Thief", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Thief" },
        { "name": "Warrior", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Warrior" },
        { "name": "Witchhunter", "link": "https://elderscrolls.fandom.com/wiki/Classes_(Oblivion)#Witchhunter" },
    ],
    "Skyrim": [
        { name: "Stealth Archer", link: "https://www.thegamer.com/skyrim-stealth-archer-build/" }
    ],
    "Morrowind": [
        { "name": "Acrobat", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Acrobat" },
        { "name": "Agent", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Agent" },
        { "name": "Archer", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Archer" },
        { "name": "Assassin", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Assassin" },
        { "name": "Barbarian", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Barbarian" },
        { "name": "Bard", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Bard" },
        { "name": "Battlemage", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Battlemage" },
        { "name": "Crusader", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Crusader" },
        { "name": "Healer", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Healer" },
        { "name": "Knight", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Knight" },
        { "name": "Mage", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Mage" },
        { "name": "Monk", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Monk" },
        { "name": "Nightblade", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Nightblade" },
        { "name": "Pilgrim", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Pilgrim" },
        { "name": "Rogue", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Rogue" },
        { "name": "Scout", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Scout" },
        { "name": "Sorcerer", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Sorcerer" },
        { "name": "Spellsword", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Spellsword" },
        { "name": "Thief", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Thief" },
        { "name": "Warrior", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Warrior" },
        { "name": "Witchhunter", "link": "https://en.uesp.net/wiki/Morrowind:Classes#Witchhunter" }
    ]
}

// Build colors based on fallout pip-boy green theme
const buildColors: Record<string, string> = {
    // Oblivion
    "Custom class": "text-gray-400",
    "Acrobat": "text-pink-400",
    "Agent": "text-purple-400",
    "Archer": "text-green-500",
    "Assassin": "text-red-500",
    "Barbarian": "text-orange-600",
    "Bard": "text-yellow-400",
    "Battlemage": "text-blue-500",
    "Paladin": "text-indigo-500",
    "Healer": "text-teal-400",
    "Knight": "text-yellow-600",
    "Mage": "text-blue-400",
    "Monk": "text-amber-500",
    "Nightblade": "text-purple-500",
    "Pilgrim": "text-stone-400",
    "Rogue": "text-rose-500",
    "Scout": "text-lime-500",
    "Sorcerer": "text-indigo-300",
    "Spellsword": "text-violet-400",
    "Thief": "text-emerald-400",
    "Warrior": "text-red-600",
    "Witchhunter": "text-fuchsia-500",

    // Skyrim
    "Stealth Archer": "text-cyan-300",

    // Morrowind
    "'Acrobat'": "text-pink-400",
    "'Agent'": "text-purple-400",
    "'Archer'": "text-green-500",
    "'Assassin'": "text-red-500",
    "'Barbarian'": "text-orange-600",
    "'Bard'": "text-yellow-400",
    "'Battlemage'": "text-blue-500",
    "'Paladin'": "text-indigo-500",
    "'Healer'": "text-teal-400",
    "'Knight'": "text-yellow-600",
    "'Mage'": "text-blue-400",
    "'Monk'": "text-amber-500",
    "'Nightblade'": "text-purple-500",
    "'Pilgrim'": "text-stone-400",
    "'Rogue'": "text-rose-500",
    "'Scout'": "text-lime-500",
    "'Sorcerer'": "text-indigo-300",
    "'Spellsword'": "text-violet-400",
    "'Thief'": "text-emerald-400",
    "'Warrior'": "text-red-600",
    "'Witchhunter'": "text-fuchsia-500",
}

const moralityColors: Record<Morality, string> = {
    "Good": "text-blue-500",
    "Evil": "text-red-500",
    "Neutral": "text-green-500",
}

function randomizeMorality(): Morality {
    const index = Math.floor(Math.random() * morality.length)
    return morality[index]
}

function randomizeSex(): Sex {
    return sexOptions[Math.floor(Math.random() * sexOptions.length)]
}

function randomizeBuild(game: string): Build {
    const gameBuilds = builds[game]
    return gameBuilds[Math.floor(Math.random() * gameBuilds.length)]
}

const ElderScrolls = () => {
    const [selectedGame, setSelectedGame] = useState<string>("Oblivion")
    const [currentMorality, setMorality] = useState<Morality>('Good')
    const [sex, setSex] = useState<Sex>('Male')
    const [build, setBuild] = useState<Build | null>(null)
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
    const moralityImageSrc: Record<Morality, string> = {
        "Evil": "/images/ElderScrollsMisc/Devil.jpg",
        "Good": "/images/ElderScrollsMisc/good.webp",
        "Neutral": "/images/ElderScrollsMisc/neutral.webp",
    }

    // Sex image paths
    const getSexImageSrc = () => {
        const sexMap: Record<Sex, string> = {
            "Male": "/images/ElderScrollsMisc/male.webp",
            "Female": "/images/ElderScrollsMisc/female.png",
        }
        return sexMap[sex] || "/images/ElderScrollsMisc/male.webp"
    }

    // Build image paths
    const getBuildImageSrc = () => {
        if (!build) return "/images/FalloutBuilds/placeholder.png";

        const buildMap: Record<string, string> = {
            // Oblivion
            "Custom class": "/images/Oblivion/acrobat.webp",
            "Acrobat": "/images/Oblivion/acrobat.webp",
            "Agent": "/images/Oblivion/agent.webp",
            "Archer": "/images/Oblivion/archer.webp",
            "Assassin": "/images/Oblivion/assassin.webp",
            "Barbarian": "/images/Oblivion/barbarian.webp",
            "Bard": "/images/Oblivion/bard.webp",
            "Battlemage": "/images/Oblivion/battlemage.webp",
            "Paladin": "/images/Oblivion/paladin.webp",
            "Healer": "/images/Oblivion/healer.webp",
            "Knight": "/images/Oblivion/knight.webp",
            "Mage": "/images/Oblivion/mage.webp",
            "Monk": "/images/Oblivion/monk.webp",
            "Nightblade": "/images/Oblivion/nightblade.webp",
            "Pilgrim": "/images/Oblivion/pilgrim.webp",
            "Rogue": "/images/Oblivion/rogue.webp",
            "Scout": "/images/Oblivion/scout.webp",
            "Sorcerer": "/images/Oblivion/sorcerer.webp",
            "Spellsword": "/images/Oblivion/spellsword.webp",
            "Thief": "/images/Oblivion/thief.webp",
            "Warrior": "/images/Oblivion/warrior.webp",
            "Witchhunter": "/images/Oblivion/witchhunter.webp",

            // Skyrim
            "Stealth Archer": "/images/Oblivion/archer.webp",

            // Morrowind
            "'Acrobat'": "/images/Oblivion/acrobat.webp",
            "'Agent'": "/images/Oblivion/agent.webp",
            "'Archer'": "/images/Oblivion/archer.webp",
            "'Assassin'": "/images/Oblivion/assassin.webp",
            "'Barbarian'": "/images/Oblivion/barbarian.webp",
            "'Bard'": "/images/Oblivion/bard.webp",
            "'Battlemage'": "/images/Oblivion/battlemage.webp",
            "'Paladin'": "/images/Oblivion/paladin.webp",
            "'Healer'": "/images/Oblivion/healer.webp",
            "'Knight'": "/images/Oblivion/knight.webp",
            "'Mage'": "/images/Oblivion/mage.webp",
            "'Monk'": "/images/Oblivion/monk.webp",
            "'Nightblade'": "/images/Oblivion/nightblade.webp",
            "'Pilgrim'": "/images/Oblivion/pilgrim.webp",
            "'Rogue'": "/images/Oblivion/rogue.webp",
            "'Scout'": "/images/Oblivion/scout.webp",
            "'Sorcerer'": "/images/Oblivion/sorcerer.webp",
            "'Spellsword'": "/images/Oblivion/spellsword.webp",
            "'Thief'": "/images/Oblivion/thief.webp",
            "'Warrior'": "/images/Oblivion/warrior.webp",
            "'Witchhunter'": "/images/Oblivion/witchhunter.webp",
        }
        return buildMap[build.name] || "/images/FalloutBuilds/placeholder.png"
    }

    // Fallout game logos
    const gameImageSrc: Record<string, string> = {
        "Oblivion": "/images/Oblivion/Oblivion-logo.png",
        "Skyrim": "/images/Skyrim/skyrimLogo.png",
        "Morrowind": "/images/Morrowind/morrowind-logo.png",
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{
                backgroundImage: `url(/images/ElderScrollsMisc/${selectedGame.toLowerCase().replace(/[:\s]/g, '')}.jpg)`,
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
                        className="bg-gray-900 bg-opacity-80 rounded-lg p-6 border-2 border-green-800 shadow-lg min-h-[120px] hover:shadow-xl transition-shadow"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: isRolling ? -100 : 0, opacity: isRolling ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                                <img
                                    src={moralityImageSrc[currentMorality]}
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
                        className="bg-gray-900 bg-opacity-80 rounded-lg p-6 border-2 border-green-800 shadow-lg min-h-[120px] hover:shadow-xl transition-shadow"
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
                            className="bg-gray-900 bg-opacity-80 rounded-lg p-6 border-2 border-green-800 shadow-lg min-h-[120px] hover:shadow-xl transition-shadow"
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

export default ElderScrolls;