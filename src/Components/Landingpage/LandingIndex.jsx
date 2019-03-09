import React, { Component } from 'react';
import './src/css/style.css';
import CreatableSelect from 'react-select/lib/Creatable';
import SortBy from './SortBy'

import axios from '../../axios-data.js';
import FilterBy from './FilterBy';
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
            titlelist: [],
            title: ''
        }
    }
    componentDidMount() {
        axios.get('/Posts')
            .then(res => {
                let titlelist = [];
                res.data.map(posts =>
                    titlelist.push({ title: posts.title })
                )

                this.setState({ data: res.data, titlelist: titlelist });
                console.log(this.state.titlelist, "hello")
            })
            .catch(err => {

            });
    }
    postData() {
        axios.get('/Posts')
            .then(res => {


                this.setState({ data: res.data });
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
        axios.get('/Posts?sortBy=cost&order=asc')
            .then(res => {


                this.setState({ data: res.data });

            })
            .catch(err => {

            });
    }
    sortbyPriceHL = () => {
        axios.get('/Posts?sortBy=cost&order=desc')
            .then(res => {


                this.setState({ data: res.data });

            })
            .catch(err => {

            });
    }
    sortbyDatenewsest=()=>{
        axios.get('/Posts?sortBy=date&order=desc')
        .then(res => {


            this.setState({ data: res.data });

        })
        .catch(err => {

        });
    }
    sortbyDateoldest=()=>{
        axios.get('/Posts?sortBy=date&order=asc')
        .then(res => {


            this.setState({ data: res.data });

        })
        .catch(err => {

        });
    }
    render() {
        return (
            <div className="container">
                <div className="container-body">
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
                       <FilterBy/>
                        <div className="container-body-child2">
                            {this.state.data.map(post =>
                                (
                                    post.title.search(this.state.title.value) === -1 ? null : (
                                        <div className="container-body-card">
                                            <div className="container-body-card-image" style={{ background: `url(${post.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}>
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
                                                    {/* {post.date} */}
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
                        <SortBy sortbyPriceLH={this.sortbyPriceLH}  sortbyPriceHL={this.sortbyPriceHL} sortbyDatenew={this.sortbyDatenewsest} sortbyDateold={this.sortbyDateoldest}/>
                    </div>
                </div>
            </div>
        )
    }
}
