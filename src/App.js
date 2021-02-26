import React, { Component } from "react";
//import loader spinner image
import loader from "./images/loader.svg";
import clearButton from "./images/close-icon.svg";
import Gif from "./Gif";

const randomChoice = (arr) => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

const Header = ({ clearSearch, hasResults }) => (
  <div className="header grid">
    {hasResults ? (
      <img src={clearButton} />
    ) : (
      <h1 className="title"> It's Gif, not Gif.</h1>
    )}
  </div>
);

const UserHint = ({ loading, hintText }) => (
  <div className="user-hint">
    {/* check whether or not we have a loading state and render out either
    our spinner or hintText based on that, using a ternary opperator
    (if/else) */}
    {loading ? <img src={loader} className="block mx-auto" /> : hintText}
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchTerm: "",
      hintText: "Hit enter to search",
      //an array of gifs
      gifs: [],
    };
  }

  // we want a function that searches a giphy api using fetch
  // and outs the search term into the query url and then we
  // can do something with the results

  //we can also write async methods into our components
  // that let us use the async/await style of function
  searchGiphy = async (searchTerm) => {
    //first try fetch
    this.setState({
      //set loading state to true and this will show the spinner at the bottom
      loading: true,
    });
    try {
      //here we use the await key word to wait for the response to come back
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=oJxZOCRax4aBQUGfQ6FVhGg15TdIHpkI&q=${searchTerm}&limit=25&offset=0&rating=pg-13&lang=en`
      );
      // we convert the raw response into json data
      // const {data} gets the .data part of the response
      const { data } = await response.json();

      //here check if array of results is empty, if it is,
      //we throw an error which will stop the code and handle it
      //in the catch area
      if (!data.length) {
        throw `Nothing found for ${searchTerm}`;
      }

      //here we grab the random result from our images
      const randomGif = randomChoice(data);

      console.log({ randomGif });
      console.log(data);

      this.setState((prevState, props) => ({
        ...prevState,
        //use spread to show previous gifs and then add new gif on the end
        gifs: [...prevState.gifs, randomGif],
        //turn off loading spinner again
        loading: false,
        hintText: `Hit enter to search for more ${searchTerm}`,
      }));

      //if our fetch fails, we catch it here
    } catch (error) {
      this.setState((prevState, props) => ({
        ...prevState,
        hintText: error,
        loading: false,
      }));
      console.log(error);
    }
  };

  // with create react app, we can write our methods as arrow
  // functions, meaning we dont need a constructor and bind
  handleChange = (event) => {
    const { value } = event.target;

    this.setState((prevState, props) => ({
      // we take our old props and spread them out
      ...prevState,
      //here then we overwrite the ones we want after
      searchTerm: value,
      // set the hintText only when we have 2 or more characters
      // in our input, otherwise we make it an empty string
      hintText: value.length > 2 ? `Hit enter to search ${value}` : "",
    }));
  };

  handleKeyPress = (event) => {
    const { value } = event.target;
    // when we have two or more characters in our search box and we have
    // also pressed enter, we then wants to run a search
    if (value.length > 2 && event.key === "Enter") {
      //here we call our searchGiphy function using the search term
      this.searchGiphy(value);
    }
  };

  //Here we are resetting our state by clearing everything out
  //and making it default again

  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: "",
      hintText: "",
      gifs: [],
    }));
  };

  render() {
    const { searchTerm, gifs } = this.state;
    //set variable to see if we have any gifs
    const hasResults = gifs.length;
    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={hasResults} />
        <div className="search grid">
          {/* our stack of gif images */}
          {/* loop over array of gif images from our state 
          and we create multiple videos from  it */}
          {this.state.gifs.map((gif) => (
            <Gif {...gif} />
          ))}

          <input
            className="input grid-item"
            placeholder="Type Something"
            /* anytime our input changes, were going to run a function called handleChange*/
            /* since we are using a component as a class, we have to use the "this" keyword and then add our handleChange method into our component*/
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
          />
        </div>
        {/* pass userHint all of our state using a spread */}
        <UserHint {...this.state} />
      </div>
    );
  }
}

export default App;
