import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../pages/Navbar/Navbar';
import Footer from '../home/footer/Footer';

const MainLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;