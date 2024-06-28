// Homepage.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Error from './Error';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';
import FavoriteList from './FavoriteList';

function Homepage() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path='/favorites' element={<FavoriteList/>}/>
        <Route path='/*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default Homepage;
