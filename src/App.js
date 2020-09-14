import React, { Component } from 'react';
//import loader spinner image
import loader from './images/loader.svg'

const Header = () => (
  <div className="header grid">
    <h1 className="title"> It's Gif, not Gif.</h1>
  </div>
)

const UserHint = ({loading, hintText}) => (
  <div className="user-hint">
    {/* check whether or not we have a loading state and render out either
    our spinner or hintText based on that, using a ternary opperator
    (if/else) */}
    {loading ? <img src={loader} className="block mx-auto" /> : hintText}
  </div>
)

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      hintText: 'Hit enter to search'
    }
  }

  // with create react app, we can write our methods as arrow
  // functions, meaning we dont need a constructor and bind
  handleChange = event => {
    const { value } = event.target;
  
    this.setState((prevState, props) => ({
      // we take our old props and spread them out 
      ...prevState,
      //here then we overwrite the ones we want after
      searchTerm: value,
      hintText: `Hit enter to search ${value}`
    }));
  };

  handleKeyPress = event => {
    const { value } = event.target;
    // when we have two or more characters in our search box and we have 
    // also pressed enter, we then wants to run a search
    if (value.length > 2 && event.key === 'Enter') {
      alert(`search for ${value}`)
    }
  };

  render() {
    const { searchTerm } = this.state
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* our stack of gif images */}
          <input className="input grid-item" placeholder="Type Something"
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
