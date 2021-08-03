import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import SliderHomeMobile from "./SliderHomeMobile";

function SliderLoaderMobile(props) {
    return null;
}
SliderLoaderMobile.propTypes = {};
class HomeTopMobile extends Component {
    constructor() {
        super();
        this.state={
            menuData:[],
            SliderData:[],
            isLoading:"TopSection",
            MainDiv:"d-none"
        }
    }
    componentDidMount() {
        axios.get(ApiURL.sendSliderInfo).then(response=> {
            this.setState({SliderData:response.data,isLoading:"d-none",MainDiv:" "})
        })
    }
    render() {
        return (
            <Fragment>
                <SliderLoaderMobile isLoading={this.state.isLoading} />
                <Container className="p-0 TopSection overflow-hidden" fluid={true}>
                    <Row className="p-0 m-0">
                        <Col className="p-0 m-0" lg={12} md={12} sm={12}>
                            <SliderHomeMobile data={this.state.SliderData}/>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default HomeTopMobile;