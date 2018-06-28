import { Navigation } from 'react-native-navigation';

import AuthScreen from './app/screens/Auth/Auth';
import Home from './app/screens/Home/Home.screen';
import DishDetail from './app/screens/DishDetail/DishDetail.screen';
import SideDrawer from './app/screens/SideDrawer/SideDrawer';

import { Provider } from 'react-redux';
import store from './app/store/store';
// Register Screens
Navigation.registerComponent(
  "AuthScreen", 
  () => AuthScreen, 
  store, 
  Provider
); //you have to register a component before you can load it through react native navigation

Navigation.registerComponent(
  "HomeScreen", 
  () => Home, 
  store, 
  Provider
);

Navigation.registerComponent(
  "DishDetailScreen", 
  () => DishDetail, 
  store, 
  Provider
);

Navigation.registerComponent(
  "SideDrawer",
  () => SideDrawer,
  store,
  Provider
);

// Start App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "AuthScreen",
    title: "Login"
  }
});