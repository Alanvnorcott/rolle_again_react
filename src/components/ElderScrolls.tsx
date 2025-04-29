import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import RandomizerButton from "./RandomizerButton.tsx";

// --- Types ---
type Game = "Elder Scrolls Online" | "Skyrim" | "Oblivion"
type Morality = "Good" | "Evil" | "Neutral"
type Sex = "Male" | "Female"

interface Build {
    name: string;
    link: string;
}

interface Builds {
    [key: string]: Build[];
}

interface BuildColors {
    [key: string]: string;
}

interface MoralityColors {
    [key: string]: string;
}

// --- Logic section ---

const morality: Morality[] = ["Good", "Evil", "Neutral"]

const sexOptions: Sex[] = ["Male", "Female"]

// Builds categorized by game with their wiki links
const builds: Builds = {
    "Elder Scrolls Online": [
        { name: "ESO_Dragonknight", link: "https://elderscrolls.fandom.com/wiki/Dragonknight" },
        { name: "ESO_Nightblade", link: "https://elderscrolls.fandom.com/wiki/Nightblade" },
        { name: "ESO_Sorcerer", link: "https://elderscrolls.fandom.com/wiki/Sorcerer" },
        { name: "ESO_Templar", link: "https://elderscrolls.fandom.com/wiki/Templar" },
        { name: "ESO_Warden", link: "https://elderscrolls.fandom.com/wiki/Warden" },
        { name: "ESO_Necromancer", link: "https://elderscrolls.fandom.com/wiki/Necromancer" },
        { name: "ESO_Arcanist", link: "https://elderscrolls.fandom.com/wiki/Arcanist" }
    ],
    "Skyrim": [
        { name: "Skyrim_Warrior", link: "https://elderscrolls.fandom.com/wiki/Warrior_(Skyrim)" },
        { name: "Skyrim_Mage", link: "https://elderscrolls.fandom.com/wiki/Mage_(Skyrim)" },
        { name: "Skyrim_Thief", link: "https://elderscrolls.fandom.com/wiki/Thief_(Skyrim)" },
        { name: "Skyrim_Assassin", link: "https://elderscrolls.fandom.com/wiki/Assassin_(Skyrim)" },
        { name: "Skyrim_Battlemage", link: "https://elderscrolls.fandom.com/wiki/Battlemage_(Skyrim)" },
        { name: "Skyrim_Spellsword", link: "https://elderscrolls.fandom.com/wiki/Spellsword_(Skyrim)" },
        { name: "Skyrim_Nightblade", link: "https://elderscrolls.fandom.com/wiki/Nightblade_(Skyrim)" },
        { name: "Skyrim_StealthArcher", link: "https://elderscrolls.fandom.com/wiki/Stealth_Archer" },
        { name: "Skyrim_Paladin", link: "https://elderscrolls.fandom.com/wiki/Paladin_(Skyrim)" },
        { name: "Skyrim_Berserker", link: "https://elderscrolls.fandom.com/wiki/Berserker_(Skyrim)" }
    ],
    "Oblivion": [
        { name: "Oblivion_Warrior", link: "https://elderscrolls.fandom.com/wiki/Warrior_(Oblivion)" },
        { name: "Oblivion_Mage", link: "https://elderscrolls.fandom.com/wiki/Mage_(Oblivion)" },
        { name: "Oblivion_Thief", link: "https://elderscrolls.fandom.com/wiki/Thief_(Oblivion)" },
        { name: "Oblivion_Assassin", link: "https://elderscrolls.fandom.com/wiki/Assassin_(Oblivion)" },
        { name: "Oblivion_Battlemage", link: "https://elderscrolls.fandom.com/wiki/Battlemage_(Oblivion)" },
        { name: "Oblivion_Spellsword", link: "https://elderscrolls.fandom.com/wiki/Spellsword_(Oblivion)" },
        { name: "Oblivion_Nightblade", link: "https://elderscrolls.fandom.com/wiki/Nightblade_(Oblivion)" },
        { name: "Oblivion_Archer", link: "https://elderscrolls.fandom.com/wiki/Archer_(Oblivion)" },
        { name: "Oblivion_Paladin", link: "https://elderscrolls.fandom.com/wiki/Paladin_(Oblivion)" },
        { name: "Oblivion_Berserker", link: "https://elderscrolls.fandom.com/wiki/Berserker_(Oblivion)" }
    ]
}

// Build colors based on Elder Scrolls theme
type BuildColorKey = 
    | "ESO_Dragonknight" | "ESO_Nightblade" | "ESO_Sorcerer" | "ESO_Templar" | "ESO_Warden" | "ESO_Necromancer" | "ESO_Arcanist"
    | "Skyrim_Warrior" | "Skyrim_Mage" | "Skyrim_Thief" | "Skyrim_Assassin" | "Skyrim_Battlemage" | "Skyrim_Spellsword" | "Skyrim_Nightblade" | "Skyrim_StealthArcher" | "Skyrim_Paladin" | "Skyrim_Berserker"
    | "Oblivion_Warrior" | "Oblivion_Mage" | "Oblivion_Thief" | "Oblivion_Assassin" | "Oblivion_Battlemage" | "Oblivion_Spellsword" | "Oblivion_Nightblade" | "Oblivion_Archer" | "Oblivion_Paladin" | "Oblivion_Berserker";

const buildColors: Record<BuildColorKey, string> = {
    // ESO
    "ESO_Dragonknight": "text-red-600",
    "ESO_Nightblade": "text-purple-500",
    "ESO_Sorcerer": "text-blue-400",
    "ESO_Templar": "text-yellow-400",
    "ESO_Warden": "text-green-500",
    "ESO_Necromancer": "text-gray-400",
    "ESO_Arcanist": "text-indigo-500",

    // Skyrim
    "Skyrim_Warrior": "text-red-600",
    "Skyrim_Mage": "text-blue-400",
    "Skyrim_Thief": "text-green-500",
    "Skyrim_Assassin": "text-purple-500",
    "Skyrim_Battlemage": "text-indigo-500",
    "Skyrim_Spellsword": "text-cyan-400",
    "Skyrim_Nightblade": "text-purple-400",
    "Skyrim_StealthArcher": "text-emerald-500",
    "Skyrim_Paladin": "text-yellow-400",
    "Skyrim_Berserker": "text-orange-500",

    // Oblivion
    "Oblivion_Warrior": "text-red-600",
    "Oblivion_Mage": "text-blue-400",
    "Oblivion_Thief": "text-green-500",
    "Oblivion_Assassin": "text-purple-500",
    "Oblivion_Battlemage": "text-indigo-500",
    "Oblivion_Spellsword": "text-cyan-400",
    "Oblivion_Nightblade": "text-purple-400",
    "Oblivion_Archer": "text-emerald-500",
    "Oblivion_Paladin": "text-yellow-400",
    "Oblivion_Berserker": "text-orange-500"
};

const moralityColors: MoralityColors = {
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

function randomizeBuild(game: Game): Build {
    const gameBuilds = builds[game]
    return gameBuilds[Math.floor(Math.random() * gameBuilds.length)]
}

// Type guard function to check if a string is a valid BuildColorKey
function isBuildColorKey(key: string): key is BuildColorKey {
    const validKeys: BuildColorKey[] = [
        "ESO_Dragonknight", "ESO_Nightblade", "ESO_Sorcerer", "ESO_Templar", "ESO_Warden", "ESO_Necromancer", "ESO_Arcanist",
        "Skyrim_Warrior", "Skyrim_Mage", "Skyrim_Thief", "Skyrim_Assassin", "Skyrim_Battlemage", "Skyrim_Spellsword", "Skyrim_Nightblade", "Skyrim_StealthArcher", "Skyrim_Paladin", "Skyrim_Berserker",
        "Oblivion_Warrior", "Oblivion_Mage", "Oblivion_Thief", "Oblivion_Assassin", "Oblivion_Battlemage", "Oblivion_Spellsword", "Oblivion_Nightblade", "Oblivion_Archer", "Oblivion_Paladin", "Oblivion_Berserker"
    ];
    return validKeys.includes(key as BuildColorKey);
}

// Helper function to get color class safely
function getBuildColorClass(buildName: string | undefined): string {
    if (!buildName) return "text-gray-600";
    return isBuildColorKey(buildName) ? buildColors[buildName] : "text-gray-600";
}

const ElderScrolls = () => {
    const [selectedGame, setSelectedGame] = useState<Game>("Skyrim")
    const [currentMorality, setMorality] = useState<Morality>("Good")
    const [sex, setSex] = useState<Sex>("Male")
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
    const moralityImageSrc = {
        "Evil": "src/assets/ElderScrollsMisc/daedra.webp",
        "Good": "src/assets/ElderScrollsMisc/aedra.webp",
        "Neutral": "src/assets/ElderScrollsMisc/neutral.webp",
    }[currentMorality] || "src/assets/ElderScrollsMisc/neutral.webp";

    // Sex image paths
    const getSexImageSrc = () => {
        const sexMap = {
            "Male": "src/assets/ElderScrollsMisc/male.webp",
            "Female": "src/assets/ElderScrollsMisc/female.webp",
        }
        return sexMap[sex] || "src/assets/ElderScrollsMisc/placeholder.webp"
    }

    // Build image paths
    const getBuildImageSrc = () => {
        if (!build) return "src/assets/ElderScrollsBuilds/placeholder.webp";

        const buildMap = {
            // ESO
            "ESO_Dragonknight": "src/assets/ElderScrollsBuilds/dragonknight.webp",
            "ESO_Nightblade": "src/assets/ElderScrollsBuilds/nightblade.webp",
            "ESO_Sorcerer": "src/assets/ElderScrollsBuilds/sorcerer.webp",
            "ESO_Templar": "src/assets/ElderScrollsBuilds/templar.webp",
            "ESO_Warden": "src/assets/ElderScrollsBuilds/warden.webp",
            "ESO_Necromancer": "src/assets/ElderScrollsBuilds/necromancer.webp",
            "ESO_Arcanist": "src/assets/ElderScrollsBuilds/arcanist.webp",

            // Skyrim
            "Skyrim_Warrior": "src/assets/ElderScrollsBuilds/warrior.webp",
            "Skyrim_Mage": "src/assets/ElderScrollsBuilds/mage.webp",
            "Skyrim_Thief": "src/assets/ElderScrollsBuilds/thief.webp",
            "Skyrim_Assassin": "src/assets/ElderScrollsBuilds/assassin.webp",
            "Skyrim_Battlemage": "src/assets/ElderScrollsBuilds/battlemage.webp",
            "Skyrim_Spellsword": "src/assets/ElderScrollsBuilds/spellsword.webp",
            "Skyrim_Nightblade": "src/assets/ElderScrollsBuilds/nightblade.webp",
            "Skyrim_StealthArcher": "src/assets/ElderScrollsBuilds/stealtharcher.webp",
            "Skyrim_Paladin": "src/assets/ElderScrollsBuilds/paladin.webp",
            "Skyrim_Berserker": "src/assets/ElderScrollsBuilds/berserker.webp",

            // Oblivion
            "Oblivion_Warrior": "src/assets/ElderScrollsBuilds/warrior.webp",
            "Oblivion_Mage": "src/assets/ElderScrollsBuilds/mage.webp",
            "Oblivion_Thief": "src/assets/ElderScrollsBuilds/thief.webp",
            "Oblivion_Assassin": "src/assets/ElderScrollsBuilds/assassin.webp",
            "Oblivion_Battlemage": "src/assets/ElderScrollsBuilds/battlemage.webp",
            "Oblivion_Spellsword": "src/assets/ElderScrollsBuilds/spellsword.webp",
            "Oblivion_Nightblade": "src/assets/ElderScrollsBuilds/nightblade.webp",
            "Oblivion_Archer": "src/assets/ElderScrollsBuilds/archer.webp",
            "Oblivion_Paladin": "src/assets/ElderScrollsBuilds/paladin.webp",
            "Oblivion_Berserker": "src/assets/ElderScrollsBuilds/berserker.webp"
        }
        return buildMap[build.name] || "src/assets/ElderScrollsBuilds/placeholder.webp"
    }

    // Game logos
    const gameImageSrc = {
        "Elder Scrolls Online": "src/assets/ESO/esoLogo.webp",
        "Skyrim": "src/assets/Skyrim/skyrimLogo.webp",
        "Oblivion": "src/assets/Oblivion/oblivionLogo.webp"
    }

    // Where buildColors is used, use the helper function
    const colorClass = getBuildColorClass(build?.name);

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center"
            style={{
                backgroundImage: `url(src/assets/ElderScrollsMisc/${selectedGame.toLowerCase().replace(/[:\s]/g, '')}.webp)`,
                backgroundColor: "#111111"
            }}
        >
            <div className="text-center mt-6">
                <img className="mx-auto max-h-36 w-auto drop-shadow-xl" src={gameImageSrc[selectedGame]} alt={selectedGame} />
            </div>

            {/* Game Toggle */}
            <div className="flex justify-center my-6">
                <div className="bg-gray-800 bg-opacity-80 rounded-lg p-2 flex gap-2">
                    {(Object.keys(builds) as Game[]).map((game) => (
                        <button
                            key={game}
                            className={`px-4 py-2 rounded-md transition-all ${
                                selectedGame === game
                                    ? "bg-blue-700 text-white font-medium"
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
                        className="bg-gray-900 bg-opacity-80 rounded-lg p-6 border-2 border-blue-800 shadow-lg"
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
                                <h3 className="text-gray-400 text-sm">Morality</h3>
                                <p className={`text-xl font-medium ${moralityColors[currentMorality]}`}>
                                    {currentMorality}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sex */}
                    <motion.div
                        className="bg-gray-900 bg-opacity-80 rounded-lg p-6 border-2 border-blue-800 shadow-lg"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: isRolling ? -100 : 0, opacity: isRolling ? 0 : 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
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
                                <h3 className="text-gray-400 text-sm">Gender</h3>
                                <p className="text-xl font-medium text-white">{sex}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Build */}
                    <motion.div
                        className="bg-gray-900 bg-opacity-80 rounded-lg p-6 border-2 border-blue-800 shadow-lg"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: isRolling ? -100 : 0, opacity: isRolling ? 0 : 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                                <img
                                    src={getBuildImageSrc()}
                                    alt={build?.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm">Build</h3>
                                <a
                                    href={build?.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-xl font-medium ${colorClass} hover:underline`}
                                >
                                    {build?.name}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Roll Button */}
                <div className="mt-8">
                    <RandomizerButton onRoll={rollCharacter} label="Roll Character" loadingLabel="Rolling..." />
                </div>
            </div>
        </div>
    )
}

export default ElderScrolls