class LocalStorageHelper {
    // Set Get User Mobile
    static setUserMobile(UserMobile){
        localStorage.setItem("UserMobile",UserMobile)
    }
    static getUserMobile(){
        return  localStorage.getItem("UserMobile")
    }
    static removeUserMobile(){
        return  localStorage.removeItem("UserMobile")
    }

    //Redirect to
    static SetRedirectFromDetails(winLocation){
        sessionStorage.setItem("winLocation",winLocation)
    }
    static GetRedirectFromDetails(){
        return sessionStorage.getItem("winLocation");
    }
}
export default LocalStorageHelper;