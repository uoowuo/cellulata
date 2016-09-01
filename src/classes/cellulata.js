// Because https://www.npmjs.com/package/phaser#browserify--cjs
window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');
import World from './world';
import Grid from './grid';
import * as Cell from './cell';
import Shaders from './shaders';

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

        // Setup parameters
        this.worldSize = 16;                 // World square side in cells
        this.assetsCellSize = 32;            // Cell graphic square side in pixels
        this.animationsStaggerRange = 1300;  // Maximal offset difference between idle animations in different cells
        this.animationsFramerate = 2;        // Animations' framerate

        // Setup asset loader
        // @todo Atlas
        const this1 = this;
        const preload = () => {

            // Cell tiles
            this1.assets = this1.loadAssets([
                './images/cell-rock.png',
                './images/cell-soil.png',
                './images/cell-quartz.png',
                './images/cell-water.png',
                './images/cell-nitrogen.png',
                './images/cell-oxygen.png',
                './images/cell-co2.png',
                './images/cell-algae.png'
            ], 'spritesheet', this.assetsCellSize, this.assetsCellSize);

            // Background
            this.game.load.spritesheet('background', './images/background.jpg');
            this.assets.push('background');
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
    loadAssets (assetPaths, loaderFunc, ...loaderArgs) {

        // Load assets with a given Phaser loader function, pushing asset keys to an array along the way, and return the array
        var assetKeys = [];
        for (let i = 0; i < assetPaths.length; i++) {
            let assetName = assetPaths[i].split('/').slice(-1)[0].replace(/[.][\w\d_-]+$/, '');  // Take last from path and remove '.ext'
            this.game.load[loaderFunc](assetName, assetPaths[i], ...loaderArgs);
            assetKeys.push(assetName);
        }
        return assetKeys;
    }

    /**
     * Sets up the game world.
     */
    setupWorld () {

        // Set Phaser options
        this.game.tweens.frameBased = true;
        this.game.stage.disableVisibilityChange = true;

        // Setup filters
        this.uniforms = [];
        this.filters = {};
        // this.filters.whiteBorder = new Phaser.Filter(this.game, this.uniforms, Shaders.whiteBorder);

        // Create and populate the world
        this.world = new World(this.worldSize);

        // Set background
        this.background = this.game.add.sprite(0, 0, 'background');
        // this.background.filters = [ this.filters.whiteBorder ];

        // Generate cells grid
        const maxIndexX = this.world.width - 1;
        const maxIndexY = this.world.height - 1;
        this.world.grid.rectangle([0, maxIndexY - 0.8 * maxIndexY], [maxIndexX, maxIndexY], Grid.fill(() => new Cell.CO2()));
        this.world.grid.rectangle([0, maxIndexY - 0.7 * maxIndexY], [maxIndexX, maxIndexY], Grid.fill(() => new Cell.Oxygen()));
        this.world.grid.rectangle([0, maxIndexY - 0.6 * maxIndexY], [maxIndexX, maxIndexY], Grid.fill(() => new Cell.Nitrogen()));
        this.world.grid.rectangle([0, maxIndexY - 0.5 * maxIndexY], [maxIndexX, maxIndexY], Grid.fill(() => new Cell.Water()));
        this.world.grid.rectangle([0, maxIndexY - 0.4 * maxIndexY], [maxIndexX, maxIndexY], Grid.fill(() => new Cell.Algae()));
        this.world.grid.rectangle([0, maxIndexY - 0.3 * maxIndexY], [maxIndexX, maxIndexY], Grid.fill(() => new Cell.Soil()));
        this.world.grid.rectangle([0, maxIndexY - 0.2 * maxIndexY], [maxIndexX, maxIndexY], Grid.fill(() => new Cell.Quartz()));
        this.world.grid.rectangle([0, maxIndexY - 0.1 * maxIndexY], [maxIndexX, maxIndexY], Grid.fill(() => new Cell.Rock()));

    }

    /**
     * Main game loop.
     */
    mainLoop () {


        for (let filter in this.filters) {
            this.filters[filter].update();
        }
        // Wrap reel symbols
        // this.reels.forEach((reel) => {
        //     reel.symbols.forEach((symbol) => {
        //         this.game.world.wrap(symbol.gameObject);
        //     });
        // });
    }
}