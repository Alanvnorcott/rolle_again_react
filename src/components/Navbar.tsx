import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="bg-gray-800 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Site Title */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-xl font-bold text-white">Roll Again</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <Link
                                to="/"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Home
                            </Link>

                            <Link
                                to="/wow-classic"
                                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                <div className="w-14 h-6 mr-2 rounded-full bg-gray-900 border border-#3e2c20 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/images/GameIcons/wowClassicLogo.png"
                                        alt="WoW Classic"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                WoW Classic
                            </Link>

                            <Link
                                to="/wow-retail"
                                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                <div className="w-14 h-6 mr-2 rounded-full bg-gray-900 border border-blue-600 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/images/GameIcons/wowRetailLogo.png"
                                        alt="WoW Retail"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                WoW Retail
                            </Link>

                            <Link
                                to="/bg3"
                                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                <div className="w-14 h-6 mr-2 rounded-full bg-gray-900 border border-red-600 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/images/GameIcons/bg3title.png"
                                        alt="BG3"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                Baldurs Gate 3
                            </Link>
                            <Link
                                to="/fo"
                                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                <div className="w-14 h-6 mr-2 rounded-full bg-gray-900 border border-green-200 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/images/GameIcons/fallout.webp"
                                        alt="Fallout"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                Fallout
                            </Link>
                            <Link
                                to="/elderScrolls"
                                className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                <div className="w-14 h-6 mr-2 rounded-full bg-gray-900 border border-pink-500 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/images/GameIcons/elderscrolls.webp"
                                        alt="Elder Scrolls"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                Elder Scrolls
                            </Link>

                            <Link
                                to="/about"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                About
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed */}
                            <svg
                                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* Icon when menu is open */}
                            <svg
                                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state. */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link
                        to="/"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Home
                    </Link>

                    <Link
                        to="/wow-classic"
                        className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                        <div className="w-6 h-6 mr-2 rounded-full bg-gray-900 border border-red-600 flex items-center justify-center overflow-hidden">
                            <img
                                src="/images/GameIcons/wowClassicLogo.png"
                                alt="WoW Classic HC"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        WoW Classic
                    </Link>

                    <Link
                        to="/wow-retail"
                        className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                        <div className="w-6 h-6 mr-2 rounded-full bg-gray-900 border border-blue-600 flex items-center justify-center overflow-hidden">
                            <img
                                src="/images/GameIcons/wowRetailLogo.png"
                                alt="WoW Retail"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        WoW Retail
                    </Link>

                    <Link
                        to="/bg3"
                        className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                        <div className="w-6 h-6 mr-2 rounded-full bg-gray-900 border border-red-600 flex items-center justify-center overflow-hidden">
                            <img
                                src="/images/GameIcons/bg3title.png"
                                alt="Baldurs Gate 3"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        BG3
                    </Link>

                    <Link
                        to="/fo"
                        className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                        <div className="w-6 h-6 mr-2 rounded-full bg-gray-900 border border-red-600 flex items-center justify-center overflow-hidden">
                            <img
                                src="/images/GameIcons/fallout.webp"
                                alt="Fallout"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        Fallout
                    </Link>
                    <Link
                        to="/elderScrolls"
                        className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                        <div className="w-6 h-6 mr-2 rounded-full bg-gray-900 border border-red-600 flex items-center justify-center overflow-hidden">
                            <img
                                src="/images/GameIcons/elderscrolls.webp"
                                alt="Elder Scrolls"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        Elder Scrolls
                    </Link>

                    <Link
                        to="/about"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        About
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar