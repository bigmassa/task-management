export const readableTextColor = (color: string) => {
    if (!color) {
        return '#000000';
    }
    
    var brightStart = 123;
    function hexToRgb(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    var colourIsLight = function (r, g, b) {
        var a = (r * 299 + g * 587 + b * 114) / 1000;
        return (a > brightStart);
    };
    var bgRgb = hexToRgb(color);
    return colourIsLight(bgRgb.r, bgRgb.g, bgRgb.b) ? 'black' : 'white';
}