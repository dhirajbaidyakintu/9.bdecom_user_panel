import React, {Component,Fragment} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import validation from "../../validation/validation";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import {Redirect} from "react-router";
import LocalStorageHelper from "../../LocalStorageHelper/LocalStorageHelper";

class UserOnboard extends Component {
    constructor() {
        super();
        this.state={
            mobile_number:"",
            password:"",
            UserRedirect:false,
        }
    }
    onUserRedirect(){
        if(this.state.UserRedirect===true){
            let winPath=LocalStorageHelper.GetRedirectFromDetails()
            if(winPath===null){
                return(<Redirect to="/"/>)
            } else {
                return(<Redirect to={winPath}/>)
            }
        }
    }
    mobileOnChange=(event)=>{
        let mobile=  event.target.value;
        this.setState({mobile_number:mobile});
    }
    passwordOnChange=(event)=>{
        let password=  event.target.value;
        this.setState({password:password});
    }
    loginOnClick=()=>{
        let mobile= this.state.mobile_number;
        let password= this.state.password;
        if(mobile.length==0){
            toast.warn("Please write your Mobile Number")
        } else if(!(validation.MobileRegx).test(mobile)){
            toast.warn("Invalid Mobile Number")
        } else if(password.length==0){
            toast.warn("Plz write your Password",{ position:"bottom-center" });
        } else if(!(validation.PasswordRegx).test(password)){
            toast.warn("Minimum eight characters, at least one letter and one number:")
        } else {
            axios.get(ApiURL.userLogin(mobile, password)).then(response=>{
                if (response.status==200 && response.data=="1"){
                    LocalStorageHelper.setUserMobile(mobile);
                    toast.success("Success full login");
                    this.setState({UserRedirect:true});
                }else {
                    toast.error("Request Fail ! try Again")
                }
            })
        }
    }
    render() {
        return (
            <Fragment>
                <Container className="TopSection">
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                                    <Form className="onboardForm">
                                        <h4 className="section-title">USER SING IN</h4>
                                        <h6 className="section-sub-title">Please Enter Your Mobile No & Password and then click Next</h6>
                                        <input onChange={this.mobileOnChange} className="form-control m-2" type="text" placeholder="Mobile Number"/>
                                        <input onChange={this.passwordOnChange} className="form-control m-2" type="password" placeholder="Password"/>
                                        <Button onClick={this.loginOnClick} className="btn btn-block m-2 login-btn">Next</Button>
                                    </Form>
                                </Col>
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <img className="onboardBanner" src="images/bannerImg.png"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer/>
                {this.onUserRedirect()}
            </Fragment>
        );
    }
}

export default UserOnboard;