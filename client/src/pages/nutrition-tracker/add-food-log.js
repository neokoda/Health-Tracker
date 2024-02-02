import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header/header.js';
import Link from 'next/link';
import Background from '../../components/Background/background.js';
import axios from 'axios';

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    foodName: '',
    date: '',
    amount: '',
    amountType: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [allFood, setAllFood] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResultComponent, setSearchResultComponent] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSearchResultComponent([]);
  };

  const handleSuggestionClick = (e) => {
    setFormData({ ...formData, foodName: e.target.innerHTML });
    setSearchResultComponent([]);
  }

  const handleClear = (e) => {
    e.preventDefault();
    
    setFormData({
        foodName: '',
        date: '',
        amount: '',
        amountType: '',
      });
    setErrorMessage('');
    setSuccessMessage('');
  }
  
  const handleSubmit = async (e) => {
    setErrorMessage('');
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/nutritionTracker/add-food-log', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
        });
      setSuccessMessage("Log successfully entered!");
      setFormData({    
        foodName: '',
        date: '',
        amount: '',
        amountType: '',
      });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.body.message);
      setFormData({    
        foodName: '',
        date: '',
        amount: '',
        amountType: '',
      });
    }
  };

  useEffect(() => {
    const getAllFood = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/nutritionTracker/food-list', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        });
        setAllFood(response.data.body.body);
      } catch (error) {
        console.log(error);
      }
    };
    getAllFood();
  }, []);

  useEffect(() => {
    const searchResults = allFood.filter(item =>
      item.food_name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResultComponent(query == '' ? [] : searchResults.map((item) => (
      <div className="px-3 transition transform hover:bg-gray-200 duration-300" onClick={handleSuggestionClick} key={item.id}>{item.food_name}</div>
    )));
  }, [query, allFood]);

  const handleSearch = (e) => {
    setFormData({...formData, foodName: e.target.value});
    setQuery(e.target.value);
  };

return (
    <div>
        <Header></Header>
        <Background>
            <form className="mt-14 flex flex-col items-center bg-white rounded-2xl px-8 py-10 shadow-xl max-w-xs sm:max-w-none sm:w-3/4 md:max-w-none md:w-1/2 lg:max-w-none lg:w-1/3" onSubmit={handleSubmit}>
                <h1 className="text-center text-3xl font-bold">Add Food Log</h1>
                <div className="flex flex-col w-11/12 relative">
                    <input required className="overflow-hidden border-gray-400 border p-3 rounded-md mt-8 mb-1 transition transform hover:border-black hover:border-2 duration-300" name="foodName" value={formData.foodName} placeholder="Food Name" autocomplete="off" onChange={handleSearch}/>
                    <div className="absolute w-full border-gray-200 bg-gray-100 z-10 mt-[5.25rem]">
                        {searchResultComponent}
                    </div>
                </div>
                <input required className="overflow-hidden border-gray-400 border p-3 rounded-md mb-1 w-11/12 transition transform hover:border-black hover:border-2 duration-300" type="date" name="date" value={formData.date} onChange={handleChange}/>
                <input required className="overflow-hidden border-gray-400 border p-3 rounded-md mb-1 w-11/12 transition transform hover:border-black hover:border-2 duration-300" name="amount" type="number" placeholder="Amount" value={formData.amount} onChange={handleChange}/>
                <div>
                    <label className="mx-2">
                        <input type="radio" name="amountType" value="grams" onChange={handleChange}/>
                        Grams
                    </label>
                    <label className="mx-2">
                        <input type="radio" name="amountType" value="servings" onChange={handleChange}/>
                        Servings
                    </label>
                </div>
                <p className="text-red-500 text-md mt-1">{errorMessage}</p>
                <p className="text-green-500 text-md mt-1 text-center">{successMessage}</p>
                <div className="flex flex-row">
                    <button type="submit" className="overflow-hidden rounded-md py-3 px-9 mt-4 mx-2 bg-green-300 font-bold shadow-lg transition hover:brightness-125 duration-300">Submit</button>
                    <button onClick={handleClear} className="overflow-hidden rounded-md py-3 px-9 mt-4 mx-2 bg-gray-300 font-bold shadow-lg transition hover:brightness-90 duration-300">Clear</button>
                </div>
            </form>
        </Background>
    </div>
);
  }