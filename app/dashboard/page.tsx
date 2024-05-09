// "use client"
// import React from 'react';

// import DataCard from '@/components/DashboardForm/DataCard';
// import DataTable from '@/components/DashboardForm/DataTable';
// import Link from 'next/link';

// const Dashboard = () => {
//     return (
//         <div className='container bg-slate-700 p-4 flex flex-col gap-4'>
//             <h1>Admin Dashboard</h1>
//             <div className='flex flex-row justify-between flex-wrap'>
//                 <div className='component w-full sm:w-1/2 md:w-1/4 p-2'>
//                     <DataCard title="Cars for Sale" description="Active cars for sale" content="135 BMWs" />
//                 </div>
//                 <div className='component w-full sm:w-1/2 md:w-1/4 p-2'>
//                     <Link href="/dashboard/add-inventory">
//                         <DataCard title="Add Cars for sale" description="Click here to add inventory" content="First image will be cover image" />
//                     </Link>
//                 </div>
//                 <div className='component w-full sm:w-1/2 md:w-1/4 p-2'>
//                     <DataCard title="Cars for Sale" description="Active cars for sale" content="135 BMWs" />
//                 </div>
//                 <div className='component w-full sm:w-1/2 md:w-1/4 p-2'>
//                     <DataCard title="Cars for Sale" description="Active cars for sale" content="135 BMWs" />
//                 </div>
//             </div>
//             <div className='w-full p-2'>
//                 <DataTable />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { FaPlus, FaInbox, FaBoxArchive, FaUsers } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import DataTable from "@/components/DashboardForm/DataTable";

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-sm text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-sm text-gray-500">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-sm text-gray-500">+19% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <DataTable />
        </Card>
      </div>
    </>
  );
}
