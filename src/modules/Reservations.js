import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Reservations = () => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        navigate('/user/login');
      }, 2000);
    }
  }, [isLoggedIn, navigate]);

  // const sortReservations = (a, b) => {
  //   const dateA = new Date(a.date);
  //   const dateB = new Date(b.date);

  //   let hoursA = Number(a.hour.replace(/(^\d+)(.+$)/i, '$1'));
  //   let hoursB = Number(b.hour.replace(/(^\d+)(.+$)/i, '$1'));

  //   if (a.hour.includes('pm')) {
  //     hoursA += 12;
  //   }

  //   if (b.hour.includes('pm')) {
  //     hoursB += 12;
  //   }

  //   dateA.setHours(hoursA);
  //   dateB.setHours(hoursB);

  //   return dateA - dateB;
  // };

  const reservations = useSelector((state) => state.users.reservations);
  const twowheelers = useSelector((state) => state.twowheelers.twowheelers);

  if (isLoggedIn) {
    // reservations = reservations.sort(sortReservations);
    return (
      <section className="reservations-page">
        <h1>My reservations</h1>
        {reservations.length !== 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>twowheeler Name</th>
                  <th>City</th>
                  <th>Duration of test drive</th>
                  <th>Date of Reservation</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {twowheelers.find((twowheeler) => twowheeler.id === item.twowheeler_id).name}
                    </td>
                    <td>{item.city}</td>
                    <td>{item.hour}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="no-items-available">
            <div>There are no reservations currently</div>
            <Link to="/reserve"><button type="button">Make a reservation now!</button></Link>
          </div>
        )}
      </section>
    );
  }
  return (
    <div className="popup-message">
      <p>Please log in to access this page</p>
    </div>
  );
};

export default Reservations;
