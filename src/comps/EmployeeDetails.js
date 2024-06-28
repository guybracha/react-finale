import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';

// Fix for Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const apiUrl = 'https://randomuser.me/api/?results=10&seed=abc';

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null); // State for additional employee info
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const foundEmployee = data.results.find(emp => emp.login.uuid === id);
        setEmployee(foundEmployee);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchEmployee();
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const loadAdditionalInfo = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const foundEmployee = data.results.find(emp => emp.login.uuid === id);
      setAdditionalInfo(foundEmployee);
    } catch (error) {
      console.error('Error fetching additional data: ', error);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  const toggleFavorite = () => {
    const isFavorite = favorites.some(emp => emp.login.uuid === employee.login.uuid);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(emp => emp.login.uuid !== employee.login.uuid);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, employee]);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Employee Details</h2>
      <div className="card mb-4">
        {employee.picture.medium && (
          <img src={employee.picture.large} className="card-img-top" alt={employee.name.first} />
        )}
        <div className="card-body">
          <h5 className="card-title">{`${employee.name.title} ${employee.name.first} ${employee.name.last}`}</h5>
          <p className="card-text">Email: {employee.email}</p>
          <p className="card-text">Phone: {employee.phone}</p>
          <p className="card-text">Address: {`${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.country}, ${employee.location.postcode}`}</p>
          <div id="map" style={{ height: '400px' }}>
            <MapContainer center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]}>
                <Popup>
                  {`${employee.name.first} ${employee.name.last}`}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <button
            className={`btn ${favorites.some(emp => emp.login.uuid === employee.login.uuid) ? 'btn-success' : 'btn btn-primary mt-3'}`}
            onClick={toggleFavorite}
          >
            {favorites.some(emp => emp.login.uuid === employee.login.uuid) ? 'Saved' : 'Save Favorite'}
          </button>
          <button className="btn btn-primary mt-3" onClick={loadAdditionalInfo}>
            More Details
          </button>
          {additionalInfo && (
            <div className="mt-3">
              <h5>Additional Information</h5>
              <p>Full Name: {`${additionalInfo.name.title} ${additionalInfo.name.first} ${additionalInfo.name.last}`}</p>
              <p>Email: {additionalInfo.email}</p>
              <p>Phone: {additionalInfo.phone}</p>
              <p>Full Address: {`${additionalInfo.location.street.number} ${additionalInfo.location.street.name}, ${additionalInfo.location.city}, ${additionalInfo.location.state}, ${additionalInfo.location.country}, ${additionalInfo.location.postcode}`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
