import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import { SiCodechef } from "react-icons/si";
import DashPosts from '../components/DashPosts';
import DashSave from '../components/DashSave';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    };
  }, [location.search])
  return (
    <div  className='min-h-screen flex flex-col md:flex-row'>
      <div>
        <DashSidebar />
      </div>
      {tab === '' && <div className='flex justify-center items-center my-auto md:mx-auto w-full'>
        <SiCodechef size={'30rem'}/>
      </div>}
      {tab === 'profile' && <DashProfile />}
      {tab === 'posts' && <DashPosts />}
      {tab === 'save' && <DashSave />}
    </div>
  )
}