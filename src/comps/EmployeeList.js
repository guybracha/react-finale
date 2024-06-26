import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const apiUrl = 'https://randomuser.me/api/?results=10&seed=abc';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployees(data.results);
        setFilteredEmployees(data.results); // Initialize filtered employees with all employees
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const results = employees.filter(employee => {
      const fullName = `${employee.name.title} ${employee.name.first} ${employee.name.last}`.toLowerCase();
      const location = `${employee.location.city}, ${employee.location.country}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase()) || location.includes(searchTerm.toLowerCase());
    });
    setFilteredEmployees(results);
  }, [searchTerm, employees]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="row">
        {filteredEmployees.map((employee, index) => (
          <div key={employee.login.uuid} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    {employee.picture.thumbnail && (
                      <img src={employee.picture.thumbnail} alt={employee.name.first} className="rounded-circle" />
                    )}
                  </div>
                  <div className="col">
                    <p className="mb-0">Name: {`${employee.name.title} ${employee.name.first} ${employee.name.last}`}</p>
                    <p className="mb-0">Age: {employee.dob.age}</p>
                    <p className="mb-0">Location: {`${employee.location.city}, ${employee.location.country}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
