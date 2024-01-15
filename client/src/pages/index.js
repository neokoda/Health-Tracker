import Header from '../components/Header/header.js';
import Background from '../components/Background/background.js';
import IconButton from '../components/IconButton/iconbutton.js';
import Link from 'next/link';

export default function Home() {
  return ( 
    <div>
      <Header/>
      <Background>
        <div className="h-4/5 w-10/12 mt-16 bg-white rounded-xl p-10 flex flex-row flex-wrap overflow-hidden">
          <IconButton linkPage="bmi-calculator" iconLabel="BMI Calculator" iconType="fa-calculator" customPadding="pl-7"/>
          <IconButton linkPage="nutrition-tracker" iconLabel="Nutrition Tracker" iconType="fa-bowl-food" customPadding="pl-5"/>
        </div>
      </Background>
    </div>
  );
}