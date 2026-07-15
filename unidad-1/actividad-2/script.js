// Funcion Auxiliar
function createCalculatorButton(id, text, typeClass) {
    // Construcción del elemento
    const button = document.createElement('button');
    const textNode = document.createTextNode(text);
    button.append(textNode);

    // Clases y Estilos
    button.id = id;
    if (typeClass) {
        button.classList.add(typeClass);
    }
    
    return button;
}



// WebComponent calculadora
class Calculator extends HTMLElement {
    constructor() {
        super();

        
        const table = document.createElement('table');
        
        // Fila del Display
        const rowDisplay = document.createElement('tr');
        const cellDisplay = document.createElement('td');
        this.display = document.createElement('input');

        // Filas de Botones
        const row1 = document.createElement('tr');
        const row2 = document.createElement('tr');
        const row3 = document.createElement('tr');
        const row4 = document.createElement('tr');
        const row5 = document.createElement('tr');

        const cellBtn7 = document.createElement('td');
        const cellBtn8 = document.createElement('td');
        const cellBtn9 = document.createElement('td');
        const cellBtnPlus = document.createElement('td');

        const cellBtn4 = document.createElement('td');
        const cellBtn5 = document.createElement('td');
        const cellBtn6 = document.createElement('td');
        const cellBtnMinus = document.createElement('td');

        const cellBtn3 = document.createElement('td');
        const cellBtn2 = document.createElement('td');
        const cellBtn1 = document.createElement('td');
        const cellBtnMultiply = document.createElement('td');

        const cellBtn0 = document.createElement('td');
        const cellBtnDot = document.createElement('td');
        const cellBtnResult = document.createElement('td');
        const cellBtnDivision = document.createElement('td');

        const cellBtnDelete = document.createElement('td');

        // Instanciar los botones con la funcion auxuliar
        this._btn7 = createCalculatorButton('btn7', '7');
        this._btn8 = createCalculatorButton('btn8', '8');
        this._btn9 = createCalculatorButton('btn9', '9');
        this._btnPlus = createCalculatorButton('btnPlus', '+', 'btn-op');

        this._btn4 = createCalculatorButton('btn4', '4');
        this._btn5 = createCalculatorButton('btn5', '5');
        this._btn6 = createCalculatorButton('btn6', '6');
        this._btnMinus = createCalculatorButton('btnMinus', '-', 'btn-op');

        this._btn3 = createCalculatorButton('btn3', '3');
        this._btn2 = createCalculatorButton('btn2', '2');
        this._btn1 = createCalculatorButton('btn1', '1');
        this._btnMultiply = createCalculatorButton('btnMultiply', '*', 'btn-op');

        this._btn0 = createCalculatorButton('btn0', '0');
        this._btnDot = createCalculatorButton('btnDot', '.');
        this._btnResult = createCalculatorButton('btnResult', '=', 'btn-res');
        this._btnDivision = createCalculatorButton('btnDivision', '/', 'btn-op');

        this._btnDelete = createCalculatorButton('btnDelete', 'Borrar', 'btnDelete');

        
        cellDisplay.append(this.display);
        rowDisplay.append(cellDisplay);

        cellBtn7.append(this._btn7);
        cellBtn8.append(this._btn8);
        cellBtn9.append(this._btn9);
        cellBtnPlus.append(this._btnPlus);
        row1.append(cellBtn7, cellBtn8, cellBtn9, cellBtnPlus);

        cellBtn4.append(this._btn4);
        cellBtn5.append(this._btn5);
        cellBtn6.append(this._btn6);
        cellBtnMinus.append(this._btnMinus);
        row2.append(cellBtn4, cellBtn5, cellBtn6, cellBtnMinus);

        cellBtn3.append(this._btn3);
        cellBtn2.append(this._btn2);
        cellBtn1.append(this._btn1);
        cellBtnMultiply.append(this._btnMultiply);
        row3.append(cellBtn3, cellBtn2, cellBtn1, cellBtnMultiply);

        cellBtn0.append(this._btn0);
        cellBtnDot.append(this._btnDot);
        cellBtnResult.append(this._btnResult);
        cellBtnDivision.append(this._btnDivision);
        row4.append(cellBtn0, cellBtnDot, cellBtnResult, cellBtnDivision);

        cellBtnDelete.append(this._btnDelete);
        row5.append(cellBtnDelete);

        table.append(rowDisplay, row1, row2, row3, row4, row5);
        this.append(table);

        this.display.id = 'display';
        this.display.type = 'text';
        this.display.value = '';
        this.display.disabled = true;

        cellDisplay.colSpan = 4;
        cellBtnDelete.colSpan = 4;
    }

    // Los metodos de la calculadora 
    onBtn0Click() { this.display.value += '0'; }
    onBtn1Click() { this.display.value += '1'; }
    onBtn2Click() { this.display.value += '2'; }
    onBtn3Click() { this.display.value += '3'; }
    onBtn4Click() { this.display.value += '4'; }
    onBtn5Click() { this.display.value += '5'; }
    onBtn6Click() { this.display.value += '6'; }
    onBtn7Click() { this.display.value += '7'; }
    onBtn8Click() { this.display.value += '8'; }
    onBtn9Click() { this.display.value += '9'; }
    onBtnDotClick() { this.display.value += '.'; }
    onBtnPlusClick() { this.display.value += '+'; }
    onBtnMinusClick() { this.display.value += '-'; }
    onBtnMultiplyClick() { this.display.value += '*'; }
    onBtnDivisionClick() { this.display.value += '/'; }

    onBtnResultClick() {
        try {
            this.display.value = eval(this.display.value);
        } catch (e) {
            this.display.value = 'Error';
        }
    }

    onBtnDeleteClick() {
        this.display.value = '';
    }

    
    connectedCallback() {
        
        this._handle0 = this.onBtn0Click.bind(this);
        this._handle1 = this.onBtn1Click.bind(this);
        this._handle2 = this.onBtn2Click.bind(this);
        this._handle3 = this.onBtn3Click.bind(this);
        this._handle4 = this.onBtn4Click.bind(this);
        this._handle5 = this.onBtn5Click.bind(this);
        this._handle6 = this.onBtn6Click.bind(this);
        this._handle7 = this.onBtn7Click.bind(this);
        this._handle8 = this.onBtn8Click.bind(this);
        this._handle9 = this.onBtn9Click.bind(this);
        
        this._handleDot = this.onBtnDotClick.bind(this);
        this._handlePlus = this.onBtnPlusClick.bind(this);
        this._handleMinus = this.onBtnMinusClick.bind(this);
        this._handleMultiply = this.onBtnMultiplyClick.bind(this);
        this._handleDivision = this.onBtnDivisionClick.bind(this);
        this._handleResult = this.onBtnResultClick.bind(this);
        this._handleDelete = this.onBtnDeleteClick.bind(this);

        // Asignación de manejadores
        this._btn0.onclick = this._handle0;
        this._btn1.onclick = this._handle1;
        this._btn2.onclick = this._handle2;
        this._btn3.onclick = this._handle3;
        this._btn4.onclick = this._handle4;
        this._btn5.onclick = this._handle5;
        this._btn6.onclick = this._handle6;
        this._btn7.onclick = this._handle7;
        this._btn8.onclick = this._handle8;
        this._btn9.onclick = this._handle9;

        this._btnDot.onclick = this._handleDot;
        this._btnPlus.onclick = this._handlePlus;
        this._btnMinus.onclick = this._handleMinus;
        this._btnMultiply.onclick = this._handleMultiply;
        this._btnDivision.onclick = this._handleDivision;
        this._btnResult.onclick = this._handleResult;
        this._btnDelete.onclick = this._handleDelete;
    }

    disconnectedCallback() {
        // Anulacion de manejadores
        this._btn0.onclick = null;
        this._btn1.onclick = null;
        this._btn2.onclick = null;
        this._btn3.onclick = null;
        this._btn4.onclick = null;
        this._btn5.onclick = null;
        this._btn6.onclick = null;
        this._btn7.onclick = null;
        this._btn8.onclick = null;
        this._btn9.onclick = null;

        this._btnDot.onclick = null;
        this._btnPlus.onclick = null;
        this._btnMinus.onclick = null;
        this._btnMultiply.onclick = null;
        this._btnDivision.onclick = null;
        this._btnResult.onclick = null;
        this._btnDelete.onclick = null;
    }
}

// Registro del componente
customElements.define('x-calculator', Calculator);