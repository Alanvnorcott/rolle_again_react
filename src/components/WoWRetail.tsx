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

    const rollCharacter = () => {
        setTimeout(() => {
            const newFaction = randomizeFaction()
            const newRace = randomizeRace(newFaction)
            const newClass = randomizeClass(newRace, newFaction)
            const newProfessions = randomizeProfessions()

            setFaction(newFaction)
            setRace(newRace)
            setClassName(newClass)
            setSelectedProfessions(newProfessions)
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
        const raceMap: Record<Race, string> = {
            // Horde Races
            "Orc": "src/assets/WoWRaces/orc.avif",
            "Tauren": "src/assets/WoWRaces/tauren.jpg",
            "Undead": "src/assets/WoWRaces/undead.jpg",
            "Troll": "src/assets/WoWRaces/troll.jpg",
            "Blood Elf": "src/assets/WoWRaces/belf.webp",
            "Goblin": "src/assets/WoWRaces/goblin.webp",
            "Nightborne": "src/assets/WoWRaces/nightborne.webp",
            "Highmountain Tauren": "src/assets/WoWRaces/hmtauren.jpg",
            "Mag'har Orc": "src/assets/WoWRaces/magorc.webp",
            "Zandalari Troll": "src/assets/WoWRaces/ztroll.jpg",
            "Vulpera": "src/assets/WoWRaces/vulpera.jpg",

            // Alliance Races
            "Human": "src/assets/WoWRaces/human.jpg",
            "Dwarf": "src/assets/WoWRaces/dwarf.jpg",
            "Night Elf": "src/assets/WoWRaces/nelf.avif",
            "Gnome": "src/assets/WoWRaces/gnome.webp",
            "Draenei": "src/assets/WoWRaces/draenei.jpg",
            "Worgen": "src/assets/WoWRaces/worgen.webp",
            "Void Elf": "src/assets/WoWRaces/velf.webp",
            "Lightforged Draenei": "src/assets/WoWRaces/lightforged.webp",
            "Dark Iron Dwarf": "src/assets/WoWRaces/darkiron.webp",
            "Kul Tiran": "src/assets/WoWRaces/kultiran.webp",
            "Mechagnome": "src/assets/WoWRaces/mechagnome.webp",

            // Shared Races
            "Pandaren": "src/assets/WoWRaces/pandaren.jpg",
            "Dracthyr": "src/assets/WoWRaces/dracthyr.webp"
        }
        return raceMap[race] || "src/assets/races/placeholder.png"
    }

    // Class image paths
    const getClassImageSrc = () => {
        const classMap: Record<Class, string> = {
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
    const getProfessionImageSrc = (profession: Profession) => {
        const professionMap: Record<Profession, string> = {
            "Mining": "src/assets/WoWProffesions/mining.webp",
            "Herbalism": "src/assets/WoWProffesions/herbalism.webp",
            "Blacksmithing": "src/assets/WoWProffesions/blacksmithing.webp",
            "Alchemy": "src/assets/WoWProffesions/alchemy.jpg",
            "Skinning": "src/assets/WoWProffesions/skinning.webp",
            "Leatherworking": "src/assets/WoWProffesions/leatherworking.webp",
            "Tailoring": "src/assets/WoWProffesions/tailoring.webp",
            "Engineering": "src/assets/WoWProffesions/engineering.webp",
            "Enchanting": "src/assets/WoWProffesions/enchanting.webp",
            "Jewelcrafting": "src/assets/WoWProffesions/jewlcrafting.jpg",
            "Archaeology": "src/assets/WoWProffesions/archaeology.webp",
            "Cooking": "src/assets/WoWProffesions/cooking.webp",
            "Fishing": "src/assets/WoWProffesions/fishing.webp",
            "First Aid": "src/assets/WoWProffesions/firstaid.webp"
        }
        return professionMap[profession] || "src/assets/professions/placeholder.png"
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <div className="text-center mb-8">
                <img src={wowRetailTitle} alt="WoW Retail" className="w-64 h-auto mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">WoW Retail Character Randomizer</h1>
                <p className="text-gray-400">Click the button below to randomize your character!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {/* Faction Card */}
                <motion.div
                    className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={`text-xl font-bold mb-4 ${factionColors[faction]}`}>Faction</h2>
                    <div className="flex items-center justify-center">
                        <img
                            src={factionImageSrc}
                            alt={faction}
                            className="w-32 h-32 object-contain"
                        />
                    </div>
                    <p className="text-center mt-4 text-lg">{faction}</p>
                </motion.div>

                {/* Race Card */}
                <motion.div
                    className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 className="text-xl font-bold mb-4 text-purple-400">Race</h2>
                    <div className="flex items-center justify-center">
                        <img
                            src={getRaceImageSrc()}
                            alt={race}
                            className="w-32 h-32 object-contain"
                        />
                    </div>
                    <p className="text-center mt-4 text-lg">{race}</p>
                </motion.div>

                {/* Class Card */}
                <motion.div
                    className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className={`text-xl font-bold mb-4 ${classColors[className]}`}>Class</h2>
                    <div className="flex items-center justify-center">
                        <img
                            src={getClassImageSrc()}
                            alt={className}
                            className="w-32 h-32 object-contain"
                        />
                    </div>
                    <p className="text-center mt-4 text-lg">{className}</p>
                </motion.div>

                {/* Professions Card */}
                <motion.div
                    className="bg-gray-800 rounded-lg p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="text-xl font-bold mb-4 text-yellow-400">Professions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {selectedProfessions.map((profession, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img
                                    src={getProfessionImageSrc(profession)}
                                    alt={profession}
                                    className="w-16 h-16 object-contain"
                                />
                                <p className="text-center mt-2 text-sm">{profession}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="mt-8">
                <RandomizerButton onRoll={rollCharacter} />
            </div>
        </div>
    )
}

export default WoWRetail