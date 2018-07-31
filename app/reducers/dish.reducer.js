import {
    FETCH_ALL_DISHES,
    FETCH_ALL_DISHES_SUCCESS,
    FETCH_ALL_DISHES_FAILURE,
    FETCH_TOP_DISHES,
    FETCH_TOP_DISHES_SUCCESS,
    FETCH_TOP_DISHES_FAILURE,
    RECOMMEND_DISH,
    RECOMMEND_DISH_SUCCESS,
    RECOMMEND_DISH_FAILURE,
    FETCH_DISH_SEARCH_RESULTS,
    FETCH_DISH_SEARCH_RESULTS_FAILURE,
    FETCH_DISH_SEARCH_RESULTS_SUCCESS,
    FETCH_CITY_SPECIAL,
    FETCH_CITY_SPECIAL_FAILURE,
    FETCH_CITY_SPECIAL_SUCCESS
} from '../actions/dish.action';

const initialState = {
    topDishes: [],
    topDishesError: null,
    topDishesLoading: false,
    allDishes: [],
    allDishesError: null,
    allDishesLoading: false,
    dishSearchResults: [],
    dishSearchResultsLoading: false,
    dishSearchResultsError: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_TOP_DISHES:
      return { ...state,  topDishesError: null, topDishesLoading: true }; 
    case FETCH_TOP_DISHES_SUCCESS:
      return { ...state, topDishes: action.payload.topDishes, topDishesError:null, topDishesLoading: false };
    case FETCH_TOP_DISHES_FAILURE:
      return { ...state, topDishes: [], topDishesError: action.payload.error, topDishesLoading: false};  
    case FETCH_ALL_DISHES:
      return { ...state,  allDishesError: null, allDishesLoading: true }; 
    case FETCH_ALL_DISHES_SUCCESS:
      return { ...state, allDishes: action.payload.allDishes, allDishesError:null, allDishesLoading: false };
    case FETCH_ALL_DISHES_FAILURE:
      return { ...state, allDishes: [], allDishesError: action.payload.error, allDishesLoading: false};  
    case RECOMMEND_DISH:
      return { ...state, recommendError: null, recommendLoading: true };
    case RECOMMEND_DISH_SUCCESS:
      return { ...state, topDishes: state.topDishes.map(dish => {
          if( dish._id === action.payload.recommendedDish._id){
            return action.payload.recommendedDish;
          }
          return dish;
      })};
    case RECOMMEND_DISH_FAILURE:
      return { ...state, topDishes: [], recommendError: action.payload.error, recommendLoading: false};      
    case FETCH_CITY_SPECIAL: 
      return { ...state, citySpecial: null, citySpecialLoading: true};
    case FETCH_CITY_SPECIAL_SUCCESS:
      return { ...state, citySpecial: action.payload.citySpecial, citySpecialLoading: false};
    case FETCH_CITY_SPECIAL_FAILURE: 
      return { ...state, citySpecial: action.payload.error, citySpecialLoading: false};
    case FETCH_DISH_SEARCH_RESULTS:
      return { ...state,  dishSearchResults: null, dishSearchResultsLoading: true }; 
    case FETCH_DISH_SEARCH_RESULTS_SUCCESS:
      return { ...state, dishSearchResults: action.payload.dishList, dishSearchResultsError:null, dishSearchResultsLoading: false };
    case FETCH_DISH_SEARCH_RESULTS_FAILURE:
      return { ...state, dishSearchResults: [], dishSearchResultsError: action.payload.error, dishSearchResultsLoading: false};  
    default:
      return state;
    }
};

export default reducer;