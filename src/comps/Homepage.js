import React from 'react';
import EmployeeList from './EmployeeList';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className='container'>
      <h1>Bracha workers</h1>
      <EmployeeList />
    </div>
  );
}
