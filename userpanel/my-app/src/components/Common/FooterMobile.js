import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import {toast} from "react-toastify";
import ReactHtmlParser from "react-html-parser";

class FooterMobile extends Component {
    constructor() {
        super();
      this.state={
          facebook_link:"",
          twitter_link:"",
          instagram_link:"",
          delivery_notice:"",
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
                        facebook_link:JSONData['facebook_link'],
                        twitter_link:JSONData['twitter_link'],
                        instagram_link:JSONData['instagram_link'],
                        delivery_notice:JSONData['delivery_notice']
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
                facebook_link:FooterDataJSON['facebook_link'],
                twitter_link:FooterDataJSON['twitter_link'],
                instagram_link:FooterDataJSON['instagram_link'],
                delivery_notice:FooterDataJSON['delivery_notice']
            })
        }
    }
    render() {
        return (
            <div className="m-0 footer-background-one mt-5 pt-1 shadow-sm">
                <Container>
                    <Row className="px-0 my-5">

                        <Col sm={6} xm={6} className="text-center">
                            <h5 className="footer-menu-title mt-3 text-white">OFFICE ADDRESS</h5>
                            <p className="text-white">Shekhertek 8,Mohammadpur, Adabor, Dhaka-1207, 01774688159 (Help-Line), Engr.Rabbil@yahoo.com</p>
                        </Col>

                        <Col sm={6} xm={6} className="text-center">
                            <h5 className="footer-menu-title text-white">SOCIAL LINK</h5>
                            <a target="_blank" href={this.state.facebook_link}><i className="fab m-1 h4 fa-facebook btn-color"></i></a>
                            <a target="_blank" href={this.state.instagram_link}><i className="fab m-1 h4 fa-instagram btn-color"></i></a>
                            <a target="_blank" href={this.state.twitter_link}><i className="fab m-1 h4 fa-twitter btn-color"></i></a>
                        </Col>

                        <Col sm={6} xm={6} className="text-center">
                            <h5 className="footer-menu-title mt-2 text-white ">More</h5>
                            <Link to="/about" className="footer-link text-white">About Us</Link><br/>
                            <Link to="/contact" className="footer-link text-white ">Contact Us</Link><br/>
                            <Link  to="/refundPolicy" className="footer-link text-white ">Refund Policy</Link><br/>
                            <Link to="/privacyPolicy" className="footer-link text-white ">Privacy Policy</Link><br/>
                            <Link to="/purchase" className="footer-link text-white ">How To Purchase</Link><br/>
                        </Col>
                    </Row>
                </Container>

                <Container fluid={true} className=" m-0 pt-3 pb-1 footer-background-two">
                    <Container className=" ">
                        <Row className="px-0">
                            <h6 className="text-white">WE DELIVER IN</h6>
                            <p className="footer-text text-white text-justify">{ ReactHtmlParser(this.state.delivery_notice) }</p>
                        </Row>
                    </Container>
                    <div id="google_translate_element"></div>
                </Container>
            </div>
        );
    }
}

export default FooterMobile;