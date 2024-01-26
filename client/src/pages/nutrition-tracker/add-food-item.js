import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header/header.js';
import Link from 'next/link';
import Background from '../../components/Background/background.js';
import axios from 'axios';

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    foodName: '',
    amount: '',
    calories: '',
    protein: '',
    carbs:'',
    fat: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = (e) => {
    e.preventDefault();
    
    setFormData({
        foodName: '',
        amount: '',
        calories: '',
        protein: '',
        carbs:'',
        fat: '',
      });
    setErrorMessage('');
  }
  
  const handleSubmit = async (e) => {
    setErrorMessage('');
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/nutritionTracker/add-food-item', formData);
      setSuccessMessage("Item successfully added into database!");
      setFormData({    
        foodName: '',
        amount: '',
        calories: '',
        protein: '',
        carbs:'',
        fat: '',
      });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.body.message);
      setFormData({    
        foodName: '',
        amount: '',
        calories: '',
        protein: '',
        carbs:'',
        fat: '',
      });
    }
  };

  return (
    <div>
      <Header></Header>
      <Background>
        <form className="mt-14 flex flex-col items-center bg-white rounded-2xl px-8 py-10 shadow-xl max-w-xs sm:max-w-none sm:w-3/4 md:max-w-none md:w-1/2 lg:max-w-none lg:w-1/3" onSubmit={handleSubmit}>
          <h1 className="text-center text-3xl font-bold">Add a New Food Item</h1>
          <input required className="overflow-hidden border-gray-400 border p-3 rounded-md mt-8 mb-1 w-11/12 transition transform hover:border-black hover:border-2 duration-300" name="foodName" placeholder="Food Name" value={formData.foodName} onChange={handleChange}/>
          <input required className="overflow-hidden border-gray-400 border p-3 rounded-md my-1 w-11/12 transition transform hover:border-black hover:border-2 duration-300" name="amount" type="number" placeholder="Amount (grams)" value={formData.amount} onChange={handleChange}/>
          <input required className="overflow-hidden border-gray-400 border p-3 rounded-md my-1 w-11/12 transition transform hover:border-black hover:border-2 duration-300" name="calories" type="number" placeholder="Calories" value={formData.calories} onChange={handleChange}/>
          <input required className="overflow-hidden border-gray-400 border p-3 rounded-md my-1 w-11/12 transition transform hover:border-black hover:border-2 duration-300" name="protein" type="number" placeholder="Protein" value={formData.protein} onChange={handleChange}/>
          <input required className="overflow-hidden border-gray-400 border p-3 rounded-md my-1 w-11/12 transition transform hover:border-black hover:border-2 duration-300" name="carbs" type="number" placeholder="Carbohydrates" value={formData.carbs} onChange={handleChange}/>
          <input required className="overflow-hidden border-gray-400 border p-3 rounded-md my-1 w-11/12 transition transform hover:border-black hover:border-2 duration-300" name="fat" type="number" placeholder="Fats" value={formData.fat} onChange={handleChange}/>
          <p className="text-red-500 text-md mt-2">{errorMessage}</p>
          <p className="text-green-500 text-md mt-2 text-center">{successMessage}</p>
          <div className="flex flex-row">
            <button type="submit" className="overflow-hidden rounded-md py-3 px-9 mt-4 mx-2 bg-green-300 font-bold shadow-lg transition hover:brightness-125 duration-300">Submit</button>
            <button onClick={handleClear} className="overflow-hidden rounded-md py-3 px-9 mt-4 mx-2 bg-gray-300 font-bold shadow-lg transition hover:brightness-90 duration-300">Clear</button>
          </div>
        </form>
      </Background>
    </div>
  );
  }