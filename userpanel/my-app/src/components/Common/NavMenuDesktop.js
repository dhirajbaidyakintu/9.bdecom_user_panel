import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import LocalStorageHelper from "../../LocalStorageHelper/LocalStorageHelper";
import axios from "axios";
import ApiURL from "../../api/ApiURL";

class NavMenuDesktop extends Component {
    constructor() {
        super();
        this.state={
            searchKey:"",
            searchRedirectStatus:false,
            RedirectHome:false,
            cartCount:"",
        }
        this.SearchOnChange=this.SearchOnChange.bind(this);
        this.SearchOnClick=this.SearchOnClick.bind(this);
        this.SearchRedirect=this.SearchRedirect.bind(this);
        this.signOut=this.signOut.bind(this);
        this.RedirectHome=this.RedirectHome.bind(this);
    }
    componentDidMount() {
        axios.get(ApiURL.cartCount(LocalStorageHelper.getUserMobile())).then((res)=>{
            this.setState({cartCount:res.data})
        })
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
    signOut(){
        LocalStorageHelper.removeUserMobile();
        this.setState({RedirectHome:true});
    }
    RedirectHome(){
        if(this.state.RedirectHome===true){
            return <Redirect to="/"/>
        }
    }
    render() {
        let UserMobile= LocalStorageHelper.getUserMobile();
        if (UserMobile === null){
            return (
                <Container className="fixed-top shadow-sm p-2 m-0 footer-background-one" fluid={"true"}>
                    <Row>
                        <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                            <a href="" className="btn"><img className="nav-logo ml-2" src="images/logo2.svg"/></a>
                            <Link to="/cart" className="cart-btn link-style mr-2"><i className="fa fa-shopping-cart"></i> {this.state.cartCount} items</Link>
                        </Col>

                        <Col className="p-1" lg={6} md={6} sm={12} xs={12}>
                            <div className="input-group w-100">
                                <input onChange={this.SearchOnChange} type="text" className="form-control" aria-label="Text input with segmented dropdown button"/>
                                <button onClick={this.SearchOnClick} type="button" className="btn search-btn"><i className="fa fa-search"></i></button>
                            </div>
                        </Col>

                        <Col className="p-1" lg={2} md={2} sm={12} xs={12}>
                            <Link to="/notification" className="btn link-style ml-2"><i className="fa h4 fa-bell btn-color"></i><sup><span className="badge text-white bg-danger"></span></sup></Link>
                            <Link to="/userLogin" className="h4 btn link-style sign-out-btn text-dark ml-2">Sign In</Link>
                        </Col>
                    </Row>
                    {this.SearchRedirect()}
                    {this.RedirectHome()}
                </Container>
            );
        } else{
            return (
                <Container className="fixed-top shadow-sm p-2 m-0 footer-background-one" fluid={"true"}>
                    <Row>
                        <Col className="p-1" lg={3} md={3} sm={12} xs={12}>
                            <Link to="/" className="btn link-style"><img className="nav-logo" src="images/logo2.svg"/></Link>
                            <Link to="/cart" className="cart-btn h6 link-style"><i className="fa fa-shopping-cart"></i> {this.state.cartCount} Items</Link>
                        </Col>

                        <Col className="p-1" lg={6} md={6} sm={12} xs={12}>
                            <div className="input-group w-100">
                                <input onChange={this.SearchOnChange} type="text" className="form-control" aria-label="Text input with segmented dropdown button"/>
                                <button onClick={this.SearchOnClick} type="button" className="btn search-btn"><i className="fa fa-search"></i></button>
                            </div>
                        </Col>

                        <Col className="p-1" lg={3} md={3} sm={12} xs={12}>
                            <Link to="/favourite" className="btn link-style ml-1"><i className="fa h4 fa-heart btn-color"></i><sup><span className="badge text-white bg-danger"></span></sup></Link>
                            <Link to="/notification" className="btn link-style ml-1"><i className="fa h4 fa-bell btn-color"></i><sup><span className="badge text-white bg-danger"></span></sup></Link>
                            <Link to="/orderlist" className="btn link-style ml-1"><i className="fas fa-cart-arrow-down h4 btn-color"></i><sup><span className="badge text-white bg-danger"></span></sup></Link>
                            <Link to="/userProfile" className="btn link-style ml-1"><i className="fa h4 fa-user-plus btn-color"></i><sup><span className="badge text-white bg-danger"></span></sup></Link>
                            <button onClick={this.signOut} className="h4 btn sign-out-btn text-dark ml-1">SignOut</button>
                        </Col>
                    </Row>
                    {this.SearchRedirect()}
                    {this.RedirectHome()}
                </Container>
            );
        }
    }
}

export default NavMenuDesktop;