import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = 'https://randomuser.me/api/?results=10&seed=abc';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to localStorage whenever favorites state changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  const toggleFavorite = (employeeId) => {
    const isFavorite = favorites.some(emp => emp.login.uuid === employeeId);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(emp => emp.login.uuid !== employeeId);
      setFavorites(updatedFavorites);
    } else {
      const employeeToAdd = employees.find(emp => emp.login.uuid === employeeId);
      if (employeeToAdd) {
        setFavorites([...favorites, employeeToAdd]);
      }
    }
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
                <img
                  src={employee.picture.thumbnail}
                  className="card-img-top rounded-circle"
                  alt={employee.name.first}
                  style={{ width: '100px', height: '100px' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{`${employee.name.title} ${employee.name.first} ${employee.name.last}`}</h5>
                <p className="card-text">Age: {employee.dob.age}</p>
                <p className="card-text">Location: {`${employee.location.city}, ${employee.location.country}`}</p>
                <button
                  className={`btn ${favorites.some(emp => emp.login.uuid === employee.login.uuid) ? 'btn-success' : 'btn-outline-primary'}`}
                  onClick={() => toggleFavorite(employee.login.uuid)}
                >
                  {favorites.some(emp => emp.login.uuid === employee.login.uuid) ? 'Saved' : 'Save Favorite'}
                </button>
                <Link to={`/employee/${employee.login.uuid}`} className="btn btn-primary ms-2">
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
