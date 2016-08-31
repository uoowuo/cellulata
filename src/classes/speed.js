/**
 * Represents speed and movement direction.
 */
export default class Speed {

    /**
     * Constructs new speed object with given scalar value and direction within the graph.
     *
     * @param  {Number}  value  Scalar speed value, integer 0..
     * @param  {Number}  direction  Graph neighbour number at which movement is directed, 1 to 8 counterclockwise, 0 means no movement
     */
    constructor (value = 0, direction = 0) {

        this.value = value;
        this.direction = direction;
    }
}

Speed.zero = new Speed(0, 0);