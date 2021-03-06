import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { connect } from "react-redux";

import SearchBar from '../../components/SearchBar/SearchBar';
import { recommendDishDispatch } from '../../actions/dish.action';
import DishCard from '../../components/DishCard/DishCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchSelectedRestaurant } from '../../actions/restaurant.action';

//import Icon from "react-native-vector-icons/Ionicons";
//import { deletePlace } from "../../store/actions/index";

class DishDetail extends Component {

  static navigatorStyle = {
    navBarHidden: true
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  backIconPress = () => {
    this.props.navigator.pop();
  }
  searchBarPressHandler = () => {
    //navigate to search suggestion screen
    this.props.navigator.push({
      screen: "SearchSuggestionScreen",
    });
  }

  restaurantPressedHandler = (dish) => {
    console.log("here------------", dish)
    this.props.fetchSelectedRestaurant(dish.restaurant_id[0]);
    this.props.navigator.push({
        screen: "RestaurantDetailScreen",
        title: dish.restaurant_name,
        passProps: {
            id: dish.restaurant_id[0]
        }
    });
  }

  reviewDishHandler = (dish) => {
    this.props.navigator.push({
      screen: "ReviewDishScreen",
      title: 'Add Review',
      passProps: {
        selectedDish: dish
      }
    });
    alert("reviewed");
  }

  recommendButtonPressHandler = dish => {
    let alreadyRecommended = false;
    //dispatch action to increase recommendation count, pass dish_restaurant_mapping id
    console.log(" user recommendations", this.props.recommendations)
    for (let i = 0; i < this.props.recommendations.length; i++) {
      if (this.props.recommendations[i].dish_id[0] === dish.dish_id[0]) {
        console.log("you have already recommended this dish");
        alreadyRecommended = true;
        Alert.alert(
          '',
          'you have already recommended this dish',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
        break;
      }
    }
    if (alreadyRecommended === false) {
      this.props.recommendDishDispatch(dish._id);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backIconContainer}>
            <TouchableOpacity onPress={this.backIconPress}>
              <Icon name="ios-arrow-round-back-outline" size={45} color="#757575" />
            </TouchableOpacity></View>
          <View style={styles.searchbar}>
            <SearchBar
              onSearchBarPressed={this.searchBarPressHandler}
            />
          </View >
        </View>
        <ScrollView>
          <View>
            <DishCard
              dish_name={this.props.selectedDish.dish_name}
              price={this.props.selectedDish.price}
              restaurant_name={this.props.selectedDish.restaurant_name}
              recommended={this.props.selectedDish.recommended}
              dish_images={this.props.selectedDish.images}
              locality={this.props.selectedDish.locality}
              reviews={this.props.selectedDish.reviews}
              average_rating={this.props.selectedDish.average_rating}
              onRecommendButtonPressed={() => this.recommendButtonPressHandler(this.props.selectedDish)}
              onReviewButtonPressed={() => this.reviewDishHandler(this.props.selectedDish)}
              onRestaurantPressed={() => this.restaurantPressedHandler(this.props.selectedDish)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  },
  header: {
    paddingTop: 10,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  backIconContainer: {
    marginTop: '5%',
    marginLeft: '5%',
  },
  searchbar: {
    flex: 1,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%'
  }
});

const mapStateToProps = state => {
  return {
    reviews: state.reviews.reviews,
    reviewsError: state.reviews.reviewsError,
    reviewsLoading: state.reviews.reviewsLoading,
    recommendations: state.reviews.recommendations,
    recommendationsError: state.reviews.recommendationsError,
    recommendationsLoading: state.reviews.recommendationsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    recommendDishDispatch: (dish_id) => dispatch(recommendDishDispatch(dish_id)),
    fetchSelectedRestaurant: (restaurantId) => dispatch(fetchSelectedRestaurant(restaurantId))    
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
