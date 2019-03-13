import React, { Component } from 'react';
import './src/css/style.css'
class RecentSearches extends Component {
  constructor() {
    super();
    this.state = {
      active:""
    }

  }

  setActive(value){
    this.setState({active:value})
    console.log(value,"value")
  
}

  render() {
    console.log(this.props.recentactive,"this.props.recentactive")
    console.log(this.state.active,"this.state.active")
    return (
   
      <>
        <div className="container-body-child4-innerchild1">
          <p style={{ color: 'black', margin: "0",fontFamily: "ProximaNova-Semibold" }}>RECENT SEARCHES</p>
          {this.props.historypost.map((e,id)=>
            (<div key={id}>
              <li className={this.props.recentactive===""? "setInactive":(this.state.active===e ? "setActive" : "setInactive" )}  onClick={()=>{this.props.backhistory(e)
              this.setActive(e)}}>
              {e}
              </li>
            </div> )
              )}
        </div>
      </>


    );
  }
}

export default RecentSearches;