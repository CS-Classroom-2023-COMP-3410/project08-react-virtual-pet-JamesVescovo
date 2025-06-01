// src/components/ActionButtons.jsx
export default function ActionButtons({ 
    feedPet, 
    playWithPet, 
    cleanPet, 
    toggleSleep,
    petState 
}) {
    const sleeping = petState?.activity === 'sleeping';
    const lowEnergy = petState?.stats?.energy < 10;

    const actions = [
        {
            name: 'Feed',
            emoji: '🍔',
            action: feedPet,
            disabled: sleeping,
        },
        {
            name: 'Play',
            emoji: '🎮',
            action: playWithPet,
            disabled: sleeping || lowEnergy,
        },
        {
            name: 'Clean',
            emoji: '🧼',
            action: cleanPet,
            disabled: sleeping,
        },
        {
            name: sleeping ? 'Wake' : 'Sleep',
            emoji: sleeping ? '☀️' : '🌙',
            action: toggleSleep,  // Fixed: Changed from sleeping to toggleSleep
            disabled: false
        }
    ];

    return (
        <div className="action-buttons">
            {actions.map(({name, emoji, action, disabled}) => (
                <button
                    key={name}
                    onClick={disabled ? undefined : action}  // Fixed onClick conditional
                    disabled={disabled}
                    className={`action-button ${disabled ? 'disabled' : ''}`}
                >
                    <span className="action-emoji">{emoji}</span>
                    <span className="action-name">{name}</span>
                </button>
            ))}
        </div>
    );
}