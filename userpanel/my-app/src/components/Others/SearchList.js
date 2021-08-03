import React, {Component, Fragment} from 'react';
import {Breadcrumb, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class SearchList extends Component {
    render() {
        const myList= this.props.ProductData;
        const searchKey= this.props.searchKey;
        const myView= myList.map((ProductList,i)=>{
            if(ProductList.special_price == "NA"){
                return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
                    <Link to={"/productDetails/"+ProductList.product_code} className="breadcrumb-item">
                        <Card className="image-box card w-100">
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
                        <Card className="image-box card w-100">
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

                    <Breadcrumb className="shadow-sm w-100 hide bg-white">
                        <Breadcrumb.Item><Link to="/" className="breadcrumb-item">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={"/productListBySearch/"+searchKey} className="breadcrumb-item">Search Result For: {searchKey}</Link></Breadcrumb.Item>
                    </Breadcrumb>
                    
                    <Row>
                        {myView}
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default SearchList;