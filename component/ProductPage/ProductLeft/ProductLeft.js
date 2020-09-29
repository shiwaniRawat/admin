import React, { Component } from 'react'
import classes from "./ProductLeft.module.css"
import { Link } from "react-router-dom";
class ProductsLeft extends Component {

  state = {
    ProductData: JSON.parse(localStorage.getItem("ApiDataBase")).productsPage.products,
    checkArr: [],

  }





  handleDlt = (pos) => {

    const Arr = this.state.ProductData;
    console.log(this.state.Temp)
    Arr.splice(pos, 1)
    let updatedStorage = JSON.parse(localStorage.getItem("ApiDataBase"));
    updatedStorage.productsPage.products = Arr
    localStorage.setItem("ApiDataBase", JSON.stringify(updatedStorage));
    this.setState({
      ProductData: Arr

    })

    this.uncheckHandler();
  }
  Delet = () => {

    const filteredArr = this.state.ProductData.filter((item, i) => {

      return (this.state.checkArr.indexOf(i) == -1)

    })

    this.setState({

      ProductData: filteredArr,
      checkArr: []
    })




    let TempFilterdArr = JSON.parse(localStorage.getItem("ApiDataBase"));

    TempFilterdArr.productsPage.products = filteredArr;
    localStorage.setItem("ApiDataBase", JSON.stringify(TempFilterdArr))

    this.uncheckHandler();


  }



  handleInputCheck = (e, pos) => {



    if (e.target.checked) {
      if (this.state.checkArr.indexOf(pos) == -1) {
        this.state.checkArr.push(pos)

        this.setState({
          checkArr: this.state.checkArr
        })
      }

    }
    else if (!e.target.checked) {

      if (this.state.checkArr.indexOf(pos) != -1) {
        let index = this.state.checkArr.indexOf(pos)

        this.state.checkArr.splice(index, 1)
        this.setState({
          checkArr: this.state.checkArr
        })
      }

    }

  }
  uncheckHandler = () => {
    [...document.querySelectorAll('input[type=checkbox]')].map(item => {

      if (item.checked) {

        item.checked = false;

      }

    })

  }



  render() {



    const MappedTableData = this.state.ProductData.map((item, pos) => {
      return (



        <tr className={classes.MainRow} key={pos}>
          <td className={classes.checkinputbox}>
            <input ref={this.inputType} id={`product ${pos} `} type="checkbox" onClick={(e) => { this.handleInputCheck(e, pos) }} defaultChecked={false} />
          </td>
          <td className={classes.ProductName}>{item.name}</td>
          <td className={classes.ProductCat}>{item.category}</td>
          <td className={classes.ProductSold}>{item.unitSold}</td>
          <td className={classes.ProductStock}>{item.stock}</td>
          <td className={classes.ProductExpire}>{item.expireDate}</td>
          <td className={classes.dltIcon} ><span onClick={(e) => this.Delet(pos)} className={classes.deleteIconWrap}>
            <i key={pos} className={`far fa-trash-alt ${classes.deleteIcon}`} ></i></span></td>
        </tr>

      )



    })



    return (
      <div className={classes.FirstBlock}>
        <div className={classes.TableWrapper}>
          <div className={classes.Product_TableWrap}>
            <div className={classes.TableRow}>
              <table className={classes.Table}>
                <tbody>
                  <tr>
                    <th style={{ width: "50px" }}>&nbsp;</th>
                    <th>PRODUCT NAME</th>
                    <th>CATEGORY</th>
                    <th>UNIT SOLD</th>
                    <th>IN STOCK</th>
                    <th>EXPIRE DATE</th>
                    <th style={{ width: "50px" }}>&nbsp;</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <table className={classes.TableData}>
              <tbody>
                {MappedTableData}
              </tbody>
            </table>
          </div>
        </div>
        <button className={classes.TableBtn} ><Link to="/products/add">Add New Product</Link></button>
        <button className={classes.TableDeleteBtn} onClick={this.Delet}>Deleted Selected products</button>
      </div>
    )
  }
}

export default ProductsLeft; 