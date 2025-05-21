import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-gray-900 min-h-screen text-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-4 font-serif">Roll Again</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Your destination for randomized character builds across multiple gaming universes.
                        Let chance guide your next adventure!
                    </p>
                </div>

                {/* Featured Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

                    {/* WoW Classic */}
                    <Link to="/wow-classic" className="group">
                        <div
                            className="relative h-72 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform group-hover:scale-105 border border-yellow-700 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/GameIcons/wowClassicLogo.png')" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80 p-5 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2">WoW Classic</h3>
                                <p className="text-gray-300 text-sm">
                                    Randomize your next journey through Azeroth with class, race, and specialization combinations you might never have considered.
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* WoW Retail */}
                    <Link to="/wow-retail" className="group">
                        <div
                            className="relative h-72 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform group-hover:scale-105 border border-blue-600 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/GameIcons/wowRetail.avif')" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80 p-5 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2">WoW Retail</h3>
                                <p className="text-gray-300 text-sm">
                                    Discover new ways to experience modern Azeroth with randomized builds that challenge your playstyle.
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Baldur's Gate 3 */}
                    <Link to="/bg3" className="group">
                        <div
                            className="relative h-72 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform group-hover:scale-105 border border-red-600 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/GameIcons/bg3.avif')" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80 p-5 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2">Baldur's Gate 3</h3>
                                <p className="text-gray-300 text-sm">
                                    Roll the dice on your next adventure through the Forgotten Realms with unexpected character combinations.
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Fallout */}
                    <Link to="/fo" className="group">
                        <div
                            className="relative h-72 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform group-hover:scale-105 border border-green-200 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/GameIcons/fallout.webp')" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80 p-5 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2">Fallout</h3>
                                <p className="text-gray-300 text-sm">
                                    Explore the wasteland with randomized builds, skills, and playstyles for a fresh post-apocalyptic experience.
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Elder Scrolls */}
                    <Link to="/elderScrolls" className="group">
                        <div
                            className="relative h-72 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform group-hover:scale-105 border border-pink-500 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/GameIcons/elderscrolls.webp')" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/80 p-5 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2">Elder Scrolls</h3>
                                <p className="text-gray-300 text-sm">
                                    Random character builds and gameplay challenges to bring new life to your adventures in Tamriel.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-4 font-serif">Ready to Let Chance Guide Your Path?</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        Select a game above or from the navigation bar and discover a new way to play your favorite titles.
                    </p>
                    <Link
                        to="/about"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300"
                    >
                        Learn More About Roll Again
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
