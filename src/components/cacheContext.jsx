import {createContext, useContext, useState, useEffect, use} from 'react';
const cacheContext = createContext();

export function useCache(){
    const context = useContext(cacheContext);
    if (!context) {
        throw new Error("useCache must be used within a CacheProvider")
    }
    return context;
}

export function CacheProvider({ children }){
    const [cache, setCache] = useState(() => {
        try {
            const savedCache = localStorage.getItem('fileCache')
            return savedCache ? JSON.parse(savedCache) : {};
        } catch {
            return{}
        }
    })

    useEffect(() => {
        localStorage.setItem('fileCache', JSON.stringify(cache))
    }, [cache])

    const cacheHelpers = {
        get: (folderId) => cache[folderId],
        
        set: (folderId, data) => {
            setCache(prev => ({
                ...prev,
                [folderId]:{
                    data: data,
                    timestamp: Date.now(),
                    expiresAt: Date.now() + 1000 * 60 * 1
                }
            }))
        },

        isValid: (folderId) => {
            const entry = cache[folderId]
            return entry && entry.expiresAt > Date.now()
        },

        clear: (folderId) => {
            setCache(prev => {
                const newCache = {...prev}
                delete newCache[folderId]
                return newCache
            })
        }
    }

    return (
        <cacheContext.Provider value={{cache, ...cacheHelpers}}>
            {children}
        </cacheContext.Provider>
    )
    
}
