import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const apiKey = "AIzaSyDrEKAsqwLQ9Z80CQbH-zGgJB7O7kicRCw"

export default function Folders() {
    const { folderId } = useParams();
    const [loading, setLoading] = useState(true);
    const [cache, setCache] = useState({});
    const navigate = useNavigate(); // Keep this line for context

    useEffect(() => {
        async function fetchFiles(){
            setLoading(true)
            if (cache[folderId]){
                console.log("Files already cached")
                setLoading(false)

            }else{
                const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&orderBy=createdTime desc&key=${apiKey}&fields=files(id,name,mimeType,webViewLink)`
                const res = await fetch(url)
                const data = await res.json()
                setCache(prevCache => ({...prevCache, [folderId]: data.files}))
                setLoading(false)
            }
        }
        fetchFiles()
    }, [folderId]);
    
    const filesList = cache[folderId] || [];
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">
            <main className="max-w-4xl mx-auto py-12 px-4">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-semibold text-[#164464] flex items-center gap-2">
                        <span className="text-[#e3a96f]">📄</span> Folder Contents
                    </h2>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-24">
                        <span className="text-indigo-600 text-xl animate-pulse font-medium">Loading files...</span>
                    </div>
                )}

                {!loading && filesList.length === 0 && (
                    <div className="flex flex-col items-center py-24">
                        <span className="text-5xl mb-3 opacity-60 text-fuchsia-500">📄</span>
                        <span className="text-indigo-400 text-lg">No files found.</span>
                    </div>
                )}

                {!loading && filesList.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {filesList.map(file => (
                            <a
                                href={file.webViewLink}
                                key={file.id}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center w-full bg-white/70 backdrop-blur-md rounded-xl shadow hover:shadow-md transition-all p-4 gap-2 border border-fuchsia-100 hover:bg-fuchsia-100/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                            >
                                <span className="text-3xl group-hover:scale-110 transition-transform drop-shadow" style={{ color: file.mimeType === 'application/vnd.google-apps.folder' ? '#d5a473' : '#e3a96f' }}>
                                    {file.mimeType === 'application/vnd.google-apps.folder' ? '📁' : '📄'}
                                </span>
                                <span className="text-base font-medium text-center truncate w-full" style={{ color: '#164464' }}>
                                    {file.name}
                                </span>
                            </a>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}