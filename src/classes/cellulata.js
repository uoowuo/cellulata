// Because https://www.npmjs.com/package/phaser#browserify--cjs
window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');
import World from './world';
import * as Cell from './cell';

/**
 * Represents the overall game setup.
 */
export default class Cellulata {

    /**
     * Creates a new game instance.
     *
     * @param  {HTMLElement}  scene  DOM element to place game scene into
     */
    constructor (scene) {

        // Set properties


        // Setup asset loader
        const preload = () => {
            // this1.assets = this1.loadAssets([
            //     './images/symbolA.png',
            //     './images/symbolB.png',
            //     './images/symbolC.png',
            //     './images/symbolD.png',
            //     './images/symbolE.png'
            // ], 'spritesheet', 216, 144);
        };

        // Start the game
        this.game = new Phaser.Game(scene.clientWidth, scene.clientHeight, Phaser.AUTO, scene, {
            preload: preload,
            create: this.setupWorld.bind(this),
            update: this.mainLoop.bind(this)
        });
    }

    /**
     * Loads images and returns asset access keys.
     *
     * @param    assetPaths  Array of relative asset path strings
     * @param    loaderFunc  Name of the Phaser load function to use on assets
     * @param    loaderArgs  The rest of the arguments are passed on to loader function
     * @returns  {Array}     Array of asset keys for access
     */
    // loadAssets (assetPaths, loaderFunc, ...loaderArgs) {
    //
    //     // Load assets with a given Phaser loader function, pushing asset keys to an array along the way, and return the array
    //     var assetKeys = [];
    //     for (let i = 0; i < assetPaths.length; i++) {
    //         let assetName = assetPaths[i].split('/').slice(-1)[0].replace(/[.][\w\d_-]+$/, '');  // Take last from path and remove '.ext'
    //         this.game.load[loaderFunc](assetName, assetPaths[i], ...loaderArgs);
    //         assetKeys.push(assetName);
    //     }
    //     return assetKeys;
    // }

    /**
     * Sets up the game world.
     */
    setupWorld () {

        // Setup physics & animations
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.tweens.frameBased = true;

        // Create and populate the world
        this.world = new World();
        ////////////////////
        
    }

    /**
     * Main game loop.
     */
    mainLoop () {

        // Wrap reel symbols
        // this.reels.forEach((reel) => {
        //     reel.symbols.forEach((symbol) => {
        //         this.game.world.wrap(symbol.gameObject);
        //     });
        // });
    }
}