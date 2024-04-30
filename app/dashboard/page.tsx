"use client"
import React from 'react';
import InputForm from '@/components/DashboardForm/inputForm';


const Dashboard = () => {

    return (
        <div className='container bg-teal-300 p-4 flex flex-col gap-4'>
            <h1>Dashboard</h1>
            <InputForm />
        </div>
    );
};

export default Dashboard;