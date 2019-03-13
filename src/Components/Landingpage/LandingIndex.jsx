import React, { Component } from 'react';
import './src/css/style.css';
import CreatableSelect from 'react-select/lib/Creatable';
import SortBy from './SortBy'
import Modal from './Modal';
import axios from '../../axios-data.js';
import FilterBy from './FilterBy';
import Spinner from './Spinner'
import Recentsearches from './Recentsearches';
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
            ActiveMode: false,
            description: '',
            loading: true,
            historypost: '',
            allbtnaactive: false,
            sortactive: 'abc',
            recentactive:'abc'
        }
    }

    componentDidMount() {
        axios.get('/Posts')
            .then(res => {
                let titlelist = [];
                res.data.map(posts =>
                    titlelist.push({ title: posts.title })
                )
                this.setState({ data: res.data, fulldata: res.data, titlelist: titlelist, loading: false });
            })
            .catch(err => {
                this.setState({ loading: true });
            });
    }


    postData = () => {
        axios.get('/Posts')
            .then(res => {
                this.setState({ data: res.data, loading: false });
            })
            .catch(err => {
                this.setState({ loading: true });
            });
    }


    getPosts = () => {
        return this.state.titlelist.map(id => ({ value: id.title, label: id.title }))
    }


    handleChange = (selectedOption) => {

        var retrievedObject = JSON.parse(localStorage.getItem('testObjects'));
        if (retrievedObject == null) {
            var testObjects = [];
            testObjects.push(selectedOption);
            localStorage.setItem('testObjects', JSON.stringify(testObjects));

        }
        else {
            if (retrievedObject.length > 5)
                retrievedObject.shift();
            var testObjects;
            testObjects = retrievedObject;
            testObjects.push(selectedOption);
            localStorage.setItem('testObjects', JSON.stringify(testObjects));
        }
        this.setState({ title: selectedOption });

    };


    searchPost = (e) => {
        e.preventDefault();
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
        this.setState({ data: data, sortactive: "plh" });
    }


    sortbyPriceHL = () => {
        const data = this.state.data;
        data.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
        this.setState({ data: data, loading: false, sortactive: "phl" });
    }


    sortbyDatenewsest = () => {
        const data = this.state.data;
        data.sort(function (a, b) {
            return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
        });
        this.setState({ data: data, loading: false, sortactive: "dlh" });
    }


    sortbyDateoldest = () => {
        const data = this.state.data;
        data.sort(function (a, b) {
            return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
        });
        this.setState({ data: data, loading: false, sortactive: "dhl" });
    }


    filterbyCost = (value) => {
        var value1 = value[0];
        var value2 = value[1];
        var newpostdata = [];
        this.state.fulldata.map((post) => {
            if (post.cost > value1 && post.cost < value2) 
                newpostdata.push(post)  
        }
        )
        this.setState({ data: newpostdata, loading: false,sortactive: "" });
    }

    
    allPost = () => {
        axios.get('/Posts')
            .then(res => {
                this.setState({ data: res.data, loading: false, allbtnaactive: true, sortactive: "",recentactive:"", title: "" });
            })
            .catch(err => {
                this.setState({ loading: true });
            });
    }


    datechoice = (value) => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var currentdate = [];
        currentdate.push(date, month, year);
        if (value === "Today") {
            var newpostdata = [];
            axios.get('/Posts')
                .then(res => {
                    res.data.map((e) => {
                        var newdate = new Date(e.date).getDate(); //Current Date
                        var newmonth = new Date(e.date).getMonth() + 1; //Current Month
                        var newyear = new Date(e.date).getFullYear(); //Current Year
                        var postdate = [];
                        postdate.push(newdate, newmonth, newyear);
                        if (postdate[0] === currentdate[0] && postdate[1] === currentdate[1] && postdate[2] === currentdate[2]) {
                            newpostdata.push(e);
                        }
                    })
                    this.setState({ data: newpostdata, loading: false });
                })
                .catch(err => {
                    this.setState({ loading: true });
                });
        }
        if (value === "sixmonthsago") {
            var newpostdata = [];
            axios.get('/Posts')
                .then(res => {

                    res.data.map((e) => {
                        var newdate = new Date(e.date).getDate(); //Current Date
                        var newmonth = new Date(e.date).getMonth() + 1; //Current Month
                        var newyear = new Date(e.date).getFullYear(); //Current Year
                        var postdate = [];
                        postdate.push(newdate, newmonth, newyear);

                        if (postdate[1] - currentdate[1] < 6 && postdate[2] === currentdate[2]) {
                            newpostdata.push(e);
                        }
                    })
                    this.setState({ data: newpostdata, loading: false });
                })
                .catch(err => {
                    this.setState({ loading: true });
                });

        }
        if (value === "oneyearago") {
            var newpostdata = [];
            axios.get('/Posts')
                .then(res => {
                    res.data.map((e) => {
                        var newdate = new Date(e.date).getDate(); //Current Date
                        var newmonth = new Date(e.date).getMonth() + 1; //Current Month
                        var newyear = new Date(e.date).getFullYear(); //Current Year
                        var postdate = [];
                        postdate.push(newdate, newmonth, newyear);

                        if (currentdate[2] - postdate[2] >= 1) {
                            newpostdata.push(e);
                        }
                    })
                    this.setState({ data: newpostdata, loading: false ,sortactive: ""});
                })
                .catch(err => {
                    this.setState({ loading: true });
                });

        }
    }

    daterangeFun = (value1, value2) => {
        var newpostdata = [];
        var fromdate = []
        if (value1.length === 10)
            fromdate.push(parseInt(value1[0] + value1[1]), parseInt(value1[3] + value1[4]), parseInt(value1[6] + value1[7] + value1[8] + value1[9]))
        var todate = []

        if (value2.length === 10)
            todate.push(parseInt(value2[0] + value2[1]), parseInt(value2[3] + value2[4]), parseInt(value2[6] + value2[7] + value2[8] + value2[9]))

        if((value1[2]!=='/'&& value1[2])||(value1[5]!=='/'&& value1[5])||(value2[2]!=='/'&& value2[2])||(value2[5]!=='/'&& value2[5]))
            document.getElementById("dateerror").innerHTML = "Worng Format"

        else if (value1.length > 10 || (fromdate[0] > 31 || fromdate[1] > 12))
            document.getElementById("dateerror").innerHTML = "Worng Format"

        else if (value2.length > 10 || (todate[0] > 31 || todate[1] > 12))
            document.getElementById("dateerror").innerHTML = "Worng Format"
        else if(value2.length < 10 || value2.length < 10  )
        document.getElementById("dateerror").innerHTML = ""

        else if (value1.length === 10 && value2.length === 10) {
            document.getElementById("dateerror").innerHTML = ""
            this.setState({ loading: true })
            var newpostdata = [];
            axios.get('/Posts')
                .then(res => {
                    res.data.map((e) => {
                        var newdate = new Date(e.date).getDate(); //Current Date
                        var newmonth = new Date(e.date).getMonth() + 1; //Current Month
                        var newyear = new Date(e.date).getFullYear(); //Current Year
                        var postdate = [];
                        postdate.push(newdate, newmonth, newyear);

                        if (newyear < todate[2] && newyear > fromdate[2]) {

                            newpostdata.push(e);

                        }
                        else if (newyear === todate[2]) {
                            if (newmonth < todate[1]) {
                                newpostdata.push(e);
                            }
                            else if (newmonth === todate[1] && newdate <= todate[0]) {
                                newpostdata.push(e);
                            }
                        }
                        else if (newyear === fromdate[2]) {
                            if (newmonth > fromdate[1]) {
                                newpostdata.push(e);
                            }
                            else if (newmonth === fromdate[1] && newdate >= fromdate[0]) {
                                newpostdata.push(e);
                            }
                        }
                    })
                    this.setState({ data: newpostdata, loading: false,sortactive: ""});


                })
                .catch(err => {
                    this.setState({ loading: true });
                });

        }
    }


    historyPost = (valueop) => {
        var arr = {}
        arr['value'] = valueop;
        arr['label'] = valueop;
        this.setState({ title: arr ,recentactive:valueop});
    }


    hey = () => {
        this.setState({ ActiveMode: false })
    }


    render() {
        let retrievedObject = JSON.parse(localStorage.getItem('testObjects'));
        let historytitle = [];
        if (retrievedObject == null) {
        }
        else {
            retrievedObject.map(e =>

                historytitle.push(e.value))

            historytitle.reverse();
        }
        return (

            <div className="container">
                <div className="container-body">
                    <Modal showModal={this.state.ActiveMode} modalClosed={this.hey}>
                        <p style={{ color: '#2ea2f8',fontSize:'20px' }}>{this.state.description}</p><br />
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

                                    }}
                                    options={this.getPosts()}
                                    placeholder="Search over 1,000,000 reports..." />

                                <button className="btn search__btn" onClick={this.searchPost}>
                                    <div className="searchicon">
                                    </div>
                                    <span></span>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="contaier-body-element">
                        <FilterBy filterbyCost={this.filterbyCost} datechoice={this.datechoice} daterangeFun={this.daterangeFun} />
                        {this.state.loading ? <Spinner /> : (
                            <div className="container-body-child2">
                                <button onClick={this.allPost} className={this.state.allbtnaactive === true ? "ALLpostbutton-active" : "ALLpostbutton-inactive"} >ALL</button>
                                {this.state.data && this.state.data.map((post,id) =>
                                    (
                                        post.title.search(this.state.title.value) === -1 ? null : (
                                            <div className="container-body-card" onClick={() => this.setState({ ActiveMode: true, description: post.title })} key={id}>
                                                <div className="container-body-card-image" >
                                                    <div className="container-body-card-image1"></div>
                                                    <div className="container-body-card-image2" style={{ background: `url(${post.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover    ' }}></div>
                                                    <div className="container-body-card-image3">
                                                        <p>Research Report</p>
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
                                                        <p style={{ margin: '0',marginBottom:'10px' }}>PUBLISHED: {this.getFormatdate(post.date)}</p>
                                                    </div>
                                                    <div className="container-body-card-para-child4">
                                                        <p style={{ margin: '0',marginBottom:'2px' }}>COST OF REPORT  :  &#8377; {post.cost}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )
                                )}
                            </div>
                        )}
                        <div className="container-body-child3">
                            <SortBy sortbyPriceLH={this.sortbyPriceLH} sortbyPriceHL={this.sortbyPriceHL} sortbyDatenew={this.sortbyDatenewsest} sortbyDateold={this.sortbyDateoldest} sortactive={this.state.sortactive} />
                            <Recentsearches historypost={historytitle} backhistory={this.historyPost} recentactive={this.state.recentactive} />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
