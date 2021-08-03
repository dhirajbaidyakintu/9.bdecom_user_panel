import React, {Component} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import {toast} from "react-toastify";
import ReactHtmlParser from "react-html-parser";

class FooterDesktop extends Component {
    constructor() {
        super();
        this.state={
            footerData:"",
            about_company:"",
            address:"",
            android_app_link:"",
            ios_app_link:"",
            facebook_link:"",
            twitter_link:"",
            instagram_link:"",
            delivery_notice:"",
            loaderDiv:"",
            mainDiv:"d-none",
        }
    }

    componentDidMount() {
        let SiteInfoFooter= sessionStorage.getItem("SiteInfoFooter");
        if(SiteInfoFooter==null){
            axios.get(ApiURL.sendSiteInfo).then(response=> {
                let  StatusCode =response.status;
                if(StatusCode==200){
                    let JSONData =(response.data)[0];
                    this.setState({
                        about_company:JSONData['about_company'],
                        address:JSONData['address'],
                        android_app_link:JSONData['android_app_link'],
                        ios_app_link:JSONData['ios_app_link'],
                        facebook_link:JSONData['facebook_link'],
                        twitter_link:JSONData['twitter_link'],
                        instagram_link:JSONData['instagram_link'],
                        delivery_notice:JSONData['delivery_notice'],
                        loaderDiv:"d-none",
                        mainDiv:""
                    })
                    sessionStorage.setItem("SiteInfoFooter",JSON.stringify(JSONData))
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
            let FooterDataJSON= JSON.parse(SiteInfoFooter);
            this.setState({
                about_company:FooterDataJSON['about_company'],
                address:FooterDataJSON['address'],
                android_app_link:FooterDataJSON['android_app_link'],
                ios_app_link:FooterDataJSON['ios_app_link'],
                facebook_link:FooterDataJSON['facebook_link'],
                twitter_link:FooterDataJSON['twitter_link'],
                instagram_link:FooterDataJSON['instagram_link'],
                delivery_notice:FooterDataJSON['delivery_notice'],
                loaderDiv:"d-none",
                mainDiv:""
            })
        }
    }

    render() {
        return (
            <div className="m-0 footer-background-one mt-5 pt-3 shadow-sm">
                <div className={this.state.loaderDiv}>
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
                </div>
                <div className={this.state.mainDiv}>
                    <Container>
                        <Row className="px-0 my-5 ">
                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title text-white">ABOUT COMPANY</h5>
                                <p className="text-white text-justify">{ ReactHtmlParser(this.state.about_company) }</p>
                                <h5 className="footer-menu-title text-white">SOCIAL LINK</h5>
                                <a target="_blank" href={this.state.facebook_link}><i className="fab m-1 h4 fa-facebook btn-color"></i></a>
                                <a target="_blank" href={this.state.instagram_link}><i className="fab m-1 h4 fa-instagram btn-color"></i></a>
                                <a target="_blank" href={this.state.twitter_link}><i className="fab m-1 h4 fa-twitter btn-color"></i></a>
                            </Col>

                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title text-white">THE COMPANY</h5>
                                <Link to="/about" className="footer-link text-white">About Us</Link><br/>
                                <Link to="/contact" className="footer-link text-white">Contact Us</Link><br/>
                                <Link to="/term" className="footer-link text-white">Team & Condition</Link><br/>
                                <h5 className="footer-menu-title mt-3 text-white">OFFICE ADDRESS</h5>
                                <p className="text-white">{ ReactHtmlParser(this.state.address) }</p>
                            </Col>

                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title text-white">MORE INFO</h5>
                                <Link to="/purchase" className="footer-link text-white">How To Purchase</Link><br/>
                                <Link to="/privacyPolicy" className="footer-link text-white">Privacy Policy</Link><br/>
                                <Link to="/refundPolicy" className="footer-link text-white">Refund Policy</Link><br/>
                            </Col>

                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title text-white">DOWNLOAD APP</h5>
                                <a target="_blank" href={this.state.ios_app_link}><img className="" src="https://hatil.com/sites/default/files/Apple%20sign.png"/></a><br/>
                                <a target="_blank" href={this.state.android_app_link}><img className="mt-2" src="https://hatil.com/sites/default/files/Android%20sign.png"/></a>
                                <br/>
                                <p className="mt-3 text-white">Language Translate</p>
                                <p className="mt-1" id="google_translate_element"></p>
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid={true} className=" m-0 pt-3 pb-1 footer-background-two">
                        <Container className="">
                            <Row className="px-0">
                                <h6 className="text-white">WE DELIVER IN</h6>
                                <p className="footer-text text-white">{ ReactHtmlParser(this.state.delivery_notice) }</p>
                            </Row>
                        </Container>
                    </Container>
                </div>
            </div>
        );
    }
}

export default FooterDesktop;