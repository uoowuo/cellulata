/**
 * Represents a two-dimensional cell grid.
 */
export default class Grid {

    /**
     * Creates a new grid of given size.
     *
     * @param    {Number}  width   Grid width
     * @param    {Number}  height  Grid height
     * @returns  {Proxy}   Proxified Grid object
     */
    constructor (width, height) {

        /**
         * Contains the actual cell arrays.
         * Access through getters/setters using grid[x][y] syntax.
         * @private
         */
        var columns;

        // Set properties
        this.width = width;
        this.height = height;

        // Create a width-long array of height-long rows
        columns = new Array(this.width);
        for (let x = 0; x < this.width; x++) {
            columns[x] = new Array(this.height);
        }

        // Proxify created Grid object to allow accessors of form grid[x][y]
        return Object.assign(new Proxy(this, {
            get: (target, property, receiver) => {
                return (!isNaN(property)) ? columns[property] : target[property];
            },
            set: (target, property, value, receiver) => {
                if (!isNaN(property)) {
                    columns[property] = value;
                } else {
                    target[property] = value;
                }
                return true;
            }
        }), this);
    }

    /**
     * Iterates over a rectangular area within the grid.
     *
     * @param  {Array}     start  Rectangle starting corner coordinates, [x, y] integers
     * @param  {Array}     end    Rectangle end corner coordinates, [x, y] integers
     * @param  {Function}  func   Function to apply to the cells in the area
     */
    rectangle (start, end, func) {

        // Control input
        start = [Math.floor(start[0]), Math.floor(start[1])];
        end = [Math.floor(end[0]), Math.floor(end[1])];

        // Determine the lowest and highest pairs of coordinates
        const lowCoords = [Math.min(start[0], end[0]), Math.min(start[1], end[1])];
        const highCoords = [Math.max(start[0], end[0]), Math.max(start[1], end[1])];

        // Cull coordinates to actual grid size
        const culledLowCoords = [Math.max(lowCoords[0], 0), Math.max(lowCoords[1], 0)];
        const culledHighCoords = [Math.min(highCoords[0], this.width - 1), Math.min(highCoords[1], this.height - 1)];

        // Iterate over the area with given function
        for (let x = culledLowCoords[0]; x <= culledHighCoords[0]; x++) {  // Column by column
            for (let y = culledLowCoords[1]; y <= culledHighCoords[1]; y++) {  // Row by row
                func(this, x, y);
            }
        }
    }

    /**
     * Produces a function that fills the grid address at x, y using given cell constructor function.
     *
     * @param    {Function}  cellConstructor  Cell object constructor to fill the address with
     * @returns  {Function}                   Function that puts a copy of the cell at given grid address
     */
    static fill (cellConstructor) {

        // Creates a new cell at given grid address
        return (grid, x, y) => {

            // Destroy existing cell, if any
            if (typeof grid[x][y] !== 'undefined') {
                clearTimeout(grid[x][y].staggerTimeoutHandle);
                grid[x][y].sprite.destroy(true);
                delete grid[x][y];
            }

            // Construct the cell
            grid[x][y] = cellConstructor();

            // Update position
            grid[x][y].x = x;
            grid[x][y].y = y;
            grid[x][y].updateView();
        };

    }
}