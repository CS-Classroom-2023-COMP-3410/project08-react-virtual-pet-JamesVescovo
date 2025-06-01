// src/hooks/useAchievements.js
import { useState, useEffect } from 'react';

function useAchievements(petState) {
    const [achievements, setAchievements] = useState([
        { id: 'firstFeed', unlocked: false, name: 'First Meal' },
        { id: 'firstPlay', unlocked: false, name: 'Playtime' },
        { id: 'firstBath', unlocked: false, name: 'Feeling Fresh' },
        { id: 'maxBond', unlocked: false, name: 'Bonded' },
        { id: 'grownUp', unlocked: false, name: 'Adult' },
        { id: 'sleepy', unlocked: false, name: 'Zonked Out' },
        { id: 'hungry', unlocked: false, name: 'Hangry' }
    ]);

    const [notification, setNotification] = useState(null);
    const [stats, setStats] = useState({
        feedCount: 0,
        playCount: 0,
        cleanCount: 0,
        timeAsleep: 0,
        bond: 0
    });

    // Calculate unlocked count
    const unlockedCount = achievements.filter(a => a.unlocked).length;

    useEffect(() => {
        checkAchievements();
    }, [petState, stats]);

    function checkAchievements() {
        const updatedAchievements = [...achievements];
        let newNotification = null;

        updatedAchievements.forEach(achievement => {
            if (!achievement.unlocked) {
                switch (achievement.id) {
                    case 'firstFeed':
                        if (stats.feedCount > 0) {
                            achievement.unlocked = true;
                            newNotification = 'Unlocked: First Meal!';
                        }
                        break;
                    case 'firstPlay':
                        if (stats.playCount > 0) {
                            achievement.unlocked = true;
                            newNotification = 'Unlocked: Playtime!';
                        }
                        break;
                    case 'firstBath':
                        if (stats.cleanCount > 0) {
                            achievement.unlocked = true;
                            newNotification = 'Unlocked: Feeling Fresh!';
                        }
                        break;
                    case 'maxBond':
                        if (stats.bond >= 100) {
                            achievement.unlocked = true;
                            newNotification = 'Unlocked: Bonded!';
                        }
                        break;
                    case 'grownUp':
                        if (petState.stage === 'adult') {
                            achievement.unlocked = true;
                            newNotification = 'Unlocked: Adult!';
                        }
                        break;
                    case 'sleepy':
                        if (stats.timeAsleep > 0) {
                            achievement.unlocked = true;
                            newNotification = 'Unlocked: Zonked Out!';
                        }
                        break;
                    case 'hungry':
                        if (petState.stats?.hunger < 20) {
                            achievement.unlocked = true;
                            newNotification = 'Unlocked: Hangry!';
                        }
                        break;
                    default:
                        break;
                }
            }
        });

        setAchievements(updatedAchievements);
        
        if (newNotification) {
            setNotification(newNotification);
            setTimeout(() => setNotification(null), 3000);
        }
    }

    function trackInteraction(type) {
        setStats(prev => {
            if (type === 'feed') {
                return { ...prev, feedCount: prev.feedCount + 1 };
            } else if (type === 'play') {
                return { ...prev, playCount: prev.playCount + 1 };
            } else if (type === 'clean') {
                return { ...prev, cleanCount: prev.cleanCount + 1 };
            } else if (type === 'sleep') {
                return { ...prev, timeAsleep: prev.timeAsleep + 1 };
            } else if (type === 'bond') {
                return { ...prev, bond: Math.min(prev.bond + 10, 100) };
            }
            return prev;
        });
    }

    return { 
        achievements, 
        trackInteraction,
        setAchievements,
        unlockedCount 
    };
}

export default useAchievements;