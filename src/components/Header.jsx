import { Link } from 'react-router-dom';
import { useState } from 'react';
import LOGO from '../../public/logo-large.png';

function Header({ fixed }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav className={`shadow w-full bg-white h-[50px] ${fixed ? 'fixed top-0 left-0 z-20' : ''}`}>
                <div className="h-[50px] w-full flex flex-wrap items-center justify-between px-3">
                    <Link to="/" className="px-2 flex items-center space-x-3">
                        <img src={LOGO} className="h-10 md:h-9" alt="FitU Logo" />
                    </Link>
                    <div className="flex md:order-2 space-x-3 md:space-x-2">
                        <Link
                            to="/my-profile"
                            className="hidden md:flex mr-[10px] text-white bg-black border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                        >
                            내 프로필
                        </Link>
                        {/* TODO 내 옷장 이동 경로 수정 */}
                        <Link
                            to="/"
                            className="hidden md:flex text-white bg-black border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                        >
                            내 옷장
                        </Link>
                        <button
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            onClick={() => setMenuOpen(v => !v)}
                        >
                            <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {menuOpen && (
                <div className="fixed top-14 left-0 w-full z-30 md:hidden px-2">
                    <ul className="flex flex-col p-4 font-medium border border-gray-100 rounded-lg bg-gray-50 w-full">
                        <li>
                            <a href="/my-profile" className="block py-2 px-3 text-gray-900 rounded-lg hover:bg-black hover:text-white">내 프로필</a>
                        </li>
                        <li>
                            {/* TODO 내 옷장 이동 경로 수정 */}
                            <a href="/" className="block py-2 px-3 text-gray-900 rounded-lg hover:bg-black hover:text-white">내 옷장</a>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default Header;