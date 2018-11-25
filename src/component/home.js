import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component{

    constructor(){
        super();
        this.state = {
            movies: [],
            category: 'Movies in theatres Indonesia',
            status: 'Not Yet Bought',
            saldo: 100000
        }
    }
    componentDidMount(){ 
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=dcf65af99cc0ddfa91900393ab3b3f09&region=ID&release_date.gte=2018-11-01&release_date.lte=2018-11-23&with_release_type=3|2')
        .then((getData) => { 
            this.setState({
                movies: getData.data.results,
            })
            console.log(getData.data.results); 
        }) 
    };

    popular(){ 
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=dcf65af99cc0ddfa91900393ab3b3f09&language=en-US&page=1')
        .then((getData) => { 
            this.setState({
                movies: getData.data.results,
                category: 'Most Popular Movies'
            })
            console.log(getData.data.results); 
        }) 
    };

    rated(){ 
        axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dcf65af99cc0ddfa91900393ab3b3f09&language=en-US&page=1')
        .then((getData) => { 
            this.setState({
                movies: getData.data.results,
                category: 'Highest Rated Movies'
            })
            console.log(getData.data.results); 
        }) 
    };

    search(){ 
        var keyword = this.refs.searching.value;
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=dcf65af99cc0ddfa91900393ab3b3f09&language=en-US&query=${keyword}&page=1&include_adult=false`)
        .then((getData) => { 
            this.setState({
                movies: getData.data.results,
            })
            console.log(getData.data.results); 
        }) 
    };

    buy(e){
        var calculate = e;
        this.setState({
            status: 'Already Bought',
            saldo: calculate
        })
    }


    render(){

        const movie = this.state.movies.map((item, index)=>{
            var idproduk = item.id;
            var nama = item.original_title;
            var slug = nama.replace(/\s+/g, '-');
            var poster = item.poster_path;
            var vote = item.vote_average;
            var status = this.state.status;
            var harga = item.vote_average;
            if(harga >=1 && harga <=3){
                harga = 3500
            }else if(harga >3 && harga <=6){
                harga = 8250
            }else if(harga >6 && harga <=8){
                harga = 16350
            }else if(harga >8 && harga <=10){
                harga = 21250
            }
            var saldo = this.state.saldo - harga;
            return <div key={index} className="col-sm-12 col-md-6 col-lg-3" >
                      <div class="item-image-wrapper">
                      <Link to={{ pathname:`/MovieDetails/${idproduk}-${slug}`, state: {idproduk: idproduk, slug: slug, saldo: saldo, status: this.state.status}}} className="product-box">
                        <div class="single-items">
                            <div class="iteminfo text-center">
                              <div>
                                  <img src={'http://image.tmdb.org/t/p/w185/' + poster} style={{height: 200}} alt=""/>
                              </div>
                              <h2 ref="harga">Rp {harga.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h2>
                              <br/>
                              <p style={{height: 70}}>{nama}</p>
                              <p>Rating {vote}</p>
                            </div>
                            <div class="item-overlay">
                              <div class="overlay-content">
                              <h2>{status}</h2>
                              </div>
                            </div>
                        </div>
                      </Link>
                        <button onClick={() => this.buy(saldo)} className="btn btn-md bcp">
                            Buy 
                        </button>	
                     </div>
                  </div>
        })

        return(
        <div>
        <h1>{this.state.category}</h1>
        <h4 className="float-right">Your Saldo:<br/>Rp. {this.state.saldo.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h4>
        <div className="content-product" style={{marginTop: "80px"}}>
        <div className="container">
          <div className="row">
          <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="head-cat">
            <h3>Discover Movies</h3>
            <hr />
          </div>
          <div className="category-filter">
            <ul>
              <li>
                <a href="#" className="hoverp" onClick={()=>{this.componentDidMount()}}> Now Showing in Indonesia </a>
              </li>
              <li>
                <a href="#" className="hoverp" onClick={()=>{this.popular()}}> Most Popular Movies </a>
              </li>
              <li>
                <a href="#" className="hoverp" onClick={()=>{this.rated()}}> Highest Rated Movies </a>
              </li>
            </ul>
          </div>
        </div>
            <div className="col-sm-6 col-md-8 col-lg-9">
              <div className="row" >
                {movie}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
        )
    }
}

export default Home;