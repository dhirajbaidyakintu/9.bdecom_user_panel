import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import ApiURL from "../../api/ApiURL";

class SuggestedProducts extends Component {
    constructor() {
        super();
        this.state={
            ProductData:[],
            isLoading:"BetweenTwoSection",
            mainDiv:"d-none"
        }
    }
    componentDidMount() {
            let SubCategory= this.props.SubCategory;
            axios.get(ApiURL.similarProduct(SubCategory)).then((response)=>{
                this.setState({ProductData:response.data})
            }).catch((error)=>{
            })
    }
    render() {
        let myList= this.state.ProductData;
        if(myList.length>0){
            const myView= myList.map((ProductList,i)=>{
                if(ProductList.special_price == "NA"){
                    return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link to={"/productDetails/"+ProductList.product_code} className="link-style">
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
                        <Link to={"/productDetails/"+ProductList.product_code} className="link-style">
                            <Card className="image-box card w-100 h-100">
                                <img src={ProductList.image}/>
                                <Card.Body>
                                    <h1 className="product-name-on-card">{ProductList.title}</h1>
                                    <p className="product-price-on-card">Price : <strike>{ProductList.price}</strike> tk {ProductList.special_price} tk</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                }
            })
            return (
                <Fragment>
                    <Container className="text-center BetweenTwoSection" fluid={true}>
                        <h4 className="section-title">YOU MAY LIKE</h4>
                        <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                        <Row>
                            {myView}
                        </Row>
                    </Container>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                </Fragment>
            );
        }
    }
}

export default SuggestedProducts;