import Header from '../../components/Header/header.js';
import Background from '../../components/Background/background.js';

export default function NutritionTracker() {
  return ( 
    <div>
      <Header/>
      <Background>
        <div className="h-4/5 w-10/12 mt-16 bg-white rounded-xl p-10 flex flex-row flex-wrap overflow-hidden">
        </div>
      </Background>
    </div>
  );
}