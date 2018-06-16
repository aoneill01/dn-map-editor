import React, { PureComponent } from 'react';
import TileRow from '../TileRow';
import './Level.css';

class Level extends PureComponent {
    render() {
        return (
            <div className={ this.props.highContrast ? 'level high' : 'level' }>
                {this.props.rowValues.map((value, index) =>
                    <TileRow index={index} key={index}
                        tileValues={value}
                        onClick={this.props.onSelectTile} hoverId={this.props.selectedTile} />
                )}
            </div>
        );
    }
}

export default Level;