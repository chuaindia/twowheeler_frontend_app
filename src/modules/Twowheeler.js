import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Twowheeler = (props) => {
  const { obj } = props;

  return (
    <div className="twowheeler-card">
      <div className="profile-pic-container">
        <img src={obj.imageUrl} alt="Twowheeler" />
      </div>

      <Link to={`/twowheeler/${obj.id}`}><h2>{`${obj.name}`}</h2></Link>

      <div className="divider">
        {
          [...Array(20)].map(() => <div key={Math.random(100)} className="divider-bullet" />)
        }
      </div>

      <div className="twowheeler-description">
        {`${obj.description.substring(0, 70)}...`}
      </div>
    </div>
  );
};

Twowheeler.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    modelYear: PropTypes.number.isRequired,
    engineType: PropTypes.string.isRequired,
    fuelType: PropTypes.string.isRequired,
  }).isRequired,
};

export default Twowheeler;
