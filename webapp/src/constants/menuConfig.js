import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';

const menuItems = [
    { icon: <HomeIcon />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome' },
    { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings' }
]

export default menuItems