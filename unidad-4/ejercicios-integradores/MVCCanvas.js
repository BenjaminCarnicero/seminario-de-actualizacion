// EventTarget para notificar cambios
class Model extends EventTarget {
    constructor() {
        super();
        this._figures = [];
    }
    
    changed() {
        this.dispatchEvent(new CustomEvent('changed'));
    }

    addFigure(figure) {
        this._figures.push(figure);
        this.changed();
    }

    clearFigures() {
        this._figures = [];
        this.changed();
    }
}

// Vista que extiende HTMLElement (WebComponent <x-view>)
class View extends HTMLElement {
    constructor() {
        super();
        this._canvas = document.createElement('canvas');
        this._canvas.width = 800;
        this._canvas.height = 600;
        this._canvas.style.border = '1px solid black';
        this.ctx = this._canvas.getContext('2d');
        this.appendChild(this._canvas);

        this._break = document.createElement('br');
        this.appendChild(this._break);
    }

    addLineControls() {
        let labelLineType = document.createElement('span');
        labelLineType.innerText = "tipo de linea: ";
        this.appendChild(labelLineType);

        this._selectLineType = document.createElement('select');

        let option1 = document.createElement('option');
        option1.value = "solid";
        option1.innerText = "Sólida";

        let option2 = document.createElement('option');
        option2.value = "dashed";
        option2.innerText = "Punteada";

        this._selectLineType.appendChild(option1);
        this._selectLineType.appendChild(option2);

        this.appendChild(this._selectLineType);

        let labelThickness = document.createElement('span');
        labelThickness.innerText = " grosor: ";
        this.appendChild(labelThickness);

        this._selectThickness = document.createElement('input');
        this._selectThickness.type = "number";

        this.appendChild(this._selectThickness);
    }
    
    addFigureTypeControl() {
        this._selectFigureType = document.createElement('select');

        let option3 = document.createElement('option');
        option3.value = "circulo";
        option3.innerText = "Círculo";

        let option4 = document.createElement('option');
        option4.value = "poligono";
        option4.innerText = "Polígono";

        let option5 = document.createElement('option');
        option5.value = "cakeGraph";
        option5.innerText = "Gráfico de Torta";

        this._selectFigureType.appendChild(option3);
        this._selectFigureType.appendChild(option4);
        this._selectFigureType.appendChild(option5);

        this.appendChild(this._selectFigureType);
    }

    render(renderFunction) {
        this.clear();
        renderFunction(this._canvas);       
    }

    clear() {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
   
    connectedCallback() {
       console.log('Canvas agregado...');
    }

    disconnectedCallback() {}
    
    _onSave() {}
}
customElements.define('x-view', View);


class Controller {
    constructor(view, model) {
        this._view = view;
        this._model = model;
        this._drawFunction = null;
        this._onModelChanged = this.onModelChanged.bind(this);
        this._onViewRequest = this.onViewRequest.bind(this);
    }

    setDrawFunction(drawFunction) {
        this._drawFunction = drawFunction;
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
        this._view.render(this._renderFigures.bind(this));
    }

    onViewRequest(event) {}

    _renderFigures(canvas) {
        if (this._drawFunction) {
            this._drawFunction(canvas, this._model._figures);
        }
    }

    _loadFigures() {
        let text = prompt("Ingresa el JSON de la figura:");         
        if (!text) return;

        let figure = JSON.parse(text); 

        if (this._view._selectFigureType) {
            figure.type = this._view._selectFigureType.value;
        }

        if (this._view._selectLineType) {
            figure.lineType = this._view._selectLineType.value;
            figure.thickness = this._view._selectThickness.value;
        }

        this._model.addFigure(figure); 
    }

    _clear() {
        this._model.clearFigures();
    }
}