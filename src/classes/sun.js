/**
 * Represents the sun, its daily motion and rays.
 */
export default class Sun {

    /**
     * Creates a new sun.
     * 
     * @param  {Number}  distance   Distance from the world center in cells
     * @param  {Number}  position   Current position in the movement cycle, 0..1
     * @param  {Number}  intensity  Sunlight intensity
     */
    constructor (distance = 1024, position = 0, intensity = 256) {
        
        this.distance = distance;
        this.position = position;
        this.intensity = intensity;
    }
}