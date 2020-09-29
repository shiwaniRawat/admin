import classes from './DashBoard.module.css'
import React from 'react'
import Notification from '../../component/Home/Notification/Notification'
import Order from '../../component/Home/Order/order'
import Performance from '../../component/Home/chart.js/Performance'
import Storage from '../../component/Home/chart.js/storage'
import Latest from '../../component/Home/chart.js/Latest'
export default function DashBoard() {
    return ( 
        <div className={classes.DashBoardWrapper}>
        <p className={classes.heading}><strong>Welcome back,</strong></p>
        <div className={classes.charts}>
            <Latest /> 
            <Performance /> 
            <Storage />
            <Notification/> 
            <Order />
        </div>
        </div>
     
    )
}