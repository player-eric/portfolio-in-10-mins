import { Link, NavLink } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen((isMenuOpen) => !isMenuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-[#FFD562] text-2xl rounded-b-2xl font-blackOpsOne flex justify-between items-center px-4 py-2 sticky top-0 z-50">
            <Link to="/" className="flex items-center">
                <img
                    src="configs/icon.png"
                    alt="icon"
                    className="w-9 h-9 mr-2"
                />
                <span className="font-bold text-black">Shiqin Yan</span>
            </Link>
            <div className="hidden md:flex space-x-6">
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-gray-500 underline underline-offset-4'
                            : 'text-black'
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to="/experience"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-gray-500 underline underline-offset-4'
                            : 'text-black'
                    }
                >
                    Experience
                </NavLink>
                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-gray-500 underline underline-offset-4'
                            : 'text-black'
                    }
                >
                    Projects
                </NavLink>
                <NavLink
                    to="/footprints"
                    className={({ isActive }) =>
                        isActive
                            ? 'text-gray-500 underline underline-offset-4'
                            : 'text-black'
                    }
                >
                    Footprints
                </NavLink>
            </div>
            <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-black text-base">
                    FB
                </a>
                <a href="https://twitter.com" className="text-black text-base">
                    TW
                </a>
                <a href="https://linkedin.com" className="text-black text-base">
                    LI
                </a>
            </div>
            <div
                ref={menuRef}
                className="text-black text-2xl md:hidden relative"
            >
                <button onClick={toggleMenu}>&#9776;</button>
                {isMenuOpen && (
                    <div className="px-2 flex flex-col absolute right-0 mt-4 w-auto bg-[#FFD562] shadow-lg rounded-lg">
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-gray-500 underline underline-offset-4'
                                    : 'text-black'
                            }
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/experience"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-gray-500 underline underline-offset-4'
                                    : 'text-black'
                            }
                        >
                            Experience
                        </NavLink>
                        <NavLink
                            to="/projects"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-gray-500 underline underline-offset-4'
                                    : 'text-black'
                            }
                        >
                            Projects
                        </NavLink>
                        <NavLink
                            to="/footprints"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-gray-500 underline underline-offset-4'
                                    : 'text-black'
                            }
                        >
                            Footprints
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
}
