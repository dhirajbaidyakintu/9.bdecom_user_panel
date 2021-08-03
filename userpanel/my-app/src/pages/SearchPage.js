import React, {Component, Fragment} from 'react';
import axios from "axios";
import ApiURL from "../api/ApiURL";
import NavMenuDesktop from "../components/Common/NavMenuDesktop";
import NavMenuMobile from "../components/Common/NavMenuMobile";
import ProductListLoader from "../components/PlaceHolder/ProductListLoader";
import FooterDesktop from "../components/Common/FooterDesktop";
import FooterMobile from "../components/Common/FooterMobile";
import SearchList from "../components/Others/SearchList";

class SearchPage extends Component {
    constructor({match}) {
        super();
        this.state={
            searchKey:match.params.searchKey,
            ProductData:[],
            isLoading:"",
            mainDiv:"d-none"
        }
    }
    componentDidMount() {
        window.scroll(0,0);
        axios.get(ApiURL.productListBySearch(this.state.searchKey)).then(response=>{
            this.setState({ProductData: response.data, isLoading:"d-none", mainDiv:" "})
        }).catch(error=>{

        });
    }
    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop/>
                </div>
                <div className="Mobile">
                    <NavMenuMobile/>
                </div>

                <ProductListLoader isLoading={this.state.isLoading}/>
                <div className={this.state.mainDiv}>
                    <SearchList searchKey={this.state.searchKey} ProductData={this.state.ProductData}/>
                </div>

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

export default SearchPage;