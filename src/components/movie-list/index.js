import React, { Component } from "react";
import "./index.css";

export default class MovieList extends Component {

state={
term:"",
movieList:[],
clicked:false
}

search=()=>{

 fetch('https://jsonmock.hackerrank.com/api/movies?Year='+this.state.term)
  .then(response => response.json())
  .then(data => this.setState({movieList:data.data,clicked:true}));


}

  render() {
    let showMessage;
    let showList;
    if(this.state.clicked){
      if(this.state.movieList.length ===0  )
      {
        showMessage= <div className="mt-50 slide-up-fade-in" data-testid="no-result">No Results Found</div>
        showList = <ul className="mt-50 styled" data-testid="movieList"></ul>
       }
       else{
                 const movieItem = this.state.movieList.map((movie)=>{
                                return  <li className="slide-up-fade-in py-10" key={movie.imdbID}>{movie.Title}</li>
                               });
                               showList = <ul className="mt-50 styled" data-testid="movieList">
                 {movieItem}
              </ul>
       }
    }
    else{
      showList = <ul className="mt-50 styled" data-testid="movieList"></ul>
    }
    
    
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input type="number" className="large" data-testid="app-input" value={this.state.term} onChange={(e)=>{this.setState({term:e.target.value})}}/>
          <button className="" data-testid="submit-button" onClick={this.search}>Search</button>
        </section>
           {showList}
           {showMessage}
      </div>
    );
  }
}
