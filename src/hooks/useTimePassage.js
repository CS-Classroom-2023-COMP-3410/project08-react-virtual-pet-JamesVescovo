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

const STAT_DECAY_RATES = {
    hunger: 30,      
    energy: 40,    
    happiness: 15,   
    cleanliness: 20, 
    health: 2      
};

function useTimePassage(petState, setPetState) {
    useEffect(() => {
        const minutesElapsed = (Date.now() - petState.lastVisited) / (1000 * 60);
        
        if (minutesElapsed > 0) {
            applyTimePassageEffects(minutesElapsed);
        }

        const interval = setInterval(() => {
            applyStatDecay(1/6); 
        }, 10000); 

        setPetState(prev => ({
            ...prev,
            lastVisited: Date.now()
        }));

        return () => clearInterval(interval);
    }, []);

    function applyStatDecay(minutesFraction = 1) {
        setPetState(prev => {
            const newStats = { ...prev.stats };
            const isSleeping = prev.activity === 'sleeping';

            // Apply decay rates
            for (const [stat, rate] of Object.entries(STAT_DECAY_RATES)) {
                if (stat === 'energy' && isSleeping) {
                    newStats.energy = Math.min(newStats.energy + (20 * minutesFraction), 100);
                } else {
                    newStats[stat] = Math.max(newStats[stat] - (rate * minutesFraction), 0);
                }
            }

            const isUnhealthy = Object.entries(newStats).some(
                ([stat, value]) => stat !== 'health' && value < 30
            );
            
            if (isUnhealthy) {
                newStats.health = Math.max(newStats.health - (1 * minutesFraction), 0);
            } else if (newStats.health < 100) {
                newStats.health = Math.min(newStats.health + (0.5 * minutesFraction), 100);
            }

            return {
                ...prev,
                stats: newStats
            };
        });
    }

    

    function applyTimePassageEffects(minutes) {
        const fullMinutes = Math.floor(minutes);
        const remainingSeconds = (minutes - fullMinutes) * 60;

        // Apply full minutes of decay
        if (fullMinutes > 0) {
            applyStatDecay(fullMinutes);
        }

        // Apply remaining seconds
        if (remainingSeconds > 0) {
            setTimeout(() => {
                applyStatDecay(remainingSeconds / 60);
            }, 100);
        }
    }
}

export default useTimePassage;