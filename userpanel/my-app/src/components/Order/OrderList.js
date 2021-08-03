import React, {Component, Fragment} from 'react';
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import LocalStorageHelper from "../../LocalStorageHelper/LocalStorageHelper";
import {Link, Redirect} from "react-router-dom";
import cogoToast from "cogo-toast";
import {Breadcrumb, Col, Container, Modal, Row} from "react-bootstrap";
import DescriptionPlaceholder from "../PlaceHolder/DescriptionPlaceholder";

class OrderList extends Component {
    constructor() {
        super();
        this.state={
            ProductData:[],
            isLoading:"",
            MainDiv:"d-none",
            PageRefreshStatus:false,
            ReviewModal:false,
            code:"",
            name:"",
            rating:"",
            comments:"",
            product_name:""
        }
    }
    componentDidMount() {
        window.scroll(0,0)
        axios.get(ApiURL.orderListByUser(LocalStorageHelper.getUserMobile())).then(response=> {
            this.setState({ProductData:response.data,isLoading:"d-none",MainDiv:" "})
        })
    }
    ReviewModalOpen=(code,product_name)=>{
        this.setState({  ReviewModal:true,code:code,product_name:product_name})
    }
    ReviewModalClose=()=>{
        this.setState({  ReviewModal:false})
    }
    PageRefresh=()=>{
        if(this.state.PageRefreshStatus===true){
            let URL=window.location;
            return(
                <Redirect to={URL}/>
            )
        }
    }
    CommentsOnChange=(event)=>{
        let  Comments= event.target.value;
        this.setState({comments:Comments})
    }
    RatingOnChange=(event)=>{
        let  Rating= event.target.value;
        this.setState({rating:Rating})
    }
    nameOnChange=(event)=>{
        let  name= event.target.value;
        this.setState({name:name})
    }
    PostReview=()=>{
        let  code=this.state.code;
        let  name=this.state.name;
        let  rating=this.state.rating;
        let  comments=this.state.comments;
        let  product_name=this.state.product_name;
        let  mobile=LocalStorageHelper.getUserMobile();
        if(name.length===0){
            cogoToast.error("Name required",{position:'bottom-center'})
        } else if(rating.length===0){
            cogoToast.error("Select rating point",{position:'bottom-center'})
        } else if(comments.length===0){
            cogoToast.error("Comments required",{position:'bottom-center'})
        } else if(comments.length>150){
            cogoToast.error("Comments can't more than 150 character",{position:'bottom-center'})
        } else {
            let myFromData=new FormData();
            myFromData.append('product_name',product_name)
            myFromData.append('product_code',code)
            myFromData.append('mobile',mobile)
            myFromData.append('reviewer_photo',"")
            myFromData.append('reviewer_name',name)
            myFromData.append('reviewer_rating',rating)
            myFromData.append('reviewer_comments',comments)
            axios.post(ApiURL.postReview,myFromData).then((res)=>{
                if(res.data===1){
                    cogoToast.success("Review submitted",{position:'bottom-center'})
                    this.ReviewModalClose();
                } else {
                    cogoToast.error("Request Fail ! Try Again",{position:'bottom-center'})
                }
            }).catch((err)=>{
                cogoToast.error("Request Fail ! Try Again",{position:'bottom-center'})
            })
        }
    }
    render() {
        const MyList=this.state.ProductData;
        const MyView=MyList.map((ProductList,i)=>{
            return(
                <>
                    <Col className=" d-flex justify-content-around p-1" md={12} lg={12} sm={12} xs={12}>
                        <div className="float-left w-75">
                            <h6 className="product-name-on-card"> {ProductList.product_name}</h6>
                            <h6 className="product-price-on-card"> Total Price: {ProductList.total_price }</h6>
                            <h6 className="product-name-on-card"> Quantity: {ProductList.product_quantity}</h6>
                            <h6 className="product-name-on-card"> Info: {ProductList.product_info }</h6>
                            <h6 className="product-price-on-card"> Status: {ProductList.order_status}</h6>
                        </div>
                        <div className="float-right px-2 w-25">
                            <button  onClick={this.ReviewModalOpen.bind(this,ProductList.product_code,ProductList.product_name)} className="btn btn-sm search-btn">Review</button>
                        </div>
                    </Col>
                    <hr className="bg-light w-100"/>
                </>
            )
        })
        return (
            <Fragment>
                <Container className={this.state.isLoading+"TopSection"}>
                    <Row  className="d-flex justify-content-center">
                        <Col  md={10} lg={10} sm={12} xs={12}>
                            <Container>
                                <DescriptionPlaceholder isLoading={this.state.isLoading}/>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Container className={this.state.MainDiv+" TopSection"}>
                    <Row  className="d-flex justify-content-center">
                        <Col  md={10} lg={10}  sm={12} xs={12}>
                            <Breadcrumb className="shadow-sm mt-2 bg-white">
                                <Breadcrumb.Item><Link to="/" className="breadcrumb-item">Home</Link></Breadcrumb.Item>
                                <Breadcrumb.Item><Link to="/orderlist" className="breadcrumb-item">Order History</Link></Breadcrumb.Item>
                            </Breadcrumb>
                            <Container className="mt-1">
                                <Row className="shadow-sm animated slideInDown bg-white p-4">
                                    {MyView}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>

                <Modal show={this.state.ReviewModal} onHide={this.ReviewModalClose}>
                    <Modal.Header closeButton>
                        <h6> Write Review</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Your Name</label>
                            <input onChange={this.nameOnChange} className="form-control" type="text" placeholder=""/>
                        </div>
                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Rating</label>
                            <select onChange={this.RatingOnChange} className="form-control">
                                <option value="">Choose</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Comments</label>
                            <textarea onChange={this.CommentsOnChange}  rows={2}  className="form-control" type="text" placeholder=""/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-info" onClick={this.ReviewModalClose}>Cancel</button>
                        <button className="btn btn-success" onClick={this.PostReview}>Post</button>
                    </Modal.Footer>
                </Modal>
                {this.PageRefresh()}
            </Fragment>
        );
    }
}

export default OrderList;