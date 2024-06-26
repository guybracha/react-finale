import React, { createContext, useState, useContext } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch employees from API
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://randomuser.me/api/?results=10&seed=google');
      const data = await response.json();
      setEmployees(data.results); // Assuming data.results contains the employees array
      setLoading(false);
    } catch (error) {
      setError('Error fetching employees. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <EmployeeContext.Provider value={{ employees, loading, error, fetchEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
