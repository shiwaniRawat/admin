import React from 'react'
import classes from "./Notification.module.css"
export default function Notification() {
    
   const NotificationData = JSON.parse(localStorage.getItem("ApiDataBase" )).dasbhoardPage.notifications ;  
    
   const datahandler = NotificationData.map((item,pos)=>{
    
    return (
        <div className ={classes.notificationMainWrapper} key ={pos+1}>
            
            <div className={classes.userPic}>
            <img src={item.pic} alt="userPic" />
            </div>         
            <div className = {classes.detailsWrapper}> 
                <p>{item.message}</p>   
                <span>{item.time} ago</span> 
            </div> 
        </div>
    )}) ; 



return(
        <div className={classes.MainWrapper}>
            <div>
                <h2>Notification List</h2> 
                <div className={classes.detailsRows}>
                  {datahandler} 
                  {datahandler}
                  {datahandler}
                </div>
            </div>
        </div>


)


}