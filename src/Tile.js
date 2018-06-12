import React, { PureComponent } from 'react';
import tiles from './tiles.png';

const tileSize = 16;
const tilesPerRow = 16;

class Tile extends PureComponent {
    handleClick = () => {
        this.props.onClick(this.props.index);
    }

    render() {
        const { id, selected } = this.props;
        const xOffset = -tileSize * (id % tilesPerRow);
        const yOffset = -tileSize * Math.floor(id / tilesPerRow);
        let styles = {
            backgroundImage: `url(${tiles})`,
            backgroundPosition: `${xOffset}px ${yOffset}px`,
            cursor: "pointer",
            overflow: "hidden"
        };
        if (selected) {
            Object.assign(styles, {
                border: '1px dashed black',
                backgroundPosition: `${xOffset-1}px ${yOffset-1}px`
            })
        }
        return (
            <div style={styles} onClick={this.handleClick}></div>
        );
    }
}

export default Tile;