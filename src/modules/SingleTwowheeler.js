import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoChevronForwardCircleOutline } from 'react-icons/io5';

const SingleTwowheeler = () => {
  const { id } = useParams();
  const twowheeler = useSelector((state) => state.twowheelers.twowheelers).find(
    (item) => item.id === Number(id),
  );
  const state = useSelector((state) => state.twowheelers.twowheelers);

  if (!twowheeler && state.length === 0) {
    return <div className="loading">Loading</div>;
  }
  if (!twowheeler && state.length !== 0) {
    return <div className="loading">Element not found</div>;
  }
  return (
    <section className="twowheeler-details-page">
      <div className="twowheeler-photo-container">
        <img
          src={twowheeler.imageUrl}
          alt="twowheeler"
          className="detailsPageTwoheelerPhoto"
        />
      </div>
      <div className="twowheeler-details-container">
        <h1>
          {twowheeler.name}
        </h1>
        <p className="twowheeler-description">
          {twowheeler.description}
        </p>
        <ul className="details">
          <li>
            <span>Price: </span>
            <span>
              {twowheeler.price}
              $
            </span>
          </li>
          <li>
            <span>Model Year: </span>
            <span>{twowheeler.modelYear}</span>
          </li>
          <li>
            <span>Type of the Engine: </span>
            <span>{twowheeler.engineType}</span>
          </li>
          <li>
            <span>Fuel Type: </span>
            <span>{twowheeler.fuelType}</span>
          </li>
        </ul>
        <Link
          className="makeReservationButton"
          to="/reserve"
          state={{ chosenTwowheelerId: twowheeler.id }}
        >
          <button type="button">
            Make reservation
            <IoChevronForwardCircleOutline className="reserve-arrow-icon" />

          </button>
        </Link>
      </div>
    </section>
  );
};

export default SingleTwowheeler;
