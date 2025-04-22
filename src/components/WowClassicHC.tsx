import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import wowClassicTItle from "../assets/GameIcons/wowClassicLogo.png";
import wowRetailTitle from "../assets/GameIcons/wowRetailLogo.png";
import RandomizerButton from "./RandomizerButton.tsx";

// --- Logic section (from logic.tsx) ---

const factions = ["Alliance", "Horde"]

const hordeRaces = ["Orc", "Tauren", "Undead", "Troll"]
const allianceRaces = ["Human", "Dwarf", "Night Elf", "Gnome"]

const orcClasses = ["Warrior", "Warlock", "Hunter", "Shaman", "Rogue"]
const taurenClasses = ["Warrior", "Druid", "Hunter", "Shaman"]
const undeadClasses = ["Warrior", "Warlock", "Mage", "Priest", "Rogue"]
const trollClasses = ["Warrior", "Priest", "Hunter", "Mage", "Rogue", "Shaman"]

const humanClasses = ["Warrior", "Paladin", "Mage", "Priest", "Rogue", "Warlock"]
const dwarfClasses = ["Warrior", "Paladin", "Hunter", "Priest", "Rogue"]
const nightElfClasses = ["Warrior", "Druid", "Hunter", "Priest", "Rogue"]
const gnomeClasses = ["Warrior", "Mage", "Rogue", "Warlock"]

const professions = ["Mining", "Herbalism", "Blacksmithing", "Alchemy", "Skinning", "Leatherworking", "Tailoring", "Engineering", "Enchanting"]

// Class colors based on WoW color scheme
const classColors = {
    "Warrior": "text-orange-500",
    "Paladin": "text-pink-300",
    "Hunter": "text-green-500",
    "Rogue": "text-yellow-300",
    "Priest": "text-gray-200",
    "Shaman": "text-blue-300",
    "Mage": "text-cyan-300",
    "Warlock": "text-purple-400",
    "Druid": "text-amber-600"
}

const factionColors = {
    "Alliance": "text-blue-500",
    "Horde": "text-red-500",
}

function randomizeFaction() {
    const index = Math.floor(Math.random() * factions.length)
    return factions[index]
}

function randomizeRace(faction: string) : string {
    let race
    if (faction === "Horde") {
        race = hordeRaces[Math.floor(Math.random() * hordeRaces.length)]
    } else {
        race = allianceRaces[Math.floor(Math.random() * allianceRaces.length)]
    }
    return race
}

function randomizeClass(race: string) {
    if (race === "Orc") return orcClasses[Math.floor(Math.random() * orcClasses.length)]
    if (race === "Tauren") return taurenClasses[Math.floor(Math.random() * taurenClasses.length)]
    if (race === "Undead") return undeadClasses[Math.floor(Math.random() * undeadClasses.length)]
    if (race === "Troll") return trollClasses[Math.floor(Math.random() * trollClasses.length)]
    if (race === "Human") return humanClasses[Math.floor(Math.random() * humanClasses.length)]
    if (race === "Dwarf") return dwarfClasses[Math.floor(Math.random() * dwarfClasses.length)]
    if (race === "Night Elf") return nightElfClasses[Math.floor(Math.random() * nightElfClasses.length)]
    if (race === "Gnome") return gnomeClasses[Math.floor(Math.random() * gnomeClasses.length)]
    return ""
}

function randomizeProfessions() {
    const shuffled = [...professions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 2)
}

const WowClassicHardcore = () => {
    const [faction, setFaction] = useState('')
    const [race, setRace] = useState('')
    const [className, setClassName] = useState('')
    const [selectedProfessions, setSelectedProfessions] = useState([])
    const [isRolling, setIsRolling] = useState(true)

    const rollCharacter = () => {
        setIsRolling(true)

        setTimeout(() => {
            const newFaction = randomizeFaction()
            const newRace = randomizeRace(newFaction)
            const newClass = randomizeClass(newRace)
            const newProfessions = randomizeProfessions()

            setFaction(newFaction)
            setRace(newRace)
            setClassName(newClass)
            setSelectedProfessions(newProfessions)
            setIsRolling(false)
        }, 500)
    }

    useEffect(() => {
        rollCharacter()
    }, [])

    // Hardcoded faction image paths
    const factionImageSrc = faction === "Horde"
        ? "src/assets/hordeIcon.png"
        : "src/assets/allyIcon.png"

    // Hardcoded race image paths
    const getRaceImageSrc = () => {
        const raceMap = {
            "Orc": "src/assets/WoWRaces/orc.avif",
            "Tauren": "src/assets/WoWRaces/tauren.jpg",
            "Undead": "src/assets/WoWRaces/undead.jpg", //Fan Art  🎨 by Shabnam Nekounazar
            "Troll": "src/assets/WoWRaces/troll.jpg",
            "Human": "src/assets/WoWRaces/human.jpg",
            "Dwarf": "src/assets/WoWRaces/dwarf.jpg",
            "Night Elf": "src/assets/WoWRaces/nelf.avif",
            "Gnome": "src/assets/WoWRaces/gnome.webp"
        }
        return raceMap[race] || "src/assets/races/placeholder.png"
    }

    // Hardcoded class image paths
    const getClassImageSrc = () => {
        const classMap = {
            "Warrior": "src/assets/WoWClasses/warrior.webp",
            "Paladin": "src/assets/WoWClasses/paladin.webp",
            "Hunter": "src/assets/WoWClasses/hunter.webp",
            "Rogue": "src/assets/WoWClasses/rogue.webp",
            "Priest": "src/assets/WoWClasses/priest.webp",
            "Shaman": "src/assets/WoWClasses/shaman.webp",
            "Mage": "src/assets/WoWClasses/mage.webp",
            "Warlock": "src/assets/WoWClasses/warlock.webp",
            "Druid": "src/assets/WoWClasses/druid.webp",
        }
        return classMap[className] || "/assets/classes/placeholder.png"
    }

    // Hardcoded profession image paths
    const getProfessionImageSrc = (profession) => {
        const professionMap = {
            "Mining": "src/assets/WoWProffesions/mining.webp",
            "Herbalism": "src/assets/WoWProffesions/herbalism.webp",
            "Blacksmithing": "src/assets/WoWProffesions/blacksmithing.webp",
            "Alchemy": "src/assets/WoWProffesions/alchemy.jpg",
            "Skinning": "src/assets/WoWProffesions/skinning.webp",
            "Leatherworking": "src/assets/WoWProffesions/leatherworking.webp",
            "Tailoring": "src/assets/WoWProffesions/tailoring.webp",
            "Engineering": "src/assets/WoWProffesions/engineering.webp",
            "Enchanting": "src/assets/WoWProffesions/enchanting.webp",
        }
        return professionMap[profession] || "/assets/professions/placeholder.png"
    }

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{
                backgroundImage: !isRolling && race ? `url(${getRaceImageSrc()})` : 'none',
                backgroundColor: isRolling ? 'black' : undefined
            }}
        >
            <div className="invisible text-center">
                <img className="mx-auto max-h-36 w-auto drop-shadow-xl visible" src={wowClassicTItle} alt="Title" />
            </div>


            {/* Main Content */}
            <div className="flex-1 flex flex-col p-4 md:p-8 gap-6 max-w-2xl mx-auto w-full">
                {/* Character Info */}
                <div className="space-y-8 w-full">
                    {/* Faction */}
                    <motion.div
                        className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700 shadow-lg"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: isRolling ? -100 : 0, opacity: isRolling ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                                <img
                                    src={factionImageSrc}
                                    alt={faction}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm uppercase tracking-wider">Faction</h3>
                                <p className={`text-2xl font-medium ${factionColors[faction] || "text-white"}`}>{faction}</p>
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

                    {/* Professions */}
                    <motion.div
                        className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700 shadow-lg"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: isRolling ? -100 : 0, opacity: isRolling ? 0 : 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Professions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedProfessions.map((profession, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                                        <img
                                            src={getProfessionImageSrc(profession)}
                                            alt={profession}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-lg text-yellow-200">{profession}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer with Roll Button */}
            <div className="bg-gradient-to-b from-[#3e2c20] to-[#1c1b18] py-4 border-b border-[#a97142] shadow-inner text-center">
                <RandomizerButton onRoll={() => rollCharacter()} />
            </div>
        </div>
    )
}

export default WowClassicHardcore