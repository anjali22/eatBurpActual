import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import DishList from '../../components/DishList/DishList';
import SearchBar from '../../components/SearchBar/SearchBar';
import dishes from '../../data/data';
import { connect } from 'react-redux';
import { fetchTopDishes, recommendDishDispatch } from '../../actions/dish.action';
import { fetchSelectedRestaurant } from '../../actions/restaurant.action';
import Icon from 'react-native-vector-icons/Ionicons';

class TopTenDish extends Component {

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };

    state = {
        dishes: dishes
    }

    recommendButtonPressHandler = dish => {
        // console.log("recommend", dish);
        //dispatch action to increase recommendation count, pass dish_restaurant_mapping id
        this.props.recommendDishDispatch(dish._id);
    }

    reviewButtonPressHandler = dish => {
        this.props.navigator.push({
            screen: "ReviewDishScreen",
            title: 'Add Review',
            passProps: {
                selectedDish: dish
            }
        });
        //this.props.reviewDishDispatch(dish.item._id);        
    }

    searchBarPressHandler = () => {
        //navigate to search suggestion screen
        console.log("pressed search bar");
        this.props.navigator.push({
            screen: "SearchSuggestionScreen",
            // title: dish.item.dish_name,
            // passProps: {
            //   selectedDish: dish.item
            // }
        });
    }

    backIconPress = () => {
        this.props.navigator.pop();
    }

    restaurantPressedHandler = (restaurantId) => {
        this.props.fetchSelectedRestaurant(restaurantId);
        this.props.navigator.push({
            screen: "RestaurantDetailScreen",
            passProps: {
                id: restaurantId
            }
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={style.header}>
                    <TouchableOpacity onPress={this.backIconPress}>
                        <Icon style={style.backIcon} name="ios-arrow-round-back-outline" size={45} color="#757575" />
                    </TouchableOpacity>
                    <View style={style.searchbar}>
                        <SearchBar
                            onSearchBarPressed={this.searchBarPressHandler}
                        />
                    </View >
                </View>
                <View>
                <Text style={style.topTen}>Top Ten Dishes{this.props.topDishesError}</Text>
                </View>
                <View style={style.container}>
                    {
                        this.props.topDishesLoading? <ActivityIndicator/>:
                        (<DishList
                        dishes={this.props.topDishes}
                        onRecommendButtonPressed={this.recommendButtonPressHandler}
                        onReviewButtonPressed={this.reviewButtonPressHandler}
                        onRestaurantPressed={this.restaurantPressedHandler}
                    />)

                    }
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingTop: 10,
        paddingBottom: 6,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    backIcon: {
        paddingLeft: 10,

    },
    searchbar: {
        paddingLeft: 10,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginLeft: 10,
    },
    topTen: {
        paddingLeft: 25,
        paddingTop: 5,
        fontFamily: 'OpenSans-ExtraBold',
        fontSize: 22,
        color: '#212121'
    }
})

const mapStateToProps = state => {
    return {
        topDishes: state.dish.topDishes,
        topDishesLoading: state.dish.topDishesLoading,
        topDishesError: state.dish.topDishesError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDishes: () => dispatch(fetchTopDishes()),
        recommendDishDispatch: (dish_id) => dispatch(recommendDishDispatch(dish_id)),
        fetchSelectedRestaurant: (restaurantId) => dispatch(fetchSelectedRestaurant(restaurantId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(TopTenDish);
