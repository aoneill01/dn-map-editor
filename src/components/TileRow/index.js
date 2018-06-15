import React, { PureComponent } from 'react';
import Tile from '../Tile';

class TileRow extends PureComponent {
    handleClick = (index) => {
        this.props.onClick(this.props.index, index);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.tileValues.map((value, index) =>
                    <Tile id={value} index={index} key={index} selected={false}
                        onClick={this.handleClick} hoverId={this.props.hoverId} />
                )}
            </React.Fragment>
        );
    }
}

export default TileRow;