// src/hooks/useLocalStorage.js
import { useEffect } from 'react';

const STORAGE_KEY = 'virtualPetData';

function useLocalStorage(petState, setPetState) {
    // Load saved state on initial mount
    useEffect(() => {
        const loadPetData = () => {
            try {
                const savedData = localStorage.getItem(STORAGE_KEY);
                if (savedData) {
                    const parsedData = JSON.parse(savedData);
                    
         
                    const now = Date.now();
                    const minutesPassed = (now - parsedData.lastVisited) / (1000 * 60);
                    
              
                    parsedData.lastVisited = now;
                    
                    setPetState(parsedData);
                    
                    return minutesPassed;
                }
            } catch (error) {
                console.error("Failed to load pet data:", error);
                localStorage.removeItem(STORAGE_KEY);
            }
            return 0;
        };

        loadPetData();
    }, []);

    // Save state whenever it changes
    useEffect(() => {
        const savePetData = () => {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(petState));
            } catch (error) {
                console.error("Failed to save pet data:", error);
            }
        };

        savePetData();
    }, [petState]);
}

export default useLocalStorage;