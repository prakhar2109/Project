import React, { Component } from 'react';
import './src/css/style.css';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:props.post,
            active:""
        }
    }
    componentDidMount(){
        console.log(this.props,"posts props")
    }
    setActive(value){
        console.log("hello")
        this.setState({active:value})
        console.log(this.state.active)
    }
    render() {
        return (


            <>
               <div className="container-body-child3">
                            <div className="container-body-child3-innerchild1">
                                <p style={{ color: 'black', margin: "0" }}>SORT BY </p>
                                <p className={this.state.active==="plh"? "setActive":"setInactive"} onClick={event=>{
                                    this.props.sortbyPriceLH()
                                    this.setActive("plh")
                                }
                                }
                                >Price: Low-High</p>
                                <p className={this.state.active==="phl"? "setActive":"setInactive"} onClick={event=>{
                                    this.props.sortbyPriceHL()
                                    this.setActive("phl")
                                }}>Price:High-Low</p>
                                <p className={this.state.active==="dlh"? "setActive":"setInactive"} onClick={event=>{
                                    this.props.sortbyDatenew()
                                    this.setActive("dlh")
                                }}>Newest First</p>
                                <p className={this.state.active==="dhl"? "setActive":"setInactive"} onClick={event=>{
                                    this.props.sortbyDateold()
                                    this.setActive("dhl")
                                }}>Oldest First</p>
                            </div>

            </div>
            </>

        )
    }

}