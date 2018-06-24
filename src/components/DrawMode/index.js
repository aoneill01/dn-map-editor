import React, { PureComponent } from 'react';
import * as copy from 'clipboard-copy';
import { hitType } from '../../utils';

class DrawMode extends PureComponent {
    handleModeChange = (event) => {
        this.props.onModeChange(event.target.value);
    }

    handleBackgroundChange = (event) => {
        this.props.onBackgroundChange(event.target.value);
    }

    handleMapCopy = () => {
        copy(JSON.stringify(this.props.rowValues.map(r => r.toJS()).toJS()).replace(/\[/g,'{').replace(/\]/g,'}'));
    }

    handleHitTypeCopy = () => {
        copy(JSON.stringify(this.props.rowValues.map(r => r.map(hitType).toJS()).toJS()).replace(/\[/g,'{').replace(/\]/g,'}'));
    }
    
    render() {
        return (
            <React.Fragment>
                <div>
                    Mode: 
                    <select value={this.props.mode} onChange={this.handleModeChange}>
                        <option value="draw">Draw</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>
                <div>
                    Background: 
                    <select value={this.props.background} onChange={this.handleBackgroundChange}>
                        <option value="normal">Normal</option>
                        <option value="high">High Contrast</option>
                    </select>
                </div>
                <div>
                    <button onClick={this.handleMapCopy}>Copy Map</button>
                    <button onClick={this.handleHitTypeCopy}>Copy Hit Map</button>
                </div>
            </React.Fragment>
        );
    }
}

export default DrawMode;
