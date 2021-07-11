import React, { useEffect } from 'react'
import Header from '../components/Header';
import Sidebar from '../components/sidebar/Index';
import Timeline from '../components/Timeline';

function Dashboard() {

    useEffect(() => {
        document.title = 'Insta';
    }, [])

    return (
        <div className="bg-gray-100">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-16">
                <Timeline />
                <Sidebar />
            </div>
        </div >
    )
}

export default Dashboard
