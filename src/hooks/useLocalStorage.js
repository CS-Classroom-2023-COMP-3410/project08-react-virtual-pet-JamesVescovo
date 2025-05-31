// src/hooks/useLocalStorage.js
import { useEffect } from 'react';

function useLocalStorage(petState, setPetState, achievements, setAchievements) {
    // Load saved state on initial mount
    useEffect(() => {
        const savedPet = localStorage.getItem('petData');
        if (savedPet) {
            try {
                setPetState(JSON.parse(savedPet));
            } catch (error) {
                console.error('Error loading pet data:', error);
            }
        }

        const savedAchievements = localStorage.getItem('petAchievements');
        if (savedAchievements) {
            try {
                setAchievements(JSON.parse(savedAchievements));
            } catch (error) {
                console.error('Error loading achievements:', error);
            }
        }
    }, [setPetState, setAchievements]);

    // Save state whenever it changes
    useEffect(() => {
        localStorage.setItem('petData', JSON.stringify(petState));
    }, [petState]);

    
    useEffect(() => {
        localStorage.setItem('petAchievements', JSON.stringify(achievements));
    }, [achievements]);
}

export default useLocalStorage;
