import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FavoriteList() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  return (
    <div className="container">
      <h2 className="my-4">Favorite Employees</h2>
      <div className="row">
        {favorites.map((employee) => (
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

export default FavoriteList;
