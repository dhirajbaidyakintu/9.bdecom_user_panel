import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import SpecialCollectionPlaceholder from "../PlaceHolder/SpecialCollectionPlaceholder";
import {Link} from "react-router-dom";

class Collection extends Component {
    constructor() {
        super();
        this.state={
            ProductData:[],
            isLoading:"BetweenTwoSection",
            mainDiv:"d-none"
        }
    }
    componentDidMount() {
        axios.get(ApiURL.productListByRemark("COLLECTION")).then(response=>{
            this.setState({ProductData: response.data, isLoading:"d-none", mainDiv:" "})
        }).catch(error=>{

        });
    }
    render() {
        const ParentList= this.state.ProductData;
        const myView= ParentList.map((ParentList,i)=>{

            if(ParentList.special_price == "NA"){
                return <Col className="p-0" key={1} xl={3} lg={3} md={3} sm={6} xs={6} >
                    <Link to={"productDetails/"+ParentList.product_code} className="link-style">
                        <Card className="card text-center w-100 h-100 image-box">
                            <img src={ParentList.image}/>
                            <Card.Body>
                                <h1 className="product-name-on-card">{ParentList.title}</h1>
                                <p className="product-price-on-card">Price : {ParentList.price} tk</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            } else {
                return <Col className="p-0" key={1} xl={3} lg={3} md={3} sm={6} xs={6}>
                <Link to={"productDetails/"+ParentList.product_code} className="link-style">
                    <Card className="card text-center h-100 w-100 image-box">
                        <img src={ParentList.image}/>
                        <Card.Body>
                            <h1 className="product-name-on-card">{ParentList.title}</h1>
                            <p className="product-price-on-card">Price: {ParentList.special_price} tk <br></br> Price: <strike>{ParentList.price}</strike> tk  </p>
                        </Card.Body>
                    </Card>
                </Link>
                </Col>
            }
        })
        return (
            <Fragment>
                <SpecialCollectionPlaceholder isLoading={this.state.isLoading}/>
                <div className={this.state.mainDiv}>
                <Container className="text-center bg-white card-body shadow-sm py-5 " fluid={true}>
                    <h4 className="section-title ">SPECIAL COLLECTION</h4>
                    <h6 className="section-sub-title mb-5">Some Of Our Exclusive Collection, You May Like</h6>
                    <Row>
                        {myView}
                    </Row>
                </Container>
                </div>
            </Fragment>
        );
    }
}

export default Collection;