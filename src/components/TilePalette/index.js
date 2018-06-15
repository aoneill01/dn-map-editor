import React, { Component } from 'react';
import Tile from '../Tile';
import './TilePalette.css'

const tileSize = 16;

class TilePalette extends Component {
    render() {
        let tiles = [];
        for (let i = 0; i < tileSize * tileSize; i++) {
            tiles.push(<Tile id={i} hoverId={i} key={i} index={i} selected={i === this.props.selectedTile}
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