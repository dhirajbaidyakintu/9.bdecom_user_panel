import React, {Component, Fragment} from 'react';
import {Card, Col, Container} from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import NewArrivalPlaceholder from "../PlaceHolder/NewArrivalPlaceholder";
import {Link} from "react-router-dom";

class NewArrival extends Component {
    constructor(props) {
        super(props);
        this.state={
            ProductData:[],
            isLoading:"BetweenTwoSection",
            mainDiv:"d-none"
        }
        this.next=this.next.bind(this);
        this.previous=this.previous.bind(this)
    }
    componentDidMount() {
        axios.get(ApiURL.productListByRemark("NEW")).then(response=>{
            this.setState({ProductData: response.data, isLoading:"d-none", mainDiv:" "})
        }).catch(error=>{

        });
    }
    next(){
        this.slider.slickNext();
    }
    previous(){
        this.slider.slickPrev();
    }
    render() {
        const ParentList= this.state.ProductData;
        const myView= ParentList.map((ParentList,i)=>{

            if(ParentList.special_price == "NA"){
                return <div className="p-1">
                    <Link to={"productDetails/"+ParentList.product_code} className="link-style">
                        <Card className="card text-center w-100 image-box text-center">
                            <img src={ParentList.image}/>
                            <Card.Body>
                                <h1 className="product-name-on-card">{ParentList.title}</h1>
                                <p className="product-price-on-card">Price : {ParentList.price} tk</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
            } else {
                return <div className="p-1">
                    <Link to={"productDetails/"+ParentList.product_code} className="link-style">
                        <Card className="card text-center w-100 image-box text-center">
                            <img src={ParentList.image}/>
                            <Card.Body>
                                <h1 className="product-name-on-card">{ParentList.title}</h1>
                                <p className="product-price-on-card">Price: {ParentList.special_price} tk <br></br> Price: <strike>{ParentList.price}</strike> tk  </p>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
            }
        })
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <Fragment>
                <NewArrivalPlaceholder isLoading={this.state.isLoading}/>
                <div className={this.state.mainDiv}>
                    <Container className="text-center mt-3">
                        <h4 className="section-title px-0 mx-0 ">NEW ARRIVAL
                            <a className="btn btn-sm ml-2 search-btn" onClick={this.previous} >
                                <i className="fa fa-angle-left"></i>
                            </a>
                            <a className="btn btn-sm ml-2 search-btn" onClick={this.next}>
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </h4>
                        <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                        <Slider  ref={c=>(this.slider=c)}   {...settings}>
                            {myView}
                        </Slider>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default NewArrival;