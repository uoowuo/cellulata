/**
 * Contains various enum types.
 */

/**
 * Contains label Symbols for states of matter.
 */
export const MatterState = {
    
    keys: ['absent', 'solid', 'liquid', 'gas']
};

/**
 * Contains label Symbols for types of cells. 
 */
export const CellType = {
    
        keys: ['void', 'rock', 'soil', 'quartz', 'water', 'nitrogen', 'oxygen', 'co2', 'algae']
};


// Process each enum
[MatterState, CellType].forEach((enumObj) => {
    "use strict";

    // Create symbols from the "keys" list
    for (let i in enumObj.keys) {
        enumObj[enumObj.keys[i]] = Symbol(enumObj.keys[i]);
    }
});