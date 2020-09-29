import React, { Component } from 'react'
import classes from "./LoginPage.module.css"
import { connect } from 'react-redux'; 
import axios from "axios" ; 
 class LoginPage extends Component {
   
   state = {
     UserName : "" , Password : ""
     ,isUserLoggedInValid : false , isPasswordValid : false 
   }
  
   
   handleUserName=(e)=>{
   
    const Validator = /^[a-zA-Z]{3,}([a-zA-Z0-9]{1,})?$/ ; 
    
    if(e.target.value){ 
    
      document.querySelector(".fall").setAttribute("style"  ," display: block !important"); 
    }
    if (e.target.value.match(/^[a-zA-Z]{3,}/gm)){
        document.querySelectorAll('.fall li')[0].style.color = '#00b700';
      }  
    else {
        document.querySelectorAll('.fall li')[0].style.color = '#E15D44';
        
    } 
    if (e.target.value.match(Validator)){
        e.target.style.borderBottom = '4px solid #00b700'; 
        this.setState({
            UserName : e.target.value , 
            isUserLoggedInValid : true 

        }) }
    else {
        e.target.style.borderBottom = '4px solid #E15D44';
        return false;  
    }    

    }

   handlePassWord=(e)=>{
     
      const PassWordValidator = /(?=^.{8,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/ ; 
      
      if(e.target.value) {
        document.querySelector(".passClass").setAttribute("style"  ," display: block !important"); 
       
      }
      if(e.target.value.match(/^.{8,}$/gm)) {
        document.querySelectorAll(".passClass li")[0].style.color = '#00b700';

      } 
      else {
        document.querySelectorAll(".passClass li")[0].style.color = "#E15D44" ;
      }
      if(e.target.value.match(/[0-9]{1,}/gm)) {
        document.querySelectorAll(".passClass li")[1].style.color = '#00b700';
      }
      else{
        document.querySelectorAll(".passClass li")[1].style.color = "#E15D44" ;
      }
      if(e.target.value.match(/[A-Z]{1,}/gm)){
        document.querySelectorAll(".passClass li")[2].style.color = '#00b700';  
      }
      else{
        document.querySelectorAll(".passClass li")[2].style.color = "#E15D44" ; 
      }
      if(e.target.value.match(/[a-z]{1,}/gm)){
        document.querySelectorAll(".passClass li")[3].style.color = '#00b700';  
      }       
      else{
        document.querySelectorAll(".passClass li")[3].style.color = "#E15D44" ; 
      } 
      if(e.target.value.match(/[^A-Za-z0-9]{1,}/gm)){
        document.querySelectorAll(".passClass li")[4].style.color = '#00b700';  
      } 
      else{
        document.querySelectorAll(".passClass li")[4].style.color = "#E15D44" ;
      }
      if(e.target.value.match(PassWordValidator)){
        e.target.style.borderBottom = '4px solid #00b700';     
        this.setState({
            Password : e.target.value , 
            isPasswordValid : true 
        })


      } 
      else{
        e.target.style.borderBottom = '4px solid #E15D44'; 
        return false ; 
      }

}
   handleLogin=()=>{
      
     if(this.state.isUserLoggedInValid && this.state.isPasswordValid) {
  
       const UserData = {
       UserName : this.state.UserName , 
       Password : this.state.Password

       }  
       localStorage.setItem("UserData" ,JSON.stringify(UserData))  
       this.props.UserLoggedIn() ; 
       this.handleBackEndData() ; 
       
       this.props.history.push("/dashboard") 

     }
     else {
      alert("Password is InValid") ; 

     }
   }
   
  handleBackEndData=()=>{ 
     
     return(
      axios.get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
      .then(response=>{ 
          localStorage.setItem("ApiDataBase" ,JSON.stringify( response.data)) ;
         
      } )

     )
     
     
          


  } 


  


   
   
    render() { 
      
      return (
            <div className={classes.main}>
                <form className={classes.LoginForm} onSubmit={(e)=>{
                   e.preventDefault() ; 
                   
                }}>
                  <h2>Welcome to Dashboard, Login</h2>
                   <div>
                       <span>Username</span> 
                       <input type = "text" name="username" className={classes.username} onChange={this.handleUserName}  required/>
                       <ul className= {`${classes.loginVal}  fall `}>
                       <li>Starts with not less than 3 characters</li>
                       <li className={classes.ConditionLi1}>Numeric Characters are optional</li>
                       </ul> 
                   </div>
                   <div>
                    <span>Password</span> 
                    <input type="password" name="pass" onChange={this.handlePassWord} required/>  
                    <ul className={`${classes.passVal} passClass`}>
                        <li>Not less than 8 characters</li>
                        <li>Contains a digit</li>
                        <li>Contains an uppercase letter</li>
                        <li>Contains a lowercase letter</li>
                        <li>A character not being alphanumeric</li>
                    </ul>
                   </div>
                   <div>
                    <button onClick={this.handleLogin}>Login</button>
                   </div> 

                </form>
            </div>
        )
    }
}


const mapDispatchToProps = (Dispatch)=>{

return {

 UserLoggedIn : ()=>{

 Dispatch({type:"USER_LOGGEDIN"}) ; 


 }

}


}

export default connect(null ,mapDispatchToProps)(LoginPage) ; 