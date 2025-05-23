import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import wowClassicTItle from "../assets/GameIcons/wowClassicLogo.png";
import RandomizerButton from "./RandomizerButton.tsx";

// --- Logic section (from logic.tsx) ---

const factions = ["Alliance", "Horde"] as const;
type Faction = typeof factions[number];

const hordeRaces = ["Orc", "Tauren", "Undead", "Troll"] as const;
const allianceRaces = ["Human", "Dwarf", "Night Elf", "Gnome"] as const;
type Race = typeof hordeRaces[number] | typeof allianceRaces[number];

const classes = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Warlock", "Druid"] as const;
type Class = typeof classes[number];

const orcClasses = ["Warrior", "Warlock", "Hunter", "Shaman", "Rogue"] as const;
const taurenClasses = ["Warrior", "Druid", "Hunter", "Shaman"] as const;
const undeadClasses = ["Warrior", "Warlock", "Mage", "Priest", "Rogue"] as const;
const trollClasses = ["Warrior", "Priest", "Hunter", "Mage", "Rogue", "Shaman"] as const;

const humanClasses = ["Warrior", "Paladin", "Mage", "Priest", "Rogue", "Warlock"] as const;
const dwarfClasses = ["Warrior", "Paladin", "Hunter", "Priest", "Rogue"] as const;
const nightElfClasses = ["Warrior", "Druid", "Hunter", "Priest", "Rogue"] as const;
const gnomeClasses = ["Warrior", "Mage", "Rogue", "Warlock"] as const;

const professions = ["Mining", "Herbalism", "Blacksmithing", "Alchemy", "Skinning", "Leatherworking", "Tailoring", "Engineering", "Enchanting"] as const;
type Profession = typeof professions[number];

// Class colors based on WoW color scheme
const classColors: Record<Class, string> = {
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

const factionColors: Record<Faction, string> = {
    "Alliance": "text-blue-500",
    "Horde": "text-red-500",
}

function randomizeFaction(): Faction {
    const index = Math.floor(Math.random() * factions.length)
    return factions[index]
}

function randomizeRace(faction: Faction): Race {
    const raceList = faction === "Horde" ? hordeRaces : allianceRaces
    return raceList[Math.floor(Math.random() * raceList.length)]
}

function randomizeClass(race: Race): Class {
    if (race === "Orc") return orcClasses[Math.floor(Math.random() * orcClasses.length)]
    if (race === "Tauren") return taurenClasses[Math.floor(Math.random() * taurenClasses.length)]
    if (race === "Undead") return undeadClasses[Math.floor(Math.random() * undeadClasses.length)]
    if (race === "Troll") return trollClasses[Math.floor(Math.random() * trollClasses.length)]
    if (race === "Human") return humanClasses[Math.floor(Math.random() * humanClasses.length)]
    if (race === "Dwarf") return dwarfClasses[Math.floor(Math.random() * dwarfClasses.length)]
    if (race === "Night Elf") return nightElfClasses[Math.floor(Math.random() * nightElfClasses.length)]
    if (race === "Gnome") return gnomeClasses[Math.floor(Math.random() * gnomeClasses.length)]
    return "Warrior"
}

function randomizeProfessions(): Profession[] {
    const shuffled = [...professions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 2)
}

const WowClassicHardcore = () => {
    const [faction, setFaction] = useState<Faction>('Alliance')
    const [race, setRace] = useState<Race>('Human')
    const [className, setClassName] = useState<Class>('Warrior')
    const [selectedProfessions, setSelectedProfessions] = useState<Profession[]>([])
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
        ? "/images/hordeIcon.png"
        : "/images/allyIcon.png"

    // Hardcoded race image paths
    const getRaceImageSrc = () => {
        const raceMap = {
            "Orc": "/images/WoWRaces/orc.avif",
            "Tauren": "/images/WoWRaces/tauren.jpg",
            "Undead": "/images/WoWRaces/undead.jpg", //Fan Art  🎨 by Shabnam Nekounazar
            "Troll": "/images/WoWRaces/troll.jpg",
            "Human": "/images/WoWRaces/human.jpg",
            "Dwarf": "/images/WoWRaces/dwarf.jpg",
            "Night Elf": "/images/WoWRaces/nelf.avif",
            "Gnome": "/images/WoWRaces/gnome.webp"
        }
        return raceMap[race] || "/images/races/placeholder.png"
    }

    // Hardcoded class image paths
    const getClassImageSrc = () => {
        const classMap = {
            "Warrior": "/images/WoWClasses/warrior.webp",
            "Paladin": "/images/WoWClasses/paladin.webp",
            "Hunter": "/images/WoWClasses/hunter.webp",
            "Rogue": "/images/WoWClasses/rogue.webp",
            "Priest": "/images/WoWClasses/priest.webp",
            "Shaman": "/images/WoWClasses/shaman.webp",
            "Mage": "/images/WoWClasses/mage.webp",
            "Warlock": "/images/WoWClasses/warlock.webp",
            "Druid": "/images/WoWClasses/druid.webp",
        }
        return classMap[className] || "/images/classes/placeholder.png"
    }

    // Hardcoded profession image paths
    const getProfessionImageSrc = (profession: Profession) => {
        const professionMap: Record<Profession, string> = {
            "Mining": "/images/WoWProffesions/mining.webp",
            "Herbalism": "/images/WoWProffesions/herbalism.webp",
            "Blacksmithing": "/images/WoWProffesions/blacksmithing.webp",
            "Alchemy": "/images/WoWProffesions/alchemy.jpg",
            "Skinning": "/images/WoWProffesions/skinning.webp",
            "Leatherworking": "/images/WoWProffesions/leatherworking.webp",
            "Tailoring": "/images/WoWProffesions/tailoring.webp",
            "Engineering": "/images/WoWProffesions/engineering.webp",
            "Enchanting": "/images/WoWProffesions/enchanting.webp",
        }
        return professionMap[profession] || "/images/professions/placeholder.png"
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
                        className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700 shadow-lg min-h-[120px] hover:shadow-xl transition-shadow"
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
                        className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700 shadow-lg min-h-[120px] hover:shadow-xl transition-shadow"
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
                        className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700 shadow-lg min-h-[120px] hover:shadow-xl transition-shadow"
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
                        className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700 shadow-lg min-h-[120px] hover:shadow-xl transition-shadow"
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