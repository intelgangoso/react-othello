import React, { Component } from 'react';
import Board from './Board.js';
import '../index.js';

export default class Game extends Component {
    constructor() {
        super();

        const tiles = Array(64).fill(null);
        tiles[27] = tiles[36] = 'piece white';
        tiles[28] = tiles[35] = 'piece black';

        this.state = {
            tiles: tiles,
            isNext: true,
            stepNumber: 0
        };
    }

    reset () {
        const tiles = Array(64).fill(null);
        tiles[27] = tiles[36] = 'piece white';
        tiles[28] = tiles[35] = 'piece black';

        this.setState({
            tiles: tiles,
            isNext: true,
            stepNumber: 0
        });
    }

    handleClick(i) {
        const tiles = this.state.tiles.slice();

        if (this.state.stepNumber >= 60 || tiles[i]) {
            return;
        }

        var toFlip = this.flip(i);

        if (toFlip.length === 0) {
            return;
        }

        var current = this.state.isNext ? 'piece white' : 'piece black';

        toFlip.forEach(function (tile) {
            tiles[tile] = current;
        });

        tiles[i] = current;

        this.setState({
            tiles: tiles,
            stepNumber: this.state.stepNumber + 1,
            isNext: !this.state.isNext
        });
    }

    flip(i) {
        var toFlip = Array(0);
        
        for (var j = -1; j < 2; j++) {
            for (var k = -1; k < 2; k++) {
                if (j !== 0 || k !== 0) {
                    toFlip = toFlip.concat(this.flipLine(i, j, k));
                }
            }
        }

        return toFlip;
    }
    
    flipLine(i, jStep, kStep) {
        const tiles = this.state.tiles.slice();
        var toFlip = [];
        var found = false;
        var curr = this.state.isNext ? 'piece white' : 'piece black';
        var j = getJ(i) + jStep,
            k = getK(i) + kStep;

        while (!found && j >= 0 && j < 8 && k >= 0 && k < 8) {
            if (!tiles[getKey(j, k)]) {
                return [];
            } else if (tiles[getKey(j, k)] === curr) {
                found = true;
            } else {
                toFlip.push(getKey(j, k));
                j += jStep;
                k += kStep;
            }
        }

        if (found) {
            return toFlip;
        }

        return [];
    }

    render() {
        const tiles = this.state.tiles;
        const score = calcScore(this.state.tiles);
        const winner = calcWinner(score);
        const displayScoreWhite = score.white; 
        const displayScoreBlack = score.black;
        let status;

        if (winner) {
            status = <h1> Winner: {winner} </h1>;
        } else {
            status = 'Next Player: ' + (this.state.isNext ? 'White' : 'Black');
        }

        return (
            <div className='othello' key='othello'>
                <div className='othello-board' key='othello-board'>
                    <Board tiles={tiles} onClick={i => this.handleClick(i)} /><br />
                </div>
                <br />
                <div className='othello-info'>
                    <div> {status} </div>
                    <br />
                    <div className='player-container'>
                        <div> White: <br /> {displayScoreWhite} </div> 
                        <div> Black: <br /> {displayScoreBlack} </div>
                    </div>
                    <br />
                    <button className='reset' onClick= {() => { 
                        if((displayScoreWhite && displayScoreBlack) !== 2) {
                            if (window.confirm('Are you sure you want to reset the game?')) {
                                this.reset();
                            }
                        }
                    } }>Reset</button>
                </div>
            </div>
        );
    }
}

function getJ(i) {
    return i % 8;
}

function getK(i) {
    return parseInt(i / 8, 10);
}

function getKey(x, y) {
    return y * 8 + x;
}

function calcWinner(score) {
    if (score.black+ score.white=== 64) {
        if(score.black&& score.white!== 32){
            return score.white> score.black? 'piece white' : 'piece black';
        } else {
            return 'It\'s a tie!'
        }
    }

    return null;
}

function calcScore(tiles) {
    var white= 0,
        black= 0;

    tiles.forEach(function (tile) {
        if (tile === 'piece white') {
            white++;
        } else if (tile === 'piece black') {
            black++;
        }
    });

    return {
        white: white,
        black: black
    };
}