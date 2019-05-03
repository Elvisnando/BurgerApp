import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem';
const navigationItems = (props) => (

    
        <lu className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders" >Orders</NavigationItem>
        </lu>

    
    
);

export default navigationItems;