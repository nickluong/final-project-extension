/* global chrome */
import React, { Component } from "react";
import "./App.css";
import WarpCable from "warp-cable-client";

const API_DOMAIN = "ws://localhost:3004/cable";
let api = WarpCable(API_DOMAIN);

class App extends Component {
  state = { connect: false, username: "", ready: false };
  componentDidMount() {
    console.log("subscribing");
    api.subscribe("Sessions", "check", {}, condition => {
      console.log("checking", condition);
      if (condition) this.startVideo();
    });
  }
  handleReadyUp = () => {
    // api.trigger("Sessions", "create", {});
  };

  handleCheck = () => {
    api.trigger("Sessions", "check", {});
    api.subscribe("Sessions", "check", {}, condition => {
      console.log(JSON.stringify(condition));
      if (JSON.stringify(condition)) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(
          tabs
        ) {
          chrome.tabs.executeScript(tabs[0].id, {
            code: `
             function sleep(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));
            };
              if(document.getElementsByClassName('touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPlay')[0]){
                sleep(3000)
                document.getElementsByClassName('touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPlay')[0].click();
              }
               else if(document.getElementsByClassName("touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPause")[0]){
               document.getElementsByClassName("touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPause")[0].click();
               }`
          });
        });
      }
    });
  };

  startVideo = () => {
    console.log("STARTING");
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {
        code: `
             function sleep(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));
            };
              if(document.getElementsByClassName('touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPlay')[0]){
                sleep(3000)
                document.getElementsByClassName('touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPlay')[0].click();
              }
               else if(document.getElementsByClassName("touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPause")[0]){
               document.getElementsByClassName("touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPause")[0].click();
               }`
      });
    });
  };

  handlePlay = () => {
    api.trigger("Sessions", "play", {});
    //api.subscribe("Sessions", "check", {}, condition => {
    //if (JSON.stringify(condition)) {
    console.log("this far");
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {
        code: `
             function sleep(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));
            };
              if(document.getElementsByClassName('touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPlay')[0]){
                sleep(3000)
                document.getElementsByClassName('touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPlay')[0].click();
              }
               else if(document.getElementsByClassName("touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPause")[0]){
               document.getElementsByClassName("touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPause")[0].click();
               }`
      });
    });
    //}
    //});
  };

  handleReady = () => {
    api.trigger("UserSessions", "ready", {
      username: this.state.username
    });
    api.subscribe("UserSessions", "ready", {}, condition => {
      console.log(JSON.stringify(condition));
      this.setState({ ready: JSON.stringify(condition) });
    });
  };

  handleOne = () => {
    api.trigger("UserSessions", "set_ready", {
      username: "obiwan"
    });
    api.subscribe("UserSessions", "user_one", {}, condition => {
      console.log(JSON.stringify(condition));
    });
  };

  handleTwo = () => {
    api.trigger("UserSessions", "set_ready", {
      username: "anakin"
    });
    api.subscribe("UserSessions", "user_two", {}, condition => {
      console.log(JSON.stringify(condition));
    });
  };

  handleGet = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: `chrome.storage.sync.get({ username: result }, (result) {
            console.log(result);
            return result;
          });`
        },
        result => {
          // if (result !== undefined)
          //   this.setState({ connect: true, username: result });
          // else
          console.log(result);
        }
      );
    });
  };

  handleTest = () => {
    // const setState = this.setState;
    // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    //   chrome.tabs.executeScript(tabs[0].id, {
    //     //   code: `if(document.getElementsByClassName('touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPlay')[0])document.getElementsByClassName('touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPlay')[0].click();
    //     //  else document.getElementsByClassName("touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPause")[0].click();`
    //     code: `
    //     if(localStorage.username){
    //       chrome.storage.local.set({username: localStorage.username}, function() {
    //         console.log('Value is set to ' + localStorage.username);
    //       });
    //     }`
    //   });
    // });
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: `localStorage['username']`
        },
        result => {
          this.setState({ connect: true, username: result });
          api.trigger("UserSessions", "set_user", { username: result });
          chrome.storage.sync.set({ username: result }, function() {
            console.log("Username is set to " + result);
          });
        }
      );
    });
  };

  // let startButton = document.get
  // startButton.onclick = function(element) {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  //     chrome.tabs.executeScript(tabs[0].id, {
  //       //   code: `if(document.getElementsByClassName('touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPlay')[0])document.getElementsByClassName('touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPlay')[0].click();
  //       //  else document.getElementsByClassName("touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPause")[0].click();`
  //       code: ` debugger
  //       api.trigger('Users', 'create', { username: 'yoda', password:'dolphin3' })
  //      `
  //     });
  //   });
  // };

  render() {
    return (
      <div className="App">
        {!this.state.connect ? (
          <div>
            {" "}
            <button onClick={this.handleOne}> User One </button>
            <button onClick={this.handleTwo}> User Two </button>
            <button onClick={this.handleGet}> Get </button>
            <button onClick={this.handlePlay}> Play / Pause </button>
            <button id="test" onClick={this.handleTest}>
              Connect
            </button>{" "}
          </div>
        ) : (
          <div>
            {this.state.username !== "" ? (
              <div>
                <h1>
                  {this.state.username}{" "}
                  {this.state.ready ? <h2>: Ready</h2> : <h2>: Not Ready</h2>}
                </h1>
                <button onClick={this.handleReadyUp}>Ready Up</button>
                <button onClick={this.handleCheck}>Check</button>
                <button onClick={this.handleReady}>Ready</button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default App;
