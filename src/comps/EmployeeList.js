import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const primaryApiUrl = 'https://randomuser.me/api/?results=10&seed=google';
const fallbackApiUrl = 'https://monkeys.co.il/api2/wo.php';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchEmployees = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEmployees(data.results || data); // Handle both APIs' data structure
      setFilteredEmployees(data.results || data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError('Error fetching data. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchEmployees(primaryApiUrl);
      } catch (error) {
        console.error('Primary API failed, trying fallback API.');
        await fetchEmployees(fallbackApiUrl);
      }
    };

    fetchData();
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
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some(emp => emp.login.uuid === employeeId);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(emp => emp.login.uuid !== employeeId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const employeeToAdd = employees.find(emp => emp.login.uuid === employeeId);
      if (employeeToAdd) {
        favorites.push(employeeToAdd);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    }
    setFilteredEmployees([...employees]); // Trigger re-render
  };

  return (
    <div className="container">
      <h2 className="my-4">Employee List</h2>
      <SearchBar onSearch={handleSearch} />
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {filteredEmployees.map((employee) => (
          <div className="col-md-6" key={employee.login.uuid}>
            <div className="card mb-4">
              <div className="row g-0">
                <div className="col-md-4">
                  {employee.picture.thumbnail && (
                    <img
                      src={employee.picture.thumbnail}
                      className="img-fluid rounded-circle"
                      alt={employee.name.first}
                      style={{ width: '100px', height: '100px' }}
                    />
                  )}
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{`${employee.name.title} ${employee.name.first} ${employee.name.last}`}</h5>
                    <p className="card-text">Age: {employee.dob.age}</p>
                    <p className="card-text">Location: {`${employee.location.city}, ${employee.location.country}`}</p>
                    <button
                      className={`btn ${JSON.parse(localStorage.getItem('favorites') || '[]').some(emp => emp.login.uuid === employee.login.uuid) ? 'btn-success' : 'btn-outline-primary'}`}
                      onClick={() => toggleFavorite(employee.login.uuid)}
                    >
                      {JSON.parse(localStorage.getItem('favorites') || '[]').some(emp => emp.login.uuid === employee.login.uuid) ? 'Saved' : 'Save Favorite'}
                    </button>
                    <Link to={`/employee/${employee.login.uuid}`} className="btn btn-primary ms-2">
                      More Details
                    </Link>
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
