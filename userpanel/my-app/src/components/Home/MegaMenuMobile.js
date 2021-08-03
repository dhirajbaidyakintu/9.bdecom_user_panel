import React, {Component} from 'react';
import {Link} from "react-router-dom";

class MegaMenuMobile extends Component {
    MenuItemClick=(event)=>{
        event.target.classList.toggle("active");
        let panel=event.target.nextElementSibling;
        if(panel.style.maxHeight){
            panel.style.maxHeight=null;
        } else{
            panel.style.maxHeight=panel.scrollHeight+ "px"
        }
    }
    render() {
        const MyList=this.props.data;
        const MyView=MyList.map((ParentList,i)=>{
            return <div key={i.toString()}>
                <button onClick={this.MenuItemClick} className="accordionMobile"> <img alt="" className="accordionMenuIconMobile" src={ParentList.ParentCategoryImg}/>  {ParentList.ParentCategoryName}</button>
                <div className="panelMobile">
                    <ul>
                        {
                            (ParentList.SubCategory).map((ChildList,i)=>{
                                var url= window.location.pathname+"productListBySubCategoryPage/"+ChildList.cat1_name+"/"+ChildList.cat2_name;
                                return  <li key={i.toString()}>
                                    <Link to={url} className="accordionItemMobile link-style">{ChildList.cat2_name}</Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        })
        return (
            <div className="accordionMenuDivMobile">
                <div className="accordionMenuDivInsideMobile">
                    {MyView}
                </div>
            </div>
        );

    }
}

export default MegaMenuMobile;