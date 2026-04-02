// Funciones
function onBtn0Click() { display.value += '0'; }
function onBtn1Click() { display.value += '1'; }
function onBtn2Click() { display.value += '2'; }
function onBtn3Click() { display.value += '3'; }
function onBtn4Click() { display.value += '4'; }
function onBtn5Click() { display.value += '5'; }
function onBtn6Click() { display.value += '6'; }
function onBtn7Click() { display.value += '7'; }
function onBtn8Click() { display.value += '8'; }
function onBtn9Click() { display.value += '9'; }
function onBtnDotClick() { display.value += '.'; }

// Operaciones
function onBtnPlusClick() { display.value += '+'; }
function onBtnMinusClick() { display.value += '-'; }
function onBtnMultiplyClick() { display.value += '*'; }
function onBtnDivisionClick() { display.value += '/'; }

// Resultado y Borrar
function onBtnResultClick() {
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = "Error";
    }
}

function onBtnDeleteClick() {
    display.value = '';
}


function main() {

    btn0.onclick = onBtn0Click;
    btn1.onclick = onBtn1Click;
    btn2.onclick = onBtn2Click;
    btn3.onclick = onBtn3Click;
    btn4.onclick = onBtn4Click;
    btn5.onclick = onBtn5Click;
    btn6.onclick = onBtn6Click;
    btn7.onclick = onBtn7Click;
    btn8.onclick = onBtn8Click;
    btn9.onclick = onBtn9Click;

    // Botones de operacion
    btnDot.onclick = onBtnDotClick;
    btnPlus.onclick = onBtnPlusClick;
    btnMinus.onclick = onBtnMinusClick;
    btnMultiply.onclick = onBtnMultiplyClick;
    btnDivision.onclick = onBtnDivisionClick;
    btnDelete.onclick = onBtnDeleteClick;

    // Resultado
    btnResult.onclick = onBtnResultClick;
}


window.onload = main;