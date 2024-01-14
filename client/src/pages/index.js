import Header from '../components/Header/header.js';
import Background from '../components/Background/background.js';
import Link from 'next/link';

export default function Home() {
  return ( 
    <div>
      <Header></Header>
      <Background>
        <div className="h-4/5 w-10/12 mt-16 bg-white rounded-xl p-10 flex flex-row">
            <Link href="bmi-calculator" className="flex flex-col items-center">
              <div className="rounded-full border-4 border-teal-400 pt-5 pl-7 w-28 h-28 bg-green-100 transition hover:brightness-[0.95] duration-300">
                <i className="fa-solid fa-calculator fa-4x text-teal-400"></i>
              </div>
              <h1 className="mt-2 text-lg font-bold">BMI Calculator</h1>
            </Link>
        </div>
      </Background>
    </div>
  );
}