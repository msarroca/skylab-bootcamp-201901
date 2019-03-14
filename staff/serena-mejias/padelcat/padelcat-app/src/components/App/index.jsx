import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

import logic from "../../logic";
import { Home } from "../Home";
import Login from "../Login";
import RegisterPlayer from "../RegisterPlayer";
import Ranking from "../Ranking";
import { Header } from "../Header/Header";
import Grid from "@material-ui/core/Grid";
import { log } from "util";

import { Form, Field } from "react-final-form";
import ChosenPairs from '../ChosenPairs'

class App extends Component {
  state = {
    player: null
  };
  handleLogin = (email, password) => {
    try {
      logic
        .loginPlayer(email, password)
        .then(response => {
          console.log(response);
          
          this.setState({ player: response.player });
          logic.storeToken(response.token);
          this.props.history.push("/home");
        })
        .catch(error => {
          throw Error(error);
        });
    } catch (error) {
      throw Error(error);
    }
  };

  handleRegister = (
    name,
    surname,
    email,
    password,
    passwordConfirm,
    preferedPosition,
    link
  ) => {
    try {
      logic
        .registerPlayer(
          name,
          surname,
          email,
          password,
          passwordConfirm,
          preferedPosition,
          link
        )
        .then(() => this.props.history.push("/login"))
        .catch(error => {
          throw Error(error);
        });
    } catch (error) {
      throw Error(error);
    }
  };

  handleSetAvailable = matchId => {
    logic.addAvalabilityPlayer(this.state.player._id, matchId);
  };

  handleSetUnavailable = matchId => {
    logic.deleteAvalabilityPlayer(this.state.player._id, matchId);
  };

  componentDidMount(){
    if (!logic.getStoredtoken()) {
      this.props.history.push("/login");
    } else {
      // retrieve player info using token 
      // and set it in the state
      // this.setState({ player: response.player });
      console.log(logic.getStoredtoken());
    }
  }


  render() {
    const {
      handleLogin,
      handleRegister,
      handleSetAvailable,
      handleSetUnavailable
    } = this;

    return (
      <main>
        <Header />
        <Grid container justify="center" spacing={24}>
          <Route
            path="/register"
            render={() => <RegisterPlayer onRegister={handleRegister} />}
          />
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <Route
            path="/home"
            render={() => ( logic.isPlayerLoggedIn()?            
                <Home
                handleSetAvailable={handleSetAvailable}
                handleSetUnavailable={handleSetUnavailable}
                playerlogged={this.state.player}
            /> : <Redirect to={{ pathname: "/login" }} />)}
          />
          <Route
            exact
            path="/"
            render={() => <Redirect to={{ pathname: "/home" }} />}
          />
          <Route path="/players" component={Ranking} />
        </Grid>
      </main>
    );
  }
}
export default withRouter(App);
