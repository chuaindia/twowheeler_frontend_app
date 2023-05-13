import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';
import Twowheeler from './Twowheeler';

const Carousel = ({ twowheelers }) => {
  const handlePrevClick = () => {
    const carousel = document.querySelector('.carousel');
    const item = document.querySelector('.twowheeler-card');
    carousel.scrollLeft -= item.clientWidth;
  };
  const handleNextClick = () => {
    const carousel = document.querySelector('.carousel');
    const item = document.querySelector('.twowheeler-card');
    carousel.scrollLeft += item.clientWidth;
  };

  return (
    <div className="carousel-container">
      <button
        type="button"
        className="previous"
        onClick={() => {
          handlePrevClick();
        }}
      >
        <IconContext.Provider value={{ size: '1.15rem', color: 'white' }}>
          <div>
            <BiLeftArrow />
          </div>
        </IconContext.Provider>
      </button>
      <ul className="carousel">
        {twowheelers.map((item) => (
          <li key={item.id}>
            <Twowheeler obj={item} />
          </li>
        ))}
      </ul>
      <button
        className="next"
        type="button"
        onClick={() => {
          handleNextClick();
        }}
      >
        <IconContext.Provider value={{ size: '1.15rem', color: 'white' }}>
          <div>
            <BiRightArrow />
          </div>
        </IconContext.Provider>
      </button>
    </div>
  );
};

Carousel.propTypes = {
  twowheelers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      modelYear: PropTypes.number.isRequired,
      engineType: PropTypes.string.isRequired,
      fuelType: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Carousel;
