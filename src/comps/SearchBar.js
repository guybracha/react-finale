import React, { useState } from 'react';

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
    <div className="search-bar">
      <form onSubmit={handleSearchSubmit} className="form-inline">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
