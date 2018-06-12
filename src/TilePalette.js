import React, { Component } from 'react';
import Tile from './Tile';
import './TilePalette.css'

class TilePalette extends Component {
    render() {
        let tiles = [];
        for (let i = 0; i < 16 * 16; i++) {
            tiles.push(<Tile id={i} key={i} index={i} selected={i === this.props.selectedTile}
                onClick={this.props.onSelectTile}/>);
        }
        return (
            <div className="tile-palette">
                {tiles}
            </div>
        );
    }
}

export default TilePalette;