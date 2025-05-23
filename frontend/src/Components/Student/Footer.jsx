import { useContext } from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'
import { MainContext } from '../../MainCon';
// ...existing code...
const Footer = () => {
    const { Light, SetLight } = useContext(MainContext)
    return (
        <footer className={` text-white py-6  ${Light ? " bg-gray-800 text-gray-100" : "bg-gray-600 text-gray-900"}`}>
            <div className="container mx-auto text-center px-4">
                <p className="text-sm sm:text-base animate-pulse">
                    Made in <span className="text-pink-500">127.0.0.1</span> 🖥️ | Crafted with <span className="text-yellow-400">⚙️, ❤️ & {'<code>'}</span> by <span className="font-semibold text-cyan-400">ADMIN 👨‍💻</span>
                </p>
                <div className="flex justify-center gap-6 mt-4">
                    <a
                        href="https://instagram.com/itz__admin__01"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="hover:text-pink-500 transition text-2xl"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://linkedin.com/in/yogesh-kumar-558b4b26b"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-blue-400 transition text-2xl"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://github.com/itzadmin001"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="hover:text-gray-400 transition text-2xl"
                    >
                        <FaGithub />
                    </a>
                </div>
                <p className={`mt-2 text-xs text-gray-200`}>
                    © {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
// ...existing code...