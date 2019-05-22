import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom';
import OmdbContainer from './components/OmdbContainer';
import Display from './components/Display';
import axios from 'axios';
import GoogleMaps from "simple-react-google-maps";


const Apps = () => {
  return(<OmdbContainer />)
}


const Dpps = () => {
  return(<Display />)
}

class App extends Component {
  state = { userLocation: { lat: 32, lng: 32 }, loading: true };

  constructor(props) {
    super(props);
    this.state = {
      showMe:false,
      show:true,

      value: '',
          array:[],


      data:[],
      search:'',
      uarray:[],
      logged:false,
      markers: { lat: 32, lng: 32 }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});

  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit(event) {
        this.setState({
      showMe:!this.state.showMe
    })
    event.preventDefault();
  }

    handleSubmit2= event => {
      event.preventDefault();
      const user = this.state.search;
      console.log(user)
      axios.post('https://movieserver69.herokuapp.com/usersearch', {user})
     .then((response) => {
       console.log(response);
       this.setState({uarray: response.data})
     })
    .catch((error)=>{
       console.log(error);
    });
            console.dir(this.state.uarray);

};

  operation(){
    this.setState({
      showMe:!this.state.showMe
    })
  }
  logout(){
    this.setState({
      logged:false
    })
  }
  operation2(){
    navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;

    this.setState({
      logged:true
    })
      axios.post('https://movieserver69.herokuapp.com/userlocal',{latitude, longitude});
      this.setState({
        userLocation: { lat: latitude, lng: longitude },
        loading: false
      });
    },
    () => {
      this.setState({ loading: false });
    }
  );
  }

  componentDidMount() {
    // when component mounted, start a GET request
    // to specified URL


   axios
     .get('https://movieserver69.herokuapp.com/getusers')
     .then(({ data })=> {
       this.setState(
         { array: data}
       );
     })
     .catch((err)=> {})
     console.log(this.state.array)



     navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;

 //getting markers   axios.post('/getlocal',{latitude, longitude});



      this.setState({
        userLocation: { lat: latitude, lng: longitude },
        loading: false
      });
    },
    () => {
      this.setState({ loading: false });
    }
  );

  }
    onClick() {
  window.location.reload();


}


delete(id){
  console.log(id);
}


  onClick2() {
    this.setState({showMe: !this.state.showMe});
     console.log(this.state.array)
  }

  addFriend(clicked_id) {
      const id = clicked_id;
      if(window.confirm('Are you sure you want to remove this movie?' )){
      console.log(id);
      axios.post('https://movieserver69.herokuapp.com/addfriend', {id});
      window.location.reload();



}

  };


  render() {
    const { loading, userLocation } = this.state;
const handleClick = e => this.addFriend(e.target.id);

    if (loading) {
      return null;
    }

    return (

      <Router>
         <div className="App">
{/*This is the code for the Homepage page----------------------------------------*/}

         <Route path="/" exact render={
          ()=> {
            return ( <div className="App">
<style dangerouslySetInnerHTML={{__html: "\ninput[type=text], input[type=password] {\n   padding: 10px;\n  margin: 5px 0 7px 0;\n  display: inline-block;\n  border: none;\n  background: #f1f1f1;\n}\nform {\n  text-align: center;\n\n" }} />


  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
  <title>CSE 442 Homepage</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" />
  {/* https://fonts.google.com/specimen/Open+Sans */}
  <link rel="stylesheet" href="css/all.min.css" />
  {/* https://fontawesome.com/ */}
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  {/* https://getbootstrap.com/ */}
  <link rel="stylesheet" href="css/tooplate-style.css" />
  {/*
Tooplate 2111 Pro Line
http://www.tooplate.com/view/2111-pro-line
*/}
  {/* page header */}
  <div className="container" id="home">
    <div className="col-12 text-center">
      <div className="tm-page-header">
        <i className="fas fa-4x fa-chart-bar mr-4" />
        <h1 className="d-inline-block text-uppercase">442 Project</h1>
      </div>
    </div>
  </div>
  {/* navbar */}

  <div className="tm-nav-section">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-md navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#tmMainNav" aria-controls="tmMainNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <ul className="navbar-nav mx-auto tm-navbar-nav">
              <li className="nav-item active">
         <Link to ="/">Home</Link>
              </li>

             <li className="nav-item active">
         <Link to ="/register">Register</Link>
              </li>

              <li className="nav-item">
         <Link to ="/movies">Movie Search</Link>
              </li>
              </ul>
          </nav></div>
      </div>

    </div>
  {
    this.state.show?
  
<div>
    <form method ="POST" className="modal-content animate" action="https://movieserver69.herokuapp.com/user-login" onSubmit={this.operation2}>

                    <div className="container">

                      <label  >Username: </label>
                      <input type="text" placeholder="Enter Username" name="username" value={this.state.value} onChange={this.handleChange} required />
                      <label id="loginl" >Password: </label>
                      <input type="password" placeholder="Enter Password" name="password" required />
                      <button type="submit" >Login</button>
                      </div>
                  </form>
</div>
:null
}
  </div>

  {/* Features */}
  <div className="container tm-features-section" id="features">
    <div className="row tm-features-row">
      <section className="col-md-6 col-sm-12 tm-feature-block">
        <header className="tm-feature-header">
          <i className="fas fa-5x fa-anchor tm-feature-icon" />
          <h3 className="tm-feature-h">Welcome to our 442 project website</h3>
        </header>
        <p>
          This website (name still undetermined) aims to connect you with users 
          who are in your area and have similar taste in movies. 
        </p>
        <p>
          By registering an account, you can jump in, build a profile, and get
          matched with local movie fans most compatible to yourself!
        </p>
      </section>
      <section className="col-md-6 col-sm-12 tm-feature-block">
        <header className="tm-feature-header">
          <i className="fas fa-5x fa-atom tm-feature-icon" />
          <h3 className="tm-feature-h">Location based matchmaking</h3>
        </header>
        <p>
          We take your movie profile and match you with people locally
          who have similar tastes. Plan a movie night get-together with
          someone who is sure to enjoy whatever you end up watching.
        </p>
      </section>
    </div>
  </div>
  <GoogleMaps
  apiKey={"AIzaSyAWmQzJAop53VfKwhN3kAhubqZIUjBS64A"}
  style={{height: "400px", width: "100%"}}
  zoom={12}
  center={userLocation}
  markers={userLocation} //optional

/>






  <div id="googleMap" style={{width: '100%', height: '400px'}} />
  {/* Contact */}
  <section className="container tm-contact-section" id="contact">
    <div className="row">
      <div className="col-xl-5 col-lg-6 col-md-12 tm-contact-left">
        <div className="tm-contact-form-container ml-auto mr-0">


        </div>
      </div>
      <div className="col-xl-7 col-lg-6 col-md-12 tm-contact-right">
      </div>
    </div>
  </section>
  <footer className="container tm-footer">
    <div className="row tm-footer-row">
      <p className="col-md-10 col-sm-12 mb-0">
        442 Project 2019 SP
      </p>
      <div className="col-md-2 col-sm-12 scrolltop">
        <div className="scroll icon"><i className="fa fa-4x fa-angle-up" /></div>
      </div>
    </div>
  </footer>
  {/* Single Page Nav plugin works with this version of jQuery */}
</div>
);
          }
         }/>


{/*This is begining of the code for the register page----------------------------------------*/}


        <Route path="/register" exact render={
          ()=> {
            return (<div>
  <style dangerouslySetInnerHTML={{__html: "\ninput[type=text], input[type=password]{\n  width: 100%;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n}\nbutton {\n  background-color: #24bf3e;\n  color: white;\n  padding: 14px 20px;\n  margin: 8px 0;\n  border: 1px solid #ccc;\n  cursor: pointer;\n  align-self: center;\n}\nbutton:hover  {\n  opacity: 0.7;\n}\n.cancelbutton {\n  width: auto;\n  padding: 10px 18px;\n  background-color: red;\n}\n.imgcontainer {\n  text-align: center;\n  margin: 20px 0 10px 0;\n  position: relative;\n}\nimg.avatar {\n  width: 10%;\n  border-radius: 50%;\n}\n.container {\n  padding: 10px;\n}\nspan.psw {\n  float: right;\n  padding-top: 10px;\n}\n@media screen and (max-width: 300px) {\n  span.psw {\n    display: block;\n    float: none;\n  }\n  .cancelbutton {\n    width: 100%;\n  }\n}\n" }} />
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
  <title>CSE 442 Homepage</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" />
  {/* https://fonts.google.com/specimen/Open+Sans */}
  <link rel="stylesheet" href="css/all.min.css" />
  {/* https://fontawesome.com/ */}
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  {/* https://getbootstrap.com/ */}
  <link rel="stylesheet" href="css/tooplate-style.css" />
  {/*
Tooplate 2111 Pro Line
http://www.tooplate.com/view/2111-pro-line
*/}
  {/* page header */}

  <div className="container" id="home">
    <div className="col-12 text-center">
      <div className="tm-page-header">
        <i className="fas fa-4x fa-chart-bar mr-4" />
        <h1 className="d-inline-block text-uppercase">442 Project</h1>
      </div>
    </div>
  </div>
  {/* navbar */}

  <div className="tm-nav-section">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-md navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#tmMainNav" aria-controls="tmMainNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <ul className="navbar-nav mx-auto tm-navbar-nav">
              <li className="nav-item active">
              <Link to ="/">Home</Link>
              </li>
              <li className="nav-item">
              <Link to ="/movies">Movies</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>


  </div>
<div>
    <form method ="POST" className="modal-content animate" action="https://movieserver69.herokuapp.com/register" >

                    <div className="container">
                    <h6>register</h6>
                    <h1>Register Account</h1>

                      <label  >Username: </label>
                      <input type="text" placeholder="Enter Username" name="username" value={this.state.value} onChange={this.handleChange} required />
                      <label id="loginl" >Password: </label>
                      <input type="password" placeholder="Enter Password" name="password" required />
                      <button type="submit" >Register</button>
                      </div>
                  </form>
</div>
</div>

);
          }

         }/>
{/*This is end of the code for the register page----------------------------------------*/}


{/*This is begining of the code for the movie search page----------------------------------------*/}


        <Route path="/movies" exact render={
          ()=> {
            return (<div>
  <style dangerouslySetInnerHTML={{__html: "\ninput[type=text], input[type=password]{\n  width: 100%;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n}\nbutton {\n  background-color: #24bf3e;\n  color: white;\n  padding: 14px 20px;\n  margin: 8px 0;\n  border: 1px solid #ccc;\n  cursor: pointer;\n  align-self: center;\n}\nbutton:hover  {\n  opacity: 0.7;\n}\n.cancelbutton {\n  width: auto;\n  padding: 10px 18px;\n  background-color: red;\n}\n.imgcontainer {\n  text-align: center;\n  margin: 20px 0 10px 0;\n  position: relative;\n}\nimg.avatar {\n  width: 10%;\n  border-radius: 50%;\n}\n.container {\n  padding: 10px;\n}\nspan.psw {\n  float: right;\n  padding-top: 10px;\n}\n@media screen and (max-width: 300px) {\n  span.psw {\n    display: block;\n    float: none;\n  }\n  .cancelbutton {\n    width: 100%;\n  }\n}\n" }} />
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
  <title>CSE 442 Homepage</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" />
  {/* https://fonts.google.com/specimen/Open+Sans */}
  <link rel="stylesheet" href="css/all.min.css" />
  {/* https://fontawesome.com/ */}
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  {/* https://getbootstrap.com/ */}
  <link rel="stylesheet" href="css/tooplate-style.css" />
  {/*
Tooplate 2111 Pro Line
http://www.tooplate.com/view/2111-pro-line
*/}
  {/* page header */}

  <div className="container" id="home">
    <div className="col-12 text-center">
      <div className="tm-page-header">
        <i className="fas fa-4x fa-chart-bar mr-4" />
        <h1 className="d-inline-block text-uppercase">442 Project</h1>
      </div>
    </div>
  </div>
  {/* navbar */}

  <div className="tm-nav-section">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-md navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#tmMainNav" aria-controls="tmMainNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <ul className="navbar-nav mx-auto tm-navbar-nav">
              <li className="nav-item active">
              <Link to ="/">Home</Link>
              </li>
              <li className="nav-item">
              <Link to ="/movies">Movies</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>


  </div>
  <h1>Movie Search</h1>
  <Apps/>

</div>

);
          }

         }/>
{/*This is end of the code for the movie search page----------------------------------------*/}

{/*This is begining the code for the movie add page----------------------------------------*/}


        <Route path="/moviesadd" exact render={
          ()=> {
                         if (this.state.logged) {
    return <Redirect to={{
      pathname: '/',
    }} />;
                  }
            return (<div>
  <style dangerouslySetInnerHTML={{__html: "\ninput[type=text], input[type=password]{\n  width: 100%;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n}\nbutton {\n  background-color: #24bf3e;\n  color: white;\n  padding: 14px 20px;\n  margin: 8px 0;\n  border: 1px solid #ccc;\n  cursor: pointer;\n  align-self: center;\n}\nbutton:hover  {\n  opacity: 0.7;\n}\n.cancelbutton {\n  width: auto;\n  padding: 10px 18px;\n  background-color: red;\n}\n.imgcontainer {\n  text-align: center;\n  margin: 20px 0 10px 0;\n  position: relative;\n}\nimg.avatar {\n  width: 10%;\n  border-radius: 50%;\n}\n.container {\n  padding: 10px;\n}\nspan.psw {\n  float: right;\n  padding-top: 10px;\n}\n@media screen and (max-width: 300px) {\n  span.psw {\n    display: block;\n    float: none;\n  }\n  .cancelbutton {\n    width: 100%;\n  }\n}\n" }} />
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
  <title>CSE 442 Homepage</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" />
  {/* https://fonts.google.com/specimen/Open+Sans */}
  <link rel="stylesheet" href="css/all.min.css" />
  {/* https://fontawesome.com/ */}
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  {/* https://getbootstrap.com/ */}
  <link rel="stylesheet" href="css/tooplate-style.css" />
  {/*
Tooplate 2111 Pro Line
http://www.tooplate.com/view/2111-pro-line
*/}
  {/* page header */}

  <div className="container" id="home">
    <div className="col-12 text-center">
      <div className="tm-page-header">
        <i className="fas fa-4x fa-chart-bar mr-4" />
        <h1 className="d-inline-block text-uppercase">442 Project</h1>
      </div>
    </div>
  </div>
  {/* navbar */}

  <div className="tm-nav-section">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-md navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#tmMainNav" aria-controls="tmMainNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <ul className="navbar-nav mx-auto tm-navbar-nav">
              <li className="nav-item active">
              <Link to ="/home">Home</Link>
              </li>
              <li className="nav-item active">
              <Link to ="/profile" onClick={this.onClick}>Profile</Link>
              </li>
              <li className="nav-item">
              <Link to ="/moviesadd">Movies</Link>
              </li>
              <li className="nav-item">
              <Link to ="/friends" >Friends</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>


  </div>
  <h5>Movie Search</h5>
  <h1>Movie Search</h1>
  <Apps/>

</div>

);
          }

         }/>
{/*This is end of the code for the movie add page----------------------------------------*/}
{/*This is begining the code for the friend page----------------------------------------*/}


        <Route path="/friends" exact render={
          ()=> {
                      if (this.state.logged) {
    return <Redirect to={{
      pathname: '/',
    }} />;
                  }
            return (<div>
  <style dangerouslySetInnerHTML={{__html: "\ninput[type=text], input[type=password]{\n  width: 100%;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n}\nbutton {\n  background-color: #24bf3e;\n  color: white;\n  padding: 14px 20px;\n  margin: 8px 0;\n  border: 1px solid #ccc;\n  cursor: pointer;\n  align-self: center;\n}\nbutton:hover  {\n  opacity: 0.7;\n}\n.cancelbutton {\n  width: auto;\n  padding: 10px 18px;\n  background-color: red;\n}\n.imgcontainer {\n  text-align: center;\n  margin: 20px 0 10px 0;\n  position: relative;\n}\nimg.avatar {\n  width: 10%;\n  border-radius: 50%;\n}\n.container {\n  padding: 10px;\n}\nspan.psw {\n  float: right;\n  padding-top: 10px;\n}\n@media screen and (max-width: 300px) {\n  span.psw {\n    display: block;\n    float: none;\n  }\n  .cancelbutton {\n    width: 100%;\n  }\n}\n" }} />
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
  <title>CSE 442 Homepage</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" />
  {/* https://fonts.google.com/specimen/Open+Sans */}
  <link rel="stylesheet" href="css/all.min.css" />
  {/* https://fontawesome.com/ */}
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  {/* https://getbootstrap.com/ */}
  <link rel="stylesheet" href="css/tooplate-style.css" />
  {/*
Tooplate 2111 Pro Line
http://www.tooplate.com/view/2111-pro-line
*/}
  {/* page header */}

  <div className="container" id="home">
    <div className="col-12 text-center">
      <div className="tm-page-header">
        <i className="fas fa-4x fa-chart-bar mr-4" />
        <h1 className="d-inline-block text-uppercase">442 Project</h1>
      </div>
    </div>
  </div>
  {/* navbar */}

  <div className="tm-nav-section">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-md navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#tmMainNav" aria-controls="tmMainNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <ul className="navbar-nav mx-auto tm-navbar-nav">
              <li className="nav-item active">
              <Link to ="/home">Home</Link>
              </li>
              <li className="nav-item active">
              <Link to ="/profile" onClick={this.onClick}>Profile</Link>
              </li>
              <li className="nav-item">
              <Link to ="/moviesadd">Movies</Link>
              </li>
              <li className="nav-item">
              <Link to ="/friends" >Friends</Link>
              </li>

            </ul>
          </nav>
        </div>
      </div>
    </div>


  </div>
  <h5>Movie Search</h5>

 <div>
           <h1>Your Friends:</h1>

        {
          this.state.array.map((user, index)=>{
                                return (
                                  <div>
                                    <h1>{user.friend}</h1>
                                    </div>
                                  )
                            })
        }
        </div>
  
<div>
    <form method ="POST" className="modal-content animate"  >

                    <div className="container">

                      <label  >Search For Friends </label>
                      <input type="text" placeholder="Search for User"         name="search" value={this.state.search} onChange={this.handleInputChange} required />
                      <button onClick={this.handleSubmit2} type="submit" >Search</button>
                      </div>
                  </form>
</div>
       <div>
        {

          this.state.uarray.map((user, index)=>{
                                return (
                                  <div>
                                    <h1>{user.username}</h1>
                                    <button key = {index} id={user.username} onClick={handleClick}>Add Friend</button>
                                    </div>
                                  )
                            })
        }
        </div>
</div>

);
          }

         }/>
{/*This is end of the code for the friends page----------------------------------------*/}

{/*This is begining of the code for the user profile page----------------------------------------*/}


        <Route path="/profile" exact render={
          ()=> {
                      if (this.state.logged) {
    return <Redirect to={{
      pathname: '/',
    }} />;
                  }

            return (<div>
  <style dangerouslySetInnerHTML={{__html: "\ninput[type=text], input[type=password]{\n  width: 100%;\n  padding: 12px 20px;\n  margin: 8px 0;\n  display: inline-block;\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n}\nbutton {\n  background-color: #24bf3e;\n  color: white;\n  padding: 14px 20px;\n  margin: 8px 0;\n  border: 1px solid #ccc;\n  cursor: pointer;\n  align-self: center;\n}\nbutton:hover  {\n  opacity: 0.7;\n}\n.cancelbutton {\n  width: auto;\n  padding: 10px 18px;\n  background-color: red;\n}\n.imgcontainer {\n  text-align: center;\n  margin: 20px 0 10px 0;\n  position: relative;\n}\nimg.avatar {\n  width: 10%;\n  border-radius: 50%;\n}\n.container {\n  padding: 10px;\n}\nspan.psw {\n  float: right;\n  padding-top: 10px;\n}\n@media screen and (max-width: 300px) {\n  span.psw {\n    display: block;\n    float: none;\n  }\n  .cancelbutton {\n    width: 100%;\n  }\n}\n" }} />
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
  <title>CSE 442 Homepage</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" />
  {/* https://fonts.google.com/specimen/Open+Sans */}
  <link rel="stylesheet" href="css/all.min.css" />
  {/* https://fontawesome.com/ */}
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  {/* https://getbootstrap.com/ */}
  <link rel="stylesheet" href="css/tooplate-style.css" />
  {/*
Tooplate 2111 Pro Line
http://www.tooplate.com/view/2111-pro-line
*/}
  {/* page header */}

  <div className="container" id="home">
    <div className="col-12 text-center">
      <div className="tm-page-header">
        <i className="fas fa-4x fa-chart-bar mr-4" />
        <h1 className="d-inline-block text-uppercase">442 Project</h1>
      </div>
    </div>
  </div>
  {/* navbar */}

  <div className="tm-nav-section">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-md navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#tmMainNav" aria-controls="tmMainNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <ul className="navbar-nav mx-auto tm-navbar-nav">
              <li className="nav-item active">
              <Link to ="/home">Home</Link>
              </li>
              <li className="nav-item active">
              <Link to ="/profile" onClick={this.onClick}>Profile</Link>
              </li>
              <li className="nav-item">
              <Link to ="/moviesadd">Movies</Link>
              </li>
              <li className="nav-item">
              <Link to ="/friends" >Friends</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>


  </div>
  <h3>Movie Search</h3>

  <center> Your Profile</center>

{/*        <div>
        {

          this.state.data.map(function(movie){
            return (
              <table ><tr><th>Movie title</th><th>Rating</th></tr>
              <tr>
              <td id={movie.id}> {movie.title}</td>
              <td id={movie.id}> {movie.Rating}</td>
              </tr>
              </table>
              ) 
          })

        }
        </div>*/}
      <div>
        <div onClick={() => this.onClick2()}>
         Click View Your Movies
        </div>
        {
          this.state.showMe
            ?  <Dpps/>
            : null
        }
      </div>               

</div>


);
          }

         }/>


{/*This is user of the code for the user profile page----------------------------------------*/}


{/*This is begining of the code for the user homepage ---------------------------------------*/}

                 <Route path="/home" exact render={
          ()=> {
                      if (this.state.logged) {
    return <Redirect to={{
      pathname: '/',
    }} />;
                  }
            return (<div className="App">
<style dangerouslySetInnerHTML={{__html: "\ninput[type=text], input[type=password] {\n   padding: 10px;\n  margin: 5px 0 7px 0;\n  display: inline-block;\n  border: none;\n  background: #f1f1f1;\n}\nform {\n  text-align: center;\n\n" }} />


  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
  <title>CSE 442 Homepage</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" />
  {/* https://fonts.google.com/specimen/Open+Sans */}
  <link rel="stylesheet" href="css/all.min.css" />
  {/* https://fontawesome.com/ */}
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  {/* https://getbootstrap.com/ */}
  <link rel="stylesheet" href="css/tooplate-style.css" />
  {/*
Tooplate 2111 Pro Line
http://www.tooplate.com/view/2111-pro-line
*/}
  {/* page header */}
               < form method ='POST' action="https://movieserver69.herokuapp.com/user-logout" onSubmit={this.logout}>
            <button type="submit">Logout</button>

          </form>
  <div className="container" id="home">
    <div className="col-12 text-center">
      <div className="tm-page-header">
        <i className="fas fa-4x fa-chart-bar mr-4" />
        <h1 className="d-inline-block text-uppercase">442 Project</h1>
      </div>
    </div>
  </div>
  {/* navbar */}

  <div className="tm-nav-section">
    <div className="container">
      <div className="row">
        <div className="col-12">

          <nav className="navbar navbar-expand-md navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#tmMainNav" aria-controls="tmMainNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <ul className="navbar-nav mx-auto tm-navbar-nav">
              <li className="nav-item active">
         <Link to ="/home">Home</Link>
              </li>
              <li className="nav-item">
         <Link to ="/profile" onClick={this.onClick}>Profile</Link>
              </li>
              <li className="nav-item">
         <Link to ="/moviesadd">Movies</Link>
              </li>
               <li className="nav-item">
              <Link to ="/friends" >Friends</Link>

              </li>
              </ul>
          </nav></div>
      </div>

    </div>

  </div>
  <div>
      <GoogleMaps
  apiKey={"AIzaSyAWmQzJAop53VfKwhN3kAhubqZIUjBS64A"}
  style={{height: "400px", width: "100%"}}
  zoom={12}
  center={userLocation}
  markers={userLocation} //optional


/>
</div>
  {/* Features */}
  <div className="container tm-features-section" id="features">

    <div className="row tm-features-row">
      <section className="col-md-6 col-sm-12 tm-feature-block">
        <header className="tm-feature-header">
          <i className="fas fa-5x fa-anchor tm-feature-icon" />
          <h3 className="tm-feature-h">Welcome to our 442 project website</h3>
        </header>
        <p>
          This website (name still undetermined) aims to connect you with users 
          who are in your area and have similar taste in movies. 
        </p>
        <p>
          By registering an account, you can jump in, build a profile, and get
          matched with local movie fans most compatible to yourself!
        </p>
      </section>
      <section className="col-md-6 col-sm-12 tm-feature-block">
        <header className="tm-feature-header">
          <i className="fas fa-5x fa-atom tm-feature-icon" />
          <h3 className="tm-feature-h">Location based matchmaking</h3>
        </header>
        <p>
          We take your movie profile and match you with people locally
          who have similar tastes. Plan a movie night get-together with
          someone who is sure to enjoy whatever you end up watching.
        </p>
      </section>
    </div>
  </div>


  <div id="googleMap" style={{width: '100%', height: '400px'}} />
  {/* Contact */}
  <section className="container tm-contact-section" id="contact">
    <div className="row">
      <div className="col-xl-5 col-lg-6 col-md-12 tm-contact-left">
        <div className="tm-contact-form-container ml-auto mr-0">


        </div>
      </div>
      <div className="col-xl-7 col-lg-6 col-md-12 tm-contact-right">
      </div>
    </div>
  </section>
  <footer className="container tm-footer">
    <div className="row tm-footer-row">
      <p className="col-md-10 col-sm-12 mb-0">
        442 Project 2019 SP
      </p>
      <div className="col-md-2 col-sm-12 scrolltop">
        <div className="scroll icon"><i className="fa fa-4x fa-angle-up" /></div>
      </div>
    </div>
  </footer>
  {/* Single Page Nav plugin works with this version of jQuery */}
</div>
);
          }
         }/>
{/*This is begining of the code for the user homepage ---------------------------------------*/}

         </div>
         </Router>

    );
  }
}

export default App;
