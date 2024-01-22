import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header/header.js';
import Link from 'next/link';
import Background from '../../components/Background/background.js';
import axios from 'axios';

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('accessToken', response.data.body.body.accessToken);
      router.push('../../.');
    } catch (error) {
      setErrorMessage(error.response.data.body.message);
      setFormData({email: '', password: ''});
    }
  };

  return (
    <div>
      <Header></Header>
      <Background>
        <form className="flex flex-col items-center bg-white rounded-2xl px-8 py-10 shadow-xl max-w-xs sm:max-w-none sm:w-3/4 md:max-w-none md:w-1/2 lg:max-w-none lg:w-1/3" onSubmit={handleSubmit}>
          <h1 className="text-center text-3xl font-bold mb-6">Log In to Your Account</h1>
          <i className="fa-user fa-regular fa-4x"></i>
          <input required className="overflow-hidden border-gray-400 border p-3 rounded-md mt-8 mb-1 w-11/12 transition transform hover:border-black hover:border-2 duration-300" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
          <input required className="overflow-hidden border-gray-400 border p-3 rounded-md my-1 w-11/12 transition transform hover:border-black hover:border-2 duration-300" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
          <p className="text-sm text-left">Don't have an account? Sign up <Link className="text-blue-600 underline" href="./register">here</Link></p>
          <p className="text-red-500 text-md mt-2">{errorMessage}</p>
          <button type="submit" className="overflow-hidden rounded-md py-3 px-9 mt-4 bg-green-300 font-bold shadow-lg transition hover:brightness-125 duration-300">Submit</button>
        </form>
      </Background>
    </div>
  );
  }