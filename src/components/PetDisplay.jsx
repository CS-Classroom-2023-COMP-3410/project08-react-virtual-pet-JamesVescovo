// src/components/PetDisplay.jsx
export default function PetDisplay({ mood, growthStage, birthDate }) {
  const GROWTH_STAGES = {
    baby: '🥚',
    child: '🐣',
    teen: '🐥',
    adult: '🐤'
  };

  const Mood = {
    happy: '😊',
    sad: '😢',
    sick: '🤒',
    neutral: '😐',
    sleeping: '😴'
  };

  
  let Mstatus;
  if (mood === 'sleeping') {
    Mstatus = 'Sleeping';
  } else {
    Mstatus = 'Mood: ' + mood;
  }

  function calculateAge(birthdate) {
    const now = Date.now();
    const elapsed = now - birthdate;
    return Math.floor(elapsed / (1000 * 60)); // 1 minute = 1 day
  }
  let Astatus = 'Age: ' + calculateAge(birthDate) + ' days';
  return (
   
    <div className="pet-display">
      <div className="pet-emoji">
        <span>{GROWTH_STAGES[growthStage]}</span>
        <span>{Mood[mood]}</span>
      </div>

      <div className="pet-status">
        {Mstatus}
      </div>
      <div className="pet-age">
        {Astatus}
      </div>
    </div>
  );

}