import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import VIEWS from '../../views';

  const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentView, setCurrentView] = useState('home')
    const isDesktop = () => window.innerWidth > 768;
  
    useEffect(() => {
      setSidebarOpen(isDesktop());
    }, []);
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    const changeView = (view) => {
      setCurrentView(view);
      if(!isDesktop()){
        toggleSidebar();
      }
    }


    return (
    <div className={`dashboard bg-slate-100 w-full ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} >
      <div className='fixed z-10'>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} onItemClicked={changeView} />
      </div>
      <div className={sidebarOpen ? "md:ml-[300px] opacity-50 md:opacity-100 float-left p-5 md:p-10 h-screen bg-slate-100" : "w-full bg-slate-100 p-5 pt-20 md:p-20"}>
        { VIEWS[currentView] }
      </div>
    </div>
    );
  };

  export default Dashboard;
