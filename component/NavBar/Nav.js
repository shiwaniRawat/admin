import React, { Component } from 'react'
import classes from "./Nav.module.css";
import { Link, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import "./Nav.css"
class Nav extends Component {

    state = {
        NavHandlerRes: false,

    }

    DashBoard = React.createRef();
    Products = React.createRef();
    Accounts = React.createRef();
    hiddenMenu = React.createRef();

    RedirectHandler = (e) => {
        if (!this.props.IsUserLoggedIn) {
            e.preventDefault();

        } else {
            this.setState({ NavHandlerRes: false })

            return true
        };
    }
    BtnOnClick = () => {

        this.setState({ NavHandlerRes: !this.state.NavHandlerRes });

    }

    render() {

        return (
            <div className={classes.MainTopbar}>
                <div className={classes.TopbarWrapper}>
                    <NavLink to="/" className={classes.headinglink} >
                        <h1 className={classes.ProductLogo}>Product Admin</h1>
                    </NavLink>
                    <div className={classes.RightSideMenuItems}  >
                        <NavLink to="/dashboard" activeClassName='is-active' className="Right" ref={this.DashBoard} onClick={(e) => this.RedirectHandler(e)}>
                            <div>
                                <i className={`fas fa-tachometer-alt `}></i>
                                <p>Dashboard</p>
                            </div>
                        </NavLink>
                        <NavLink to="/report" activeClassName='is-active' className="Right" >
                            <div><i class="fa fa-file" aria-hidden="true"></i>
                                <p>Report</p>
                            </div>
                        </NavLink>
                        <NavLink to="/products" activeClassName='is-active' className="Right" ref={this.Products} onClick={(e) => this.RedirectHandler(e)}>
                            <div>
                                <i className={`fas fa-shopping-cart ${classes.shoppingCart}`}></i>
                                <p>Products</p>
                            </div>
                        </NavLink>
                        <NavLink to="/accounts" activeClassName='is-active' className="Right" ref={this.Accounts} onClick={(e) => this.RedirectHandler(e)}>
                            <div>
                                <i className={`far fa-user`}></i>
                                <p>Accounts</p>
                            </div>
                        </NavLink>
                        <NavLink to="/setting" activeClassName='is-active' className="Right" >
                            <div><i class="fa fa-cogs" aria-hidden="true"></i>
                                <p>Setting</p>
                            </div>
                        </NavLink>

                        {
                            this.props.IsUserLoggedIn ?

                                <NavLink onClick={this.props.UserLoggingout} className={classes.logout} to="/login">
                                    <div>
                                        {JSON.parse(localStorage[('UserData')]).UserName}, <span> Logout</span>
                                    </div>
                                </NavLink>

                                : null
                        }


                    </div>
                    <button onClick={this.BtnOnClick} className={classes.navToggleBtn}><i className="fas fa-bars tm-nav-icon"></i></button>
                    <div ref={this.hiddenMenu} className={this.state.NavHandlerRes ? 'hidden-menu show' : 'hidden-menu hide'}>

                        <NavLink activeClassName='is-active' ref={this.DashBoard} onClick={(e) => this.RedirectHandler(e)} className="hidden-object" to="/dashboard">
                            <div>
                                <i className="fas fa-tachometer-alt"></i>
                                <p>Dashboard</p>
                            </div>
                        </NavLink>
                        <NavLink activeClassName='is-active'   className="hidden-object" to="/report">
                            <div>
                            <i class="fa fa-file-text" aria-hidden="true"></i>
                                <p>Report</p>
                            </div>
                        </NavLink>

                        <NavLink activeClassName='is-active' ref={this.Products} onClick={(e) => this.RedirectHandler(e)} className="hidden-object" to="/products">
                            <div>
                                <i className="fas fa-shopping-cart"></i>
                                <p>Products</p>
                            </div>
                        </NavLink>

                        <NavLink activeClassName='is-active' ref={this.Accounts} onClick={(e) => this.RedirectHandler(e)} className="hidden-object" to="/accounts">
                            <div>
                                <i className="far fa-user"></i>
                                <p>Accounts</p>
                            </div>
                        </NavLink>
                        {/* <NavLink to="/setting" activeClassName='is-active' className="hidden-object" >
                            <div><i class="fa fa-cogs" aria-hidden="true"></i>
                                <p>Setting</p>
                            </div>
                        </NavLink> */}
                       

                        {
                            this.props.IsUserLoggedIn ?

                                <NavLink onClick={() => { this.props.UserLoggingout(); this.RedirectHandler(); }} className="hidden-object" to="/">
                                    <div>
                                        {JSON.parse(localStorage[('UserData')]).UserName} <span>, Logout</span>
                                    </div>
                                </NavLink>

                                : null
                        }

                    </div>






                </div>





            </div>

        )
    }
}

const mapGlobalStateToProps = (globalState) => {
    return {
        IsUserLoggedIn: globalState.IsUserLoggedIn


    }



}

const mapDispatchToProps = (dispatch) => {
    return {
        UserLoggingout: () => {
            dispatch({ type: "USER_LOGGEDOUT" })
        }
    }
}




export default connect(mapGlobalStateToProps, mapDispatchToProps)(Nav); 