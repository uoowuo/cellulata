import Grid from './grid';
import Sun from './sun';
import Gravity from './gravity';
import * as Cell from './cell';

/**
 * Represents the game world.
 **/
export default class World {

    /**
     * Creates a new game world.
     * 
     * @param  {Number}  size  Length of square side in cells.
     */
    constructor (size = 128) {

        // Setup basics
        this.width = size;
        this.height = size;
        this.time = 0;
        this.grid = new Grid(this.width, this.height);
        this.sun = new Sun();
        this.gravity = new Gravity();
    }
}