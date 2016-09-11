import Speed from './speed';
import {MatterState, CellType} from './enums';


  //////////////////////
 // Abstract classes //
//////////////////////

/**
 * Represents a single generic simulation cell.
 * @todo a bug in Phaser perhaps causes every first cell in an animation to stretch 1 pixel left and overlap its neighbour
 * @todo the bug disappears if a filter is applied to the cell
 */
class Cell {

    /**
     * Creates a new cell.
     *
     * @param  {MatterState}  state        State of cell matter
     * @param  {CellType}     type         Cell type
     * @param  {Number}       mass         Mass, integer
     * @param  {Speed}        speed        Speed and direction of movement
     * @param  {Number}       temperature  Temperature, integer 0..
     * @param  {Number|null}  integrity    Structural integrity, integer 0..255 or null if not applicable
     * @param  {String}       spriteKey    Assets key for sprite access
     */
    constructor (state = MatterState.absent, type = CellType.void, mass = 0, speed = Speed.zero, temperature = 0, integrity = 255, spriteKey = 'cell-generic') {

        // Set properties
        this.state = state;
        this.type = type;
        this.mass = mass;
        this.speed = speed;
        this.temperature = temperature;
        this.integrity = integrity;
        this.spriteKey = spriteKey;

        // Add sprite, enable input
        this.sprite = cellulata.game.add.sprite(0, 0, this.spriteKey);
        this.sprite.smoothed = false;
        this.sprite.filters = this.sprite.filters || [];
        this.sprite.filters = this.sprite.filters.concat(cellulata.filters.transparentBorder);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputOver.add(this.handleHover, this);
        this.sprite.events.onInputOut.add(this.handleHover.bind(this, false), this);
        
        // Enable idle animation
        // @todo there is a bug whereby first animation frame overlaps the neighbouring tile by 1 pixel on the left
        if (this.sprite.animations.frameTotal > 1) {
            const animationStaggerDelay = Math.floor(Math.random() * cellulata.animationsStaggerRange);
            this.staggerTimeoutHandle = setTimeout(() => {
                this.sprite.animations.add('idle').play(cellulata.animationsFramerate, true);
            }, animationStaggerDelay);
        }
    }

    /**
     * Updates the cell's internal properties based on current world state
     */
    updateModel () {

    }

    /**
     * Updates the cell's visual representation and position in the world
     */
    updateView () {

        this.sprite.x = this.x * this.sprite.width;
        this.sprite.y = this.y * this.sprite.height;
    }

    /**
     * Handles onhover functionality
     * 
     * @param  {Boolean}  enable  Whether to enable functionality (or disable) 
     */
    handleHover (enable = true) {
        
        // On hover, highlight the cell. Array.push breaks PIXI for some reason
        if (enable) {
            this.sprite.filters = this.sprite.filters || [];
            this.sprite.filters = this.sprite.filters.concat(cellulata.filters.transparentBorder);

        // On hover out, remove cell highlight
        } else {
            this.sprite.filters.splice(this.sprite.filters.indexOf(cellulata.filters.transparentBorder), 1);
            if (this.sprite.filters.length === 0) {
                this.sprite.filters = undefined;
            }
        }
    }
}

/**
 * Represents a single solid cell.
 */
class Solid extends Cell {

    /**
     * Creates a new solid cell.
     *
     * @param  {CellType}     type         Cell type
     * @param  {Number}       mass         Mass, integer
     * @param  {Speed}        speed        Speed and direction of movement
     * @param  {Number}       temperature  Temperature, integer 0..
     * @param  {Number|null}  integrity    Structural integrity, integer 0..255 or null if not applicable
     * @param  {String}       spriteKey    Assets key for sprite access
     */
    constructor (type = CellType.rock, mass = 2, speed = Speed.zero, temperature = 0, integrity = 255, spriteKey = 'cell-solid') {

        super(MatterState.solid, type, mass, speed, temperature, integrity, spriteKey);
    }
}

/**
 * Represents a single liquid cell.
 */
class Liquid extends Cell {

    /**
     * Creates a new liquid cell.
     *
     * @param  {CellType}  type         Cell type
     * @param  {Number}    mass         Mass, integer
     * @param  {Speed}     speed        Speed and direction of movement
     * @param  {Number}    temperature  Temperature, integer 0..
     * @param  {String}    spriteKey    Assets key for sprite access
     */
    constructor (type = CellType.water, mass = 1, speed = Speed.zero, temperature = 0, spriteKey = 'cell-liquid') {

        super(MatterState.liquid, type, mass, speed, temperature, null, spriteKey);
    }
}

/**
 * Represents a single gaseous cell.
 */
class Gas extends Cell {

    /**
     * Creates a new gas cell.
     *
     * @param  {CellType}  type         Cell type
     * @param  {Number}    mass         Mass, integer
     * @param  {Speed}     speed        Speed and direction of movement
     * @param  {Number}    temperature  Temperature, integer 0..
     * @param  {String}    spriteKey    Assets key for sprite access
     */
    constructor (type = CellType.nitrogen, mass = 0, speed = Speed.zero, temperature = 0, spriteKey = 'cell-gas') {

        super(MatterState.gas, type, mass, speed, temperature, null, spriteKey);
    }
}

/**
 * Represents a single living cell.
 */
class Life extends Solid {

    /**
     * Creates a new living cell.
     *
     * @param  {CellType}     type         Cell type
     * @param  {Number}       mass         Mass, integer
     * @param  {Speed}        speed        Speed and direction of movement
     * @param  {Number}       temperature  Temperature, integer 0..
     * @param  {Number|null}  integrity    Structural integrity, integer 0..255 or null if not applicable
     * @param  {String}       spriteKey    Assets key for sprite access
     */
    constructor (type = CellType.algae, mass = 1, speed = Speed.zero, temperature = 0, integrity = 255, spriteKey = 'cell-life') {

        super(type, mass, speed, temperature, integrity, spriteKey);
    }
}

  //////////////////////
 // Concrete classes //
//////////////////////

/**
 * Represents a rock cell.
 */
export class Rock extends Solid {

    /**
     * Creates a new rock cell.
     *
     * @param  {Speed}        speed        Speed and direction of movement
     * @param  {Number}       temperature  Temperature, integer 0..
     * @param  {Number|null}  integrity    Structural integrity, integer 0..255 or null if not applicable
     */
    constructor (speed = Speed.zero, temperature = 0, integrity = 255) {

        super(CellType.rock, 2, speed, temperature, integrity, 'cell-rock');
    }
}

/**
 * Represents a soil cell.
 */
export class Soil extends Solid {

    /**
     * Creates a new soil cell.
     *
     * @param  {Speed}        speed        Speed and direction of movement
     * @param  {Number}       temperature  Temperature, integer 0..
     * @param  {Number|null}  integrity    Structural integrity, integer 0..255 or null if not applicable
     */
    constructor (speed = Speed.zero, temperature = 0, integrity = 255) {

        super(CellType.soil, 2, speed, temperature, integrity, 'cell-soil');
    }
}

/**
 * Represents a quartz crystal cell.
 */
export class Quartz extends Solid {

    /**
     * Creates a new quartz cell.
     *
     * @param  {Speed}        speed        Speed and direction of movement
     * @param  {Number}       temperature  Temperature, integer 0..
     * @param  {Number|null}  integrity    Structural integrity, integer 0..255 or null if not applicable
     */
    constructor (speed = Speed.zero, temperature = 0, integrity = 255) {

        super(CellType.quartz, 2, speed, temperature, integrity, 'cell-quartz');
    }
}

/**
 * Represents a water cell.
 */
export class Water extends Liquid {

    /**
     * Creates a new water cell.
     *
     * @param  {Speed}   speed        Speed and direction of movement
     * @param  {Number}  temperature  Temperature, integer 0..
     */
    constructor (speed = Speed.zero, temperature = 0) {

        super(CellType.water, 1, speed, temperature, 'cell-water');
    }
}

/**
 * Represents a nitrogen gas cell.
 */
export class Nitrogen extends Gas {

    /**
     * Creates a new nitrogen cell.
     *
     * @param  {Speed}   speed        Speed and direction of movement
     * @param  {Number}  temperature  Temperature, integer 0..
     */
    constructor (speed = Speed.zero, temperature = 0) {

        super(CellType.nitrogen, 1, speed, temperature, 'cell-nitrogen');
    }
}

/**
 * Represents an oxygen gas cell.
 */
export class Oxygen extends Gas {

    /**
     * Creates a new oxygen cell.
     *
     * @param  {Speed}   speed        Speed and direction of movement
     * @param  {Number}  temperature  Temperature, integer 0..
     */
    constructor (speed = Speed.zero, temperature = 0) {

        super(CellType.oxygen, 1, speed, temperature, 'cell-oxygen');
    }
}

/**
 * Represents a carbon dioxide gas cell.
 */
export class CO2 extends Gas {

    /**
     * Creates a new carbon dioxide cell.
     *
     * @param  {Speed}   speed        Speed and direction of movement
     * @param  {Number}  temperature  Temperature, integer 0..
     */
    constructor (speed = Speed.zero, temperature = 0) {

        super(CellType.co2, 1, speed, temperature, 'cell-co2');
    }
}

/**
 * Represents a living or dead algae cell.
 */
export class Algae extends Life {

    /**
     * Creates a new algae cell.
     *
     * @param  {Speed}   speed        Speed and direction of movement
     * @param  {Number}  temperature  Temperature, integer 0..
     * @param  {Number|null}  integrity    Structural integrity, integer 0..255 or null if not applicable
     */
    constructor (speed = Speed.zero, temperature = 0, integrity = 255) {

        super(CellType.algae, 1, speed, temperature, integrity, 'cell-algae');
    }
}