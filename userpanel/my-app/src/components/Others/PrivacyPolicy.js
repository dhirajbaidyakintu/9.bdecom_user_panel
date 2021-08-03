import React, {Component, Fragment} from 'react';
import {Breadcrumb, Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import {toast} from "react-toastify";
import ReactHtmlParser from "react-html-parser";
import {Link} from "react-router-dom";

class PrivacyPolicy extends Component {
    constructor() {
        super();
        this.state={
            ploicy:"",
            loaderDiv:"",
            mainDiv:"d-none",
        }
    }
    componentDidMount() {
        let SiteInfoPolicy= sessionStorage.getItem("SiteInfoPolicy");
        if(SiteInfoPolicy==null){
            axios.get(ApiURL.sendSiteInfo).then(response=> {
                let  StatusCode =response.status;
                if(StatusCode==200){
                    let  JSONData =(response.data)[0]['ploicy'];
                    this.setState({ploicy:JSONData, loaderDiv:"d-none", mainDiv:""})
                    sessionStorage.setItem("SiteInfoPolicy",JSONData)
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
            this.setState({ploicy:SiteInfoPolicy,loaderDiv:"d-none",mainDiv:""})
        }
    }
    render() {
        return (
            <Fragment>
                <Container className="TopSection" fluid={true}>

                    <Breadcrumb className="shadow-sm w-100 hide bg-white">
                        <Breadcrumb.Item><Link to="/" className="breadcrumb-item">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/privacyPolicy" className="breadcrumb-item">Privacy Policy</Link></Breadcrumb.Item>
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
                                    <h3>Privacy policy page</h3>
                                    { ReactHtmlParser(this.state.ploicy) }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default PrivacyPolicy;