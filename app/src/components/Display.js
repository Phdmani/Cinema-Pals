import React, { Component } from 'react';
import Wrapper from './Wrapper';
import Row from './Row';
import Col from './Col';
import Panel from './Panel';
import Search from './Preview';
import MovieDetail from './MovieDetail';
import API from '../utils/API';
import axios from 'axios';



class Display extends Component {
  state = {
    result: {},
    search: '',
    array:[]
  };


  searchMovies = query => {
    API.search(query)
      .then(res => this.setState({ result: res.data }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

 handleFormSubmit = event => {
    event.preventDefault();
    this.searchMovies(this.state.search);
  };

 componentDidMount(){
   axios
     .get('https://movieserver69.herokuapp.com/user-a-movies')
     .then(({ data })=> {
       this.setState(
         { array: data }
       );
     })
     .catch((err)=> {})
 }

  handleSubmit2= event => {
        event.preventDefault();
      const user = this.state.search;
      console.log(user)
          try {
           const response =  axios.post('https://movieserver69.herokuapp.com/user-add-movies', {user});
           console.log(response);
        } catch (err) {
        }


  };
  getID(clicked_id) {
      const id = clicked_id;
      if(window.confirm('Are you sure you want to remove this movie?' )){

      axios.post('https://movieserver69.herokuapp.com/remove-movie', {id});
      window.location.reload();



}

  };

  rateID(clicked_id) {
      const id = clicked_id;
      var rating = window.prompt('What would you like to rate this movie?' )

      axios.post('https://movieserver69.herokuapp.com/rate-movie', {id,rating});
      window.location.reload();





  };
  render() {


const handleClick = e => this.getID(e.target.id);
const handleClick2 = e => this.rateID(e.target.id);


    return (


this.state.array.map((movie)=>{

            return (

              <table >
              <tr>
              <td id={movie.id}><img src={movie.poster}/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td id={movie.id}>   {movie.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </td>
              <td id={movie.id}> {movie.Rating}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td id={movie.id}><button id={movie.id} onClick={handleClick}>Remove</button></td>
              <td id={movie.id}><button id={movie.id} onClick={handleClick2}>Rate</button></td>

              </tr>
              </table>
              ) 
          })
    );
  }
}

export default Display;
