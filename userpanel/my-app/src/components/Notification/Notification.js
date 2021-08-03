import React, {Component, Fragment} from 'react';
import {Breadcrumb, Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import DescriptionPlaceholder from "../PlaceHolder/DescriptionPlaceholder";
import {Link} from "react-router-dom";

class Notification extends Component {
    constructor() {
        super();
        this.state={
            NotificationData:[],
            isLoading:"",
            MainDiv:"d-none",
            NotificationModal:false,
            NotificationDate:"",
            NotificationTitle:"",
            NotificationMsg:"",
        }
        this.handleClose=this.handleClose.bind(this);
        this.handleShow=this.handleShow.bind(this);
    }
    handleClose(){
        this.setState({NotificationModal:false})
    }
    handleShow(event){
        this.setState({NotificationModal:true});
        let Ndate= event.target.getAttribute('data-date');
        let Nmsg= event.target.getAttribute('data-msg');
        let Ntitle= event.target.getAttribute('data-title');
        this.setState({NotificationDate:Ndate,NotificationMsg:Nmsg,NotificationTitle:Ntitle})
    }
    componentDidMount() {
        window.scroll(0,0)
        axios.get(ApiURL.notificationHistory).then(response=> {
            this.setState({NotificationData:response.data,isLoading:"d-none",MainDiv:" "})
        }).catch(error=> {

        });
    }
    render() {
        let NotificationData=this.state.NotificationData;
        let MyView= NotificationData.map((Mylist,i)=>{
            return(
                <>
                    <Col className=" d-flex justify-content-around p-1" md={12} lg={12} sm={12} xs={12}>
                        <div className="float-left w-75">
                            <h6 className="notification-title"> {Mylist.title}</h6>
                            <p className="py-1  px-0 notification-date m-0"><i className="fa  fa-bell"/>  {Mylist.date}</p>
                        </div>
                        <div className="float-right px-2 w-25">
                            <button data-msg={Mylist.msg} data-date={Mylist.date} data-title={Mylist.title} onClick={this.handleShow} className="btn btn-sm search-btn">Details</button>
                        </div>
                    </Col>
                    <hr className="bg-light w-100"/>
                </>
            )
        })
        return (
            <Fragment>
                <Container className={this.state.isLoading+"TopSection"}>
                    <Row className="d-flex justify-content-center">
                        <Col  md={10} lg={10} sm={12} xs={12}>
                            <Container>
                                <DescriptionPlaceholder isLoading={this.state.isLoading}/>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Container className={this.state.MainDiv+" TopSection"}>
                    <Row  className="d-flex justify-content-center">
                        <Col  md={10} lg={10}  sm={12} xs={12}>

                            <Breadcrumb className="shadow-sm bg-white">
                                <Breadcrumb.Item><Link to="/" className="breadcrumb-item">Home</Link></Breadcrumb.Item>
                                <Breadcrumb.Item><Link to="/notification" className="breadcrumb-item">Notification</Link></Breadcrumb.Item>
                            </Breadcrumb>

                            <Container className="mt-1">
                                <Row className="shadow-sm animated slideInDown bg-white p-4">
                                    {MyView}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Modal show={this.state.NotificationModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <h6> <i className="fa theme-text fa-bell"/> Date: {this.state.NotificationDate}</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <h6 className="notification-title">{this.state.NotificationTitle}</h6>
                        <p>{this.state.NotificationMsg}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn search-btn" onClick={this.handleClose}>Close</button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default Notification;