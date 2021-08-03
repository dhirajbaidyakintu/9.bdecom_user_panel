import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import LocalStorageHelper from "../../LocalStorageHelper/LocalStorageHelper";
import cogoToast from "cogo-toast";

class UserProfile extends Component {
    constructor() {
        super();
        this.state={
            number:LocalStorageHelper.getUserMobile(),
            user_name:"",
            mobile_number:"",
            password:"",
            user_email:"",
            user_address:"",
            ReviewModal:false,
        }
    }
    componentDidMount() {
        axios.get(ApiURL.userProfile(this.state.number)).then(response=>{
            let StatusCode = response.status;
            if (StatusCode==200){
                let JSONData= (response.data)[0];
                this.setState({
                    user_name:JSONData['user_name'],
                    mobile_number:JSONData['mobile_number'],
                    password:JSONData['password'],
                    user_email:JSONData['user_email'],
                    user_address:JSONData['user_address'],
                });
            }
        }).catch(error=>{

        })
    }

    ProfileModalOpen=()=>{
        this.setState({ ReviewModal:true})
    }
    ProfileModalClose=()=>{
        this.setState({ ReviewModal:false})
    }
    OnNameChange=(value)=>{
        this.setState({user_name:value})
    }
    OnPasswordChange=(value)=>{
        this.setState({password:value})
    }
    OnEmailChange=(value)=>{
        this.setState({user_email:value})
    }
    OnAddressChange=(value)=>{
        this.setState({user_address:value})
    }

    userProfileUpdate=()=>{
        axios.post(ApiURL.userProfileUpdate,{
            user_name:this.state.user_name,
            mobile_number:this.state.mobile_number,
            password:this.state.password,
            user_email:this.state.user_email,
            user_address:this.state.user_address,
        }).then((response)=>{
            if (response.status==200){
                cogoToast.success("Update Success",{position:'bottom-center'});
                this.componentDidMount();
                this.setState({ReviewModal:false})
            }else {
                cogoToast.error("Update Fail",{position:'bottom-center'});
                this.setState({ReviewModal:false})
            }
        }).catch((error)=>{
            cogoToast.error("Update Fail",{position:'bottom-center'});
            this.setState({ReviewModal:false})
        });
    }

    render() {
        return (
            <Fragment>
                <Container className="TopSection align-content-lg-center">
                    <Row>
                        <Col md={12} lg={3} sm={12} xs={12}>
                        </Col>
                        <Col md={12} lg={6} sm={12} xs={12}>
                            <Card className="card w-100 h-100 mt-3">
                                <Card.Body>
                                    <h4 className="">Name : {this.state.user_name}</h4>
                                    <h4 className="">Number : {this.state.mobile_number}</h4>
                                    <h4 className="">Password : {this.state.password}</h4>
                                    <h4 className="">Email : {this.state.user_email}</h4>
                                    <h4 className="">Address : {this.state.user_address}</h4>
                                </Card.Body>
                                <Card.Footer>
                                    <Button onClick={this.ProfileModalOpen} type="submit" className="btn btn-block m-2 search-btn">Update Profile</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col md={12} lg={3} sm={12} xs={12}>
                        </Col>
                    </Row>
                </Container>

                <Modal show={this.state.ReviewModal} onHide={this.ProfileModalClose}>
                    <Modal.Header closeButton><h6>Update Profile</h6></Modal.Header>
                    <Modal.Body>
                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Your Name</label>
                            <input value={this.state.user_name} onChange={e=>this.OnNameChange(e.target.value)} className="form-control" type="text" placeholder="Name"/>
                        </div>
                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Your Mobile (You can't change mobile number)</label>
                            <input value={this.state.mobile_number} className="form-control" type="text" placeholder="Mobile"/>
                        </div>
                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Password</label>
                            <input value={this.state.password} onChange={e=>this.OnPasswordChange(e.target.value)} className="form-control" type="text" placeholder="Password"/>
                        </div>
                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Your Email</label>
                            <input value={this.state.user_email} onChange={e=>this.OnEmailChange(e.target.value)} className="form-control" type="text" placeholder="Email"/>
                        </div>
                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Your Address</label>
                            <input value={this.state.user_address} onChange={e=>this.OnAddressChange(e.target.value)} className="form-control" type="text" placeholder="Address"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="footer-background-one">
                        <button className="btn btn-info" onClick={this.ProfileModalClose}>Cancel</button>
                        <button className="btn btn-success" onClick={this.userProfileUpdate}>Save</button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default UserProfile;