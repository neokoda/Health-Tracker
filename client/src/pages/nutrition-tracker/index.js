import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header/header.js';
import Background from '../../components/Background/background.js';
import Link from 'next/link';

export default function NutritionTracker() {
  const router = useRouter();

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    router.push({
      pathname: '',
      query: { date: newDate },
    });
  };

  return ( 
    <div>
      <Header/>
      <Background>
        <div className="h-4/5 w-10/12 mt-16 bg-white rounded-xl p-10 flex flex-row flex-wrap overflow-hidden">
          <input className="" type="date" onChange={handleDateChange}/>
          <Link href="./nutrition-tracker/add-food-item">Add Food Item</Link>
        </div>
      </Background>
    </div>
  );
}