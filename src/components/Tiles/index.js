import React, { PureComponent } from 'react';
import './Tiles.css';
import tiles from '../../images/tiles.png';

const tileSize = 16;
const tilesPerRow = 16;

class Tiles extends PureComponent {
    render() {
        const { rowValues, className, onSelectTile, onUp = (row, col) => { }, selectedTile, hoverTile } = this.props;
        const rowCount = rowValues.size;
        const colCount = rowValues.get(0).size;
        const style = {
            gridTemplateColumns: `repeat(${colCount}, ${tileSize}px)`,
            gridTemplateRows: `repeat(${rowCount}, ${tileSize}px)`
        }
        return (            
            <div className={`tiles ${className}`} style={style}> 
                {rowValues.map((value, index) =>
                    <TileRow rowIndex={index} key={index}
                        tileValues={value} selectedTile={selectedTile}
                        onClick={onSelectTile}
                        onUp={onUp} hoverTile={hoverTile} />
                )}
            </div>
        );
    }
}

class TileRow extends PureComponent {
    render() {
        const { hoverTile, selectedTile } = this.props;

        return (
            <React.Fragment>
                {this.props.tileValues.map((value, index) =>
                    <Tile tile={value} rowIndex={this.props.rowIndex} colIndex={index} 
                        key={index} selected={ selectedTile === value }
                        onClick={this.props.onClick}
                        onUp={this.props.onUp} hoverTile={hoverTile} />
                )}
            </React.Fragment>
        );
    }
}

class Tile extends PureComponent {
    state = {
        hover: false
    }

    handleClick = () => {
        this.props.onClick(this.props.rowIndex, this.props.colIndex);
    }

    handleEnter = (e) => {
        this.setState({ hover: true });
        if (e.buttons & 1) this.handleClick();
    }

    handleLeave = (e) => {
        this.setState({ hover: false });
    }

    handleUp = (e) => {
        this.props.onUp(this.props.rowIndex, this.props.colIndex);
    }

    render() {
        const { tile, selected, hoverTile } = this.props;
        const { hover } = this.state;
        let xOffset = -tileSize * (tile % tilesPerRow);
        let yOffset = -tileSize * Math.floor(tile / tilesPerRow);
        if (hover) {
            const ht = hoverTile(this.props.rowIndex, this.props.colIndex)
            xOffset = -tileSize * (ht % tilesPerRow);
            yOffset = -tileSize * Math.floor(ht / tilesPerRow);
        }
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
            <div style={styles} onMouseDown={this.handleClick}
                onMouseUp={this.handleUp} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}></div>
        );
    }
}

export default Tiles;