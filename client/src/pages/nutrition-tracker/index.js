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
          <div className="w-10/12 bg-white rounded-xl p-10 flex flex-col flex-wrap overflow-hidden">
            <input className="w-32 border-2 border-black rounded-lg p-1" type="date" onChange={handleDateChange}/>
            <table className="text-center mt-2 border-2 border-black rounded-lg w-3/4">
              <tr>
                <th className="">Time Consumed</th>
                <th className="">Name</th>
                <th>Amount</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fat</th>
              </tr>
              <tr>
                <td className="">12:00</td>
                <td>Indomie</td>
                <td>200g</td>
                <td>300</td>
                <td>20g</td>
                <td>40g</td>
                <td>10g</td>
              </tr>
            </table>
            <Link href="./nutrition-tracker/add-food-item">Add Food Item</Link>
          </div>
        </Background>
      </div>
    );
  }