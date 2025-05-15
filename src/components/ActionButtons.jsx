// src/components/ActionButtons.jsx
export default function ActionButtons({ 
    feedPet, 
    playWithPet, 
    cleanPet, 
    toggleSleep,
    petState 
}) {
    const isSleeping = petState.activity === 'sleeping';
    const isBusy = petState.activity && !isSleeping;
    const lowEnergy = petState.stats.energy < 10;

    const actions = [
        {
            name: 'Feed',
            emoji: '🍕',
            action: feedPet,
            disabled: isBusy || isSleeping,
            tooltip: isSleeping ? "Can't feed while sleeping" : "Feed your pet"
        },
        {
            name: 'Play',
            emoji: '⚽',
            action: playWithPet,
            disabled: isBusy || isSleeping || lowEnergy,
            tooltip: lowEnergy ? "Not enough energy" : "Play with your pet"
        },
        {
            name: 'Clean',
            emoji: '🧼',
            action: cleanPet,
            disabled: isBusy || isSleeping,
            tooltip: isSleeping ? "Can't clean while sleeping" : "Clean your pet"
        },
        {
            name: isSleeping ? 'Wake' : 'Sleep',
            emoji: isSleeping ? '☀️' : '🌙',
            action: toggleSleep,
            disabled: isBusy,
            tooltip: isSleeping ? "Wake up your pet" : "Put your pet to sleep"
        }
    ];

    return (
        <div className="action-buttons">
            {actions.map((action) => (
                <button
                    key={action.name}
                    onClick={action.action}
                    disabled={action.disabled}
                    className={`action-button ${action.disabled ? 'disabled' : ''}`}
                    aria-label={action.tooltip}
                    title={action.tooltip}
                >
                    <span className="action-emoji">{action.emoji}</span>
                    <span className="action-name">{action.name}</span>
                </button>
            ))}
        </div>
    );
}