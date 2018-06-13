import React, { PureComponent } from 'react';
import tiles from './tiles.png';

const tileSize = 16;
const tilesPerRow = 16;

class Tile extends PureComponent {
    state = {
        hover: false
    }

    handleClick = () => {
        this.props.onClick(this.props.index);
    }

    handleEnter = (e) => {
        this.setState({ hover: true });
        if (e.buttons & 1) this.handleClick();
    }

    handleLeave = (e) => {
        this.setState({ hover: false });
    }

    render() {
        const { id, selected, hoverId } = this.props;
        const { hover } = this.state;
        const xOffset = -tileSize * ((hover ? hoverId : id) % tilesPerRow);
        const yOffset = -tileSize * Math.floor((hover ? hoverId : id) / tilesPerRow);
        let styles = {
            backgroundImage: `url(${tiles})`,
            backgroundPosition: `${xOffset}px ${yOffset}px`,
            cursor: "pointer",
            overflow: "hidden"
        };
        if (selected || hover) {
            Object.assign(styles, {
                border: '1px dashed black',
                backgroundPosition: `${xOffset-1}px ${yOffset-1}px`
            })
        }
        return (
            <div style={styles} onClick={this.handleClick} onMouseDown={this.handleClick}
                onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}></div>
        );
    }
}

export default Tile;