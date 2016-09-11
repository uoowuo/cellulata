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
 * Slight white-tinted overlay
 */
Shaders.highlight = `
    precision mediump float;

    uniform sampler2D uSampler;
    varying vec2 vTextureCoord;
    
    void main() {
        
        vec4 texture = texture2D(uSampler, vTextureCoord);
        
        // Output
        gl_FragColor = mix(texture, vec4(1.0, 1.0, 1.0, 1.0), 0.25);
    }
`;

/**
 * White-tinted transparent border
 */
Shaders.transparentBorder = `
    precision mediump float;

    uniform vec2 resolution;
    uniform sampler2D uSampler;
    varying vec2 vTextureCoord;
    
    void main() {
        
        const float borderWidth = 2.0;
        const vec4 borderColor = vec4(1.0, 1.0, 1.0, 1.0);
        
        // If within border, mix with preset color
        vec4 texture = texture2D(uSampler, vTextureCoord);
        if (gl_FragCoord.y >= resolution.y - 1.0 - borderWidth ||  // Top
            gl_FragCoord.x >= resolution.x - 1.0 - borderWidth ||  // Right
            gl_FragCoord.y <= borderWidth ||                       // Bottom
            gl_FragCoord.x <= borderWidth                          // Left
        ) {
            gl_FragColor = mix(texture, borderColor, 0.25);
        } else {
            gl_FragColor = texture;
        }
    }
`;
//
// /**
//  * White-tinted transparent border
//  */
// Shaders.transparentBorder = `
//     precision mediump float;
//
//     uniform vec2 resolution;
//     uniform sampler2D uSampler;
//     varying vec2 vTextureCoord;
//
//     void main() {
//
//         const float borderWidth = 1.0;
//         const vec4 borderColor = vec4(1.0, 1.0, 1.0, 1.0);
//
//         // If within border, mix with preset color
//         vec4 texture = texture2D(uSampler, vTextureCoord);
//         if (gl_FragCoord.x >= 1.0) {
//             gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
//         } else {
//             gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
//         }
//     }
// `;