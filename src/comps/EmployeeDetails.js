import React from 'react';

export default function EmployeeDetails({ employee }) {
  return (
    <div className="employee-details">
      <h2>Employee Details</h2>
      {employee ? (
        <div className="details">
          <div>
            <strong>Full Name:</strong> {employee.name.first} {employee.name.last}
          </div>
          <div>
            <strong>Email:</strong> {employee.email}
          </div>
          <div>
            <strong>Phone:</strong> {employee.phone}
          </div>
          <div>
            <strong>Location:</strong> {employee.location.city}, {employee.location.country}
          </div>
          <div>
            <strong>Address:</strong> {employee.location.street.name} {employee.location.street.number}
          </div>
          <div>
            <strong>Coordinates:</strong> {employee.location.coordinates.latitude}, {employee.location.coordinates.longitude}
          </div>
          <div className="profile-picture">
            {employee.picture.large && <img src={employee.picture.large} alt="Profile" />}
          </div>
        </div>
      ) : (
        <p>Select an employee to view details.</p>
      )}
    </div>
  );
}
