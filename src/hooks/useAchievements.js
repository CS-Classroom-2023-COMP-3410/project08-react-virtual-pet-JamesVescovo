// src/hooks/useAchievements.js
import { useState, useEffect } from 'react';

function useAchievements(petState) {
    const [achievements, setAchievements] = useState(() => {
        const savedAchievements = localStorage.getItem('petAchievements');
        return savedAchievements ? JSON.parse(savedAchievements) : [
            { id: 'firstFeed', unlocked: false, name: 'First Meal', description: 'Feed your pet for the first time' },
            { id: 'firstPlay', unlocked: false, name: 'Playtime!', description: 'Play with your pet for the first time' },
            { id: 'firstBath', unlocked: false, name: 'Fresh and Clean', description: 'Clean your pet for the first time' },
            { id: 'goodCare', unlocked: false, name: 'Good Caretaker', description: 'Keep all stats above 80 for 5 minutes' },
            { id: 'maxBond', unlocked: false, name: 'Best Friends', description: 'Reach maximum bond level' },
            { id: 'grownUp', unlocked: false, name: 'All Grown Up', description: 'Pet reached adult stage' },
            { id: 'sleepy', unlocked: false, name: 'Sleepyhead', description: 'Pet slept for 10 minutes total' },
            { id: 'hungry', unlocked: false, name: 'Bottomless Pit', description: 'Feed your pet 10 times' }
        ];
    });

    const [stats, setStats] = useState(() => {
        const savedStats = localStorage.getItem('petAchievementStats');
        return savedStats ? JSON.parse(savedStats) : {
            feedCount: 0,
            playCount: 0,
            cleanCount: 0,
            sleepMinutes: 0,
            goodCareMinutes: 0
        };
    });

    const [notification, setNotification] = useState(null);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('petAchievements', JSON.stringify(achievements));
        localStorage.setItem('petAchievementStats', JSON.stringify(stats));
    }, [achievements, stats]);

    // Check for newly unlocked achievements
    useEffect(() => {
        checkAchievements();
    }, [petState, stats]);

    function checkAchievements() {
        const newAchievements = [...achievements];
        let newNotification = null;

        for (const achievement of newAchievements) {
            if (!achievement.unlocked) {
                const shouldUnlock = checkAchievementCondition(achievement.id);
                if (shouldUnlock) {
                    achievement.unlocked = true;
                    newNotification = {
                        id: achievement.id,
                        name: achievement.name,
                        description: achievement.description
                    };
                }
            }
        }

        if (newNotification) {
            setAchievements(newAchievements);
            showNotification(newNotification);
        }

        updateProgressStats();
    }

    function checkAchievementCondition(achievementId) {
        switch (achievementId) {
            case 'firstFeed': return stats.feedCount >= 1;
            case 'firstPlay': return stats.playCount >= 1;
            case 'firstBath': return stats.cleanCount >= 1;
            case 'goodCare': return stats.goodCareMinutes >= 5;
            case 'maxBond': return petState.stats.bond >= 100;
            case 'grownUp': return petState.growthStage === 'adult';
            case 'sleepy': return stats.sleepMinutes >= 10;
            case 'hungry': return stats.feedCount >= 10;
            default: return false;
        }
    }

    function updateProgressStats() {
        // Track good care time
        const isGoodCare = Object.values(petState.stats).every(val => val > 80);
        if (isGoodCare) {
            setStats(prev => ({
                ...prev,
                goodCareMinutes: prev.goodCareMinutes + 0.5
            }));
        }

        // Track sleep time
        if (petState.activity === 'sleeping') {
            setStats(prev => ({
                ...prev,
                sleepMinutes: prev.sleepMinutes + 0.5
            }));
        }
    }

    function showNotification(achievement) {
        setNotification(achievement);
        setTimeout(() => setNotification(null), 5000);
    }

    function trackInteraction(type) {
        setStats(prev => {
            const update = { ...prev };
            switch (type) {
                case 'feed': update.feedCount += 1; break;
                case 'play': update.playCount += 1; break;
                case 'clean': update.cleanCount += 1; break;
                default: break;
            }
            return update;
        });
    }

    return { 
        achievements, 
        notification, 
        trackInteraction,
        unlockedCount: achievements.filter(a => a.unlocked).length,
        totalCount: achievements.length
    };
}

export default useAchievements;