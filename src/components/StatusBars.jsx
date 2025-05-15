// src/components/StatusBars.jsx
export default function StatusBars({ stats }) {
    const statusItems = [
        { name: 'Hunger', value: stats.hunger, color: 'orange' },
        { name: 'Energy', value: stats.energy, color: 'blue' },
        { name: 'Happiness', value: stats.happiness, color: 'red' },
        { name: 'Cleanliness', value: stats.cleanliness, color: 'cyan' },
        { name: 'Health', value: stats.health, color: 'green' },
        { name: 'Bond', value: stats.bond, color: 'purple' }
    ];

    return (
        <div className="status-bars">
            {statusItems.map((item) => (
                <div key={item.name} className="status-item">
                    <div className="status-label">
                        <span>{item.name}</span>
                        <span>{Math.round(item.value)}%</span>
                    </div>
                    <div className="status-bar-container">
                        <div 
                            className="status-bar" 
                            style={{
                                width: `${item.value}%`, 
                                backgroundColor: item.color,
                                opacity: item.value > 30 ? 0.9 : 0.6
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}