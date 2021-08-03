import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class ListByCategory extends Component {

    render() {
        const myList= this.props.ProductData;
        const Category= this.props.Category;
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
                <Container className="text-center TopSection" fluid={true}>
                    <h4 className="section-title">{Category}</h4>
                    <Row>
                        {myView}
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default ListByCategory;