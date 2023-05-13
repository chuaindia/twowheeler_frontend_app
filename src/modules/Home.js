import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';

const Home = () => {
  const { twowheelers } = useSelector((state) => state.twowheelers);
  const isLoggedIn = useSelector((state) => state.users.logged_in);

  return (
    <section className="main-page-section">
      <div className="heading">
        <h1>Splendid TWOWHEELERS</h1>
        {twowheelers.length !== 0 ? <p>Please choose your favourite twowheeler!</p> : ''}
      </div>

      <div className="divider">
        {[...Array(20)].map(() => (
          <div key={Math.random(100)} className="divider-bullet" />
        ))}
      </div>

      {twowheelers.length !== 0 ? (
        <Carousel twowheelers={twowheelers} />
      ) : (
        <div className="no-items-available">
          <div> There are no twowheelers currently available</div>
          {isLoggedIn && (
            <Link to="/add_twowheeler">
              {' '}
              <button type="button">Add a twowheeler now!</button>
            </Link>
          )}
        </div>
      )}
    </section>
  );
};

export default Home;
