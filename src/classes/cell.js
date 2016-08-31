// import mixin from 'class-mixin';  // @todo Use or remove and uninstall
import Speed from './speed';
import {MatterState, CellType} from './enums';


  //////////////////////
 // Abstract classes //
//////////////////////

/**
 * Represents a single generic simulation cell.
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
     */
    constructor (state = MatterState.absent, type = CellType.void, mass = 0, speed = Speed.zero, temperature = 0, integrity = 255) {

        this.state = state;
        this.type = type;
        this.mass = mass;
        this.speed = speed;
        this.temperature = temperature;
        this.integrity = integrity;
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
     */
    constructor (type = CellType.rock, mass = 2, speed = Speed.zero, temperature = 0, integrity = 255) {

        super(MatterState.solid, type, mass, speed, temperature, integrity);
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
     * @param  {Speed}   speed        Speed and direction of movement
     * @param  {Number}  temperature  Temperature, integer 0..
     */
    constructor (type = CellType.water, mass = 1, speed = Speed.zero, temperature = 0) {

        super(MatterState.liquid, type, mass, speed, temperature, null);
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
     * @param  {Speed}   speed        Speed and direction of movement
     * @param  {Number}  temperature  Temperature, integer 0..
     */
    constructor (type = CellType.nitrogen, mass = 0, speed = Speed.zero, temperature = 0) {

        super(MatterState.gas, type, mass, speed, temperature, null);
    }
}

/**
 * Represents a single living cell.
 */
class Life extends Solid {

    /**
     * Creates a new living cell.
     *
     * @param  {CellType}  type         Cell type
     * @param  {Number}    mass         Mass, integer
     * @param  {Speed}        speed        Speed and direction of movement
     * @param  {Number}       temperature  Temperature, integer 0..
     * @param  {Number|null}  integrity    Structural integrity, integer 0..255 or null if not applicable
     */
    constructor (type = CellType.algae, mass = 1, speed = Speed.zero, temperature = 0, integrity = 255) {

        super(type, mass, speed, temperature, integrity);
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

        super(CellType.rock, 2, speed, temperature, integrity);
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

        super(CellType.soil, 2, speed, temperature, integrity);
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

        super(CellType.quartz, 2, speed, temperature, integrity);
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

        super(CellType.water, 1, speed, temperature);
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

        super(CellType.nitrogen, 1, speed, temperature);
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

        super(CellType.oxygen, 1, speed, temperature);
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

        super(CellType.co2, 1, speed, temperature);
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
        
        super(CellType.algae, 1, speed, temperature, integrity);
    }
}