import { useState, useEffect } from 'react';

export default function RandomizerButton({
                                             onRoll,
                                             label = "Roll New Character",
                                             loadingLabel = "Rolling..."
                                         }) {
    const [isRolling, setIsRolling] = useState(false);
    const [shake, setShake] = useState(false);
    const [timeBasedColors, setTimeBasedColors] = useState({
        bg: 'bg-red-900',
        hover: 'hover:bg-red-800',
        text: 'text-red-100',
        border: 'border-red-950',
        hoverBorder: 'hover:border-red-900',
        ring: 'focus:ring-red-500'
    });

    // Time-based color update
    useEffect(() => {
        const updateColors = () => {
            const now = new Date();
            const hour = now.getHours();

            // Colors for different times of day
            let colors = {};

            if (hour >= 5 && hour < 8) {
                // Early morning (dawn)
                colors = {
                    bg: 'bg-indigo-800',
                    hover: 'hover:bg-indigo-700',
                    text: 'text-indigo-100',
                    border: 'border-indigo-900',
                    hoverBorder: 'hover:border-indigo-800',
                    ring: 'focus:ring-indigo-500'
                };
            } else if (hour >= 8 && hour < 12) {
                // Morning
                colors = {
                    bg: 'bg-blue-700',
                    hover: 'hover:bg-blue-600',
                    text: 'text-blue-100',
                    border: 'border-blue-900',
                    hoverBorder: 'hover:border-blue-800',
                    ring: 'focus:ring-blue-500'
                };
            } else if (hour >= 12 && hour < 15) {
                // Mid-day
                colors = {
                    bg: 'bg-emerald-700',
                    hover: 'hover:bg-emerald-600',
                    text: 'text-emerald-100',
                    border: 'border-emerald-900',
                    hoverBorder: 'hover:border-emerald-800',
                    ring: 'focus:ring-emerald-500'
                };
            } else if (hour >= 15 && hour < 18) {
                // Afternoon
                colors = {
                    bg: 'bg-amber-700',
                    hover: 'hover:bg-amber-600',
                    text: 'text-amber-100',
                    border: 'border-amber-900',
                    hoverBorder: 'hover:border-amber-800',
                    ring: 'focus:ring-amber-500'
                };
            } else if (hour >= 18 && hour < 21) {
                // Evening
                colors = {
                    bg: 'bg-orange-700',
                    hover: 'hover:bg-orange-600',
                    text: 'text-orange-100',
                    border: 'border-orange-900',
                    hoverBorder: 'hover:border-orange-800',
                    ring: 'focus:ring-orange-500'
                };
            } else if (hour >= 21 && hour < 24) {
                // Night
                colors = {
                    bg: 'bg-red-900',
                    hover: 'hover:bg-red-800',
                    text: 'text-red-100',
                    border: 'border-red-950',
                    hoverBorder: 'hover:border-red-900',
                    ring: 'focus:ring-red-500'
                };
            } else {
                // Late night (midnight to dawn)
                colors = {
                    bg: 'bg-purple-900',
                    hover: 'hover:bg-purple-800',
                    text: 'text-purple-100',
                    border: 'border-purple-950',
                    hoverBorder: 'hover:border-purple-900',
                    ring: 'focus:ring-purple-500'
                };
            }

            setTimeBasedColors(colors);
        };

        // Update colors on initial load
        updateColors();

        // Update colors every hour
        const intervalId = setInterval(updateColors, 60 * 60 * 1000); // Check every hour

        return () => clearInterval(intervalId);
    }, []);

    const rollCharacter = () => {
        setIsRolling(true);
        setShake(true);

        // Call the parent's roll function
        if (onRoll) {
            setTimeout(() => {
                onRoll();
                setIsRolling(false);
            }, 500); // Reduced to match your app's timing
        } else {
            // If no handler provided, just simulate the animation
            setTimeout(() => setIsRolling(false), 500);
        }
    };

    useEffect(() => {
        if (shake) {
            const timer = setTimeout(() => setShake(false), 500);
            return () => clearTimeout(timer);
        }
    }, [shake]);

    return (
        <button
            onClick={rollCharacter}
            disabled={isRolling}
            className={`
        w-full max-w-md mx-auto py-4 px-6
        ${timeBasedColors.bg} ${timeBasedColors.hover} ${timeBasedColors.text}
        font-bold uppercase tracking-wide rounded-lg
        border-b-4 ${timeBasedColors.border} ${timeBasedColors.hoverBorder}
        transition-all duration-200 ease-in-out
        flex items-center justify-center gap-3
        ${isRolling ? 'opacity-90' : 'opacity-100'}
        ${shake ? 'animate-pulse' : ''}
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${timeBasedColors.ring}
        shadow-lg hover:shadow-xl
        group relative overflow-hidden
      `}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                <div className="grid grid-cols-4 gap-8 rotate-12 scale-150">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-4 w-4 rounded-sm"></div>
                    ))}
                </div>
            </div>

            {isRolling ? (
                <>
                    {/* Spinning dice - replaced loading circle with a spinning die */}
                    <div className="animate-spin w-5 h-5 relative border border-current rounded">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-current rounded-full"></div>
                    </div>
                    <span className="relative z-10">{loadingLabel}</span>
                </>
            ) : (
                <>
                    {/* Regular dice icon */}
                    <div className="w-5 h-5 relative border border-current rounded transition-transform group-hover:rotate-12">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-current rounded-full"></div>
                    </div>
                    <span className="relative z-10">{label}</span>
                </>
            )}

            {/* Button highlight effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out"></div>
        </button>
    );
}