/**
 * Contains utility functions.
 */
export default class Util {

    /**
     * Generates a texture on offscreen canvas with a given generator function.
     *
     * @param    {Function}  generator  Generator function to make the texture with. Drawing context and texture size passed
     * @returns  {THREE.Texture}        Generated Three.js texture object
     */
    static generateTexture (generator) {

        // Prepare offscreen canvas to draw on
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.style = "position:fixed; bottom: 0; opacity: 0;";  // @todo remove this
        document.body.appendChild(canvas);                        // @todo remove this

        // Select a power-of-two texture size nearest to the screen dimensions
        const screenSide = Math.min(document.body.clientWidth, document.body.clientHeight);
        for (let textureSizes = [64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384], i = 0; i < textureSizes.length; i++) {
            if (screenSide <= textureSizes[i]) {
                var textureSize = textureSizes[i];
                break;
            }
        }
        canvas.width = canvas.height = textureSize;

        // Generate and return the texture
        generator(context, textureSize);
        const texture = new THREE.Texture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.needsUpdate = true;
        return texture;
    }

    /**
     * Draws a 4-pointed star on a canvas.
     *
     * @param    {CanvasRenderingContext2D}  context  Canvas context to draw in
     * @param    {Number}                    x        X coordinate of star center
     * @param    {Number}                    y        Y coordinate of star center
     * @param    {Number}                    radius   Star radius
     * @param    {String}                    color    Star color in any form accepted by Canvas 2D API
     * @returns  {CanvasRenderingContext2D}           The drawing context initially passed in
     */
    static drawStar (context, x, y, radius, color) {

        // Draw 4 arcs with star center as the reference point and fill the resulting figure
        context.beginPath();
        context.moveTo(x, y - radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.quadraticCurveTo(x, y, x, y + radius);
        context.quadraticCurveTo(x, y, x - radius, y);
        context.quadraticCurveTo(x, y, x, y - radius);
        context.closePath();
        context.fillStyle = color;
        context.fill();
        return context;
    }

    /**
     * Draws a shaded 4-pointed star on a canvas.
     *
     * @param    {CanvasRenderingContext2D}  context     Canvas context to draw in
     * @param    {Number}                    x           X coordinate of star center
     * @param    {Number}                    y           Y coordinate of star center
     * @param    {Number}                    radius      Star radius
     * @param    {Number}                    hue         Color hue, integer 0..360
     * @param    {Number}                    saturation  Color saturation, integer 0..100
     * @param    {Number}                    lightness   Color lightness, integer 0..100
     * @param    {Number}                    shadeCount  Number of drawing steps
     * @returns  {CanvasRenderingContext2D}              The drawing context initially passed in
     */
    static drawShadedStar (context, x, y, radius, hue, saturation, lightness, shadeCount) {

        // Draw shadeCount stars of decreasing radius, from transparent to opaque
        for (let shadeIndex = shadeCount; shadeIndex > 0; shadeIndex--) {
            Util.drawStar(
                context,                  // Drawing context
                x,                        // X position
                y,                        // Y position
                shadeIndex / shadeCount * radius,  // Radius
                `hsla(${hue}, ${saturation}%, ${lightness}%, ${(shadeCount - shadeIndex + 1) / shadeCount})`  // Color
            );
        }
        return context;
    }

    /**
     * Fills a canvas with stars.
     * @param    {CanvasRenderingContext2D}  context              Canvas context to draw in
     * @param    {Number}                    starCount            Number of stars to draw
     * @param    {Number}                    radius               Star radius
     * @param    {Number}                    radiusVariation      Maximum absolute deviation from radius
     * @param    {Number}                    hue                  Color hue, integer 0..360
     * @param    {Number}                    hueVariation         Maximum absolute deviation from hue
     * @param    {Number}                    saturation           Color saturation, integer 0..100
     * @param    {Number}                    saturationVariation  Maximum absolute deviation from saturation
     * @returns  {CanvasRenderingContext2D}                       The drawing context initially passed in
     */
    static drawStarField (context, starCount, radius, radiusVariation, hue, hueVariation, saturation, saturationVariation) {

        // Draw shaded stars one by one, applying random variation in hue, saturation and radius
        const fieldWidth = context.canvas.clientWidth;
        const fieldHeight = context.canvas.clientHeight;
        for (let starIndex = 0; starIndex < starCount; starIndex++) {
            Util.drawShadedStar(
                context,                                                       // Drawing context
                Math.random() * fieldWidth,                                    // X position
                Math.random() * fieldHeight,                                   // Y position
                radius + (Math.random() - 0.5) * radiusVariation * 2,          // Radius
                hue + (Math.random() - 0.5) * hueVariation * 2,                // Hue
                saturation + (Math.random() - 0.5) * saturationVariation * 2,  // Saturation
                50 + (Math.random() - 0.5) * 100,                              // Lightness
                3                                                              // Shades per star
            );
        }
        return context;
    }
}