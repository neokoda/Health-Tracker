import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Logo from '../Logo/logo.js';
import axios from 'axios';

export default function Header() {
  const router = useRouter();

  const [user, setUser] = useState('Log In');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/login', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          }
        });
        setUser(response.data.body.body.fullname);
      } catch (error) {
        console.log(error);

      }
    };

    getUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('../../auth/login');
  };

  return (
    <header className="flex flex-row justify-between z-10 fixed top-0 w-full bg-white shadow-xl px-12 pt-3 pb-4">
      <Link href="../../.">
        <Logo></Logo>
      </Link> 
      <div className="flex flex-row bg-green-300 rounded-3xl p-1 transition hover:brightness-[0.95] duration-300">
        <Link href={typeof localStorage !== 'undefined' && localStorage.getItem('accessToken') ? '../../profile' : '../../auth/login'} className="flex flex-row mt-1 font-bold">
          <i className="fa-user fa-solid px-2 pt-1 rounded-xl"></i>
          <div>{user}</div>
        </Link>
          <button onClick={handleLogout} className="bg-white ml-2 px-2 py-1 rounded-3xl transition hover:brightness-[0.95] duration-300">
            <i className="fa-door-open fa-solid"></i>
          </button>
      </div>
    </header>
  );
}