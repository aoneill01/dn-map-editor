import React, { PureComponent } from 'react';
import * as copy from 'clipboard-copy';
import * as download from 'downloadjs';

class DrawMode extends PureComponent {
    handleModeChange = (event) => {
        this.props.onModeChange(event.target.value);
    }

    handleBackgroundChange = (event) => {
        this.props.onBackgroundChange(event.target.value);
    }

    handleMapDownload = () => {
        copy(JSON.stringify(this.props.rowValues.map(r => r.toJS()).toJS()).replace(/\[/g,'{').replace(/\]/g,'}'));

        const data = new Uint8Array(this.props.rowValues.size * this.props.rowValues.get(0).size);
        this.props.rowValues.map(r => r.toJS()).toJS().flat().forEach((value, index) => data[index] = value);
        download(data, 'level1.dnl', 'binary/octet-stream');
    }

    handleMapUpload = (files) => {
        if (files.length === 1) {
            console.log(files[0]);
            const reader = new FileReader();
            reader.onload = (e) => {
                this.props.onMapUpload(new Uint8Array(e.target.result));
            };
            reader.readAsArrayBuffer(files[0]);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    Mode: 
                    <select value={this.props.mode} onChange={this.handleModeChange}>
                        <option value="draw">Draw</option>
                        <option value="auto">Auto</option>
                        <option value="rect">Rect</option>
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
                    <button onClick={this.handleMapDownload}>Download</button>
                    <input ref={this.setFileInputRef} type="file" onChange={(e) => this.handleMapUpload(e.target.files)} />
                </div>
            </React.Fragment>
        );
    }
}

export default DrawMode;
