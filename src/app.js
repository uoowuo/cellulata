/**
 * Cellulata, v0.1.0
 *
 * Description: A cellular automata game.
 */

import Cellulata from './classes/cellulata';

  ///////////////////////
 // Application start //
///////////////////////
(function (globals) {
    'use strict';

    // Start the application
    document.addEventListener('DOMContentLoaded', function (event) {

        const scene = document.querySelector('#game-scene');

        // Start a new game instance
        // To access game state for debugging, start at the window.cellulata top level object
        globals.cellulata = new Cellulata(scene);
    });
    
}(self));