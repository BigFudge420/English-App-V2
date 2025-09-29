import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";

const apiKey = "AIzaSyDrEKAsqwLQ9Z80CQbH-zGgJB7O7kicRCw"
const rootFolderId = "1CTkdEslNsxbVzWMxcQADAquApnOUWoRu"

export default function Home() {
    const [folders, setFolders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchFolders(){
            const url = `https://www.googleapis.com/drive/v3/files?q='${rootFolderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&orderBy=name&key=${apiKey}&fields=files(id,name)`
            const res = await fetch(url)
            const data = await res.json()
            setFolders(data.files)
        }
        fetchFolders()
    }, []);

    return (
        <div>
            <h1>Folders</h1>
            <div>
                {folders.map(folder => (
                    <button
                        key={folder.id}
                        onClick={() => navigate(`/folders/${folder.id}`)}
                    >
                        {folder.name}
                    </button>
                ))}
            </div>
        </div>
    );
}