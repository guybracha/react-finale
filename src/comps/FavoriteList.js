import React from 'react';

export default function FavoriteList({ favoriteEmployees, onEmployeeClick }) {
  return (
    <div className="favorite-list">
      <h2>Favorite Employees</h2>
      <ul>
        {favoriteEmployees.map((employee) => (
          <li key={employee.login.uuid}>
            <div className="employee-item" onClick={() => onEmployeeClick(employee)}>
              <div className="employee-avatar">
                {employee.picture.thumbnail && (
                  <img src={employee.picture.thumbnail} alt="Profile" />
                )}
              </div>
              <div className="employee-info">
                <p><strong>Name:</strong> {employee.name.first} {employee.name.last}</p>
                <p><strong>Age:</strong> {employee.dob.age}</p>
                <p><strong>Location:</strong> {employee.location.city}, {employee.location.country}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
