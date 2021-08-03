import React, {Component} from 'react';
import axios from "axios";
import ApiURL from "../../api/ApiURL";

class ReviewList extends Component {
    constructor() {
        super();
        this.state={
            ReviewData:[],
        }
    }
    componentDidMount() {
        let code=this.props.code;
        axios.get(ApiURL.reviewList(code)).then((response)=>{
            this.setState({ReviewData:response.data})
        })
    }
    render() {
        let MyList=this.state.ReviewData;
        if(MyList.length>0){
            const MyView=MyList.map((list,i)=>{
                if(list.reviewer_rating === "1"){
                    return <div>
                        <p className=" p-0 m-0"> <span className="Review-Title"> {list.reviewer_name}</span> <span className="text-success"> <i className="fa fa-star"/> </span> </p>
                        <p>{list.reviewer_comments}</p>
                    </div>
                } else if(list.reviewer_rating === "2"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title"> {list.reviewer_name}</span> <span className="text-success"><i className="fa fa-star"/><i className="fa fa-star"/></span></p>
                        <p>{list.reviewer_comments}</p>
                    </div>
                } else if(list.reviewer_rating === "3"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title"> {list.reviewer_name}</span> <span className="text-success"><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/></span></p>
                        <p>{list.reviewer_comments}</p>
                    </div>
                } else if(list.reviewer_comment === "4"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title"> {list.reviewer_name}</span><span className="text-success"><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/></span></p>
                        <p>{list.reviewer_comments}</p>
                    </div>
                } else if(list.reviewer_rating === "5"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title"> {list.reviewer_name}</span> <span className="text-success"><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/><i className="fa fa-star"/></span></p>
                        <p>{list.reviewer_comments}</p>
                    </div>
                }
            });
            return (
                <div>
                    <h6 className="mt-2">REVIEWS</h6>
                    {MyView}
                </div>
            );
        } else {
            return (
                <div>
                    <h6 className="mt-2">REVIEWS</h6>
                    <p> No Review Found </p>
                </div>
            );
        }
    }
}

export default ReviewList;