import React, { Component } from 'react'
import classes from "./Account.module.css"



class Account extends Component { 
 
  state  = {
      name : "" , 
      email : "" ,
      Password1 : "" , 
      Password2 : "" , 
      phone : "" , 
      ImgUrl : "http://www.pngmart.com/files/10/Business-User-Account-PNG-Clipart.png"


  }  
  initialState=()=>{

    this.setState({
        name : "" , 
        email : "" ,
        Password1 : "" , 
        Password2 : "" , 
        phone : "" , 
        ImgUrl : ""
    })
    
  }
  

  name = React.createRef() ; 
  email = React.createRef() ; 
  password1 = React.createRef() ;  
  password2 = React.createRef() ;  
  phone = React.createRef() ; 
  selectedAcc = React.createRef() ; 
  UploadPicInput = React.createRef() ;  
  ProfilePopUp  = React.createRef() ;  
  overlayy = React.createRef() ; 
  onChangehandler=()=>{
  this.setState({
        name : this.name.current.value , 
        email : this.email.current.value,
        Password1 : this.password1.current.value, 
        Password2 : this.password2.current.value , 
        phone : this.phone.current.value , 
    })    



  }
  
  UpdateDataOnClick=(e)=>{
    e.preventDefault() ; 
    
    const selectedUser = this.selectedAcc.current.selectedOptions[0].label ; 
    const TempDataBase = JSON.parse(localStorage.getItem("ApiDataBase")) 
    const UpdatedDataBase = TempDataBase.accountsPage ; 
    if(UpdatedDataBase.hasOwnProperty(selectedUser)){
      
        const UpdatedUserData = {
        name : this.state.name, 
        email : this.state.email ,
        password : this.state.Password1 , 
        phone : this.state.phone , 
        profilePic : this.state.ImgUrl
      }
       UpdatedDataBase[selectedUser] =  UpdatedUserData ; 
       TempDataBase.accountsPage[selectedUser] = UpdatedDataBase[selectedUser]
       localStorage.setItem("ApiDataBase" , JSON.stringify(TempDataBase)) ;  
      this.ProfilePopUp.current.style.display = "block" ; 
      this.overlayy.current.style.display = "block" ;  
    } 
    else {

        alert("Select the Valid Account") 
        return false  ; 


    }




}
 gettingdata=()=>{
    const Database = JSON.parse(localStorage.getItem("ApiDataBase")).accountsPage ;  
    const selectedUser = this.selectedAcc.current.selectedOptions[0].label ;
    
    if(Database.hasOwnProperty(selectedUser)) {
      
    const UserData = Database[selectedUser] 

      this.setState({
         name : UserData.name ,
         email : UserData.email ,
         Password1 :UserData.password , 
         Password2 : "" , 
         phone : UserData.phone , 
         ImgUrl : UserData.profilePic
      })
     
      

    }
    else{
     this.initialState() ; 
     
    }


   }

uploadPicture=(e)=>{
      


    if (e.target.files && e.target.files[0]) {
         
        const reader = new FileReader();
        reader.onload = (e) => { 
         
          this.setState({
            ImgUrl : e.target.result
          }); 
        
        } 
        
        reader.readAsDataURL(e.target.files[0]);
    }


}
closeUpdatePopup=()=>{
    this.ProfilePopUp.current.style.display = "none" ;
    this.overlayy.current.style.display = "none" ;  
   
} 
onImgClickDlt=()=>{
    this.setState({
    ImgUrl : "http://www.pngmart.com/files/10/Business-User-Account-PNG-Clipart.png"

    }) 
}

    render() { 

       


        return (
            <div>
                 <div className={classes.MainPageContainer} >
                     <div className={classes.AccountSelectorWrapper}>
                        <h2 className={classes.AccountSelectorTitle}>List of Accounts</h2>
                        <p>Accounts</p>
                        <select ref ={this.selectedAcc} onChange={this.gettingdata} className ={classes.selectorInp}>
                  <option value="0">Select account</option> 
                  <option value="1">Admin</option>
                  <option value="2">Customer</option>
                  <option value="3">Editor</option>
                  <option value="4">Merchant</option>
                  </select>
                     </div>
                     <div className ={classes.DetailSectionWrapper}>
                       <div className={classes.LeftSideImageWrapper}>
                         <div className={classes.UserImage}>
                             <h2 className={classes.UserImgTitle}>Change Avatar</h2>
                             <div className={classes.UserImgContainer}>
                                 <img src={this.state.ImgUrl} alt = "userpic" className={classes.UserAvatar}></img> 
                                 {this.state.ImgUrl !== "http://www.pngmart.com/files/10/Business-User-Account-PNG-Clipart.png" ? 

                                 <span onClick={this.onImgClickDlt} className={classes.dltIcon}><i className={`far fa-trash-alt`}></i></span>
                                      : null }
                                 </div>
                             <button onClick ={()=>{this.UploadPicInput.current.click()}} className={classes.updbtn}>Upload New Photo</button> 
                             <input type="file" onChange={(e)=>{this.uploadPicture(e)}} ref= {this.UploadPicInput} className={classes.fileupload} accept= ".jpg , .png , .bmp ,.svg , .webp" multiple/>
                         </div>
                        </div> 
                       <div className = {classes.RightSectionWrapper} >
                          <div className={classes.AccountDetailsWrapper}>
                          <h2 className={classes.RightSideTitle}>Account Settings</h2> 
                           <form className={classes.RightSideFormWrapper}>
                           <div className={classes.FormElements}>
                               <label>Account Name</label> 
                               <input id="form-1" ref={this.name} name="name" type ="text" className={classes.FormInput} onChange={this.onChangehandler} value={this.state.name}/>
                           </div>
                           <div className={classes.FormElements}>
                               <label >Account Email</label>  
                               <input id="form-2" ref={this.email} name="email" type ="email" className={classes.FormInput} onChange={this.onChangehandler} value={this.state.email}/>
                           </div>
                           <div className={classes.FormElements}>
                               <label >Password</label> 
                               <input id="form-3" ref={this.password1} name="password" type ="password" className={classes.FormInput} onChange={this.onChangehandler} value={this.state.Password1}/>
                            </div> 
                           <div className={classes.FormElements}>
                                <label >Re-Enter Password</label> 
                                <input id="form-4" ref={this.password2}  name="Re-Enter Password" type ="password" className={classes.FormInput} onChange={this.onChangehandler} value= {this.state.Password2}/>
                           </div>
                           <div className={classes.FormElements}>
                                <label >Phone No.</label> 
                                <input id="form-5" ref={this.phone} name="Phone" type ="number" className={classes.FormInput} onChange={this.onChangehandler}  value={this.state.phone}/>
                           </div>
                           <div className={classes.FormElements}> 
                                <label >&nbsp;</label> 
                                <button type="submit" onClick={(e)=>{this.UpdateDataOnClick(e)}} className={classes.UpdateBtn}>Update Your Profile</button>
                            </div>  
                            <div className={classes.dltuserbtnwrapper}>
                                <button onClick={(e)=>{e.preventDefault()}}  className={classes.userdltbtn}> Delete Your Account </button>
                            </div>
                           </form> 
                          </div> 
                       </div>
                     </div> 
                     <div ref={this.overlayy} onClick={this.closeUpdatePopup}className={classes.accountpageoverlay}> </div>
                     <div  ref = {this.ProfilePopUp} className={classes.AccountPopUp}>
                         <h2>Information Updated Successfully</h2>
                         <button onClick={this.closeUpdatePopup}>Okay</button>
                     </div>
                  </div> 
            </div>    
        )
    }
}

export default Account ; 