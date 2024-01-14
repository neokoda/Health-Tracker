import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header/header.js';
import Background from '../../components/Background/background.js';

export default function BMICalculator() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    height: '',
    weight: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = (e) => {
    e.preventDefault();
    
    setFormData({height: '', weight: ''});
    setErrorMessage('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.height > 0 && formData.weight > 0) {
      router.push({
        pathname: 'bmi-calculator/results',
        query: { height: formData.height, weight: formData.weight },
      });
    } else {
      setErrorMessage('Height and weight must be positive.');
    }
  }

  return ( 
    <div>
      <Header></Header>
      <Background>
        <form className="bg-white rounded-xl p-10 flex flex-col items-center max-w-xs sm:max-w-none sm:w-3/4 md:max-w-none md:w-1/2 lg:max-w-none lg:w-1/3" onSubmit={handleSubmit}>
          <h1 className="text-center text-3xl font-bold">BMI Calculator</h1>
          <input required className="overflow-hidden border-gray-400 border p-3 rounded-md mt-8 mb-1 w-11/12 transition transform hover:border-black hover:border-2 duration-300" name="height" type="number" value={formData.height} onChange={handleChange} placeholder="Height (cm)"/>
          <input required className="overflow-hidden border-gray-400 border p-3 rounded-md my-1 w-11/12 transition transform hover:border-black hover:border-2 duration-300" name="weight" type="number" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)"/>
          <p className="text-red-500 text-md mt-2 text-center">{errorMessage}</p>
          <div className="flex flex-row">
            <button type="submit" className="overflow-hidden rounded-md py-3 px-9 mt-4 mx-2 bg-green-300 font-bold shadow-lg transition hover:brightness-125 duration-300">Submit</button>
            <button type="submit" onClick={handleClear} className="overflow-hidden rounded-md py-3 px-9 mt-4 mx-2 bg-gray-300 font-bold shadow-lg transition hover:brightness-90 duration-300">Clear</button>
          </div>
        </form>
      </Background>
    </div>
  );
}