  import React, { useState, useEffect } from 'react';
  import { useRouter } from 'next/router';
  import Header from '../../components/Header/header.js';
  import Background from '../../components/Background/background.js';
  import Link from 'next/link';
  import axios from 'axios';

  export default function NutritionTracker() {
    const router = useRouter();

    const [tableData, setTableData] = useState([]);
    const [tableFooterData, setTableFooterData] = useState([]);
    const [allFood, setAllFood] = useState([]);

    useEffect(() => {
      const getAllFood = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/nutritionTracker/food-list', {
          });
          setAllFood(response.data.body.body);
        } catch (error) {
          console.log(error);
        }
      };
      getAllFood();
    }, []);

    const displayFoodLogTable = (foodLogs) => {
      const foodLogComponent = foodLogs.map((item) => (
        <tr key={item.id}>
          <td><i className="fa-solid fa-trash-can text-red-500" onClick={() => handleDelete(item.id)}></i></td>
          <td>{item.food.food_name}</td>
          <td>{item.amount}/{(item.amount * item.food.amount).toFixed(2)}</td>
          <td>{(item.food.calories * item.amount).toFixed(2)}</td>
          <td>{(item.food.proteins * item.amount).toFixed(2)}</td>
          <td>{(item.food.carbohydrates * item.amount).toFixed(2)}</td>
          <td>{(item.food.fats * item.amount).toFixed(2)}</td>
        </tr>
      ));
      setTableData(foodLogComponent);

      const summary = (
        <tr>
          <td></td>
          <td className="font-bold">Total</td>
          <td>{foodLogs.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}/{foodLogs.reduce((sum, item) => sum + item.amount * item.food.amount, 0).toFixed(2)}</td>
          <td>{foodLogs.reduce((sum, item) => sum + item.food.calories * item.amount, 0).toFixed(2)}</td>
          <td>{foodLogs.reduce((sum, item) => sum + item.food.proteins * item.amount, 0).toFixed(2)}</td>
          <td>{foodLogs.reduce((sum, item) => sum + item.food.carbohydrates * item.amount, 0).toFixed(2)}</td>
          <td>{foodLogs.reduce((sum, item) => sum + item.food.fats * item.amount, 0).toFixed(2)}</td>
        </tr>
        );
      setTableFooterData(summary);
    }

    const handleDateChange = async (e) => {
      const newDate = e.target.value;
    
      try {
        await router.push({
          pathname: router.pathname,
          query: { date: encodeURIComponent(newDate) },
        });
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      const fetchLogData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/nutritionTracker?date=${encodeURIComponent(router.query.date)}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
          });
  
          displayFoodLogTable(response.data.body.body);
        } catch (error) {
          console.log(error);
        }
      };

      fetchLogData();
    }, [router.query.date]);

    const handleDelete = async (foodLogId) => {
      try {
        const deleteFoodLog = await axios.delete(`http://localhost:5000/api/nutritionTracker/delete-food-item?foodLogId=${foodLogId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          }
        });

        const response = await axios.get(`http://localhost:5000/api/nutritionTracker?date=${encodeURIComponent(router.query.date)}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          }
        });
        
        displayFoodLogTable(response.data.body.body);
      } catch (error) {
        console.log(error);
      }
    }

    return ( 
      <div>
        <Header/>
        <Background>
          <div className="w-10/12 bg-white rounded-xl p-10 flex flex-col flex-wrap overflow-hidden">
            <div className="flex flex-row">
              <input className="border-2 border-black rounded-lg p-1" type="date" onChange={handleDateChange}/>
            </div>
            <table className="block overflow-scroll w-full text-center mt-2 border-2 border-black rounded-lg">
              <thead>
                <tr>
                    <th className="px-4"></th>
                    <th className="px-16">Name</th>
                    <th className="px-16">Amount (servings/grams)</th>
                    <th className="px-16">Calories</th>
                    <th className="px-16">Protein</th>
                    <th className="px-16">Carbs</th>
                    <th className="px-16">Fat</th>
                </tr>
              </thead>
              <tbody>
                {tableData}
              </tbody>
              <tfoot>
                {tableFooterData}
              </tfoot>
            </table>
            <Link className="overflow-hidden rounded-md text-center w-3/4 sm:w-2/12 py-3 mt-4 bg-green-300 font-bold shadow-lg transition hover:brightness-125 duration-300" href="./nutrition-tracker/add-food-log">Add Food Log</Link>
          </div>
        </Background>
      </div>
    );
  }