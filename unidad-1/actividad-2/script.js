class Calculator extends HTMLElement {
    constructor() {
        super();
        // Uso tabla original
        this.innerHTML = `
            <table>
                <tr>
                    <td colspan="4">
                        <input id="display" type="text" value="" disabled>
                    </td>
                </tr>
                <tr>
                    <td><button id="btn7">7</button></td>
                    <td><button id="btn8">8</button></td>
                    <td><button id="btn9">9</button></td>
                    <td><button id="btnPlus" class="btn-op">+</button></td>
                </tr>
                <tr>
                    <td><button id="btn4">4</button></td>
                    <td><button id="btn5">5</button></td>
                    <td><button id="btn6">6</button></td>
                    <td><button id="btnMinus" class="btn-op">-</button></td>
                </tr>
                <tr>
                    <td><button id="btn3">3</button></td>
                    <td><button id="btn2">2</button></td>
                    <td><button id="btn1">1</button></td>
                    <td><button id="btnMultiply" class="btn-op">*</button></td>
                </tr>
                <tr>
                    <td><button id="btn0">0</button></td>
                    <td><button id="btnDot">.</button></td>
                    <td><button id="btnResult" class="btn-res">=</button></td>
                    <td><button id="btnDivision" class="btn-op">/</button></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <button id="btnDelete" class="btnDelete">Borrar</button>
                    </td>
                </tr>
            </table>
        `;

        
        this.display = this.querySelector('#display');
    }

    //Metodos
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
            this.display.value = "Error";
        }
    }

    onBtnDeleteClick() {
        this.display.value = '';
    }

    
    connectedCallback() {
        
        this.querySelector('#btn0').onclick = this.onBtn0Click.bind(this);
        this.querySelector('#btn1').onclick = this.onBtn1Click.bind(this);
        this.querySelector('#btn2').onclick = this.onBtn2Click.bind(this);
        this.querySelector('#btn3').onclick = this.onBtn3Click.bind(this);
        this.querySelector('#btn4').onclick = this.onBtn4Click.bind(this);
        this.querySelector('#btn5').onclick = this.onBtn5Click.bind(this);
        this.querySelector('#btn6').onclick = this.onBtn6Click.bind(this);
        this.querySelector('#btn7').onclick = this.onBtn7Click.bind(this);
        this.querySelector('#btn8').onclick = this.onBtn8Click.bind(this);
        this.querySelector('#btn9').onclick = this.onBtn9Click.bind(this);
        
        this.querySelector('#btnDot').onclick = this.onBtnDotClick.bind(this);
        this.querySelector('#btnPlus').onclick = this.onBtnPlusClick.bind(this);
        this.querySelector('#btnMinus').onclick = this.onBtnMinusClick.bind(this);
        this.querySelector('#btnMultiply').onclick = this.onBtnMultiplyClick.bind(this);
        this.querySelector('#btnDivision').onclick = this.onBtnDivisionClick.bind(this);
        this.querySelector('#btnDelete').onclick = this.onBtnDeleteClick.bind(this);
        this.querySelector('#btnResult').onclick = this.onBtnResultClick.bind(this);
    }
}

// Registr0 del componente
customElements.define('x-calculator', Calculator);