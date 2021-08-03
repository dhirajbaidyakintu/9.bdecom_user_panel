import React, {Component, Fragment} from 'react';
import {Breadcrumb, Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import ReactHtmlParser from "react-html-parser";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";

class Purchase extends Component {
    constructor() {
        super();
        this.state={
            purchase_guide:"",
            loaderDiv:"",
            mainDiv:"d-none",
        }
    }
    componentDidMount() {
        let SiteInfoPurchase= sessionStorage.getItem("SiteInfoPurchase");
        if(SiteInfoPurchase==null){
            axios.get(ApiURL.sendSiteInfo).then(response=> {
                let  StatusCode =response.status;
                if(StatusCode==200){
                    let  JSONData =(response.data)[0]['purchase_guide'];
                    this.setState({purchase_guide:JSONData, loaderDiv:"d-none", mainDiv:""})
                    sessionStorage.setItem("SiteInfoPurchase",JSONData)
                } else {
                    toast.error("Something Went Wrong ! Try Again",{
                        position:"bottom-center"
                    });
                }
            }).catch(error=> {
                toast.error("Something Went Wrong ! Try Again",{
                    position:"bottom-center"
                });
            });
        } else {
            this.setState({purchase_guide:SiteInfoPurchase,loaderDiv:"d-none",mainDiv:""})
        }
    }
    render() {
        return (
            <Fragment>
                <Container className="TopSection" fluid={true}>

                    <Breadcrumb className="shadow-sm w-100 hide bg-white">
                        <Breadcrumb.Item><Link to="/" className="breadcrumb-item">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/purchase" className="breadcrumb-item">Purchase</Link></Breadcrumb.Item>
                    </Breadcrumb>

                    <Row>
                        <Col className="mt-1" md={12} lg={12} sm={12} xs={12}>
                            <Card className={this.state.loaderDiv}>
                                <Card.Body>

                                    <div className="ph-item">
                                        <div className="ph-col-12">
                                            <div className="ph-row">
                                                <div className="ph-col-12"></div>
                                                <div className="ph-col-12"></div>
                                                <div className="ph-col-12"></div>
                                                <div className="ph-col-12"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ph-item">
                                        <div className="ph-col-12">
                                            <div className="ph-row">
                                                <div className="ph-col-12"></div>
                                                <div className="ph-col-12"></div>
                                                <div className="ph-col-12"></div>
                                                <div className="ph-col-12"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ph-item">
                                        <div className="ph-col-12">
                                            <div className="ph-row">
                                                <div className="ph-col-12"></div>
                                                <div className="ph-col-12"></div>
                                                <div className="ph-col-12"></div>
                                                <div className="ph-col-12"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ph-item">
                                        <div className="ph-col-12">
                                            <div className="ph-row">
                                                <div className="ph-col-12"></div>
                                                <div className="ph-col-12"></div>
                                                <div className="ph-col-12"></div>
                                                <div className="ph-col-12"></div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className={this.state.mainDiv}>
                                <Card.Body className="animate__animated animate__zoomIn">
                                    <h3>How To Purchase Page</h3>
                                    { ReactHtmlParser(this.state.purchase_guide) }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer />
            </Fragment>
        );
    }
}

export default Purchase;
