import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        setFilteredEmployees(data.results);
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
    <div className="container">
      <h2 className="my-4">Employee List</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="row">
        {filteredEmployees.map((employee) => (
          <div className="col-md-6" key={employee.login.uuid}>
            <div className="card mb-4">
              {employee.picture.thumbnail && (
                <img src={employee.picture.large} className="card-img-top" alt={employee.name.first} />
              )}
              <div className="card-body">
                <h5 className="card-title">{`${employee.name.title} ${employee.name.first} ${employee.name.last}`}</h5>
                <p className="card-text">Age: {employee.dob.age}</p>
                <p className="card-text">Location: {`${employee.location.city}, ${employee.location.country}`}</p>
                <Link to={`/employee/${employee.login.uuid}`} className="btn btn-primary">
                  More Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
