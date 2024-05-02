"use client"
import React from 'react';


import DataCard from '@/components/DashboardForm/DataCard';
import DataTable from '@/components/DashboardForm/DataTable';
import Link from 'next/link';



const Dashboard = () => {
    return (
        <div className='container bg-slate-700 p-4 flex flex-col gap-4'>
            <h1>Admin Dashboard</h1>
            <div className='flex flex-row justify-between flex-wrap'>
                <div className='component w-full sm:w-1/2 md:w-1/4 p-2'>
                    <DataCard title="Cars for Sale" description="Active cars for sale" content="135 BMWs" />
                </div>
                <div className='component w-full sm:w-1/2 md:w-1/4 p-2'>
                    <Link href="/dashboard/add-inventory">
                        <DataCard title="Add Cars for sale" description="Click here to add inventory" content="First image will be cover image" />
                    </Link>
                </div>
                <div className='component w-full sm:w-1/2 md:w-1/4 p-2'>
                    <DataCard title="Cars for Sale" description="Active cars for sale" content="135 BMWs" />
                </div>
                <div className='component w-full sm:w-1/2 md:w-1/4 p-2'>
                    <DataCard title="Cars for Sale" description="Active cars for sale" content="135 BMWs" />
                </div>
            </div>
            <div className='w-full p-2'>
                <DataTable />
            </div>
        </div>
    );
};

export default Dashboard;