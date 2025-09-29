import { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const apiKey = "AIzaSyDrEKAsqwLQ9Z80CQbH-zGgJB7O7kicRCw"

export default function Folders() {
    const { folderId } = useParams();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cache, setCache] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchFiles(){
            setLoading(true)
            if (cache[folderId]){
                setFiles(cache[folderId])
            }else{
                const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&orderBy=createdTime desc&key=${apiKey}&fields=files(id,name,mimeType,webViewLink)`
                const res = await fetch(url)
                const data = await res.json()
                setFiles(data.files)
                setCache(prevCache => ({...prevCache, [folderId]: data.files}))
            }
            setLoading(false)
        }
        fetchFiles()
    }, [folderId, cache, setCache]);
    return (
        <div>
            <h1>Files</h1>
            <div>
                <button onClick={() => navigate("/")}>
                    Home
                </button>
                {loading && <p>Loading...</p>}
                {!loading && files.length === 0 && <p>No files found.</p>}
                <div>
                    {!loading && files.map(file => (
                        <a href={file.webViewLink}
                        key={file.id}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            {file.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}