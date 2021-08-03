import React, {Component} from 'react';
import {Link} from "react-router-dom";

class MegaMenuDesktop extends Component {
    MenuItemClick=(event)=>{
        event.target.classList.toggle("active");
        let panel= event.target.nextElementSibling;
        if (panel.style.maxHeight){
            panel.style.maxHeight=null;
        } else {
            panel.style.maxHeight=panel.scrollHeight+ "px";
        }
    }
    render() {
        const ParentList= this.props.data;
        const myView= ParentList.map((ParentList,i)=>{
            return <div key={i.toString()}>
                <button onClick={this.MenuItemClick} className="accordion"> <img className="accordionMenuIcon" src={ParentList.ParentCategoryImg}/> {ParentList.ParentCategoryName}</button>
                <div className="panel">
                    <ul>
                        {
                            (ParentList.SubCategory).map((ChildList,i)=>{
                                return <li key={i.toString()}>
                                    <Link to={"productListBySubCategoryPage/"+ChildList.cat1_name+"/"+ChildList.cat2_name} className="accordionItem link-style"> {ChildList.cat2_name}</Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        })
        return (
            <div className="accordionMenuDiv">
                <div className="accordionMenuDivInside">
                    {myView}
                </div>
            </div>
        );
    }
}

export default MegaMenuDesktop;