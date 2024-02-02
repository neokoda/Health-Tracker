import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../components/Header/header.js';
import Background from '../../components/Background/background.js';

export default function BMICalculator() {
    function roundToDecimalPlaces(number, decimalPlaces) {
        const factor = 10 ** decimalPlaces;
        return Math.round(number * factor) / factor;
    }

    const router = useRouter();
    const { query } = router;
    const height = query.height / 100;
    const weight = query.weight;
    const BMI = roundToDecimalPlaces((weight / (height ** 2)), 2);
    
    let classifyBMI = "";
    switch (true) {
        case (BMI < 18.5):
            classifyBMI = "Underweight";
            break;
        case (BMI >= 18.5 && BMI < 25):
            classifyBMI = "Normal";
            break;
        case (BMI >= 25 && BMI < 30):
            classifyBMI = "Overweight";
            break;
        case (BMI >= 30 && BMI < 35):
            classifyBMI = "Obese (Class I)";
            break;
        case (BMI >= 35 && BMI < 40):
            classifyBMI = "Obese (Class II)";
            break;
        case (BMI >= 40):
            classifyBMI = "Obese (Class III)";
            break;
    }

    return ( 
    <div>
        <Header></Header>
        <Background>
        <div className="bg-white rounded-xl p-10 flex flex-col items-center max-w-xs sm:max-w-none sm:w-3/4 md:max-w-none md:w-1/2 lg:max-w-none lg:w-1/3">
            <h1 className="text-center text-3xl font-bold">Your BMI Is:</h1>
            <h1 className="text-red-500 text-5xl mt-4 mb-2 font-bold">{BMI}</h1>
            <h2 className="text-lg text-center mb-2">You're classified as <span>{classifyBMI}</span>.</h2>
            <div className="flex flex-row">
                <Link href="../bmi-calculator" className="overflow-hidden rounded-md py-3 px-6 mt-4 mx-2 bg-green-300 font-bold shadow-lg transition hover:brightness-125 duration-300">Recalculate</Link>
                <Link href="../." className="overflow-hidden rounded-md py-3 px-6 mt-4 mx-2 bg-gray-300 font-bold shadow-lg transition hover:brightness-90 duration-300">Homepage</Link>
            </div>        
        </div>
        </Background>
    </div>
    );
}