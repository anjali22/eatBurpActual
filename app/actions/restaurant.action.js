import { API_ROOT } from '../../api-config';
import { authGetToken } from './auth.action';

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';
export const FETCH_RESTAURANTS_FAILURE = 'FETCH_RESTAURANTS_FAILURE';
export const FETCH_TOP_DISH_RESTAURANT = 'FETCH_TOP_DISH_RESTAURANT';
export const FETCH_TOP_DISH_RESTAURANT_SUCCESS = 'FETCH_TOP_DISH_RESTAURANT_SUCCESS';
export const FETCH_TOP_DISH_RESTAURANT_FAILURE = 'FETCH_TOP_DISH_RESTAURANT_FAILURE';
export const FETCH_SELECTED_RESTAURANT = 'FETCH_SELECTED_RESTAURANT';
export const FETCH_SELECTED_RESTAURANT_SUCCESS = 'FETCH_SELECTED_RESTAURANT_SUCCESS';
export const FETCH_SELECTED_RESTAURANT_FAILURE = 'FETCH_SELECTED_RESTAURANT_FAILURE';

export function fetchSelectedRestaurant(id) {
    return (dispatch) => {
        dispatch(getSelectedRestaurantResults());
        dispatch(authGetToken())
            .then(token => {
                return (
                    fetch(`${API_ROOT}/getSelectedRestaurant?id=` + id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-access-token': token
                        }
                    })
                )
            })
            .catch(() => {
                alert("No token found");
            })
            .then(res => res.json())
            .then(json => {
                console.log(json, "jsonnnn");
                dispatch(fetchSelectedRestaurantSuccess(json.success[0]));
                return json;
            })
            .catch(err => dispatch(fetchSelectedRestaurantFailure(err)))
    }
}

export function getSelectedRestaurantResults() {
    return {
        type: FETCH_SELECTED_RESTAURANT
    }
}

export function fetchSelectedRestaurantSuccess(selectedRestaurant) {
    return {
        type: FETCH_SELECTED_RESTAURANT_SUCCESS,
        payload: { selectedRestaurant }
    };
}

export function fetchSelectedRestaurantFailure(error) {
    return {
        type: FETCH_SELECTED_RESTAURANT_FAILURE,
        payload: { error }
    };
}

export function fetchTopDishRestaurants(item) {
    return (dispatch) => {
        dispatch(getTopDishRestaurants());
        return (fetch(`${API_ROOT}/getTopDishRestaurants?tag=` + item))
            .then(res => res.json())
            .then(json => {
                dispatch(fetchTopDishRestaurantsSuccess(json));
                return json;
            })
            .catch(err => dispatch(fetchTopDishRestaurantsFailure(err)))
    }
}

export function getTopDishRestaurants() {
    return {
        type: FETCH_TOP_DISH_RESTAURANT
    }
}

export function fetchTopDishRestaurantsSuccess(topDishRestaurants) {
    return {
        type: FETCH_TOP_DISH_RESTAURANT_SUCCESS,
        payload: { topDishRestaurants }
    };
}

export function fetchTopDishRestaurantsFailure(error) {
    return {
        type: FETCH_TOP_DISH_RESTAURANT_FAILURE,
        payload: { error }
    };
}

export function fetchRestaurants() {

    return (dispatch) => {
        dispatch(getRestaurants());
        return (fetch(`${API_ROOT}/getRestaurants`))
            .then(res => res.json())
            .then(json => {
                dispatch(fetchRestaurantsSuccess(json.docs));
                return json.docs;
            })
            .catch(err => dispatch(fetchRestaurantsFailure(err)))
    }
}

export function getRestaurants() {
    return {
        type: FETCH_RESTAURANTS
    }
}

export function fetchRestaurantsSuccess(restaurants) {
    return {
        type: FETCH_RESTAURANTS_SUCCESS,
        payload: { restaurants }
    };
}

export function fetchRestaurantsFailure(error) {
    return {
        type: FETCH_RESTAURANTS_FAILURE,
        payload: { error }
    };
}
