import { setRemoveReservationsAction } from '../user/session-redux';

// Actions
const SET_TWOWHEELERS = 'twowheelers/twowheelers/SET_TWOWHEELERS';
const FULLFILED = 'twowheelers/twowheelers/FULLFILED';
const STATUS = 'twowheelers/twowheelers/STATUS';
const CLEAR = 'twowheelers/twowheelers/CLEAR';
const DELETE_TWOWHEELER = 'twowheelers/twowheelers/DELETE_TWOWHEELER';
const LINK = 'http://127.0.0.1:3000/api/v1/twowheelers';

// initial state
const initialState = {
  twowheelers: [],
  message: '',
};

// Reducer
const twowheelersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TWOWHEELERS:
      return { twowheelers: [...action.payload] };
    case FULLFILED:
      return {
        twowheelers: [...state.twowheelers, action.payload.obj],
        message: action.payload.msg,
      };
    case STATUS:
      return {
        twowheelers: [...state.twowheelers],
        message: action.payload,
      };
    case CLEAR:
      return {
        twowheelers: [...state.twowheelers],
        message: action.payload,
      };
    case DELETE_TWOWHEELER:
      return {
        twowheelers: [...state.twowheelers.filter((item) => item.id !== action.payload)],
      };
    default:
      return state;
  }
};

// Action Creators
const setTwowheelersAction = (twowheelersList) => ({
  type: SET_TWOWHEELERS,
  payload: twowheelersList,
});

const fullfiled = (obj, msg) => ({
  type: FULLFILED,
  payload: { obj, msg },
});

const status = (msg) => ({
  type: STATUS,
  payload: msg,
});

const clear = () => ({
  type: CLEAR,
  payload: '',
});

const deleteTwowheeler = (id) => ({
  type: DELETE_TWOWHEELER,
  payload: id,
});

const fetchTwowheelers = () => async (dispatch) => {
  await fetch(LINK, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((result) => result.json())
    .then((res) => {
      const twowheelersList = res.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        imageUrl: item.image_url,
        price: item.price,
        modelYear: item.model_year,
        engineType: item.engine_type,
        fuelType: item.fuel_type,
      }));
      dispatch(setTwowheelersAction(twowheelersList));
    });
};

const addTwowheeler = (obj) => async (dispatch) => fetch(LINK, {
  method: 'POST',
  body: JSON.stringify(obj),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.twowheeler_obj) {
      const twowheelerObj = {
        id: data.twowheeler_obj.id,
        name: data.twowheeler_obj.name,
        description: data.twowheeler_obj.description,
        imageUrl: data.twowheeler_obj.image_url,
        price: data.twowheeler_obj.price,
        modelYear: data.twowheeler_obj.model_year,
        engineType: data.twowheeler_obj.engine_type,
        fuelType: data.twowheeler_obj.fuel_type,
      };
      dispatch(fullfiled(twowheelerObj, data.message));
    } else {
      dispatch(status('Twowheeler already exists'));
    }
  });

const destroyTwowheeler = (id) => async (dispatch) => fetch(`http://127.0.0.1:3000/api/v1/twowheeler/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.message === 'Twowheeler has been destroyed successfully!') {
      dispatch(deleteTwowheeler(id));
      dispatch(setRemoveReservationsAction(id));
    }
  });

export {
  fetchTwowheelers, setTwowheelersAction,
  fullfiled, addTwowheeler, destroyTwowheeler,
  clear, status, deleteTwowheeler,
};

export default twowheelersReducer;
