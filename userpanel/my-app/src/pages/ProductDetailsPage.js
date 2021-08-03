import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/Common/NavMenuDesktop";
import NavMenuMobile from "../components/Common/NavMenuMobile";
import FooterDesktop from "../components/Common/FooterDesktop";
import FooterMobile from "../components/Common/FooterMobile";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import axios from "axios";
import ApiURL from "../api/ApiURL";
import SliderLoader from "../components/PlaceHolder/SliderLoader";

class ProductDetailsPage extends Component {
    constructor({match}) {
        super();
        this.state={
            code:match.params.code,
            ProductData:[],
            isLoading:"BetweenTwoSection",
            mainDiv:"d-none"
        }
    }
    componentDidMount() {
        window.scroll(0,0);
        axios.get(ApiURL.productDetails(this.state.code)).then(response=>{
            this.setState({ProductData: response.data, isLoading:"d-none", mainDiv:" "})
        }).catch(error=>{

        });
    }
    render() {
        if (this.state.mainDiv=="d-none"){
            return (
                <Fragment>
                    <div className="Desktop">
                        <NavMenuDesktop/>
                    </div>
                    <div className="Mobile">
                        <NavMenuMobile/>
                    </div>

                    <SliderLoader isLoading={this.state.isLoading}/>

                    <div className="Desktop">
                        <FooterDesktop/>
                    </div>
                    <div className="Mobile">
                        <FooterMobile/>
                    </div>
                </Fragment>
            );
        }else{
            return (
                <Fragment>
                    <div className="Desktop">
                        <NavMenuDesktop/>
                    </div>
                    <div className="Mobile">
                        <NavMenuMobile/>
                    </div>

                   <ProductDetails ProductData={this.state.ProductData}/>

                    <div className="Desktop">
                        <FooterDesktop/>
                    </div>
                    <div className="Mobile">
                        <FooterMobile/>
                    </div>
                </Fragment>
            );
        }

    }
}

export default ProductDetailsPage;