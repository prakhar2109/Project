import React, { Component } from 'react';
import './src/css/style.css';
import CreatableSelect from 'react-select/lib/Creatable';
import SortBy from './SortBy'
import Modal from './Modal';
import axios from '../../axios-data.js';
import FilterBy from './FilterBy';
import Spinner from './Spinner'
let customStyles = {
    control: provided => ({
        ...provided,

        border: "0px solid black",
        boxShadow: 'none !important',
        outline: 'none !important',
        backgroundColor: 'white',
        cursor: 'auto'
    })

}

export default class LandingIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fulldata: [],
            titlelist: [],
            title: '',
            ActiveMode:false,
            description:'',
            loading:true
        }
    }
    componentDidMount() {
        axios.get('/Posts')
            .then(res => {
                let titlelist = [];
                console.log(res, "reponse")
                res.data.map(posts =>
                    titlelist.push({ title: posts.title })
                )

                this.setState({ data: res.data, fulldata: res.data, titlelist: titlelist,loading:false });
                console.log(this.state.titlelist, "hello")
            })
            .catch(err => {

            });
    }
    postData() {
        axios.get('/Posts')
            .then(res => {


                this.setState({ data: res.data ,loading:false});
                console.log(this.state.data)
            })
            .catch(err => {

            });
    }
    getPosts = () => {
        return this.state.titlelist.map(id => ({ value: id.title, label: id.title }))
    }
    handleChange = (selectedOption) => {
        this.setState({ title: selectedOption });
    };
    searchPost = (e) => {
        e.preventDefault();
        console.log(this.state.title, "title")
    }
    getFormatdate = (date) => {
        var todayTime = new Date(date);
        var month = todayTime.getMonth();
        var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'];
        var year = todayTime.getFullYear();
        return months[month] + " " + year;
    }
    sortbyPriceLH = () => {
        const data = this.state.data;

        data.sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));

        this.setState({ data: data });

    }
    sortbyPriceHL = () => {
        const data = this.state.data;

        data.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));

        this.setState({ data: data,loading:false });
    }
    sortbyDatenewsest = () => {
        const data = this.state.data;

        data.sort(function (a, b) {
            return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
        });

        this.setState({ data: data ,loading:false});
    }
    sortbyDateoldest = () => {
        const data = this.state.data;

        data.sort(function (a, b) {
            return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
        });

        this.setState({ data: data,loading:false });
    }
    filterbyCost = (value) => {
        var value1 = value[0];
        var value2 = value[1];
        var newpostdata = [];
        console.log(value1, value2)


        this.state.fulldata.map((post) => {
            if (post.cost > value1 && post.cost < value2) {
                newpostdata.push(post)
            }
        }
        )
        this.setState({ data: newpostdata ,loading:false});

        console.log(this.state.data)


    }
    allPost(){
        console.log("hello")
        axios.get('/Posts')
        .then(res => {
           
            this.setState({ data: res.data,loading:false});
            
        })
        .catch(err => {

        });

    }
    datechoice=(value)=>{
        console.log(value,"value")
    }
    hey=()=>{
        console.log("hello")
        this.setState({ActiveMode:false})
    }
    render() {
        return (
            <div className="container">
                <div className="container-body">
                        <Modal  showModal={this.state.ActiveMode}  modalClosed={this.hey}>
                        <p style={{color:'black'}}>{this.state.description}</p><br/>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Modal>
                    <div className="container-body-header">
                        <div className="container-body-header-logo">
                            <div className="container-body-header-logo-image" onClick={() => window.open('https://www.mordorintelligence.com/', 'mywindow')} >

                            </div>
                        </div>

                        <div className="container-body-header-searchbar">
                            <form className="search">
                                <CreatableSelect
                                    className="search__field"
                                    styles={customStyles}
                                    value={this.state.title}
                                    onChange={event => {
                                        this.handleChange(event)
                                        this.postData()
                                    }}
                                    options={this.getPosts()}
                                    placeholder="Search over 1,000,000 recipes..." />

                                <button className="btn search__btn" onClick={this.searchPost}>
                                    <div className="searchicon">
                                    </div>
                                    <span>Search</span>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="contaier-body-element">
                        <FilterBy filterbyCost={this.filterbyCost} datechoice={this.datechoice}/>
                        {this.state.loading? <Spinner/>:(
                        <div className="container-body-child2">
                        <p onClick={()=>this.allPost()}>ALL</p>
                            {this.state.data.map(post =>
                                (
                                    post.title.search(this.state.title.value) === -1 ? null : (
                                        <div className="container-body-card"  onClick={()=>this.setState({ActiveMode:true,description:post.title})}>
                                            <div className="container-body-card-image" >
                                                <div className="container-body-card-image1"></div>
                                                <div className="container-body-card-image2" style={{ background: `url(${post.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover    ' }}></div>
                                                <div className="container-body-card-image3">
                                                    <p style={{fontSize:'14px'}}>Research Report</p>
                                                    <p>{this.getFormatdate(post.date)}</p>
                                                </div>

                                            </div>
                                            <div className="container-body-card-para">
                                                <div className="container-body-card-para-child1">
                                                    {post.title}
                                                </div>
                                                <div className="container-body-card-para-child2">
                                                    {post.description}
                                                   
                                                </div>
                                                <div className="container-body-card-para-child3">
                                                    <p style={{ margin: '0' }}>PUBLISHED: {this.getFormatdate(post.date)}</p>
                                                </div>
                                                <div className="container-body-card-para-child4">
                                                    <p style={{ margin: '0' }}>COST OF REPORT  :  &#8377; {post.cost}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            )}
                        </div>
                        )}
                       
                        <SortBy sortbyPriceLH={this.sortbyPriceLH} sortbyPriceHL={this.sortbyPriceHL} sortbyDatenew={this.sortbyDatenewsest} sortbyDateold={this.sortbyDateoldest} />
                    </div>
                </div>
            </div>
        )
    }
}
