/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTwowheeler, clear } from '../../redux/twowheelers/twowheelers';

const AddTwowheeler = () => {
  const dispatch = useDispatch();

  const [overlay, setOverlay] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const redirection = useNavigate();

  const returnMsg = useSelector((state) => state.twowheelers);

  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  const postData = (data) => {
    const obj = { ...data };

    dispatch(addTwowheeler(obj));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        redirection('/user/login');
      }, 2000);
    }
    if (returnMsg) {
      if (returnMsg.message === 'Twowheeler has been created successfully!') {
        setOverlay(true);
        setTimeout(() => {
          dispatch(clear());
          redirection('/');
        }, 2500);
      } else if (returnMsg.message === 'Twowheeler already exists') {
        setOverlay(true);
        setTimeout(() => {
          dispatch(clear());
          setOverlay(false);
        }, 2500);
      }
    }
  }, [returnMsg, dispatch, redirection, isLoggedIn]);

  if (isLoggedIn) {
    return (
      <section className="add-twowheeler-page">
        <h1>Add a Twowheeler</h1>
        <div className="add-twowheeler-page-divider" />

        <form
          action=""
          className="add-twowheeler-form"
          onSubmit={handleSubmit(postData)}
        >
          <input
            type="input"
            name="name"
            placeholder="Name*"
            {...register('name', {
              required: {
                value: true,
                message: 'Name is a required field',
              },

            })}
          />

          <input
            type="input"
            name="image_url"
            placeholder="domain.com/something.jpg*"
            {...register('image_url', {
              required: {
                value: true,
                message: 'Image of the Twowheeler is a required field',
              },
              pattern: {
                value: /([a-z\-_0-9]*\.(jpg|jpeg|png|gif))/i,
                message: 'Please add a valid link for the image url',
              },
            })}
          />

          <input
            type="number"
            name="price"
            placeholder="price $$*"
            onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
            {...register('price', {
              required: {
                value: true,
                message: 'Price is a required field',
              },

            })}
          />

          <input
            type="number"
            name="model_year"
            placeholder="model_year"
            onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
            {...register('model_year', {
              required: {
                value: true,
                message: 'Year of the Model is a required field',
              },

            })}
          />

          <input
            type="string"
            name="engine_type"
            placeholder="engine_type"
            onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
            {...register('engine_type', {
              required: {
                value: true,
                message: 'Type of the Engine is a required field',
              },
            })}
          />

          <input
            type="string"
            name="fuel_type"
            placeholder="fuel_type"
            onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
            {...register('fuel_type', {
              required: {
                value: true,
                message: 'Type of the fuel is a required field',
              },
            })}
          />

          <textarea
            type="text"
            name="description"
            placeholder="Please give the Twowheeler details*"
            {...register('description', {
              required: {
                value: true,
                message: 'Description is a required field',
              },

            })}
          />

          <ul className="error-messages">
            {errors.name && (
              <li className="errorMsg">{errors.name.message}</li>
            )}

            {errors.image_url && (
              <li className="errorMsg">{errors.image_url.message}</li>
            )}

            {errors.description && (
              <li className="errorMsg">{errors.description.message}</li>
            )}

            {errors.price && (
              <li className="errorMsg">{errors.price.message}</li>
            )}

            {errors.model_year && (
              <li className="errorMsg">{errors.model_year.message}</li>
            )}

            {errors.engine_type && (
              <li className="errorMsg">{errors.engine_type.message}</li>
            )}

            {errors.fuel_type && (
              <li className="errorMsg">{errors.twitter_link.message}</li>
            )}

          </ul>

          <button type="submit" name="additem" className="session-btn">
            Add twowheeler
          </button>
        </form>

        <div className={`popup-message ${overlay ? '' : 'hidden'}`}>
          <p>{returnMsg.message}</p>
        </div>
      </section>
    );
  }

  return (
    <div className="popup-message">
      <p>Please login to view this page</p>
    </div>
  );
};

export default AddTwowheeler;
