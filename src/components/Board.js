import React, { Component } from 'react';
import Tile from './Tile.js';

export default class Board extends Component {
    renderTile(i) {
        return (
            <Tile key={'tile' + i} value={this.props.tiles[i]} onClick={() => this.props.onClick(i)} />
        );
    }

    render() {
		const rows = [];
		for (let i = 0; i < 8; i++) {
			const cols = [];
			for (let j = 0; j < 8; j++) {
				cols.push(this.renderTile(j + (i * 8)))
			}
			rows.push(<div className='row' key={'row' + i}>{cols}</div>);
		}
		return (<div>{rows}</div>);
    }
    
}