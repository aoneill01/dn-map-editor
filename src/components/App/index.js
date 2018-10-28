import React, { Component } from 'react';
import './App.css';
import Tiles from '../Tiles';
import DrawMode from '../DrawMode'
import { initTileValues, parseTileValues, setTile, getTile, autoDrawGround, fillTiles } from '../../utils';
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
      savedRowValues: initTileValues,
      startTile: undefined
  }

  calcNewRowValues = (rowIndex, colIndex) => s => {
    switch (s.mode) {
      case 'draw':
        return setTile(s.savedRowValues, rowIndex, colIndex, s.selected);
      case 'auto':
        return autoDrawGround(s.savedRowValues, rowIndex, colIndex);
      case 'rect':
        if (s.startTile) {
          return fillTiles(s.savedRowValues, rowIndex, colIndex, s.selected, s.startTile.rowIndex, s.startTile.colIndex);
        }
        return s.savedRowValues;
      default:
        return s.savedRowValues;
    }
  }

  levelHoverTile = (rowIndex, colIndex) => {
    if (this.state.mode === 'auto') {
      let newLevel = autoDrawGround(this.state.savedRowValues, rowIndex, colIndex);
      this.setState({rowValues: newLevel});
      return getTile(newLevel, rowIndex, colIndex);
    }
    if (this.state.mode === 'rect' && this.state.startTile) {
      this.setState(s => ({ rowValues: this.calcNewRowValues(rowIndex, colIndex)(s) }));
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
    if (this.state.mode === 'rect') {
      if (this.state.startTile === undefined) this.setState({ startTile: { rowIndex, colIndex } });
      return;
    }
    this.setState(s => ({ savedRowValues: this.calcNewRowValues(rowIndex, colIndex)(s), rowValues: this.calcNewRowValues(rowIndex, colIndex)(s) }));
  }

  handleLevelReleaseTile = (rowIndex, colIndex) => {
    if (this.state.mode === 'rect') {
      this.setState(s => ({ savedRowValues: this.calcNewRowValues(rowIndex, colIndex)(s), rowValues: this.calcNewRowValues(rowIndex, colIndex)(s), startTile: undefined }));
    }
  }

  handleMapUpload = (map) => {
    this.setState(s => ({ savedRowValues: parseTileValues(map), rowValues: parseTileValues(map) }));
  }

  render() {
    return (
      <div className="App">
        <div className="level-wrapper">
          <Tiles className={ `level ${this.state.background}`} hoverTile={this.levelHoverTile} 
            onSelectTile={this.handleLevelSelectTile} onUp={this.handleLevelReleaseTile}
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
