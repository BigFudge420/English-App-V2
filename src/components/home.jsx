import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiKey = "AIzaSyDrEKAsqwLQ9Z80CQbH-zGgJB7O7kicRCw";
const rootFolderId = "1CTkdEslNsxbVzWMxcQADAquApnOUWoRu";

export default function Home() {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchFolders() {
            setLoading(true);
            const url = `https://www.googleapis.com/drive/v3/files?q='${rootFolderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&orderBy=name&key=${apiKey}&fields=files(id,name)`;
            const res = await fetch(url);
            const data = await res.json();
            setFolders(data.files);
            setLoading(false);
        }
        fetchFolders();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">
            <main className="max-w-4xl mx-auto py-12 px-4">
                <h2 className="text-2xl font-semibold mb-8 text-indigo-800 flex items-center gap-2">
                  <span className="text-fuchsia-500">📁</span> Team Folders
                </h2>

                {loading && (
                    <div className="flex justify-center items-center py-24">
                        <span className="text-fuchsia-400 text-xl animate-pulse font-medium">Loading folders...</span>
                    </div>
                )}

                {!loading && folders.length === 0 && (
                    <div className="flex flex-col items-center py-24">
                        <span className="text-5xl mb-3 opacity-60">📁</span>
                        <span className="text-indigo-400 text-lg">No folders found.</span>
                    </div>
                )}

                {!loading && folders.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {folders.map(folder => {
                            let team = folder.name.replace(/[^0-9]/g, "");
                            return (
                                <button
                                    key={folder.id}
                                    onClick={(e) =>{
                                        const text = e.target.textContent 
                                        localStorage.setItem('teamName', text)
                                        navigate(`/folders/${folder.id}`)}

                                    }
                                    className="group flex flex-col items-center w-full bg-white/70 backdrop-blur-md rounded-xl shadow hover:shadow-md transition-all p-4 gap-2 border border-fuchsia-100 hover:bg-fuchsia-100/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                                >
                                    <span className="">
                                        <span className="text-base font-medium text-center text-indigo-800 truncate w-full ">
                                            📁Team {team}
                                    </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}