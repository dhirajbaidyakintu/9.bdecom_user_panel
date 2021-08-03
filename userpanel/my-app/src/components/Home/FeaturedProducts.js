import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import FeaturedProductLoader from "../PlaceHolder/FeaturedProductLoader";
import {Link} from "react-router-dom";

class FeaturedProducts extends Component {
    constructor() {
        super();
        this.state={
            ProductData:[],
            isLoading:"BetweenTwoSection",
            mainDiv:"d-none"
        }
    }
    componentDidMount() {
        axios.get(ApiURL.productListByRemark("FEATURED")).then(response=>{
            this.setState({ProductData: response.data, isLoading:"d-none", mainDiv:" "})
        }).catch(error=>{

        });
    }
    render() {
        const myData= this.state.ProductData;
        const myView= myData.map((ProductList,i)=>{

            if(ProductList.special_price == "NA"){
                return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
                    <Link to={"productDetails/"+ProductList.product_code} className="link-style">
                        <Card className="image-box card w-100 h-100">
                            <img src={ProductList.image}/>
                            <Card.Body>
                                <h1 className="product-name-on-card">{ProductList.title}</h1>
                                <p className="product-price-on-card">Price : {ProductList.price} tk</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            } else {
                return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
                    <Link to={"productDetails/"+ProductList.product_code} className="link-style">
                        <Card className="image-box card w-100 h-100">
                            <img src={ProductList.image}/>
                            <Card.Body>
                                <h1 className="product-name-on-card">{ProductList.title}</h1>
                                <p className="product-price-on-card">Price: {ProductList.special_price} tk <br></br> Price: <strike>{ProductList.price}</strike> tk  </p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            }
        })
        return (
            <Fragment>
                <FeaturedProductLoader isLoading={this.state.isLoading}/>
                <div className={this.state.mainDiv}>
                    <Container className="text-center mt-3" fluid={true}>
                        <h4 className="section-title">FEATURED PRODUCTS</h4>
                        <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                        <Row>
                            {myView}
                        </Row>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default FeaturedProducts;