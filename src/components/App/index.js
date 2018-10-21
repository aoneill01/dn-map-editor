import React, { Component } from 'react';
import './App.css';
import Tiles from '../Tiles';
import DrawMode from '../DrawMode'
import { initTileValues, parseTileValues, setTile, getTile, autoDrawGround } from '../../utils';
import { List } from 'immutable';

class App extends Component {
  constructor(props) {
    super(props);

    this.palette = List();

    for (let i = 0; i < 16; i++) {
      this.palette = this.palette.push(List(Array.from({length: 16}, (v, k) => i * 16 + k)));
    }
  }

  state = {
      selected: 0,
      mode: 'draw',
      background: 'normal',
      rowValues: initTileValues,
      savedRowValues: initTileValues
  }

  levelHoverTile = (rowIndex, colIndex) => {
    if (this.state.mode === 'auto') {
      let newLevel = autoDrawGround(this.state.savedRowValues, rowIndex, colIndex);
      this.setState({rowValues: newLevel});
      return getTile(newLevel, rowIndex, colIndex);
    }
    
    return this.state.selected;
  }

  paletteHoverTile = (rowIndex, colIndex) => getTile(this.palette, rowIndex, colIndex);

  handlePaletteSelectTile = (rowIndex, colIndex) => {
    this.setState({selected: this.palette.get(rowIndex).get(colIndex)});
  }

  handleModeChange = (mode) => {
    this.setState({mode: mode});
  }

  handleBackgroundChange = (background) => {
    this.setState({background: background});
  }

  handleLevelSelectTile = (rowIndex, colIndex) => {
    const calcNewRowValues = (s) => s.mode === 'draw' ? setTile(s.savedRowValues, rowIndex, colIndex, s.selected) : autoDrawGround(s.savedRowValues, rowIndex, colIndex);
    this.setState(s => ({ savedRowValues: calcNewRowValues(s), rowValues: calcNewRowValues(s) }));
  }

  handleMapUpload = (map) => {
    this.setState(s => ({ savedRowValues: parseTileValues(map), rowValues: parseTileValues(map) }));
  }

  render() {
    return (
      <div className="App">
        <div className="level-wrapper">
          <Tiles className={ `level ${this.state.background}`} hoverTile={this.levelHoverTile} onSelectTile={this.handleLevelSelectTile}
            rowValues={this.state.rowValues} highContrast={this.state.background === 'high'} />
        </div>
        <div>
          <DrawMode mode={this.state.mode} background={this.state.background} 
            onModeChange={this.handleModeChange} onBackgroundChange={this.handleBackgroundChange} 
            onMapUpload={this.handleMapUpload} rowValues={this.state.rowValues} />
          <Tiles className="palette" rowValues={this.palette} hoverTile={this.paletteHoverTile}
            onSelectTile={this.handlePaletteSelectTile} selectedTile={this.state.selected} />
        </div>
      </div>
    );
  }
}

export default App;
