import React, { Component } from 'react';
import './src/css/filter.css';
import './src/css/style.css';
var slide1;
var slide2;
var slidecontain = [];
export default class FilterBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.post,
      active: "",
      date_type: '',
      value1: "",
      value2: ""
    }
  }

  componentDidMount() {

    var sliderSections = document.getElementsByClassName("range-slider");
    for (var x = 0; x < sliderSections.length; x++) {
      var sliders = sliderSections[x].getElementsByTagName("input");
      for (var y = 0; y < sliders.length; y++) {
        if (sliders[y].type === "range") {
          sliders[y].oninput = this.getVals;
          sliders[y].oninput();
        }
      }
    }
  }
  getVals() {

    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
    slide1 = parseFloat(slides[0].value);
    slide2 = parseFloat(slides[1].value);
    if (slide1 > slide2) { var tmp = slide2; slide2 = slide1; slide1 = tmp; }
    slidecontain[0] = slide1;
    slidecontain[1] = slide2;
    var displayElement = parent.getElementsByClassName("rangeValues")[0];
    displayElement.innerHTML = '&#8377;' + slide1 + " - &#8377;" + slide2;


  }
  setActive(value) {
    this.setState({ active: value })
  }
  onDateChange = (e) => {
    this.setState({
      date_type: e.target.value
    })
  }
  daterangevalue1 = (e) => {
    this.setState({
      value1: e.target.value
    })
  }
  daterangevalue2 = (e) => {
    this.setState({
      value2: e.target.value
    })
  }
  render() {
    return (
      <>
        <div className="container-body-child1">
          <div className="container-body-child1-innerchild1">
            <p style={{ color: '#000000', margin: "0" ,fontFamily: "ProximaNova-Semibold" }}>FILTER BY </p>
             <p style={{color:'#333333',fontFamily: "ProximaNova-Semibold"}}>PUBLISHED DATE</p>
            {/*<input type="radio" name="date_type" value="Today" checked={this.state.date_type === "Today" ? true : false} onChange={(event) => {
              this.onDateChange(event)
              this.props.datechoice(event.target.value)
            }} />Today<br />
            <input type="radio" name="date_type" value="sixmonthsago" checked={this.state.date_type === "sixmonthsago" ? true : false} onChange={(event) => {
              this.onDateChange(event)
              this.props.datechoice(event.target.value)
            }} />6 months Ago<br />
            <input type="radio" name="date_type" value="oneyearago" checked={this.state.date_type === "oneyearago" ? true : false} onChange={(event) => {
              this.onDateChange(event)
              this.props.datechoice(event.target.value)
            }} /> 1 year Ago<br /> */}
            <div className="date-input-range">
            <p style={{color:'#333333'}}>FROM (dd/mm/year)</p>
              <input type="text" onChange={(e) => {
                this.daterangevalue1(e)
                this.props.daterangeFun(e.target.value, this.state.value2)
              }
              } />
            <p style={{color:'#333333'}}>TO (dd/mm/year)</p>
              <input type="text" onChange={(e) => {
                this.daterangevalue2(e)
                this.props.daterangeFun(this.state.value1, e.target.value)
              }} />
            </div>
            <p id="dateerror"></p>
            <p style={{color:'#333333',fontFamily: "ProximaNova-Semibold"}}>COST</p>
            <section className="range-slider">
              <span className="rangeValues"></span>
              <input defaultValue="0" min="0" max="1000" step="10" type="range" onChange={() => this.props.filterbyCost(slidecontain)} />
              <input defaultValue="1000" min="0" max="1000" step="10" type="range" onChange={() => this.props.filterbyCost(slidecontain)} />
            </section>
          </div>
        </div>
      </>

    )
  }

}