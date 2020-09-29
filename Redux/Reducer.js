const initialState = {

    IsUserLoggedIn : localStorage[("IsUserLoggedIn")] == "true" 
    
    
    }  ;
    
    
    const mainReducer = (currentState = initialState , action)=>{
    
    switch(action.type) {
    
    case "USER_LOGGEDIN"  : 
    localStorage.setItem("IsUserLoggedIn" , true)
    return {...currentState , IsUserLoggedIn : true } ; 
    
    case "USER_LOGGEDOUT" :
    localStorage.setItem("IsUserLoggedIn" ,false )
    return{...currentState , IsUserLoggedIn : false } ; 
    
    default : 
    
    return {...currentState} ; 
    
    }
    
    
    
    
    
    }
    
    export default mainReducer ; 