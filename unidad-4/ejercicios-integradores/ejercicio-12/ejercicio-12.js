function ejercicio12(canvas, figures) {
    let ctx = canvas.getContext('2d');

    for (let i = 0; i < figures.length; i++) {
        let currentFigure = figures[i];
        let ia = 0;
        let fa = 2 * Math.PI;

        ctx.lineWidth = currentFigure.thickness || 1;
        
        if (currentFigure.lineType === "solid") {
            ctx.setLineDash([]);
        } else {
            ctx.setLineDash([5, 15]);
        }

        if (currentFigure.type === "circulo") {
            ctx.beginPath();
            ctx.arc(currentFigure.x, currentFigure.y, currentFigure.radio, ia, fa);
            ctx.stroke();
        }
        else if (currentFigure.type === "poligono") {
            ctx.beginPath();
            ctx.moveTo(currentFigure.points[0][0] + currentFigure.x, currentFigure.points[0][1] + currentFigure.y);

            for (let point = 1; point < currentFigure.points.length; point++) {
                ctx.lineTo(currentFigure.points[point][0] + currentFigure.x, currentFigure.points[point][1] + currentFigure.y);
            }

            ctx.closePath();
            ctx.stroke();
        }
    }
}