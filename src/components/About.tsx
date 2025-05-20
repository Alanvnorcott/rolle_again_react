import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">About Roll Again</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Where randomness meets gaming passion
                    </p>
                </div>

                {/* Mission Section */}
                <div className="bg-gray-800 rounded-lg p-8 mb-12 shadow-lg border border-gray-700">
                    <h2 className="text-3xl font-bold text-white mb-6">Why Roll Again Exists</h2>
                    <div className="space-y-6 text-lg">
                        <p>
                            We've all been there – hundreds of hours into our favorite RPGs, MMOs, and adventure
                            games, following the same familiar patterns and builds. The "meta" becomes comfortable, but
                            sometimes comfort leads to complacency and, eventually, boredom.
                        </p>
                        <p>
                            <span className="text-yellow-400 font-semibold">Roll Again</span> was born from my own gaming journey.
                            I played Fallout ever since my brother and I first plugged in our Xbox 360. As I replayed Fallout 3 and New Vegas
                            I found myself creating the same characters over and over again, because I knew what worked and what I liked, but had no idea about what I didn't like.
                        </p>
                        <p>
                            But... It wasn't until dying over and over again in World of Warcraft Hardcore (Doomhowl) that I decided to leave some of my rolls to chance.
                        </p>
                    </div>
                </div>

                {/* Games and Future Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
                        <h2 className="text-2xl font-bold text-white mb-4">Current Games</h2>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-900 border border-yellow-700 flex items-center justify-center overflow-hidden mr-3">
                                    <img
                                        src="src/assets/GameIcons/WowClassic.png"
                                        alt="WoW Classic"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span>World of Warcraft Classic</span>
                            </li>
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-900 border border-blue-600 flex items-center justify-center overflow-hidden mr-3">
                                    <img
                                        src="/src/assets/GameIcons/wowRetail.avif"
                                        alt="WoW Retail"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span>World of Warcraft Retail</span>
                            </li>
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-900 border border-red-600 flex items-center justify-center overflow-hidden mr-3">
                                    <img
                                        src="/src/assets/GameIcons/bg3.avif"
                                        alt="Baldur's Gate 3"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span>Baldur's Gate 3</span>
                            </li>
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-900 border border-green-200 flex items-center justify-center overflow-hidden mr-3">
                                    <img
                                        src="/src/assets/GameIcons/fallout.webp"
                                        alt="Fallout"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span>Fallout Series</span>
                            </li>
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-900 border border-pink-500 flex items-center justify-center overflow-hidden mr-3">
                                    <img
                                        src="/src/assets/GameIcons/elderscrolls.webp"
                                        alt="Elder Scrolls"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span>Elder Scrolls Series</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
                        <h2 className="text-2xl font-bold text-white mb-4">The Future of Roll Again</h2>
                        <div className="space-y-4">
                            <p>
                                This is just the beginning. I'm actively working to expand Roll Again with:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>More RPG titles like Final Fantasy, Mass Effect, and Elden Ring</li>
                                <li>Challenge trackers to document your randomized runs</li>
                                <li>Community features to share your experiences</li>
                                <li>User accounts to save your favorite random rolls</li>
                                <li>More detailed randomization options and parameters</li>
                            </ul>
                            <p className="mt-4">
                                Have a game you'd like to see added? Have feedback on existing randomizers?
                                I'd love to hear from fellow gamers about how Roll Again can grow!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Personal Note */}
                <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700">
                    <h2 className="text-3xl font-bold text-white mb-6">A Personal Note</h2>
                    <div className="text-lg space-y-4">
                        <p>
                           If you are like me, then you know these games can be played over and over again. It honestly does not matter how many times I have played New Vegas,
                            I can still find enjoyment in it years later. Jumping into the game can be the hard part, I have my biases and comforts and that is evident with each "new" character that usually end
                            up sharing almost all of the same traits as the one before. Roll Again is to allow players to re-explore the worlds they love with a fresh perspective.
                        </p>
                        <p>
                            Roll Again exists because I believe that constraints breed creativity. When we let go of our
                            need to optimize and instead embrace randomness, we often discover new aspects of games we thought
                            we knew inside and out.
                        </p>
                        <p>
                            Whether you're a veteran looking to spice up an old favorite or a newcomer seeking a unique first
                            experience, I hope Roll Again helps you find new joy in these amazing game worlds we all love.
                        </p>
                        <p className="font-semibold text-yellow-400">
                            As many have said on Doomhowl, Roll Again!
                        </p>
                    </div>
                </div>

                {/* CTA Back to Home */}
                <div className="text-center mt-12">
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default About