import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import MegaMenuDesktop from "./MegaMenuDesktop";
import SliderHomeDesktop from "./SliderHomeDesktop";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import SliderLoader from "../PlaceHolder/SliderLoader";

class HomeTopDesktop extends Component {
    constructor() {
        super();
        this.state={
            menuData:[],
            sliderData:[],
            isLoading:"TopSection",
            mainDiv:"d-none"
        }
    }
    componentDidMount() {
        axios.get(ApiURL.sendCategoryDetails).then(response=>{
            this.setState({menuData: response.data})
        }).catch(error=>{

        });
        //For Slider
        axios.get(ApiURL.sendSliderInfo).then(response=>{
            this.setState({sliderData: response.data, isLoading:"d-none", mainDiv:" "})
        }).catch(error=>{

        });
    }
    render() {
        return (
            <Fragment>
                <SliderLoader isLoading={this.state.isLoading}/>
                <div className={this.state.mainDiv}>
                    <Container className="p-0 TopSection overflow-hidden" fluid={true}>
                        <Row className="p-0 m-0 overflow-hidden">

                            <Col className="p-0 m-0 overflow-hidden" lg={3} md={3} sm={12}>
                                <MegaMenuDesktop data={this.state.menuData}/>
                            </Col>

                            <Col className="p-0 m-0 overflow-hidden" lg={9} md={9} sm={12}>
                                <SliderHomeDesktop data={this.state.sliderData}/>
                            </Col>

                        </Row>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default HomeTopDesktop;