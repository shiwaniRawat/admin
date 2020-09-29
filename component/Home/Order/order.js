import React, { Component } from 'react'
import  classes from "./order.module.css" 
import   "./order.css"
class order extends Component {
 
state = {
    moving : "moving" ,
    cancelled : "cancelled", 
    delivered : "delivered" ,
    pending : "pending" ,
    Status : ""


}
  
  render() { 
       
   const Api = JSON.parse(localStorage.getItem("ApiDataBase")).dasbhoardPage.orders ;    
   const renderedTable = Api.map((item ,pos)=>{ 
      
   let Status ; 
    if (item.status=="Moving"){
        
        Status = "classMoving" 

    }
    else if (item.status=="Delivered") {
        Status = "classDelivered" 
    }
    else if (item.status=="Pending") {
        Status = "classPending" 
    }
    else if (item.status=="Cancelled"){ 

        Status = "classCancelled" 
        
    } 
      
    return( 

    <tr key={pos + 1}>
        <th><b>#{item.orderNo}</b></th>
        <td>
            <div className={Status}>
            </div>{item.status}
        </td>
        <td><b>{item.operators}</b></td>
        <td><b>{item.location}</b></td>
        <td><b>{item.distance} km</b></td>
        <td>{item.startDate}</td>
        <td>{item.deliveryDate}</td>
    </tr>
    )})
 


        return (
         <div className={classes.MainWrapper}> 
           <div> 
              <h2>Order List</h2>  
              <div className={classes.TableWrapper}>
                 <table className={classes.TableContainer}>
                     <thead className={classes.thead}>
                     <tr>
                     <th>ORDER NO.</th>
                     <th>STATUS</th>
                     <th>OPERATORS</th>
                     <th>LOCATION</th>
                     <th>DISTANCE</th>
                     <th>START DATE</th>
                     <th>EST DELIVERY DUE</th>
                     </tr>
                     </thead>
                     <tbody>
                     {renderedTable} 
                     </tbody>
                 </table>
              </div>
              
           </div>
           
           
             
         </div>
        )
    }
}

export default order ; 