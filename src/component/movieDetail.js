import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class MovieDetails extends Component {

    constructor(){
        super();
        this.state = {
            similar:[],
            rekomendasi:[],
            status:'',
            saldo:'',
            id: '',
            judul: '',
            rating:'',
            durasi:'',
            synopsis: '',
            poster: '',
            harga: '',
          }
    }

  componentWillMount(){
    var id = this.props.location.state.idproduk;
    axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=dcf65af99cc0ddfa91900393ab3b3f09&language=en-US`)
    .then((ambilData)=>{
        this.setState({
            similar: ambilData.data.results
        })
        console.log(ambilData.data.results)
    })
    axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=dcf65af99cc0ddfa91900393ab3b3f09&language=en-US&page=1`)
    .then((ambilData)=>{
        this.setState({
            rekomendasi: ambilData.data.results
        })
        console.log(ambilData.data.results)
    })
  }

  componentDidMount(){
    var id = this.props.location.state.idproduk;
    var saldo = this.props.location.state.saldo;
    var status = this.props.location.state.status;
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=dcf65af99cc0ddfa91900393ab3b3f09&language=en-US`)
    .then((ambilData) => {
      this.setState({
        id: ambilData.data.id,
        saldo: saldo,
        status: status,
        judul: ambilData.data.original_title,
        rating: ambilData.data.vote_average,
        durasi: ambilData.data.runtime,
        synopsis: ambilData.data.overview,
        poster: ambilData.data.poster_path,
        harga: ambilData.data.vote_average,
      })
      console.log(saldo)
    })
  }

  similarDetails(idproduk){
      var id = idproduk;
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=dcf65af99cc0ddfa91900393ab3b3f09&language=en-US`)
    .then((ambilData) => {
      this.setState({
        id: ambilData.data.id,
        judul: ambilData.data.original_title,
        rating: ambilData.data.vote_average,
        durasi: ambilData.data.runtime,
        synopsis: ambilData.data.overview,
        poster: ambilData.data.poster_path,
        harga: ambilData.data.vote_average,
      })
    })
  }

  buy(){
    var calculate = this.state.saldo - this.state.harga;
    this.setState({
        status: 'Already Bought',
        saldo: calculate
    })
}
  

  render() {
    if(this.state.harga >=1 && this.state.harga <=3){
        this.setState({harga : 3500})
    }else if(this.state.harga >3 && this.state.harga <=6){
        this.setState({harga : 8250})
    }else if(this.state.harga >6 && this.state.harga <=8){
        this.setState({harga : 16350})
    }else if(this.state.harga >8 && this.state.harga <=10){
        this.setState({harga : 21250})
    }

    const similar = this.state.similar.map((item, index)=>{
        var idproduk = item.id;
        var judul = item.original_title;
        var slug = judul.replace(/\s+/g, '-');
        var poster = item.poster_path;
        
        return <div key={index} className="col-sm-12 col-md-6 col-lg-3" >
          <div class="item-image-wrapper">
          <Link onClick={()=>{this.similarDetails(idproduk)}} to={{ pathname:`/MovieDetails/${idproduk}-${slug}`, state: {idproduk: idproduk, slug: slug}}} className="product-box">
            <div class="single-items">
                <div class="iteminfo text-center">
                  <div>
                      <img src={'http://image.tmdb.org/t/p/w185/' + poster} style={{height: 200}} alt=""/>
                  </div>
                  <p style={{height: 50}}>{judul}</p>
                </div>
            </div>
          </Link>	
        </div>
      </div>
    })

    const recommendations = this.state.rekomendasi.map((item, index)=>{
        var idproduk = item.id;
        var judul = item.original_title;
        var slug = judul.replace(/\s+/g, '-');
        var poster = item.poster_path;

        return <div key={index} className="col-sm-12 col-md-6 col-lg-3" >
          <div class="item-image-wrapper">
          <Link onClick={()=>{this.similarDetails(idproduk)}} to={{ pathname:`/MovieDetails/${idproduk}-${slug}`, state: {idproduk: idproduk, slug: slug}}} className="product-box">
            <div class="single-items">
                <div class="iteminfo text-center">
                  <div>
                      <img src={'http://image.tmdb.org/t/p/w185/' + poster} style={{height: 200}} alt=""/>
                  </div>
                  <p style={{height: 50}}>{judul}</p>
                </div>
            </div>
          </Link>	
        </div>
      </div>
    })
    
    return (
      <div className="container"> 
      <h1>{this.state.status}</h1>
      <h4 className="float-right">Your Saldo:<br/>Rp. {this.state.saldo}</h4>           
        <div className="product-details">
            <div className="row">
            <aside className="col-sm-5 border-right">
                <article className="gallery-wrap"> 
                <div className="img-big-wrap">
                    <img src={'http://image.tmdb.org/t/p/w185' + this.state.poster} style={{marginTop: 100}} alt=""/>
                </div>
                </article>
            </aside>
            <aside className="col-sm-7">
                <article className="product-body p-5">
                <h3 className="title mb-3">{this.state.judul} <br/>(Rating :{this.state.rating})</h3>
                <dl className="item-property">
                    <dt>Synopsis:</dt>
                    <p>{this.state.synopsis}</p>
                </dl>
                <hr />
                <div className="text-center">
                    <dl className="param param-inline">
                        <dd>
                        <p className="price-detail-wrap"> 
                            <span className="price h3 cp"> 
                            <span className="currency">Rp. </span><span className="num">{this.state.harga}</span>
                            </span>  
                        </p>
                        </dd>
                    </dl>
                </div>
                <hr />
                <button onClick={() => {this.buy()}} className="btn btn-md btn-success"><span className="glyphicon glyphicon-usd" aria-hidden="true"></span> Buy now </button>&nbsp;
                </article>
            </aside>
            </div>
        </div> 
        <h2 className="section-heading">Similar Movies</h2>
        <div className="col-sm-6 col-md-8 col-lg-10" style={{marginLeft: 100}}>
            <div className="row" >
            {similar}
            </div>
        </div>
        <hr/>
        <h2 className="section-heading">Recommendations Movies</h2>
        <div className="col-sm-6 col-md-8 col-lg-10" style={{marginLeft: 100}}>
            <div className="row" >
            {recommendations}
            </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
