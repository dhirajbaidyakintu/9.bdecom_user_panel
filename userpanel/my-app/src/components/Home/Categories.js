import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import {Link} from "react-router-dom";
import CategoryPlaceholder from "../PlaceHolder/CategoryPlaceholder";

class Categories extends Component {

    constructor() {
        super();
        this.state={
            menuData:[],
            isLoading:"BetweenTwoSection",
            mainDiv:"d-none"
        }
    }
    componentDidMount() {
        axios.get(ApiURL.sendCategoryDetails).then(response=>{
            this.setState({menuData: response.data, isLoading:"d-none", mainDiv:" "})
        }).catch(error=>{

        });
    }
    render() {
        const ParentList= this.state.menuData;
        const myView= ParentList.map((ParentList,i)=>{
            return <Col className="p-0" key={i.toString()} xl={2} lg={2} md={2} sm={2} xs={6}>
                <Link to={"productListByCategoryPage/"+ParentList.ParentCategoryName} className="link-style">
                    <Card className="h-100 w-100 text-center">
                        <Card.Body>
                            <img className="w-75" src={ParentList.ParentCategoryImg}/>
                            <h5 className="category-name-down mt-3"> {ParentList.ParentCategoryName} </h5>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        })

        return (
            <Fragment>
                <CategoryPlaceholder isLoading={this.state.isLoading}/>
                <div className={this.state.mainDiv}>
                    <Container className="text-center pt-3" fluid={true}>
                        <h4 className="section-title mt-2">CATEGORIES</h4>
                        <h6 className="section-sub-title pb-4">Some Of Our Exclusive Collection, You May Like</h6>
                        <Row>
                            {myView}
                        </Row>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default Categories;