import React, { PureComponent } from 'react';

class DrawMode extends PureComponent {
    handleModeChange = (event) => {
        this.props.onModeChange(event.target.value);
    }

    handleBackgroundChange = (event) => {
        this.props.onBackgroundChange(event.target.value);
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
            </React.Fragment>
        );
    }
}

export default DrawMode;
