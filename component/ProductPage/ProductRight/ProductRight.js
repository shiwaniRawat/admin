import React, { Component } from 'react'
import classes from  "./ProductRight.module.css"


class ProductRight extends Component {
  
    state = {
     Category : JSON.parse(localStorage.getItem("ApiDataBase")).productsPage.categories 
   
    }
    overlay  = React.createRef() ;  
    AddCatPop = React.createRef() ; 
    textBox = React.createRef() ; 
    CategorydltBtn=(pos , e )=>{
    
      const tempArr =  JSON.parse(localStorage.getItem("ApiDataBase")).productsPage.categories ;
      tempArr.splice(pos ,1) 
      this.setState({
        Category : tempArr

      }) 
      const FinalArr = JSON.parse(localStorage.getItem("ApiDataBase")) ;
      FinalArr.productsPage.categories = tempArr ; 
      localStorage.setItem("ApiDataBase" , JSON.stringify(FinalArr)) 
              

    }
   
    AddCategory=(e)=>{
      this.overlay.current.style.display = "block" ; 
      this.AddCatPop.current.style.display = "flex" ; 
    } 
    CloseOverlay=()=>{
        this.overlay.current.style.display = "none" ; 
        this.AddCatPop.current.style.display = "none" ; 
    }
    closeIconFunc=()=>{
        this.overlay.current.style.display = "none" ; 
        this.AddCatPop.current.style.display = "none" ; 
 
        

    }
    AddNewCatFunc=()=>{
    let TextValue = this.textBox.current.value 
    if (TextValue!== undefined && TextValue!=="" && TextValue !== null) {
        this.state.Category.push(TextValue) 
        this.setState({
            Category : this.state.Category 
        }) 
        const FinalArr1 = JSON.parse(localStorage.getItem("ApiDataBase")) ;
        FinalArr1.productsPage.categories = this.state.Category ; 
        localStorage.setItem("ApiDataBase" , JSON.stringify(FinalArr1))  
        this.textBox.current.value = ""  ;
        this.CloseOverlay() ; 
    }  
  
    console.log(this.state.Category) 

    }

    render() { 
       const CategoryArr = this.state.Category.map((item ,pos) =>{
   
       return (
        <tr key={pos+1}>
        <td className={classes.tableDataitem}>{item}</td>
        <td className={classes.deleteIconWrapper}>
            <span onClick={(e)=>this.CategorydltBtn(pos,e)} className={classes.deleteIconMod}>
            <i className={`far fa-trash-alt`}></i>
            </span>
        </td>
        </tr>

       )         




       })       
         
       


        return (
            <div className = {classes.ProductRightMainWrapper}>
                <div className ={classes.ProductRightContentWrapper} >
                 <div ref={this.overlay} onClick={(e)=>this.CloseOverlay(e)} className={classes.overlay}></div>  
                 <div ref={this.AddCatPop}  className = {classes.AddnewCatWrapper}>
                 <label>Add Category Name</label> 
                 <input ref={this.textBox} type ="text" className = {classes.AddNewTextbox}/>
                 <button onClick={this.AddNewCatFunc} className={classes.OverlayAddBtn}>Add</button> 
                <span onClick = {this.closeIconFunc}> <i className =  {`fas fa-times-circle ${classes.crossIcon}`}></i></span>
                 </div>  
                 <h2 className = {classes.MainDivHeading}></h2> 
                 <div className = {classes.TableWrapperMain}>
                 <table className={classes.TableRight}>
                  <tbody>
                   {CategoryArr} 
                  </tbody>   
                 </table>
                 </div> 
                 <button onClick={(e)=>{this.AddCategory(e)}} className={classes.AddNewCatBtn}>Add New Category</button>
                </div>
            </div>
        )
    }
}

export default ProductRight