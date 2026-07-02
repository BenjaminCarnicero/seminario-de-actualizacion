
// 1. Modelo (herencia)
class CalculatorModel extends EventTarget {
    constructor() {
        super();
        this._expression = ''; 
    }

    get expression() {
        return this._expression;
    }

    appendCharacter(char) {
        this._expression += char;
        this._changed();
    }

    clear() {
        this._expression = '';
        this._changed();
    }

    calculate() {
        if (this._expression === '') return;
        try {
            this._expression = String(eval(this._expression));
        } catch (e) {
            this._expression = "Error";
        }
        this._changed();
    }

    _changed() {
        this.dispatchEvent(new CustomEvent('changed'));
    }
}



// 2. Vista

class CalculatorView extends HTMLElement {
    constructor() {
        super();
        
        
        this._table = document.createElement('table');
        
        // Fila del Display
        const rowDisplay = document.createElement('tr');
        const tdDisplay = document.createElement('td');
        tdDisplay.colSpan = 4;
        
        this._display = document.createElement('input');
        this._display.id = 'display';
        this._display.type = 'text';
        this._display.disabled = true;
        
        tdDisplay.append(this._display);
        rowDisplay.append(tdDisplay);
        this._table.append(rowDisplay);

        // Matriz para mapear y crear los botones de forma limpia
        const botones = [
            [{ id: 'btn7', text: '7' }, { id: 'btn8', text: '8' }, { id: 'btn9', text: '9' }, { id: 'btnPlus', text: '+', class: 'btn-op' }],
            [{ id: 'btn4', text: '4' }, { id: 'btn5', text: '5' }, { id: 'btn6', text: '6' }, { id: 'btnMinus', text: '-', class: 'btn-op' }],
            [{ id: 'btn3', text: '3' }, { id: 'btn2', text: '2' }, { id: 'btn1', text: '1' }, { id: 'btnMultiply', text: '*', class: 'btn-op' }],
            [{ id: 'btn0', text: '0' }, { id: 'btnDot', text: '.' }, { id: 'btnResult', text: '=', class: 'btn-res' }, { id: 'btnDivision', text: '/', class: 'btn-op' }]
        ];

        // Estructura para armar las filas usando .append()
        const self = this;
        botones.forEach(function(filaData) {
            const row = document.createElement('tr');
            filaData.forEach(function(btnData) {
                const td = document.createElement('td');
                const btn = document.createElement('button');
                btn.id = btnData.id;
                btn.innerText = btnData.text;
                if (btnData.class) {
                    btn.className = btnData.class;
                }
                td.append(btn);
                row.append(td);
            });
            self._table.append(row);
        });

        // Fila del botón Borrar
        const rowDelete = document.createElement('tr');
        const tdDelete = document.createElement('td');
        tdDelete.colSpan = 4;
        
        this._btnDelete = document.createElement('button');
        this._btnDelete.id = 'btnDelete';
        this._btnDelete.className = 'btnDelete';
        this._btnDelete.innerText = 'Borrar';
        
        tdDelete.append(this._btnDelete);
        rowDelete.append(tdDelete);
        this._table.append(rowDelete);

        
        this.append(this._table);
    }

    
    set displayValue(value) {
        this._display.value = value;
    }

    connectedCallback() {
        this._table.onclick = this._onButtonClick.bind(this);
    }

    disconnectedCallback() {
        // Limpieza de memoria igualando a null
        this._table.onclick = null;
    }

    // Traduccion de eventos
    _onButtonClick(event) {
        if (event.target.tagName !== 'BUTTON') return;

        const targetId = event.target.id;
        let actionType = '';
        let targetValue = '';

        if (targetId === 'btnResult') {
            actionType = 'evaluate';
        } else if (targetId === 'btnDelete') {
            actionType = 'clear';
        } else {
            actionType = 'input';
            targetValue = event.target.innerText;
        }

        
        this.dispatchEvent(new CustomEvent('request', {
            detail: {
                action: actionType,
                value: targetValue
            }
        }));
    }
}
customElements.define('x-calculator', CalculatorView);



// 3. Controlador
class CalculatorController {
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
        this._view.displayValue = this._model.expression;
    }

    onViewRequest(event) {
        const action = event.detail.action;
        const value = event.detail.value;

        if (action === 'input') {
            this._model.appendCharacter(value);
        } else if (action === 'clear') {
            this._model.clear();
        } else if (action === 'evaluate') {
            this._model.calculate();
        }
    }
}


window.onload = function() {
    const model = new CalculatorModel();
    const view = document.querySelector('x-calculator');
    
    const controller = new CalculatorController(view, model);
    controller.enable();
};