// src/hooks/useTimePassage.js
import { useEffect } from 'react';

export function calculateAge(birthdate) {
    const now = Date.now();
    const elapsed = now - birthdate;
    return Math.floor(elapsed / (1000 * 60));
}

export const GROWTH_STAGES = {
    baby: { min: 0, max: 5, emoji: '🥚' },
    child: { min: 6, max: 10, emoji: '🐣' },
    teen: { min: 11, max: 20, emoji: '🐥' },
    adult: { min: 21, max: Infinity, emoji: '🐤' }
};

function useTimePassage(petState, setPetState) {
    // Calculate time elapsed since last visit
    useEffect(() => {
        const constant = 60;
        const decay = {
            hunger: 30 / constant,
            energy: 40 / constant,
            energy: 40 / constant,
            happiness: 15 / constant,
            cleanliness: 20 / constant,
            health: 2 / constant
        };

        const second = 1000; 

        if (petState.lastVisited) {
            const minutesElapsed = (Date.now() - petState.lastVisited) / (1000 * 60);
            if (minutesElapsed > 0) {
                // Apply stat decay based on elapsed time
                applyTimePassage(minutesElapsed, decay);
            }
        }

        // Update last visited timestamp

        setPetState(prev => ({
            ...prev,
            lastVisited: Date.now()
        }));

        // Set up interval for ongoing decay
        const interval = setInterval(() => {
            applyStatDecay(decay);
        }, second);

        return () => clearInterval(interval);
    }, []);

    function applyStatDecay(decayRates) {
        setPetState(prev => {
            // Calculate new stats with decay
            const newStats = { ...prev.stats };
            newStats.hunger = Math.max(newStats.hunger - decayRates.hunger, 0);
            newStats.energy = Math.max(newStats.energy - decayRates.energy, 0);
            newStats.happiness = Math.max(newStats.happiness - decayRates.happiness, 0);
            newStats.cleanliness = Math.max(newStats.cleanliness - decayRates.cleanliness, 0);
            newStats.health = Math.max(newStats.health - decayRates.health, 0);

            const ageMinutes = calculateAge(prev.birthdate);
            let currentStage = prev.stage;
            for (const [stage, range] of Object.entries(GROWTH_STAGES)) {
                if (ageMinutes >= range.min && ageMinutes <= range.max) {
                    currentStage = stage;
                    break;
                }
            }

            return {
                ...prev,
                stats: newStats,
                stage: currentStage,
                age: ageMinutes
            };
        });
    }

    function applyTimePassage(minutes, decayRates) {
        // Similar to applyStatDecay but for longer time periods
        setPetState(prev => {
            const newStats = { ...prev.stats };
            const decayMinutes = Math.min(minutes, 1440);
            
            newStats.hunger = Math.max(newStats.hunger - (decayRates.hunger * decayMinutes), 0);
            newStats.energy = Math.max(newStats.energy - (decayRates.energy * decayMinutes), 0);
            newStats.happiness = Math.max(newStats.happiness - (decayRates.happiness * decayMinutes), 0);
            newStats.cleanliness = Math.max(newStats.cleanliness - (decayRates.cleanliness * decayMinutes), 0);
            newStats.health = Math.max(newStats.health - (decayRates.health * decayMinutes), 0);

            const ageMinutes = calculateAge(prev.birthdate);
            let currentStage = prev.stage;
            for (const [stage, range] of Object.entries(GROWTH_STAGES)) {
                if (ageMinutes >= range.min && ageMinutes <= range.max) {
                    currentStage = stage;
                    break;
                }
            }

            return {
                ...prev,
                stats: newStats,
                stage: currentStage,
                age: ageMinutes
            };
        });
    }
}

export default useTimePassage;
