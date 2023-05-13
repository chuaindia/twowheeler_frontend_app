import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { destroyTwowheeler } from '../../redux/twowheelers/twowheelers';

const DeleteItem = () => {
  const dispatch = useDispatch();

  const redirection = useNavigate();

  const availableTwowheelers = useSelector((store) => store.twowheelers.twowheelers);

  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        redirection('/user/login');
      }, 2000);
    }
  });

  const removeData = (e) => {
    const id = Number(e.target.value);
    dispatch(destroyTwowheeler(id));
  };

  if (isLoggedIn) {
    return (
      <section className="delete-twowheeler-page">
        <h1>Delete a twowheeler</h1>

        {availableTwowheelers.length !== 0 ? (
          <ul className="available-twowheelers-list">
            {availableTwowheelers.map((item) => (
              <li className="available-twowheeler" key={item.id}>
                <span>
                  {item.name}
                </span>
                <button
                  type="button"
                  name="delete"
                  className="delete-btn"
                  value={item.id}
                  onClick={removeData}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-items-available">
            <div>There are no twowheelers available.</div>
            <button type="button"><Link to="/"> Go back to the home page</Link></button>
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

export default DeleteItem;
