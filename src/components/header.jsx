import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <header className="bg-gradient-to-r from-purple-700 via-indigo-600 to-fuchsia-500 text-white px-8 py-5 shadow flex items-center justify-between backdrop-blur-md">
            <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-lg flex items-center gap-2">
                <span className="bg-white/20 rounded-full px-3 py-1 text-fuchsia-100 text-lg mr-2">🚀</span>
                English Drive
            </h1>
             <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-500 transition"
                    >
                        Home
            </button>
        </header>
    );
}