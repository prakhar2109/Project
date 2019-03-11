import React, { Component } from 'react';
import './src/css/filter.css';
import './src/css/style.css';
var slide1;
var slide2;
var slidecontain=[];
export default class FilterBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:props.post,
            active:"",
            date_type:''
        }
    }
    componentDidMount(){
        var sliderSections = document.getElementsByClassName("range-slider");

        console.log(sliderSections.length,"hello")
        for( var x = 0; x < sliderSections.length; x++ ){
        
          var sliders = sliderSections[x].getElementsByTagName("input");
          console.log(sliders)
          for( var y = 0; y < sliders.length; y++ ){
            if( sliders[y].type ==="range" ){
              sliders[y].oninput = this.getVals;
              // Manually trigger event first time to display values
              sliders[y].oninput();
            }
          }
        }
    }
    getVals(){
        console.log('HEEE');
        // Get slider values
        var parent = this.parentNode;
        var slides = parent.getElementsByTagName("input");
      
          slide1 = parseFloat( slides[0].value );
          slide2 = parseFloat( slides[1].value );
          
        // Neither slider will clip the other, so make sure we determine which is larger
        if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
        slidecontain[0]=slide1;
        slidecontain[1]=slide2;
        var displayElement = parent.getElementsByClassName("rangeValues")[0];
            displayElement.innerHTML = '&#8377;' + slide1 + " - &#8377;" + slide2 + "k";
       

      }
    setActive(value){
        console.log("hello")
        this.setState({active:value})
        console.log(this.state.active)
    }
    onDateChange=(e)=>{
        this.setState({
            date_type: e.target.value
        })
    }
   
    render() 
    {
       
        return (


            <>
              <div className="container-body-child1">
                            <div className="container-body-child1-innerchild1">
                                <p style={{ color: 'black', margin: "0" }}>FILTER BY </p>
                                <p>Date</p>
                                <input type="radio" name="date_type" value="Today" checked={this.state.date_type === "Today" ? true : false} onChange={(event)=>{this.onDateChange(event)
                                this.props.datechoice(event.target.value)}} />Today<br/>
                                <input type="radio" name="date_type" value="oneweekago" checked={this.state.date_type === "oneweekago" ? true : false}  onChange={(event)=>{this.onDateChange(event)
                                this.props.datechoice(event.target.value)}} />One Week Ago<br/>
                                <input type="radio" name="date_type" value="onemonthago" checked={this.state.date_type === "onemonthago" ? true : false} onChange={(event)=>{this.onDateChange(event)
                                this.props.datechoice(event.target.value)}} /> One Month Ago<br/>
                                {/* {this.hey()}                          */}
                                <p >Cost</p>
                                
                                <section className="range-slider">
                                <span className="rangeValues"></span>
                                <input defaultValue="0" min="0" max="1000" step="10" type="range" onChange={()=>this.props.filterbyCost(slidecontain)}/>
                                <input defaultValue="1000" min="0" max="1000" step="10" type="range" onChange={()=>this.props.filterbyCost(slidecontain)}/>
                                </section>
                            </div>

                        </div>
            </>

        )
    }

}