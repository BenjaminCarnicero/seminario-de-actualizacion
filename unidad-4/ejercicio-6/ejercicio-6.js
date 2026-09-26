// Funciones para los objetos delass figuras

function createCircle(x, y, radius, filled = null) {
    return {
        type: 'circle',
        x: x,
        y: y,
        radius: radius,
        filled: filled
    };
}

function createPolygon(points, filled = null) {
    return {
        type: 'polygon',
        points: points,
        filled: filled
    };
}