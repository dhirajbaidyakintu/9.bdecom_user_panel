import React, {Component, Fragment} from 'react';
import {Breadcrumb, Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import ReactHtmlParser from "react-html-parser";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import DescriptionPlaceholder from "../PlaceHolder/DescriptionPlaceholder";

class About extends Component {
    constructor() {
        super();
        this.state={
            about:"",
            loaderDiv:"",
            mainDiv:"d-none",
        }
    }
    componentDidMount() {
        let SiteInfoAbout= sessionStorage.getItem("SiteInfoAbout");
        if(SiteInfoAbout==null){
            axios.get(ApiURL.sendSiteInfo).then(response=> {
                let  StatusCode =response.status;
                if(StatusCode==200){
                    let  JSONData =(response.data)[0]['about'];
                    this.setState({about:JSONData,loaderDiv:"d-none",mainDiv:""})
                    sessionStorage.setItem("SiteInfoAbout",JSONData)
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
            this.setState({about:SiteInfoAbout,loaderDiv:"d-none",mainDiv:""})
        }
    }
    render() {
        return (
            <Fragment>
                <Container className="TopSection" fluid={true}>

                    <Breadcrumb className="shadow-sm w-100 hide bg-white">
                        <Breadcrumb.Item><Link to="/" className="breadcrumb-item">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/about" className="breadcrumb-item">About</Link></Breadcrumb.Item>
                    </Breadcrumb>

                    <Row>
                        <Col className="mt-1" md={12} lg={12} sm={12} xs={12}>
                            <Card>
                                <Card.Body>
                                    <DescriptionPlaceholder isLoading={this.state.loaderDiv}/>
                                    <div className={this.state.mainDiv}>
                                        <div className="animate__animated animate__zoomIn">
                                            <h3>About page</h3>
                                            { ReactHtmlParser(this.state.about) }
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer/>
            </Fragment>
        );
    }
}

export default About;