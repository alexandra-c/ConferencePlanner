import React from 'react';
import Dashboard from '@material-ui/icons/Dashboard';
import Settings from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';

const menuItems = [
    { icon: <PeopleIcon />, text: 'NavBar.Participants', path: '/participants', name: 'Participants' },
    { icon: <Dashboard />, text: 'NavBar.Dashboard', path: '/dashboard', name: 'Dashboard' },
    { icon: <Settings />, text: 'NavBar.Settings', path: '/settings', name: 'Settings' }
]

export default menuItems