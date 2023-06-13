import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchReservation, setMsgAction } from '../redux/user/session-redux';

const Reserve = () => {
  const { twowheelers } = useSelector((state) => state.twowheelers);
  const { creationMsg, user } = useSelector((state) => state.users);

  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const { chosenTwowheelerId } = location.state || -1;

  const [city, setCity] = useState('');
  const [hour, setHour] = useState('');
  const [dateres, setDateres] = useState('');
  const [twowheelerId, setTwowheelerId] = useState(chosenTwowheelerId);
  const [errorMessage, setErrorMessage] = useState('');
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        navigate('/user/login');
      }, 2000);
    }
    if (creationMsg === 'Reservation has been created successfully!') {
      setCreated(true);
      setErrorMessage('');
      setErrorMessage('');
      dispatch(setMsgAction());
      setTimeout(() => {
        navigate('/reservations');
      }, 2500);
    }
    if (creationMsg === 'Reservation couldn\'t be created.') {
      setErrorMessage('Oops! Reservation couldn\'t be created. Can\'t reserve the same twowheeler on the same day and hour twice.');
      dispatch(setMsgAction());
    }
  }, [creationMsg, created, dispatch, navigate, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="popup-message">
        <p>Please log in to access this page</p>
      </div>
    );
  }

  const hours = [
    '30 minutes',
    '35 minutes',
    '40 minutes',
    '45 minutes',
    '50 minutes',
    '55 minutes',
    '1 hour',
  ];

  const cities = [
    'Delhi',
    'Mumbai',
    'Kolkata',
    'Chennai',
    'Bangalore',
    'Bhubaneswar',
    'Hyderabad',
    'Agartala',
    'Siliguri',
    'Ahmedabad',
    'Pune',
    'Ranchi',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hour === '' || city === '' || dateres === '' || twowheelerId === -1) {
      setErrorMessage('All fields are required');
      return;
    }
    dispatch(fetchReservation({
      city, hour, date: dateres, twowheeler_id: twowheelerId, user_id: user.id,
    }));
  };

  const getCurrentDate = () => new Date().toJSON().slice(0, 10);

  return (
    <section className="reserve-twowheeler-page">
      <h1>BOOK A TEST DRIVE</h1>

      <div className="reserve-page-divider" />
      <p>
        You will get quality twowheelers.
      </p>

      <form onSubmit={handleSubmit} className="reserve-form">
        <select defaultValue={chosenTwowheelerId || ''} name="twowheeler_id" id="twowheeler-drop-down" onChange={(e) => setTwowheelerId(e.target.value)}>
          <option value="">Select a twowheeler</option>
          {twowheelers.map((twowheeler) => (
            <option
              key={twowheeler.id + twowheeler.name}
              value={twowheeler.id}
            >
              {`${twowheeler.name}`}
            </option>
          ))}
        </select>

        <select name="city" id="city-dropdown" onChange={(e) => setCity(e.target.value)}>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <input type="date" id="date-picker" name="date" min={getCurrentDate()} onChange={(e) => setDateres(e.target.value)} />

        <select name="hour" id="hour-dropdown" onChange={(e) => setHour(e.target.value)}>
          <option value="">Select duration of test drive</option>
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>

        <p className="error-messages">{errorMessage}</p>
        <input type="submit" value="Book Now" />
      </form>

      <div className={`popup-message ${created ? '' : 'hidden'}`}>
        <p>Reservation has been created successfully!</p>
      </div>
    </section>
  );
};

export default Reserve;
