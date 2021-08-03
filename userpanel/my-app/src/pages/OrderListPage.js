import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/Common/NavMenuDesktop";
import NavMenuMobile from "../components/Common/NavMenuMobile";
import FooterDesktop from "../components/Common/FooterDesktop";
import FooterMobile from "../components/Common/FooterMobile";
import OrderList from "../components/Order/OrderList";
import {Redirect} from "react-router";
import LocalStorageHelper from "../LocalStorageHelper/LocalStorageHelper";

class OrderListPage extends Component {
    constructor() {
        super();
        this.state={
            RedirectStatus:false,
        }
    }
    componentDidMount() {
        window.scroll(0,0);
        let mobile= LocalStorageHelper.getUserMobile();
        if(mobile===null){
            this.setState({RedirectStatus:true})
        }
    }
    pageRedirect=()=>{
        if(this.state.RedirectStatus===true){
            return(
                <Redirect to="/userLogin"/>
            )
        }
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

                <OrderList/>

                <div className="Desktop">
                    <FooterDesktop/>
                </div>
                <div className="Mobile">
                    <FooterMobile/>
                </div>
                {this.pageRedirect()}
            </Fragment>
        );
    }
}

export default OrderListPage;