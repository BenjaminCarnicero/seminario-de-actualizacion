function ejercicio19(canvas, figures) {
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
        else if (currentFigure.type === "cakeGraph") {
            let slices = currentFigure.slices || [
                { label: "Item 1", percentage: 0.5 },
                { label: "Item 2", percentage: 0.5 }
            ];

            let xc = currentFigure.x || (canvas.width / 2);
            let yc = currentFigure.y || (canvas.height / 2);
            let radius = currentFigure.radio || 150;
            let accumulatedAngle = 0;

            for (let j = 0; j < slices.length; j++) {
                let slice = slices[j];
                let startAngle = accumulatedAngle * (2 * Math.PI);
                let endAngle = startAngle + (slice.percentage * (2 * Math.PI));

                let r = Math.floor(Math.random() * 200) + 30;
                let g = Math.floor(Math.random() * 200) + 30;
                let b = Math.floor(Math.random() * 200) + 30;

                ctx.beginPath();
                ctx.moveTo(xc, yc);
                ctx.arc(xc, yc, radius, startAngle, endAngle);
                ctx.closePath();
                
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.fill();
                ctx.stroke();

                accumulatedAngle += slice.percentage;

                
                let middleAngle = (startAngle + endAngle) / 2;
                let textRadius = radius / 1.5;
                let xText = xc + textRadius * Math.cos(middleAngle);
                let yText = yc + textRadius * Math.sin(middleAngle);
                
                ctx.fillStyle = "black";
                ctx.font = "bold 14px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(slice.label + " (" + (slice.percentage * 100) + "%)", xText, yText);
            }
        }
    }
}