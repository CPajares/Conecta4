
let casillero = [
    ["c1", "c2", "c3", "c4", "c5", "c6", "c7"],
    ["c8", "c9", "c10", "c11", "c12", "c13", "c14"],
    ["c15", "c16", "c17", "c18", "c19", "c20", "c21"],
    ["c22", "c23", "c24", "c25", "c26", "c27", "c28"],
    ["c29", "c30", "c31", "c32", "c33", "c34", "c35"],
    ["c36", "c37", "c38", "c39", "c40", "c41", "c42"]
];
let turno = "ROJO"; //Guarda turno y se actualiza entre ROJO y AMARILLO.
let container = document.getElementById("container")
let containerInicial = document.getElementById("containerInicial")
let containerFinal = document.getElementById("containerFinalPartida")
let nombre1 = "ROJO"
let nombre2 = "AMARILLO"
let indexFila = null //determinará el array a elegir dentro de casillero -- casillero[indexFila]
let indexColumna = null // determina el elemento dentro del array -- casillero[indexFila][indexColumna]
let swTwoPlayers = true; // determina si son dos jugadores o uno contra CPU
let swPartidaTerminada = false; 

//onclick en botón jugar en HTML. Guarda nombres, aplica estilos + displayTablero
function iniciarJuego(){
    if(document.getElementById("textRojo").value.length >0){
        nombre1 = document.getElementById("textRojo").value
    }
    if(document.getElementById("textAmarillo").value.length>0){
        nombre2 = document.getElementById("textAmarillo").value
    }
    document.getElementById("turnoActualP").textContent = nombre1
    document.getElementById("textRojo").value = ""
    document.getElementById("textAmarillo").value =""
    if(swTwoPlayers === false){
        nombre2 = "CPU";
    }
    displayTablero();
}

//Función que se activa al clickar en una columna (onclick en HTML) y recibe el parametro idColumna, diferente según la columna
function checkCasilla(idColumna){ 
    setIndex(idColumna);
    if(casillero[indexFila][indexColumna] != "ROJO" && casillero[indexFila][indexColumna] != "AMARILLO"){  
        efectoSonido();
        soltarFicha(idColumna);   
    }
}

//Funcion para conocer, dado el idColumna, el parametro indexFila correspondiente.
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

//función que simula visualmente la caida de la ficha e implica cambio de turno.
function soltarFicha(idColumna){
    let contador = 0;
    let contador2 = 0;
    let id = setInterval(colorearCasilla,10); //Coloreamos casillas cada 10 ms
    let id2 = setInterval(quitarColorCasilla,18)//Quitamos color de casillas cada 18 ms
    let color = "red"
    if(turno === "AMARILLO"){
        color="yellow"
    }
    //Colorea de rojo o amarillo las casillas de esa columna
    function colorearCasilla(){
        if (indexFila>=0){ 
            let casillaHTML2 = casillero[contador][idColumna]
                document.getElementById(casillaHTML2).style.backgroundColor = color
            if (contador === indexFila){
                clearInterval(id)
            }
            contador ++  
        }
    }
    //Quita el color de las casillas de esa columna y realiza cambio de turno
    function quitarColorCasilla(){
        if (indexFila>=0){
            let casillaHTML3 = casillero[contador2][idColumna]
                document.getElementById(casillaHTML3).style.backgroundColor = ""
            if (contador2 === indexFila){
                clearInterval(id2);
                pasarTurno();
                //Si hemos elegido jugar contra CPU turnoCPU();
                if(turno === "AMARILLO" && swTwoPlayers === false){
                    turnoCPU();        
                }
            }
            contador2 ++
        }
    }
}

//Comprobaciones de resultados y actualizacion de turno y color.
function pasarTurno(){
    asignarColor(); //se asigna color a la casilla
    casillero[indexFila][indexColumna] = turno //Cambiamos array casillero
    cambiarTurno();
    checkEmpate();
    checkVictoria();
}

//comprueba si hay 4 fichas seguidas en horizontal, vertical y diagonal.
function checkVictoria(){  
    checkLine(); 
    checkColumn();
    checkDiagonal();
}

//Función para modificar el color de la casilla. El contenido del casillero es igual al id en HTML, así modificamos el color.
function asignarColor(){
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
    casillero[indexFila][indexColumna] = turno //Actualizamos la casilla en función al turno actual.
}

//Función para modificar el elemento turno actual y aplicamos cambios de estilo correspondientes.
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

//función que comprueba si el tablero esta lleno, empate y en este caso termina partida + aplica estilos.
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
        document.getElementById("mensajeGanador").textContent = "Tablero completado"
        document.getElementById("ganador").textContent = "EMPATE"
        document.getElementById("ganador").style.color = "white"
        displayFinal();
    }
}

//Recorremos el casillero en base a la fila de la ficha introducida (indexFila) y comprobamos si hay 4 coincidencias en horizontal.
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

//Recorremos el casillero en base a la columna y la fila de la ficha introducida y comprobamos si hay 4 coincidencias en vertical.
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

//Para chequear en diagonal solo hacemos comprobacion de parte del casillero en cada direccion.
function checkDiagonal(){
    for(let i = 0; i<casillero.length; i++){
        for(let j = 0; j<casillero[i].length;j++){
            //Para diagonal a la derecha (/)solo chequeamos la parte superior derecha del casillero
            if(i!=5 && i!= 4 && i!=3 && j!=0 && j!=1 && j!=2){
                if(casillero[i][j] === casillero[i+1][j-1] && casillero[i+1][j-1] === casillero[i+2][j-2] && casillero[i+2][j-2] === casillero[i+3][j-3]){
                    finalPartida();
                }
            //Para diagonal a la izquierda (\) solo chequeamos la parte inferior derecha del casillero
            } else if(i!=0 && i!= 1 && i!=2 && j!=0 && j!=1 && j!=2){
                if(casillero[i][j] === casillero[i-1][j-1] && casillero[i-1][j-1] === casillero[i-2][j-2] && casillero[i-2][j-2] === casillero[i-3][j-3]){
                    finalPartida();
                }  
            }
        }
    }
}

//función para reiniciar valores.
function reiniciar(){
    swPartidaTerminada = false;
    turnoHTML = document.getElementById("turnoActualP")
    document.getElementById("turnoActual").style.display = "flex"
    document.getElementById("reiniciar").style.display = ""
    document.getElementById("salir").style.display = ""
    document.getElementById("linea").style.display = "none"
    document.getElementById("tablero").style.pointerEvents = "auto";
    let casillas = document.getElementsByClassName("casilla")
    casillero = 
    [["c1", "c2", "c3", "c4", "c5", "c6", "c7"],
    ["c8", "c9", "c10", "c11", "c12", "c13", "c14"],
    ["c15", "c16", "c17", "c18", "c19", "c20", "c21"],
    ["c22", "c23", "c24", "c25", "c26", "c27", "c28"],
    ["c29", "c30", "c31", "c32", "c33", "c34", "c35"],
    ["c36", "c37", "c38", "c39", "c40", "c41", "c42"]];
    turno = "ROJO";
    turnoHTML.textContent = `${nombre1}`
    document.getElementById("turnoActual").style.backgroundColor ="red"
    for(let i = 0; i<casillas.length; i++){
        if(casillas[i].style.backgroundColor==="red" || casillas[i].style.backgroundColor ==="yellow" ){
           casillas[i].style.backgroundColor = "";
           casillas[i].style.boxShadow = "5px 5px 5px 2px black"
        }
    }
}

//Función para botón salir de HTML, nos devuelve a pantalla inicial.
function salir(){
    nombre1 = "ROJO"
    nombre2 = "AMARILLO"
    reiniciar();
    displayInicial();
}

//muestra estiloVictoria, en 3 segundos muestra pantalla final.
function finalPartida(){
    swPartidaTerminada = true;
    estiloVictoria();
    document.getElementById("mensajeGanador").textContent = "Ha ganado"
    if(turno === "ROJO"){
        document.getElementById("ganador").textContent = nombre2;
        document.getElementById("ganador").style.color = "yellow"

    } else if (turno === "AMARILLO"){
        document.getElementById("ganador").textContent = nombre1;
        document.getElementById("ganador").style.color = "red"
    }       
    setTimeout(displayFinal,3000)
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

//Efecto sonido caida ficha. No usamos stop porque el audio es corto y suficiente.
function efectoSonido(){
    sonidoFicha();
    //setInterval(pararSonido,300)
}

/*function pararSonido(){
	let audio = document.getElementById("audio");   
    audio.pause()

}*/

//Activamos función audio
function sonidoFicha(){
	let audio = document.getElementById("audio");   
    audio.play();
}

//Activa sonido de victoria y estilo temporal de victoria.
function estiloVictoria(){
    let linea = document.getElementById("linea")
    linea.style.display = "";
    if(turno === "ROJO"){
        linea.style.backgroundColor = "yellow";
        linea.style.color= "black";
    } else {
        linea.style.backgroundColor = "red"
        linea.style.color = "black";
    }
    document.getElementById("turnoActual").style.display = "none";
    document.getElementById("reiniciar").style.display = "none";
    document.getElementById("salir").style.display = "none";
    document.getElementById("audioVictoria").play();
    document.getElementById("tablero").style.pointerEvents = "none";
}

// A PARTIR DE AQUI FUNCIONES PARA JUGAR CONTRA CPU

let radiovalue = "";

//Funcion para saber si son dos jugadores o un jugador contra CPU
function isSecondPlayer(){
    radiovalue = document.formulario.numeroJugadores.value;
    if(radiovalue==="CPUF" || radiovalue==="CPUM" || radiovalue==="CPUD"){
        document.getElementById("nombreAmarillo").style.visibility = "hidden"
        swTwoPlayers = false;
    } else {
        document.getElementById("nombreAmarillo").style.visibility = "visible"
        swTwoPlayers = true;
    }     
}

//Función para número al azar con parametro max y min.
function random(max, min) {
    max = max +0.4
    min = min - 0.4
    return Math.round(Math.random() * (max - min) + min)
}

//bloqueamos el mouse en tablero y después de 1 segundo activamos esperaCPU
function turnoCPU(){
    if(swPartidaTerminada === false){ 
        document.getElementById("tablero").style.pointerEvents = "none";
        setTimeout(esperaCPU,1000);
    }
}

//según el nivel de dificultad elegido obtenemos el columnaCPU que se usará en checkCasilla
function esperaCPU(){
    let columnaCPU = "";
    if(radiovalue==="CPUF"){
        columnaCPU = getColumnaFacil();
    } else if (radiovalue==="CPUM"){
        columnaCPU = getColumnaMedio();
    } else if (radiovalue==="CPUD"){
        columnaCPU = getColumnaDificil();
    }
    checkCasilla(columnaCPU)
    document.getElementById("tablero").style.pointerEvents = "auto" //reactivamos mouse
}

//nos devuelve un valor al azar, repetimos si la columna está llena.
function getColumnaFacil(){
    let contenidoColumna = "";
    let auxCol = "";
    do{
        auxCol = random(6, 0);
        contenidoColumna = casillero[0][auxCol];
    } while (contenidoColumna ==="ROJO" || contenidoColumna ==="AMARILLO")
    return auxCol;
}

//determinamos posibles casillas con getOpciones y determinamos la mejor con getBetter para devolver la columna.
function getColumnaMedio(){
    let opcionesaux = getOpciones();
    let auxCol = getBetter(opcionesaux);
    return auxCol
}

//determinamos posibles casillas con getOpciones y comprueba si podemos hacer línea de 4 con getGanador
// y en caso de que no, ejecuta getBetter para determinar columna
function getColumnaDificil(){
   let opciones = getOpciones()
   let auxCol = getGanador(opciones)
   if(auxCol === 99){
       auxCol = getBetter(opciones)
   }
    return auxCol;
}

//nos devuelve un array de string en el que indica la fila para cada columna. recorremos las siete columnas, si está llena no se incluye en el array.
function getOpciones(){
    let opciones = [];
    for(let j = 0; j<7;j++){
        for(let i = casillero.length-1; i>=0; i--){
            let casilla = casillero[i][j]
            if(casilla[0] === `c`){
                opciones.push(`${i}${j}`)
                break;
            }
        }
    }
    return opciones;
}

//funcion que comprueba si podríamos ser ganadores con cada opción en ese turno. Temporalmente modificamos la casilla correspondiente para comprobarlo.
//en caso de no haber casilla ganadora, devolvemos 99.
function getGanador(opciones){
    let colGanadora = 99;
    for (let i =0; i<opciones.length;i++){
        let fil = parseInt(opciones[i][0])
        let col = parseInt(opciones[i][1])
        let auxCasilla = casillero[fil][col];
        casillero[fil][col] = "AMARILLO";//Modificamos casillero para comprobar si podríamos tener línea de 4.
        indexFila = fil
        indexColumna = col
        cambiarTurno();
        checkVictoria();//Comprobamos si tenemos linea. En caso de que no...
        cambiarTurno();//...volvemos al turno y...
        casillero[fil][col] = auxCasilla;//... devolvemos el valor al casillero
        if(swPartidaTerminada === true){ //en caso de tener línea de 4 devolvemos col.
            return col
        }
    }
    return colGanadora;
}

//recorremos las diferentes opciones y las almacena en la array  de objetos (casilla e importancia) alloptions
// llama a función getImportante para obtener la columna con mayor riesgo para la victoria del jugador (mayor importancia)
// llamamos importancia al numero de casillas consecutivas en rojo colindantes a la casilla comprobada.
function getBetter(opciones){
    let alloptions = []
    for(let i = 0; i<opciones.length;i++){
        let fil = parseInt(opciones[i][0]);//index del array dentro de casillero. visualmente las filas 
        let col = parseInt(opciones[i][1]); //elemento dentro del array dentro casillero. visualemnte las columnas 
        alloptions.push(checkHorizontalCPU(fil,col))
        alloptions.push(checkVerticalCPU(fil,col))
        alloptions.push(checkDiagonalCPU(fil,col))
    }
    return getImportante(alloptions);
}

//recorremos el array de objetos y nos quedamos con la columna de mayor importancia,
//en caso de no haber ninguna, columna = getColumnaFacil
function getImportante(alloptions){
    let mayorImportancia = 0;
    let columna = 0;
    let swMejora = false;
    for (let i = 0; i<alloptions.length;i++){
        if(alloptions[i].importancia >mayorImportancia){
            mayorImportancia = alloptions[i].importancia
            columna = alloptions[i].columna
            swMejora = true
        }
    } if(swMejora === false){
        columna = getColumnaFacil();
    }
    return columna;
}

// las comprobaciones empezarán siempre en la ficha contigua a la casilla a comprobar.
// función que devuelve un objeto con la columna y la importancia de esta casilla en horizontal. 
function checkHorizontalCPU(fil, col){
    let contadorD = 0; //Medirá la importancia a derechas
    let contadorI = 0; //Medirá la importancia a izquierdas
    let contador = 0; // el definitivo, será igual al contador más alto de los dos anteriores.
    //comprobamos coincidencias en horizontal a dcha.
    for(let i = col+1; i<7;i++){
        if(casillero[fil][i] === "ROJO"){
            contadorD ++
        } else {
            break;
        } 
    }
    //comprobamos coincidencias en horizontal a izq.
    for(let i = col-1; i>=0;i--){
        if(casillero[fil][i] === "ROJO"){
            contadorI ++  
        } else {
            break;
        } 
    } 
    // determinamos el que tiene mayor importancia comparando los dos contadores.
    contador = contadorI
    if(contadorD > contadorI){
        contador = contadorD
    }
    let option = {
        columna:col,
        importancia:contador,
    }
    return option  
}

// las comprobaciones empezarán siempre en la ficha contigua a la casilla a comprobar.
// función que devuelve un objeto con la columna y la importancia de esta casilla en el eje vertical. 
function checkVerticalCPU(fil, col){
    let contador = 0;
    if(fil<5){ // Obviamos casilla inferior del casillero.
        for(let i = fil+1;i<=5;i++){
            if(casillero[i][col] === "ROJO"){
                contador++
            }else {
                break;
            }
        }
    }
    let option = {
        columna:col,
        importancia:contador,
    }
    return option 
}

// las comprobaciones empezarán siempre en la ficha contigua a la casilla a comprobar.
// función que devuelve objeto con la columna y la casilla con mayor importancia en diagonal. 
function checkDiagonalCPU(fil,col){
    let auxFil = fil-1;
    let contadorUpR = 0;
    let contadorUpL = 0;
    let contadorDownR = 0;
    let contadorDownL = 0;
    
    if(fil>0){//comprobamos diagonal hacia arriba derecha.
        for(let i = col+1;i<7;i++){
            if(auxFil>=0 && casillero[auxFil][i] === "ROJO") {
                contadorUpR++;
                auxFil --;
            } else {
                break;
            }
        }
        auxFil = fil-1; //Volvemos a asignar para empezar la comprobación hacia arriba
        for(let i = col-1;i>=0;i--){//comprobamos diagonal hacia arriba izquierda.
            if(auxFil>=0 && casillero[auxFil][i] === "ROJO"){
                contadorUpL++;
                auxFil --;
            } else {
                break;
            }
        }
    }
    auxFil = fil+1;//Volvemos a asignar para empezar la comprobación hacia abajo
    if(fil<5){//comprobamos diagonal hacia abajo derecha.
        for(let i = col+1;i<7;i++){
            if(casillero[auxFil][i] === "ROJO"){
                contadorDownR++;
                auxFil ++;
            } else {
                break;
            }
            if(auxFil > 5){//En caso de que exceda numero de filas salimos del blucle.
                break;
            }
        }
        auxFil = fil+1;//Volvemos a asignar para empezar la comprobación hacia abajo
        for(let i = col-1;i>=0;i--){ //comprobamos diagonal hacia abajo izquierda.
            if(auxFil>=0 && casillero[auxFil][i] === "ROJO"){
                contadorDownL++;
                auxFil ++;
            } else {
                break;
            }
            if(auxFil > 5){//En caso de que exceda numero de filas salimos del blucle.
                break;
            }
        }
    }
    let contadores = [contadorUpR,contadorUpL, contadorDownR, contadorDownL];
    //obtiene el mayor nivel de importancia de los contadores y se devuelve con la columna.
    let option = {
        columna:col,
        importancia:contadores.sort().reverse()[0]
    } 
    return option 
}

