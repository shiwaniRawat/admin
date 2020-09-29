import React, { Component } from 'react'
import classes from "./add.module.css"
 class addProductPage extends Component { 

   state={
    productName : "" ,
    description : "" ,
    category : "" , 
    expireDate : "" ,
    stock : 0 , 
    sold :  0 


   }
    
   productName = React.createRef() ; 
   description = React.createRef() ; 
   category = React.createRef() ; 
   expireDate = React.createRef() ; 
   stock = React.createRef() ; 
   sold = React.createRef() ; 
   userImg = React.createRef() ; 

   ChangeHandler=()=>{
    const DateOptions = {day: '2-digit', month: 'long', year: 'numeric'};
    const selectedDate = new Intl.DateTimeFormat('en-GB', DateOptions).format(this.expireDate.current.valueAsDate);     
    this.setState({
        productName : this.productName.current.value  , 
        description : this.description.current.value , 
        category : this.category.current.selectedOptions[0].label , 
        expireDate : selectedDate ,
         sold : this.sold.current.value ,
         stock : this.stock.current.value

     })
 

   } 
   AddProductClick=()=>{
   
   const TempStorage = JSON.parse(localStorage.getItem("ApiDataBase")) ;  
//    console.log(TempStorage) 
   const ProductKey = TempStorage.productsPage.products  
//    console.log(ProductKey)  
   


   const DataObj = {
    name : this.state.productName,
    description : this.state.description ,
    category : this.state.category , 
    expireDate : this.state.expireDate ,
    stock : this.state.stock , 
    unitSold :  this.state.sold 
  

   }   
   console.log(DataObj) 
   let objValid = false ; 
   for(var i in DataObj){
   if(DataObj[i]!=0 && DataObj[i]!=undefined && DataObj[i]!==null && DataObj[i]!="") 
                   {
                       objValid = true ; 
                   }
   else{ 
        
        objValid = false  ;
        break ;     
 
   } 
  

   }
   
   if(!objValid){
    alert("Enter the valid values")

   }
   else if (objValid){
     ProductKey.push(DataObj) 
     TempStorage.productsPage.products = ProductKey 
     localStorage.setItem("ApiDataBase" , JSON.stringify(TempStorage) ) 
     
     alert("fine")




   }

   } 
   ImgUpload=(e)=>{
    const Size = Math.round((e.target.files[0].size/1024));

        if (Size > 1024)  {
            alert('File size cannot be more than 1 MB');
            return false;
        }
   }

    render() {
        return (
            <div>
                <div className ={classes.MainDivWrapper}>
                    <h2 className={classes.PageTitle}></h2>
                    <div className={classes.PageData}>
                    <form className={classes.formData}>
                    <div className={classes.FormFields}>
                    <label>Product Name</label> 
                    <input ref= {this.productName} onChange={this.ChangeHandler} type="text" name="name" className={classes.FormInp} required/>
                    </div>    
                    <div className={classes.FormFields}>
                    <label>Description</label> 
                    <textarea  ref= {this.description} onChange={this.ChangeHandler} className={classes.textarea} rows="3"></textarea>
                    </div> 
                    <div className={classes.FormFields}>
                    <label>Category</label> 
                    <select  ref= {this.category} onChange={this.ChangeHandler}  className={classes.selectValue}> 
                    
                    <option>Select category</option>
                    <option>New Arrival</option>
                    <option>Most Popular</option>
                    <option>Trending</option>
                    <option>Christmas Special</option>
                    <option>Latest Fashion</option>
                    <option>New Year Special</option>
                   
                    </select>
                    </div> 
                    <div className={classes.Stocks}>
                    <div className={classes.StockDate}>
                    <label>Expire Date</label> 
                    <input  ref= {this.expireDate} onChange={this.ChangeHandler}  name="ExpireDate" type="date" className={classes.expireDateInp}></input>    
                    </div>    
                    <div className={classes.StocksAvail}>
                    <label>In Stock</label> 
                    <input  ref= {this.stock} onChange={this.ChangeHandler}  name="stock" type="number" className={classes.StocksAvailData} required/>
                    </div>    
                    <div className={classes.sold}> 
                    <label>Sold</label> 
                    <input  ref= {this.sold} onChange={this.ChangeHandler}  name = "sold" type="number" className={classes.soldData} required/>
                    </div>    
                    </div>     
                    </form> 
                    <div className={classes.userImage}>
                    <div  className={classes.defaultIcon}>
                    <span onClick={()=>{this.userImg.current.click()}} className={classes.uploadIcon}> <i className={`fas fa-cloud-upload-alt `} aria-hidden="true"></i></span>
                    </div>  
                      <div className={classes.ImageData}>
                      <input ref={this.userImg} onChange={(e)=>{this.ImgUpload(e)}} accept=".jpg, .png, .bmp, .svg, .webp" className={classes.Inputfile} type="file" /> 
                      <button onClick={()=>{this.userImg.current.click()}} className={classes.uploadbtn}>UPLOAD PRODUCT IMAGE</button>
                      </div>
                    </div>
                    <button onClick={this.AddProductClick} className={classes.submitBtn}>Add Product Now</button>
                    </div>    
                </div> 
            </div>
        )
    }
}

export default addProductPage ;