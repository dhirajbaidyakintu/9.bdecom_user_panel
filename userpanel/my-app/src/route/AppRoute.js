import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";
import AboutPage from "../pages/AboutPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import RefundPolicyPage from "../pages/RefundPolicyPage";
import PurchasePage from "../pages/PurchasePage";
import TermPage from "../pages/TermPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import NotificationPage from "../pages/NotificationPage";
import FavouritePage from "../pages/FavouritePage";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/OrderPage";
import ProductListByCategoryPage from "../pages/ProductListByCategoryPage";
import ProductListBySubCategoryPage from "../pages/ProductListBySubCategoryPage";
import SearchPage from "../pages/SearchPage";
import UserOnboardPage from "../pages/UserOnboardPage";
import OrderListPage from "../pages/OrderListPage";
import UserProfilePage from "../pages/UserProfilePage";

class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" render={(props) => <HomePage {...props} key={Date.now()}/>}/>
                    <Route exact path="/userLogin" render={(props) => <UserOnboardPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/about" render={(props) => <AboutPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/contact" render={(props) => <ContactPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/term" render={(props) => <TermPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/purchase" render={(props) => <PurchasePage {...props} key={Date.now()}/>}/>
                    <Route exact path="/privacyPolicy" render={(props) => <PrivacyPolicyPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/refundPolicy" render={(props) => <RefundPolicyPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/productDetails/:code" render={(props) => <ProductDetailsPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/notification" render={(props) => <NotificationPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/favourite" render={(props) => <FavouritePage {...props} key={Date.now()}/>}/>
                    <Route exact path="/cart" render={(props) => <CartPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/order" render={(props) => <OrderPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/productListByCategoryPage/:Category" render={(props) => <ProductListByCategoryPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/productListBySubCategoryPage/:Category/:SubCategory" render={(props) => <ProductListBySubCategoryPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/productListBySearch/:searchKey" render={(props) => <SearchPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/orderlist" render={(props) => <OrderListPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/userProfile" component={UserProfilePage}/>
                </Switch>
            </Fragment>
        );
    }
}

export default AppRoute;