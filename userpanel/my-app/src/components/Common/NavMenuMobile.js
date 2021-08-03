import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Navbar, Row} from "react-bootstrap";
import MegaMenuMobile from "../Home/MegaMenuMobile";
import {Link} from "react-router-dom";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import LocalStorageHelper from "../../LocalStorageHelper/LocalStorageHelper";
import {Redirect} from "react-router";

class NavMenuMobile extends Component {
    constructor() {
        super();
        this.state={
            SideNavState:"sideNavClose",
            ContentOverState:"ContentOverlayClose",
            MenuData:[],
            RedirectHome:false,
            cartCount:"",
            searchKey:"",
            searchRedirectStatus:false,
        }
        this.SearchOnChange=this.SearchOnChange.bind(this);
        this.SearchOnClick=this.SearchOnClick.bind(this);
        this.SearchRedirect=this.SearchRedirect.bind(this);
    }
    componentDidMount() {
        axios.get(ApiURL.cartCount(LocalStorageHelper.getUserMobile())).then((res)=>{
            this.setState({cartCount:res.data})
        })
        axios.get(ApiURL.sendCategoryDetails).then(response=> {
            this.setState({MenuData:response.data})
        })
    }
    MenuBarClickHandler=()=>{
        this.SideNavOpenClose();
    }
    ContentOverlayClickHandler=()=>{
        this.SideNavOpenClose();
    }
    SideNavOpenClose=()=>{
        let SideNavState= this.state.SideNavState;
        let ContentOverState= this.state.ContentOverState;
        if(SideNavState==="sideNavOpen"){
            this.setState({SideNavState:"sideNavClose",ContentOverState:"ContentOverlayClose"})
        } else{
            this.setState({SideNavState:"sideNavOpen",ContentOverState:"ContentOverlayOpen"})
        }
    }
    signOut=()=>{
        LocalStorageHelper.removeUserMobile();
        this.setState({RedirectHome:true});
    }
    RedirectHome=()=>{
        if(this.state.RedirectHome===true){
            return <Redirect to="/"/>
        }
    }
    SearchOnChange(event){
        let searchKey= event.target.value;
        this.setState({searchKey:searchKey});
    }
    SearchOnClick(){
        if(this.state.searchKey.length >=2){
            this.setState({searchRedirectStatus :true});
        }
    }
    SearchRedirect(){
        if(this.state.searchRedirectStatus === true){
            return <Redirect to={"/productListBySearch/"+this.state.searchKey}/>
        }
    }
    render() {
        let UserMobile= LocalStorageHelper.getUserMobile();
        if(UserMobile===null){
            return (
                <Fragment>
                    <Navbar fluid={"true"} className="fixed-top d-flex justify-content-between shadow-sm p-2 m-0 footer-background-one">
                        <a onClick={this.MenuBarClickHandler} className="mx-2 navbar-brand"><i className="fa fa-bars btn-color"/></a>
                        <div className="float-right">
                            <input type="text" onChange={this.SearchOnChange} onClick={this.SearchOnClick} className="search-round mr-2 mx-1" placeholder="Search for products..🔍"/>
                            <Link to="/notification" className="btn mx-1 nav-round-btn btn-color"><i className="fa fa-bell"/></Link>
                            <Link to="/cart" className="cart-btn mx-1 float-right link-style"><i className="fa fa-shopping-cart"/> {this.state.cartCount} items </Link>
                            <Link to="/favourite" className="btn mx-1 nav-round-btn btn-color"><i className="fa fa-heart"/> </Link>
                        </div>
                    </Navbar>
                    <div className={this.state.SideNavState}>
                        <Link to="/" className="btn"> <img className="nav-logo" src="images/logo2.svg" alt=""/></Link>
                        <hr className="my-2"/>
                        <MegaMenuMobile data={this.state.MenuData}/>

                        <div className="accordionMenuDiv">
                            <div className="accordionMenuDivInside">
                                <hr className="my-2"/>
                                <Link to="/about" className="nav-menu-mobile-item link-style ml-1"><i className="fa fa-question-circle"/> About Us</Link>
                                <hr className="my-2"/>
                                <Link to="/contact" className="nav-menu-mobile-item link-style ml-1"><i className="fa fa-envelope"/> Contact Us</Link>
                                <hr className="my-2"/>
                                <Link to="/privacyPolicy" className="nav-menu-mobile-item link-style ml-1"><i className="fa fa-list"/> Privacy Policy</Link>
                                <hr className="my-2"/>
                                <Link to="/refundPolicy" className="nav-menu-mobile-item link-style ml-1"><i className="fa fa-list-alt"/> Refund Policy</Link>
                                <hr className="my-2"/>
                                <Link to="/purchase" className="nav-menu-mobile-item link-style ml-1"><i className="fa fa-question-circle"/> How To Purchase</Link>
                                <hr className="my-2"/>
                                <Link to="/userLogin" className="nav-menu-mobile-item link-style ml-1"><i className="fa fa-search" alt="user"/> Sign In</Link>
                                <hr className="my-2"/>
                            </div>
                        </div>

                    </div>

                    <div onClick={this.ContentOverlayClickHandler}  className={this.state.ContentOverState}>
                    </div>
                    {this.RedirectHome()}
                </Fragment>
            );
        }
        else {
            return (
                <Fragment>
                    <Navbar fluid={"true"} className="fixed-top d-flex justify-content-between shadow-sm p-2 m-0 footer-background-one">
                        <a onClick={this.MenuBarClickHandler} className="mx-2 navbar-brand"><i className="fa fa-bars btn-color"/></a>
                        <div className="float-right">
                            <input type="text" onChange={this.SearchOnChange} onClick={this.SearchOnClick} className="search-round ml-1" placeholder="Search for products..🔍"/>
                            <Link to="/favourite" className="btn nav-round-btn btn-color"><i className="fa fa-heart"/> </Link>
                            <Link to="/notification" className="btn nav-round-btn btn-color"><i className="fa fa-bell" alt="user"/></Link>
                            <Link to="/orderlist" className="btn nav-round-btn"><i className="fas fa-cart-arrow-down btn-color"></i></Link>
                            <Link to="/cart" className="btn nav-round-btn"><i className="fas fa-shopping-bag btn-color"></i></Link>
                        </div>
                    </Navbar>
                    <div  className={this.state.SideNavState}>
                        <Link to="/" className="btn"> <img className="nav-logo" src="images/logo2.svg" alt=""/></Link>
                        <hr className="my-2"/>
                        <MegaMenuMobile data={this.state.MenuData}/>
                        <div className="accordionMenuDiv">
                            <div className="accordionMenuDivInside">
                                <hr className="my-2"/>
                                <Link to="/userProfile" className="nav-menu-mobile-item ml-2 link-style"><i className="fa fa-user-circle"/> Profile</Link>
                                <hr className="my-2"/>
                                <Link to="/about" className="nav-menu-mobile-item ml-2 link-style"><i className="fa fa-question-circle"/> About Us</Link>
                                <hr className="my-2"/>
                                <Link to="/contact" className="nav-menu-mobile-item ml-2 link-style"><i className="fa fa-envelope"/> Contact Us</Link>
                                <hr className="my-2"/>
                                <Link to="/privacyPolicy" className="nav-menu-mobile-item ml-2 link-style"><i className="fa fa-list"/> Privacy Policy</Link>
                                <hr className="my-2"/>
                                <Link to="/refundPolicy" className="nav-menu-mobile-item ml-2 link-style"><i className="fa fa-list-alt"/> Refund Policy</Link>
                                <hr className="my-2"/>
                                <Link to="/purchase" className="nav-menu-mobile-item ml-2 link-style"><i className="fa fa-question-circle"/> How To Purchase</Link>
                                <hr className="my-2"/>
                                <Link onClick={this.signOut} className="nav-menu-mobile-item ml-2 link-style"> <i className="fa fa-user-circle"/> Sign Out</Link>
                                <hr className="my-2"/>
                            </div>
                        </div>

                    </div>
                    <div onClick={this.ContentOverlayClickHandler}  className={this.state.ContentOverState}>
                    </div>
                    {this.SearchRedirect()}
                    {this.RedirectHome()}
                </Fragment>
            );
        }
    }
}

export default NavMenuMobile;