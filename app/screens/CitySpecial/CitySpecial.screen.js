import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchTopDishes } from '../../actions/dish.action';
import ListCard from '../../components/ListCard/ListCard';

class CitySpecial extends Component {

    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        this.state ={
            selected: "restaurant",
            restaurant: true,
            dishes: false,
            citySpecialRestaurants:[
                {
                    _id:1,
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    restaurant_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                },
                {
                    _id:2,
                    restaurant_name: "Foobae",
                    restaurant_location: "Anand Bazaar, Palasia",
                    restaurant_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                },
                {
                    _id:3,
                    restaurant_name: "Midtown Cafe",
                    restaurant_location: "Anand Bazaar, Palasia",
                    restaurant_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                },
                {
                    _id: 4,
                    restaurant_name: "Bakewell",
                    restaurant_location: "Anand Bazaar, Palasia",
                    restaurant_rating: "4.5",
                    restaurant_type: "Cafe",
                    image: ["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                },
                {
                    _id: 4,
                    restaurant_name: "Bakewell",
                    restaurant_location: "Anand Bazaar, Palasia",
                    restaurant_rating: "4.5",
                    restaurant_type: "Cafe",
                    image: ["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                }
            ],
            citySpecialDishes:[
                {
                    _id: 1,
                    dish_name: "French Fries",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image:["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]
                
                },
                {
                    _id: 2,
                    dish_name: "Cold coffee",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image: ["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]

                },
                {
                    _id: 3,
                    dish_name: "Pasta",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image: ["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]

                },
                {
                    _id: 4,
                    dish_name: "Pizza",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image: ["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]

                },
                {
                    _id: 5,
                    dish_name: "Sandwiches",
                    price: "145",
                    restaurant_name: "Dhaba",
                    restaurant_location: "Anand Bazaar, Palasia",
                    dish_rating: "4.5",
                    restaurant_type: "Cafe",
                    image: ["https://images.pexels.com/photos/245535/pexels-photo-245535.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]

                }
            ]
        }
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

    listCardPressedHandler = (item) => {
        if(this.state.restaurant){
            this.props.navigator.push({
                screen: "RestaurantDetailScreen",
                passProps: {
                    selectedRestaurant: item.item
                }
            })
        }else {
            this.props.navigator.push({
                screen: "DishDetailScreen",
                passProps: {
                    selectedDish: item.item
                }
            })
        }
    }

    renderListComponent = (item) => {
        if(this.state.restaurant === true)
        return(
            <ListCard 
                type = "restaurant"
                restaurant_name = {item.item.restaurant_name}
                restaurant_location = {item.item.restaurant_location}
                restaurant_rating = {item.item.restaurant_rating}
                restaurant_type = {item.item.restaurant_type}
                image = {item.item.image}
                onPress = {() => this.listCardPressedHandler(item)}
            />
            )
        else
        return(
            <ListCard 
                type = "dish"
                dish_name = {item.item.dish_name}
                price = {item.item.price}
                restaurant_name = {item.item.restaurant_name}
                restaurant_location = {item.item.restaurant_location}
                dish_rating = {item.item.dish_rating}
                restaurant_type = {item.item.restaurant_type}
                image = {item.item.image}
                onPress = {() => this.listCardPressedHandler(item)}
                onPressLike = {this.recommendDishHandler}
                onPressRating = {this.ratingDishHandler}
                onPressReview = {this.reviewDishHandler}
            />
        )
    }

    recommendDishHandler = () => {
        alert("recommended");
    }

    ratingDishHandler = () => {
        alert("rated");
    }

    reviewDishHandler = () => {
        alert("reviewed")
    }

    onButtonPress = (type) => {
        this.setState({selected: type})
    }

    render() {
        return (
            <View style = {{ backgroundColor: '#fff', flex:1 }}>
            <View style = {style.header}>
            <TouchableOpacity>
              <Icon style = {style.backIcon} name="ios-arrow-round-back-outline" size={45} color="#757575" />
            </TouchableOpacity>
            <View style = {style.searchbar}>
                <SearchBar
                    onSearchBarPressed={this.searchBarPressHandler}
                />
            </View >
            </View>
            <Text style = {style.topTen}>City Special</Text>
            <View style = {style.tabBar}>
            <TouchableOpacity onPress = {() => this.setState({restaurant: true, dishes: false})}>
                <View elevation = {5} style = {[this.state.restaurant? style.selectedTab : style.tab]}>
                    <Text style = {[this.state.restaurant? style.selectedTabText : style.tabText]}>Restaurant</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.setState({restaurant: false, dishes: true})}>
                <View elevation = {5} style = {[this.state.dishes? style.selectedTab : style.tab]}>
                    <Text style = {[this.state.dishes? style.selectedTabText : style.tabText]}>Dish</Text>
                </View>
            </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                {
                    (this.state.restaurant) && 
                    <FlatList 
                        data = {this.state.citySpecialRestaurants}
                        renderItem = {this.renderListComponent}
                    />
                }
                {
                    (this.state.dishes) && 
                    <FlatList 
                        data = {this.state.citySpecialDishes}
                        renderItem = {this.renderListComponent}
                    />
                }
            </View>
                
            </View>
        );
    }
} 

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff', 
        flexDirection:'row',
        borderRadius: 10, 
        marginLeft: 19,
        marginRight: 19,
        marginTop:15  
    },
    tabBar: {
        flexDirection: 'row',
        paddingLeft: 15,
       // marginLeft: 20,
    },
    selectedTab: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ffa000', 
        borderRadius: 18,
        margin: 5,
    },
    tab:{
        
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        borderRadius: 18,   
        margin: 5,        
    },
    selectedTabText:{
        padding: 6,
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 15, 
        color: '#fff'
    },
    tabText:{
        padding: 6,
        fontFamily: 'OpenSans-Bold',
        fontSize: 13, 
        color: '#212121'
    },
    header: {
        paddingTop:10,
        paddingBottom: 6,
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    backIcon :{
        paddingLeft:10,

    },
    searchbar: {
        paddingLeft: 10,
    },
    topTen:{
        paddingLeft:25,
        paddingTop:5,
        fontFamily: 'OpenSans-ExtraBold',
        fontSize: 22,
        color:'#212121'
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
        //reviewDishDispatch: (dish_id) => dispatch(reviewDishDispatch(dish_id)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CitySpecial);