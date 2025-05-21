import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import wowRetailTitle from "../assets/GameIcons/wowRetailLogo.png";
import RandomizerButton from "./RandomizerButton.tsx";

// --- Logic section (updated for Retail) ---

const factions = ["Alliance", "Horde"] as const;
type Faction = typeof factions[number];

const hordeRaces = ["Orc", "Tauren", "Undead", "Troll", "Blood Elf", "Goblin", "Nightborne", "Highmountain Tauren", "Mag'har Orc", "Zandalari Troll", "Vulpera", "Pandaren", "Dracthyr"] as const;
const allianceRaces = ["Human", "Dwarf", "Night Elf", "Gnome", "Draenei", "Worgen", "Void Elf", "Lightforged Draenei", "Dark Iron Dwarf", "Kul Tiran", "Mechagnome", "Pandaren", "Dracthyr"] as const;
type Race = typeof hordeRaces[number] | typeof allianceRaces[number];

const classes = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Warlock", "Druid", "Death Knight", "Monk", "Demon Hunter", "Evoker"] as const;
type Class = typeof classes[number];

// Class availability by race for Horde
const orcClasses = ["Warrior", "Hunter", "Rogue", "Shaman", "Warlock", "Mage", "Monk", "Death Knight"] as const;
const taurenClasses = ["Warrior", "Paladin", "Hunter", "Shaman", "Druid", "Monk", "Priest", "Death Knight"] as const;
const undeadClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Death Knight"] as const;
const trollClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Warlock", "Mage", "Druid", "Monk", "Death Knight"] as const;
const bloodElfClasses = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Demon Hunter", "Death Knight"] as const;
const goblinClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Warlock", "Mage", "Death Knight"] as const;
const nightborneClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Death Knight"] as const;
const highmountainTaurenClasses = ["Warrior", "Hunter", "Shaman", "Druid", "Monk", "Death Knight"] as const;
const magharOrcClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Monk", "Death Knight"] as const;
const zandalariTrollClasses = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Druid", "Monk", "Death Knight"] as const;
const vulperaClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Warlock", "Mage", "Monk", "Death Knight"] as const;
const hordePandarenClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Monk", "Death Knight"] as const;
const hordeDracthyrClasses = ["Evoker", "Hunter", "Rogue", "Priest", "Mage", "Warrior", "Warlock"] as const;

// Class availability by race for Alliance
const humanClasses = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Death Knight"] as const;
const dwarfClasses = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman", "Warlock", "Mage", "Monk", "Death Knight"] as const;
const nightElfClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Mage", "Druid", "Monk", "Demon Hunter", "Death Knight"] as const;
const gnomeClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Death Knight"] as const;
const draeneiClasses = ["Warrior", "Paladin", "Hunter", "Priest", "Shaman", "Mage", "Monk", "Death Knight"] as const;
const worgenClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Druid", "Warlock", "Mage", "Death Knight"] as const;
const voidElfClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Death Knight"] as const;
const lightforgedDraeneiClasses = ["Warrior", "Paladin", "Hunter", "Priest", "Mage", "Death Knight"] as const;
const darkIronDwarfClasses = ["Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Shaman", "Warlock", "Mage", "Monk", "Death Knight"] as const;
const kulTiranClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Druid", "Mage", "Monk", "Death Knight"] as const;
const mechagnomeClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Warlock", "Mage", "Monk", "Death Knight"] as const;
const alliancePandarenClasses = ["Warrior", "Hunter", "Rogue", "Priest", "Shaman", "Mage", "Monk", "Death Knight"] as const;
const allianceDracthyrClasses = ["Evoker", "Hunter", "Rogue", "Priest", "Mage", "Warrior", "Warlock"] as const;

// Updated professions for Retail
const professions = [
    // Primary Professions
    "Alchemy", "Blacksmithing", "Enchanting", "Engineering",
    "Herbalism", "Jewelcrafting", "Leatherworking",
    "Mining", "Skinning", "Tailoring", "Archaeology",
    // Secondary Professions
    "Cooking", "Fishing", "First Aid"
] as const;
type Profession = typeof professions[number];

// Class colors based on WoW color scheme (expanded)
const classColors: Record<Class, string> = {
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

function randomizeClass(race: Race, faction: Faction): Class {
    // For races that can be both Alliance and Horde, we need to specify which faction's class list to use
    if (race === "Pandaren") {
        return faction === "Horde"
            ? hordePandarenClasses[Math.floor(Math.random() * hordePandarenClasses.length)]
            : alliancePandarenClasses[Math.floor(Math.random() * alliancePandarenClasses.length)]
    }

    // All other races
    let classList: readonly Class[]
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

        default: classList = ["Warrior"] as const; // Fallback
    }

    return classList[Math.floor(Math.random() * classList.length)]
}

function randomizeProfessions(): Profession[] {
    // Filter for primary professions only
    const primaryProfessions = professions.filter(prof =>
        !["Cooking", "Fishing", "First Aid", "Archaeology"].includes(prof)
    )
    const shuffled = [...primaryProfessions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 2) // Pick 2 primary professions
}

const WoWRetail = () => {
    const [faction, setFaction] = useState<Faction>('Alliance')
    const [race, setRace] = useState<Race>('Human')
    const [className, setClassName] = useState<Class>('Warrior')
    const [selectedProfessions, setSelectedProfessions] = useState<Profession[]>([])
    const [isRolling, setIsRolling] = useState(false)

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
        ? "/images/hordeIcon.png"
        : "/images/allyIcon.png"

    // Race image paths - update with actual paths when available
    const getRaceImageSrc = () => {
        const raceMap: Record<Race, string> = {
            // Horde Races
            "Orc": "/images/WoWRaces/orc.avif",
            "Tauren": "/images/WoWRaces/tauren.jpg",
            "Undead": "/images/WoWRaces/undead.jpg",
            "Troll": "/images/WoWRaces/troll.jpg",
            "Blood Elf": "/images/WoWRaces/belf.webp",
            "Goblin": "/images/WoWRaces/goblin.webp",
            "Nightborne": "/images/WoWRaces/nightborne.webp",
            "Highmountain Tauren": "/images/WoWRaces/hmtauren.jpg",
            "Mag'har Orc": "/images/WoWRaces/magorc.webp",
            "Zandalari Troll": "/images/WoWRaces/ztroll.jpg",
            "Vulpera": "/images/WoWRaces/vulpera.jpg",

            // Alliance Races
            "Human": "/images/WoWRaces/human.jpg",
            "Dwarf": "/images/WoWRaces/dwarf.jpg",
            "Night Elf": "/images/WoWRaces/nelf.avif",
            "Gnome": "/images/WoWRaces/gnome.webp",
            "Draenei": "/images/WoWRaces/draenei.jpg",
            "Worgen": "/images/WoWRaces/worgen.webp",
            "Void Elf": "/images/WoWRaces/velf.webp",
            "Lightforged Draenei": "/images/WoWRaces/lightforged.webp",
            "Dark Iron Dwarf": "/images/WoWRaces/darkiron.webp",
            "Kul Tiran": "/images/WoWRaces/kultiran.webp",
            "Mechagnome": "/images/WoWRaces/mechagnome.webp",

            // Shared Races
            "Pandaren": "/images/WoWRaces/pandaren.jpg",
            "Dracthyr": "/images/WoWRaces/dracthyr.webp"
        }
        return raceMap[race] || "/images/races/placeholder.png"
    }

    // Class image paths
    const getClassImageSrc = () => {
        const classMap: Record<Class, string> = {
            "Warrior": "/images/WoWClasses/warrior.webp",
            "Paladin": "/images/WoWClasses/paladin.webp",
            "Hunter": "/images/WoWClasses/hunter.webp",
            "Rogue": "/images/WoWClasses/rogue.webp",
            "Priest": "/images/WoWClasses/priest.webp",
            "Shaman": "/images/WoWClasses/shaman.webp",
            "Mage": "/images/WoWClasses/mage.webp",
            "Warlock": "/images/WoWClasses/warlock.webp",
            "Druid": "/images/WoWClasses/druid.webp",
            "Death Knight": "/images/WoWClasses/dk.webp",
            "Monk": "/images/WoWClasses/monk.webp",
            "Demon Hunter": "/images/WoWClasses/demonhunter.webp",
            "Evoker": "/images/WoWClasses/evoker.png"
        }
        return classMap[className] || "/images/classes/placeholder.png"
    }

    // Profession image paths
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
            "Jewelcrafting": "/images/WoWProffesions/jewlcrafting.jpg",
            "Archaeology": "/images/WoWProffesions/archaeology.webp",
            "Cooking": "/images/WoWProffesions/cooking.webp",
            "Fishing": "/images/WoWProffesions/fishing.webp",
            "First Aid": "/images/WoWProffesions/firstaid.webp"
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
                <img className="mx-auto max-h-36 w-auto drop-shadow-xl visible" src={wowRetailTitle} alt="Title" />
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
                                    alt={`Faction: ${faction}`}
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
                                    alt={`Race: ${race}`}
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
                                    alt={`Class: ${className}`}
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
                                            alt={`Profession: ${profession}`}
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
                <RandomizerButton onRoll={rollCharacter} />
            </div>
        </div>
    )
}

export default WoWRetail