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
        this.size = size;
        this.time = 0;
        this.grid = new Grid(this.size, this.size);
        this.sun = new Sun();
        this.gravity = new Gravity();

        // Generate content
        this.grid.rectangle([1, 0], [3, 0], Grid.fill(new Cell.Algae()));
    }
}