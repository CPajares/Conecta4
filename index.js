
let casillero = [
    ["c1", "c2", "c3", "c4", "c5", "c6", "c7"],
    ["c8", "c9", "c10", "c11", "c12", "c13", "c14"],
    ["c15", "c16", "c17", "c18", "c19", "c20", "c21"],
    ["c22", "c23", "c24", "c25", "c26", "c27", "c28"],
    ["c29", "c30", "c31", "c32", "c33", "c34", "c35"],
    ["c36", "c37", "c38", "c39", "c40", "c41", "c42"]
];
let turno = "ROJO";
let container = document.getElementById("container")
let containerInicial = document.getElementById("containerInicial")
let containerFinal = document.getElementById("containerFinalPartida")
let nombre1 = "ROJO"
let nombre2 = "AMARILLO"
let indexFila = null
let indexColumna = null

function checkCasilla(idColumna){ 
    setIndex(idColumna);
    if(casillero[indexFila][indexColumna] != "ROJO" && casillero[indexFila][indexColumna] != "AMARILLO"){   
            asiganarColor();
            cambiarTurno();  
    }
    checkEmpate();
    checkLine();
    checkColumn();
    checkDiagonal(); 
}

//Funcion para conocer el index de la celda a modificar al pulsar en la fila.

function setIndex(idColumna){ 
    if(casillero[5][idColumna] !="ROJO" && casillero[5][idColumna] !="AMARILLO"){
        indexFila = 5
        indexColumna = idColumna
    } else if(casillero[4][idColumna] !="ROJO" && casillero[4][idColumna] !="AMARILLO"){
        indexFila = 4
        indexColumna = idColumna
    } else if(casillero[3][idColumna] !="ROJO" && casillero[3][idColumna] !="AMARILLO"){
        indexFila = 3
        indexColumna = idColumna
    } else if(casillero[2][idColumna] !="ROJO" && casillero[2][idColumna] !="AMARILLO"){
        indexFila = 2
        indexColumna = idColumna
    } else if(casillero[1][idColumna] !="ROJO" && casillero[1][idColumna] !="AMARILLO"){
        indexFila = 1
        indexColumna = idColumna
    } else if(casillero[0][idColumna] !="ROJO" && casillero[0][idColumna] !="AMARILLO"){
        indexFila = 0
        indexColumna = idColumna
    }
}

//Función para modificar el color de la casilla
function asiganarColor(){
    let casilla = casillero[indexFila][indexColumna];
    let casillaHTML = document.getElementById(casilla)
    if(casillaHTML.style.backgroundColor === ""){ 
        if(turno ==="ROJO"){
        casillaHTML.style.backgroundColor="red";
        casillaHTML.style.boxShadow = "1px 1px 1px 1px black"

        } else if(turno ==="AMARILLO"){
         casillaHTML.style.backgroundColor = "yellow"
         casillaHTML.style.boxShadow = "1px 1px 1px 1px black"
        }
    }
    casillero[indexFila][indexColumna] = turno //Cambiamos array casillero
}

//Función para modificar el elemento turno actual
function cambiarTurno(){
    turnoHTML = document.getElementById("turnoActualP")
    if(turno === "ROJO"){
        turno = "AMARILLO"
        document.getElementById("turnoActual").style.backgroundColor ="yellow"
        turnoHTML.textContent = `${nombre2}`
    } else if (turno === "AMARILLO"){
        turno = "ROJO"
        document.getElementById("turnoActual").style.backgroundColor ="red"
        turnoHTML.textContent = `${nombre1}`
    }    
}

function checkLine(){
    for(let i = 0; i<casillero.length; i++){
        for(let j = 0; j<casillero[i].length;j++){
            if(i === indexFila){
                if(casillero[i][j] === casillero[i][j+1] && casillero[i][j+1] === casillero[i][j+2] && casillero[i][j+2] === casillero[i][j+3]){
                    finalPartida();
                }
            }
        }
    }
}

//Función para comprobar si tenemos 4 en columna
function checkColumn(){
    for(let i = 0; i<casillero.length; i++){
        for(let j = 0; j<casillero[i].length;j++){
            if(i === indexFila && j === indexColumna && indexFila<3){
                if(casillero[i][j] === casillero[i+1][j] && casillero[i+1][j] === casillero[i+2][j] && casillero[i+2][j] === casillero[i+3][j]){
                    finalPartida();
                } 
            }
        }
    }
}

//Función para chequear 4 iguales en diagonal.
function checkDiagonal(){
    for(let i = 0; i<casillero.length; i++){
        for(let j = 0; j<casillero[i].length;j++){
            //Para diagonal a la derecha /
            if(i!=5 && i!= 4 && i!=3 && j!=0 && j!=1 && j!=2){
                if(casillero[i][j] === casillero[i+1][j-1] && casillero[i+1][j-1] === casillero[i+2][j-2] && casillero[i+2][j-2] === casillero[i+3][j-3]){
                    finalPartida();
                }
            //Para diagonal a la izquierda \
            } else if(i!=0 && i!= 1 && i!=2 && j!=0 && j!=1 && j!=2){
                if(casillero[i][j] === casillero[i-1][j-1] && casillero[i-1][j-1] === casillero[i-2][j-2] && casillero[i-2][j-2] === casillero[i-3][j-3]){
                    finalPartida();
                }  
            }
        }
    }
}

function checkEmpate(){
    let contador = 0;
    for (let i = 0; i<casillero.length; i++){
        for(let j = 0; j<casillero[i].length;j++){
            if(casillero[i][j] === "ROJO" || casillero[i][j] === "AMARILLO"){
                contador +=1
            }
        }
    }
    if (contador === 42){
        document.getElementById("mensajeGanador").textContent = "Tablero completado:"
        document.getElementById("ganador").textContent = "EMPATE"
        document.getElementById("ganador").style.color = "white"
        displayFinal();
    }
}
//Para botón Jugar. Guardar nombres
function jugar(){
    if(document.getElementById("textRojo").value.length >0){
        nombre1 = document.getElementById("textRojo").value
    }
    if(document.getElementById("textAmarillo").value.length>0){
        nombre2 = document.getElementById("textAmarillo").value
    }
    document.getElementById("turnoActualP").textContent = nombre1
    document.getElementById("textRojo").value = ""
    document.getElementById("textAmarillo").value =""
    displayTablero();
}

//función para reiniciar.
function reiniciar(){
    turnoHTML = document.getElementById("turnoActualP")
    let casillas = document.getElementsByClassName("casilla")
    casillero = 
    [["c1", "c2", "c3", "c4", "c5", "c6", "c7"],
    ["c8", "c9", "c10", "c11", "c12", "c13", "c14"],
    ["c15", "c16", "c17", "c18", "c19", "c20", "c21"],
    ["c22", "c23", "c24", "c25", "c26", "c27", "c28"],
    ["c29", "c30", "c31", "c32", "c33", "c34", "c35"],
    ["c36", "c37", "c38", "c39", "c40", "c41", "c42"]];
    turno = "ROJO";
    turnoHTML.textContent = `Comienza ${nombre1}`
    document.getElementById("turnoActual").style.backgroundColor ="red"
    for(let i = 0; i<casillas.length; i++){
        if(casillas[i].style.backgroundColor==="red" || casillas[i].style.backgroundColor ==="yellow" ){
           casillas[i].style.backgroundColor = "";
           casillas[i].style.boxShadow = "5px 5px 5px 2px black"
        }
    }
}
//Función para botón salir
function salir(){
    reiniciar();
    displayInicial();
}
//función para mostrar pantalla final.
function finalPartida(){
    document.getElementById("mensajeGanador").textContent = "Ha ganado:"
    if(turno === "ROJO"){
        document.getElementById("ganador").textContent = nombre2;
        document.getElementById("ganador").style.color = "yellow"

    } else if (turno === "AMARILLO"){
        document.getElementById("ganador").textContent = nombre1;
        document.getElementById("ganador").style.color = "red"
    }       
    displayFinal();
}

//funciones para mostrar las diferentes pantallas:

function displayInicial(){
    containerFinal.style.visibility = "hidden"
    containerFinal.style.display = "none"
    containerInicial.style.visibility = "visible"
    containerInicial.style.display = "flex"
    container.style.visibility = "hidden"
    container.style.display = "none"
}

function displayTablero(){
    containerFinal.style.visibility = "hidden"
    containerFinal.style.display = "none"
    containerInicial.style.visibility = "hidden"
    containerInicial.style.display = "none"
    container.style.visibility = "visible"
    container.style.display = "flex"
}

function displayFinal(){
    containerFinal.style.visibility = "visible"
    containerFinal.style.display = "flex"
    containerInicial.style.visibility = "hidden"
    containerInicial.style.display = "none"
    container.style.visibility = "hidden"
    container.style.display = "none"
}







