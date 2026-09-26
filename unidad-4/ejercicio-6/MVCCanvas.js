// EventTarget para notificar cambios
class Model extends EventTarget {
    constructor() {
        super();
        this.figures = [];
    }
    
    addFigure(figure) {
        this.figures.push(figure);
        this.changed();
    }

    clearFigures() {
        this.figures = [];
        this.changed();
    }

    changed() {
        this.dispatchEvent(new CustomEvent('changed'));
    }
}

// Vista que extiende HTMLElement (WebComponent <x-view>)
class View extends HTMLElement {
    constructor() {
        super();
        this._canvas = document.createElement('canvas');
        this.btnLoadFigure = document.createElement('button');
        this.btnClear = document.createElement('button');

        this._canvas.width = 800;
        this._canvas.height = 600;
        this._canvas.style.border = '1px solid black';
        this.ctx = this._canvas.getContext('2d');

        this.btnLoadFigure.innerText = "Cargar figuras";
        this.btnClear.innerText = "Limpiar";

        this.append(this._canvas);
        this.append(this.btnLoadFigure);
        this.append(this.btnClear);
    }
    
    render(figures) {
        this.clear();
        for (let i = 0; i < figures.length; i++) {
            const figure = figures[i];

            this.ctx.beginPath();
            
            if (figure.type === 'circle') {
                this.ctx.arc(figure.x, figure.y, figure.radius, 0, 2 * Math.PI);
            } else if (figure.type === 'polygon' && figure.points.length > 0) {
                this.ctx.moveTo(figure.points[0].x, figure.points[0].y);

                for (let j = 1; j < figure.points.length; j++) {
                    this.ctx.lineTo(figure.points[j].x, figure.points[j].y);
                }
                this.ctx.closePath();
            }
            this.ctx.stroke();
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
   
    connectedCallback() {
        this.btnLoadFigure.onclick = this.onLoadClick.bind(this);
        this.btnClear.onclick = this.onClearClick.bind(this);
    }

    disconnectedCallback() {
        this.btnLoadFigure.onclick = null;
        this.btnClear.onclick = null;
    }
    
    onLoadClick() {
        this.dispatchEvent(new CustomEvent('request', { 
            detail: { action: 'load' },
            bubbles: true 
        }));
    }

    onClearClick() {
        this.dispatchEvent(new CustomEvent('request', { 
            detail: { action: 'clear' },
            bubbles: true 
        }));
    }
}
customElements.define('x-view', View);

// Controlador
class Controller {
    constructor(view, model) {
        this._view = view;
        this._model = model;
        this._onModelChanged = this.onModelChanged.bind(this);
        this._onViewRequest = this.onViewRequest.bind(this);
    }

    enable() {
        this._model.addEventListener('changed', this._onModelChanged);
        this._view.addEventListener('request', this._onViewRequest);
    }

    disable() {
        this._model.removeEventListener('changed', this._onModelChanged);
        this._view.removeEventListener('request', this._onViewRequest);
    }

    onModelChanged() {
        this._view.render(this._model.figures); 
    }

    onViewRequest(event) {
        const detail = event.detail;
        const action = detail.action;

        if (action === 'load') {
            let newFigure;
            const x = Math.floor(Math.random() * 650) + 50;
            const y = Math.floor(Math.random() * 450) + 50;

            const randomType = Math.floor(Math.random() * 3);

            if (randomType === 0) {
                newFigure = createCircle(x, y, 30);
            } else if (randomType === 1) {
                newFigure = createPolygon([
                    { x: x, y: y },
                    { x: x + 40, y: y + 60 },
                    { x: x - 40, y: y + 60 }
                ]);
            } else {
                const side = 50;
                newFigure = createPolygon([
                    { x: x, y: y },
                    { x: x + side, y: y },
                    { x: x + side, y: y + side },
                    { x: x, y: y + side }
                ]);
            }

            this._model.addFigure(newFigure);

        } else if (action === 'clear') {
            this._model.clearFigures();
        }
    }
}