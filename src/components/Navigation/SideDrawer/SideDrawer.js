import React from 'react'
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';


const sideDrawer = (props) => {

    return(
        <div className={classes.SideDrawer}>
        <div className={classes.Logo}>
            <Logo/>
        </div>
            <nav>
                <NavigationItem  />
            </nav>
        </div>
    );
};

export default sideDrawer;