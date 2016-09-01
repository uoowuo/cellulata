/**
 * Contains fragment (pixel) shaders for visual effects
 */
export default class Shaders {}

  ///////////////
 // Libraries //
///////////////

/**
 * Shader library code
 * @type  {Object}
 */
Shaders.libs = {};

/**
 * That number, you know
 */
Shaders.libs.PI = `
    #define PI 3.1415926535897932384626433832795
`;

  ////////////////////
 // Pixel shaders //
///////////////////

/**
 * Pixel shaders list
 * @type  {Object}
 */
Shaders = {};  // Pixel shaders

/**
 * Draws a white border over the sprite
 */
Shaders.whiteBorder = `
    uniform float time;
    uniform vec2 mouse;
    
    void main() {
    
        // Output
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;