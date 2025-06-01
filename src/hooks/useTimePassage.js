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
        //original was set to 100 for 100%, however was lowered to 35 to speed up decay
        const constant = 35;
        const decay = {
            hunger: 30 / constant,
            energy: 40 / constant,
            energy: 40 / constant,
            happiness: 15 / constant,
            cleanliness: 20 / constant,
            health: 2 / constant
        };


        if (petState.lastVisited) {
            const minutesElapsed = (Date.now() - petState.lastVisited) / (1000 * 60);
            if (minutesElapsed > 0) {
                applyTimePassage(minutesElapsed, decay);
            }
        }


        setPetState(prev => ({
            ...prev,
            lastVisited: Date.now()
        }));

        const interval = setInterval(() => {
            applyStatDecay(decay);
        }, 1000);

        return () => {
            clearInterval(interval);
        }; 
    }, []);

    function applyStatDecay(decay) {
        setPetState(prev => {
            // Calculate new stats with decay
            const newStats = { ...prev.stats };
            newStats.hunger = Math.max(newStats.hunger - decay.hunger, 0);
            newStats.energy = Math.max(newStats.energy - decay.energy, 0);
            newStats.happiness = Math.max(newStats.happiness - decay.happiness, 0);
            newStats.cleanliness = Math.max(newStats.cleanliness - decay.cleanliness, 0);
            newStats.health = Math.max(newStats.health - decay.health, 0);

            const ageMinutes = calculateAge(prev.birthdate);
            let currentStage = prev.stage;
            
            for (const [stage, range] of Object.entries(GROWTH_STAGES)) {
                if (ageMinutes >= range.min && ageMinutes <= range.max) {
                    currentStage = stage;
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
            
            newStats.hunger = Math.max(newStats.hunger - (decayRates.hunger*minutes),0);
            newStats.energy = Math.max(newStats.energy -(decayRates.energy*minutes),0);
            newStats.happiness = Math.max(newStats.happiness - (decayRates.happiness * minutes), 0);
            newStats.cleanliness = Math.max(newStats.cleanliness -(decayRates.cleanliness * minutes),0);
            newStats.health = Math.max(newStats.health - (decayRates.health * minutes), 0);

            const ageMinutes = calculateAge(prev.birthdate);
            let currentStage = prev.stage;
            for (const [stage, range] of Object.entries(GROWTH_STAGES)) {
                if (ageMinutes>= range.min && ageMinutes <= range.max) {
                    currentStage = stage;
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