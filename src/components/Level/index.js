import React, { Component } from 'react';
import TileRow from '../TileRow';
import { initTileValues } from '../../utils';
import './Level.css';

class Level extends Component {
    state = {
        rowValues: initTileValues
    };

    selectTile = (rowIndex, colIndex) => {
        this.setState(s => ({ rowValues: s.rowValues.set(rowIndex, s.rowValues.get(rowIndex).set(colIndex, this.props.selectedTile)) }));
    }

    render() {
        return (
            <div className="level">
                {this.state.rowValues.map((value, index) =>
                    <TileRow index={index} key={index}
                        tileValues={value}
                        onClick={this.selectTile} hoverId={this.props.selectedTile} />
                )}
            </div>
        );
    }
}

export default Level;