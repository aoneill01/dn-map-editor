import React, { Component } from 'react';
import './App.css';
import Level from '../Level';
import TilePalette from '../TilePalette';

class App extends Component {  
  state = {
      selected: 0
  }

  selectTile = (id) => {
    this.setState({selected: id});
  }

  render() {
    return (
      <div className="App">
        <div className="level-wrapper">
          <Level selectedTile={this.state.selected} />
        </div>
        <div className="tile-palette-wrapper">
          <TilePalette onSelectTile={this.selectTile} selectedTile={this.state.selected} />
        </div>
      </div>
    );
  }
}

export default App;
