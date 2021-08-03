class ApiURL {
    static BaseURL= "http://127.0.0.1:8000/api/";

    static visitorDetails= this.BaseURL+"sendVisitorDetails";
    static sendContactDetails= this.BaseURL+"sendContactDetails";
    static sendSiteInfo= this.BaseURL+"sendSiteInfo";
    static sendCategoryDetails= this.BaseURL+"sendCategoryDetails";
    static productListByRemark(Remark){
        return this.BaseURL+"productListByRemark/"+Remark;
    }
    static productListByCategory(Category){
        return this.BaseURL+"productListByCategory/"+Category;
    }
    static productListBySubCategory(Category, SubCategory){
        return this.BaseURL+"productListBySubCategory/"+Category+"/"+SubCategory;
    }
    static sendSliderInfo= this.BaseURL+"sendSliderInfo";
    static productDetails(ProductCode){
        return this.BaseURL+"productDetails/"+ProductCode;
    }
    static notificationHistory= this.BaseURL+"notificationHistory";
    static productListBySearch(searchKey){
        return this.BaseURL+"productListBySearch/"+searchKey;
    }
    static similarProduct(SubCategory){
        return this.BaseURL+"similarProduct/"+SubCategory;
    }
    static reviewList(code){
        return this.BaseURL+"reviewList/"+code;
    }
    static userLogin(mobile_number, password){
        return this.BaseURL+"userLogin/"+mobile_number+"/"+password;
    }
    static addToCart=this.BaseURL+"addToCart";
    static cartCount(mobile){
        return this.BaseURL+"cartCount/"+mobile;
    }
    static addFav(mobile,code){
        return this.BaseURL+"addFav/"+mobile+"/"+code;
    }
    static favList(mobile){
        return this.BaseURL+"favList/"+mobile;
    }
    static removeFavItem(mobile,code){
        return this.BaseURL+"removeFavItem/"+mobile+"/"+code;
    }
    static cartList(mobile){
        return this.BaseURL+"cartList/"+mobile;
    }
    static removeCartList(id){
        return this.BaseURL+"removeCartList/"+id;
    }
    static cartItemMinus(id,quantity,price){
        return this.BaseURL+"cartItemMinus/"+id+"/"+quantity+"/"+price;
    }
    static cartItemPlus(id,quantity,price){
        return this.BaseURL+"cartItemPlus/"+id+"/"+quantity+"/"+price;
    }
    static cartOrder=this.BaseURL+"cartOrder";
    static orderListByUser(mobile){
        return this.BaseURL+"orderListByUser/"+mobile;
    }
    static postReview=this.BaseURL+"postReview";

    static userProfile(mobile_number){
        return this.BaseURL+"userProfile/"+mobile_number;
    }
    static userProfileUpdate=this.BaseURL+"userProfileUpdate";
}

export default ApiURL;