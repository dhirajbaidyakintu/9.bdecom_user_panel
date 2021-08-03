import React, {Component, Fragment} from 'react';
import {Breadcrumb, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class ListBySubCategory extends Component {
    render() {
        const myList= this.props.ProductData;
        const SubCategory= this.props.SubCategory;
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
                            <p className="product-price-on-card">Price: {ProductList.special_price} tk <br></br> Price: <strike>{ProductList.price}</strike> tk  </p>
                        </Card.Body>
                    </Card>
                    </Link>
                </Col>
            }
        })

        return (
            <Fragment>
                <Container className="text-center TopSection" fluid={true}>

                    <Breadcrumb >
                        <Breadcrumb.Item><Link to="/" className="breadcrumb-item">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={"/productListBySubCategoryPage/"+Category+"/"+SubCategory} className="breadcrumb-item">{SubCategory}</Link></Breadcrumb.Item>
                    </Breadcrumb>

                    <Row>
                        {myView}
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default ListBySubCategory;