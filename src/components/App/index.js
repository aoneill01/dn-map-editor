import React, { Component } from 'react';
import './App.css';
import Level from '../Level';
import TilePalette from '../TilePalette';
import DrawMode from '../DrawMode'
import { initTileValues, setTile } from '../../utils';

class App extends Component {  
  state = {
      selected: 0,
      mode: 'draw',
      background: 'normal',
      rowValues: initTileValues
  }

  handlePaletteSelectTile = (id) => {
    this.setState({selected: id});
  }

  handleModeChange = (mode) => {
    this.setState({mode: mode});
  }

  handleBackgroundChange = (background) => {
    this.setState({background: background});
  }

  handleLevelSelectTile = (rowIndex, colIndex) => {
    this.setState(s => ({ rowValues: setTile(s.rowValues, rowIndex, colIndex, s.selected) }));
  }

  render() {
    return (
      <div className="App">
        <div className="level-wrapper">
          <Level selectedTile={this.state.selected} onSelectTile={this.handleLevelSelectTile}
            rowValues={this.state.rowValues} highContrast={this.state.background === 'high'} />
        </div>
        <div>
          <DrawMode mode={this.state.mode} background={this.state.background} 
            onModeChange={this.handleModeChange} onBackgroundChange={this.handleBackgroundChange} />
          <TilePalette onSelectTile={this.handlePaletteSelectTile} selectedTile={this.state.selected} />
        </div>
      </div>
    );
  }
}

export default App;
