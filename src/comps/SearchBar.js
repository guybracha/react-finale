import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar mb-4">
      <form className="form-inline" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="form-control mr-sm-2"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit" className="btn btn-primary my-2 my-sm-0">Search</button>
      </form>
    </div>
  );
}
