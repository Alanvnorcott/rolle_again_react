import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// --- Logic section (updated for Retail) ---

const factions = ["Alliance", "Horde"]

const hordeRaces = ["Orc", "Tauren", "Undead", "Troll", "Blood Elf", "Goblin", "Nightborne", "Highmountain Tauren", "Mag'har Orc", "Zandalari Troll", "Vulpera", "Pandaren", "Dracthyr"]
const allianceRaces = ["Human", "Dwarf", "Night Elf", "Gnome", "Draenei", "Worgen", "Void Elf", "Lightforged Draenei", "Dark Iron Dwarf", "Kul Tiran", "Mechagnome", "Pandaren", "Dracthyr"]

// Class availability by race for Horde
const orcClasses = ["Warrior", "Hunter", "Rogue", "Shaman", "Warlock", "Mage", "Monk", "Death Knight"]
const taurenClasses = ["Warrior", "Paladin", "Hunter", "Shaman", "Druid", "Monk", "Priest", "Death Knight"]
const undeadClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Death Knight"]
const trollClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Warlock", "Mage", "Druid", "Monk", "Death Knight"]
const bloodElfClasses = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Demon Hunter", "Death Knight"]
const goblinClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Warlock", "Mage", "Death Knight"]
const nightborneClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Death Knight"]
const highmountainTaurenClasses = ["Warrior", "Hunter", "Shaman", "Druid", "Monk", "Death Knight"]
const magharOrcClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Monk", "Death Knight"]
const zandalariTrollClasses = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Druid", "Monk", "Death Knight"]
const vulperaClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Warlock", "Mage", "Monk", "Death Knight"]
const hordePandarenClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Monk", "Death Knight"]
const hordeDracthyrClasses = ["Evoker", "Hunter", "Rogue", "Priest", "Mage", "Warrior", "Warlock"]


// Class availability by race for Alliance
const humanClasses = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Death Knight"]
const dwarfClasses = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman", "Warlock", "Mage", "Monk", "Death Knight"]
const nightElfClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Mage", "Druid", "Monk", "Demon Hunter", "Death Knight"]
const gnomeClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Death Knight"]
const draeneiClasses = ["Warrior", "Paladin", "Hunter", "Priest", "Shaman", "Mage", "Monk", "Death Knight"]
const worgenClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Druid", "Warlock", "Mage", "Death Knight"]
const voidElfClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Death Knight"]
const lightforgedDraeneiClasses = ["Warrior", "Paladin", "Hunter", "Priest", "Mage", "Death Knight"]
const darkIronDwarfClasses = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman", "Warlock", "Mage", "Monk", "Death Knight"]
const kulTiranClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Druid", "Mage", "Monk", "Death Knight"]
const mechagnomeClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Death Knight"]
const alliancePandarenClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Monk", "Death Knight"]
const allianceDracthyrClasses = ["Evoker", "Hunter", "Rogue", "Priest", "Mage", "Warrior", "Warlock"]

// Updated professions for Retail
const professions = [
    // Primary Professions
    "Alchemy", "Blacksmithing", "Enchanting", "Engineering",
    "Herbalism", "Jewelcrafting", "Leatherworking",
    "Mining", "Skinning", "Tailoring", "Archaeology",
    // Secondary Professions
    "Cooking", "Fishing", "First Aid"
]

// Class colors based on WoW color scheme (expanded)
const classColors = {
    "Warrior": "text-orange-500",
    "Paladin": "text-pink-300",
    "Hunter": "text-green-500",
    "Rogue": "text-yellow-300",
    "Priest": "text-gray-200",
    "Shaman": "text-blue-300",
    "Mage": "text-cyan-300",
    "Warlock": "text-purple-400",
    "Druid": "text-amber-600",
    "Death Knight": "text-red-600",
    "Monk": "text-emerald-400",
    "Demon Hunter": "text-purple-600",
    "Evoker": "text-emerald-600"
}

const factionColors = {
    "Alliance": "text-blue-500",
    "Horde": "text-red-500",
}

function randomizeFaction() {
    const index = Math.floor(Math.random() * factions.length)
    return factions[index]
}

function randomizeRace(faction) {
    let raceList = faction === "Horde" ? hordeRaces : allianceRaces
    return raceList[Math.floor(Math.random() * raceList.length)]
}

function randomizeClass(race, faction) {
    // For races that can be both Alliance and Horde, we need to specify which faction's class list to use
    if (race === "Pandaren") {
        return faction === "Horde"
            ? hordePandarenClasses[Math.floor(Math.random() * hordePandarenClasses.length)]
            : alliancePandarenClasses[Math.floor(Math.random() * alliancePandarenClasses.length)]
    }


    // All other races
    let classList
    switch(race) {
        // Horde races
        case "Orc": classList = orcClasses; break
        case "Tauren": classList = taurenClasses; break
        case "Undead": classList = undeadClasses; break
        case "Troll": classList = trollClasses; break
        case "Blood Elf": classList = bloodElfClasses; break
        case "Goblin": classList = goblinClasses; break
        case "Nightborne": classList = nightborneClasses; break
        case "Highmountain Tauren": classList = highmountainTaurenClasses; break
        case "Mag'har Orc": classList = magharOrcClasses; break
        case "Zandalari Troll": classList = zandalariTrollClasses; break
        case "Vulpera": classList = vulperaClasses; break
        case "Dracthyr": classList = hordeDracthyrClasses; break

        // Alliance races
        case "Human": classList = humanClasses; break
        case "Dwarf": classList = dwarfClasses; break
        case "Night Elf": classList = nightElfClasses; break
        case "Gnome": classList = gnomeClasses; break
        case "Draenei": classList = draeneiClasses; break
        case "Worgen": classList = worgenClasses; break
        case "Void Elf": classList = voidElfClasses; break
        case "Lightforged Draenei": classList = lightforgedDraeneiClasses; break
        case "Dark Iron Dwarf": classList = darkIronDwarfClasses; break
        case "Kul Tiran": classList = kulTiranClasses; break
        case "Mechagnome": classList = mechagnomeClasses; break
        case "Dracthyr": classList = allianceDracthyrClasses; break

        default: classList = ["Warrior"]; // Fallback
    }

    return classList[Math.floor(Math.random() * classList.length)]
}

function randomizeProfessions() {
    // Filter for primary professions only
    const primaryProfessions = professions.filter(prof =>
        !["Cooking", "Fishing", "First Aid", "Archaeology"].includes(prof)
    )
    const shuffled = [...primaryProfessions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 2) // Pick 2 primary professions
}

const WoWRetail = () => {
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
            const newClass = randomizeClass(newRace, newFaction)
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

    // Faction image paths
    const factionImageSrc = faction === "Horde"
        ? "src/assets/hordeIcon.png"
        : "src/assets/allyIcon.png"

    // Race image paths - update with actual paths when available
    const getRaceImageSrc = () => {
        const raceMap = {
            // Horde Races
            "Orc": "src/assets/WoWRaces/orc.avif",
            "Tauren": "src/assets/WoWRaces/tauren.jpg",
            "Undead": "src/assets/WoWRaces/undead.jpg",
            "Troll": "src/assets/WoWRaces/troll.jpg",
            "Blood Elf": "src/assets/WoWRaces/bloodelf.jpg",
            "Goblin": "src/assets/WoWRaces/goblin.jpg",
            "Nightborne": "src/assets/WoWRaces/nightborne.jpg",
            "Highmountain Tauren": "src/assets/WoWRaces/hmtauren.jpg",
            "Mag'har Orc": "src/assets/WoWRaces/maghar.jpg",
            "Zandalari Troll": "src/assets/WoWRaces/zandalari.jpg",
            "Vulpera": "src/assets/WoWRaces/vulpera.jpg",

            // Alliance Races
            "Human": "src/assets/WoWRaces/human.jpg",
            "Dwarf": "src/assets/WoWRaces/dwarf.jpg",
            "Night Elf": "src/assets/WoWRaces/nelf.avif",
            "Gnome": "src/assets/WoWRaces/gnome.webp",
            "Draenei": "src/assets/WoWRaces/draenei.jpg",
            "Worgen": "src/assets/WoWRaces/worgen.jpg",
            "Void Elf": "src/assets/WoWRaces/voidelf.jpg",
            "Lightforged Draenei": "src/assets/WoWRaces/lightforged.jpg",
            "Dark Iron Dwarf": "src/assets/WoWRaces/darkiron.jpg",
            "Kul Tiran": "src/assets/WoWRaces/kultiran.jpg",
            "Mechagnome": "src/assets/WoWRaces/mechagnome.jpg",

            // Shared Races
            "Pandaren": "src/assets/WoWRaces/pandaren.jpg",
            "Dracthyr": "src/assets/WoWRaces/dracthyr.jpg"
        }
        return raceMap[race] || "src/assets/races/placeholder.png"
    }

    // Class image paths
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
            "Death Knight": "src/assets/WoWClasses/dk.webp",
            "Monk": "src/assets/WoWClasses/monk.webp",
            "Demon Hunter": "src/assets/WoWClasses/demonhunter.webp",
            "Evoker": "src/assets/WoWClasses/evoker.png"
        }
        return classMap[className] || "src/assets/classes/placeholder.png"
    }

    // Profession image paths
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
            "Jewelcrafting": "src/assets/WoWProffesions/jewelcrafting.webp",
            "Inscription": "src/assets/WoWProffesions/inscription.webp",
            "Archaeology": "src/assets/WoWProffesions/archaeology.webp",
            "Cooking": "src/assets/WoWProffesions/cooking.webp",
            "Fishing": "src/assets/WoWProffesions/fishing.webp",
            "First Aid": "src/assets/WoWProffesions/firstaid.webp"
        }
        return professionMap[profession] || "src/assets/professions/placeholder.png"
    }

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{
                backgroundImage: !isRolling && race ? `url(${getRaceImageSrc()})` : 'none',
                backgroundColor: isRolling ? 'black' : undefined
            }}
        >
            <div className="bg-gradient-to-b from-amber-600 to-red-800 py-4 border-b border-amber-900 shadow-inner text-center">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-red-700 tracking-wide drop-shadow-sm">
                    WoW Retail
                </h1>
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
            <div className="bg-gradient-to-b from-amber-600 to-red-800 py-4 border-t border-amber-900 shadow-inner text-center">
                <button
                    onClick={rollCharacter}
                    disabled={isRolling}
                    className="w-full max-w-md mx-auto py-4 bg-red-900 hover:bg-red-800 text-red-100 font-bold uppercase rounded-md border-b-4 border-red-950 hover:border-red-900 transition-colors flex items-center justify-center gap-2"
                >
                    {isRolling ? (
                        <>
                            <span className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></span>
                            Rolling...
                        </>
                    ) : (
                        'Roll New Character'
                    )}
                </button>
            </div>
        </div>
    )
}

export default WoWRetail