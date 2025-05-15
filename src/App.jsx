// src/App.js
import usePet from './hooks/UsePet';
import PetDisplay from './components/PetDisplay.jsx';
import StatusBars from './components/StatusBars.jsx';
import ActionButtons from './components/ActionButtons.jsx';


function App() {
    const {
        petState,
        mood,
        achievements,
        unlockedCount,
        totalCount,
        notification,
        feedPet,
        playWithPet,
        cleanPet,
        toggleSleep
    } = usePet();
   
    return (
        <div className="app">
        <h1>Virtual Pet</h1>
        <PetDisplay 
            stats={petState.stats} 
            mood={mood} 
            activity={petState.activity}
            growthStage={petState.growthStage}
            birthDate={petState.birthDate}
        />
        <StatusBars stats={petState.stats} />
        <ActionButtons 
            feedPet={feedPet}
            playWithPet={playWithPet}
            cleanPet={cleanPet}
            toggleSleep={toggleSleep}
            petState={petState}
        />
        <div className="achievements-counter">
            Achievements: {unlockedCount}/{totalCount}
        </div>
        {notification && <Notification notification={notification} />}
        </div>
  );
}
export default App;
