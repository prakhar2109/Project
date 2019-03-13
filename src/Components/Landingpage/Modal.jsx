import React, { Component } from 'react';

import'../Landingpage/src/css/modal.css';
import Backdrop from './Backdrop';
class Modal extends Component {
  constructor() {
    super();
    this.state = {
        }
     
  }
 
  shouldComponentUpdate(nextProps,nextState){
      return nextProps.showModal!==this.props.showModal|| nextProps.children!==this.props.children;
  }
  
  render() {
    return (
        <div>
                 <Backdrop show={this.props.showModal} clicked={this.props.modalClosed} />
                   <div className="Modal" style={{transform: this.props.showModal ? 'translateY(0)':'translateY(-100vh)'}}>
                    {this.props.children}
                    
                    
                </div> 
        </div>
    );
  }
}

export default Modal;