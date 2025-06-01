// src/hooks/usePet.js
import { useState, useEffect } from 'react';
import { calculateAge, GROWTH_STAGES } from './useTimePassage';
import useLocalStorage from './useLocalStorage';
import useTimePassage from './useTimePassage';
import useAchievements from './useAchievements';


function usePet() {
    const [petState, setPetState] = useState({
       stats: {
            hunger: 80,
            energy: 75,
            happiness: 90,
            cleanliness: 70,
            health: 100,
            bond: 50
        },
        activity: null,
        growthStage: 'baby',
        birthDate: Date.now(),
        lastVisited: Date.now(),
        lastInteraction: Date.now()
    });

    // Other hooks
    useLocalStorage(petState, setPetState);
    useTimePassage(petState, setPetState);
    const { 
        achievements, 
        trackInteraction,
        setAchievements,
        unlockedCount
    } = useAchievements(petState);

    // Calculate mood based on stats
    const mood = calculateMood(petState.stats, petState.activity);

    // Calculate current growth stage
    useEffect(() => {
        const age = calculateAge(petState.birthDate);
        let currentStage = 'baby';
        
        for (const [stage, range] of Object.entries(GROWTH_STAGES)) {
            if (age >= range.min && age <= range.max) {
                currentStage = stage;
            }
        }

        setPetState(prev => ({
            ...prev,
            growthStage: currentStage
        }));
    }, [petState.birthDate]);

    // Pet interaction functions
    function feedPet() {
    if (petState.activity === 'sleeping') return;
    
    setPetState(prev => ({
        ...prev,
        stats: {
            ...prev.stats,
            hunger: Math.min(prev.stats.hunger + 20, 100),
            energy: Math.min(prev.stats.energy + 5, 100),
            happiness: Math.min(prev.stats.happiness + 5, 100),
            bond: Math.min(prev.stats.bond + 0.5, 100)
        },
        activity: null, 
        lastInteraction: Date.now()

        
}));
setTimeout(() => {
        setPetState(prev => ({
            ...prev,
            activity: null
        }));
    }, 3000); // Activity lasts 3 seconds
    trackInteraction('feed');
}

    function playWithPet() {
        if (petState.activity || petState.stats.energy < 10) return;

        setPetState(prev => ({
            ...prev,
            stats: {
                ...prev.stats,
                energy: Math.max(prev.stats.energy - 10, 0),
                happiness: Math.min(prev.stats.happiness + 15, 100),
                hunger: Math.max(prev.stats.hunger - 5, 0),
                bond: Math.min(prev.stats.bond + 1, 100)
            },
            activity: null, 
            lastInteraction: Date.now()
        }));
        setTimeout(() => {
        setPetState(prev => ({
            ...prev,
            activity: null
        }));
    }, 3000); // Activity lasts 3 seconds
        trackInteraction('play');
    }

    function cleanPet() {
        if (petState.activity) return;

        setPetState(prev => ({
            ...prev,
            stats: {
                ...prev.stats,
                cleanliness: 100,
                happiness: Math.max(prev.stats.happiness - 5, 0),
                bond: Math.min(prev.stats.bond + 1, 100),
                health: Math.min(prev.stats.health + 5, 100),
            },
            activity: null,
            lastInteraction: Date.now()
        }));
        setTimeout(() => {
        setPetState(prev => ({
            ...prev,
            activity: null
        }));
    }, 3000); // Activity lasts 3 seconds
        trackInteraction('clean');
    }

    function toggleSleep() {
        if (petState.activity === 'sleeping') {
            // Wake up
            setPetState(prev => ({
                ...prev,
                activity: null,
                lastInteraction: Date.now()
            }));
        } else if (!petState.activity) {
            // Go to sleep
            setPetState(prev => ({
                ...prev,
                activity: 'sleeping',
                lastInteraction: Date.now(),
                stats: {
                    ...prev.stats,
                    energy: Math.min(prev.stats.energy + 20, 100)
                }
            }));
            
        }
    }

    return {
        petState,
        mood,
        achievements,
        setAchievements,
        unlockedCount,
        feedPet,
        playWithPet,
        cleanPet,
        toggleSleep
    };


function calculateMood(stats, activity) {
    if (activity === 'sleeping') {
        return 'sleeping';
    }
    const minStat = Math.min(
        stats.hunger,
        stats.energy,
        stats.happiness,
        stats.cleanliness,
        stats.health
    );

    if (minStat <= 20) 
        {return 'sick';}
    if (minStat <= 40) {
        return 'sad';}
    if (stats.happiness >= 80 && stats.energy >= 70){
        return 'happy';
    }
        
    return 'neutral';
}
}
export default usePet;