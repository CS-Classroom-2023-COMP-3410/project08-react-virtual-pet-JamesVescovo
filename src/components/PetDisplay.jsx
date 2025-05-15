// src/components/PetDisplay.jsx
export default function PetDisplay({ mood, growthStage, birthDate }) {
  const GROWTH_EMOJIS = {
    baby: '🥚',
    child: '🐣',
    teen: '🐥',
    adult: '🐤'
  };

  const MOOD_EMOJIS = {
    happy: '😊',
    sad: '😢',
    sick: '🤒',
    neutral: '😐',
    sleeping: '😴'
  };

  // Calculate age in days (1 minute = 1 day)
  const ageInDays = Math.floor((Date.now() - birthDate) / (1000 * 60));

  return (
    <div className="pet-display">
      <div className="pet-emoji">
        <span>{GROWTH_EMOJIS[growthStage]}</span>
        <span>{MOOD_EMOJIS[mood]}</span>
      </div>
      <div className="pet-status">
        {mood === 'sleeping' ? 'Sleeping' : `Mood: ${mood}`}
      </div>
      <div className="pet-age">
        Age: {ageInDays} day{ageInDays !== 1 ? 's' : ''}
      </div>
    </div>
  );
}