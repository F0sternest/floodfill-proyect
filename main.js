let grid = [];
let GRID_SIZE = 100;
let sizeOfSquare;

function FloodFill(x, y, fillColor, borderColor) {
    let pixelColor = grid[x][y];
    if (pixelColor != fillColor && pixelColor != borderColor) {
        grid[x][y] = fillColor;
        setTimeout(() => {
            FloodFill(x + 1, y, fillColor, borderColor);
            FloodFill(x - 1, y, fillColor, borderColor);
            FloodFill(x, y + 1, fillColor, borderColor);
            FloodFill(x, y - 1, fillColor, borderColor);
        }, 1);
    }
}

function EightPoints(centroX, centroY, adicionX, adicionY) {
    grid[centroX + adicionX][centroY + adicionY] = "#000000";
    grid[centroX - adicionX][centroY + adicionY] = "#000000";
    grid[centroX + adicionX][centroY - adicionY] = "#000000";
    grid[centroX - adicionX][centroY - adicionY] = "#000000";
    grid[centroX + adicionY][centroY + adicionX] = "#000000";
    grid[centroX - adicionY][centroY + adicionX] = "#000000";
    grid[centroX + adicionY][centroY - adicionX] = "#000000";
    grid[centroX - adicionY][centroY - adicionX] = "#000000";
}

function Circle(centroX, centroY, radio) {
    let p;
    let adicionX = 0;
    let adicionY = radio;
    p = 1 - radio;
    EightPoints(centroX, centroY, adicionX, adicionY);
    while (adicionX < adicionY) {
        adicionX += 1;
        if (p < 0) {
            p += 2 * adicionX + 1;
        } else {
            adicionY -= 1;
            p += 2 * (adicionX - adicionY) + 1;
        }
        EightPoints(centroX, centroY, adicionX, adicionY);
    }
}

function Square(width, height, x, y) {
    //Dibujando el borde superior del cuadrado
    for (let i = x; i < x + width; i++) {
        grid[i][y] = '#000000'
    }

    //Dibujando el borde inferior del cuadrado
    for (let i = x; i < x + width; i++) {
        grid[i][y+height] = '#000000'
    }

    //Dibujando el borde izquierdo del cuadrado
    for (let j = y; j < y + height; j++) {
        grid[x][j] = '#000000'
    }

    //Dibujando el borde derecho del cuadrado
    for (let j = y; j <= y + height; j++) {
        grid[x + width][j] = '#000000'
    }
}

// Esta funcion crea un array grid donde cada posicion es un sub-array
// Y estos sub-arrays contienen en sus posiciones el color en hex de cada cuadro
function setGrid(forma) {
    for (let i = 0; i < GRID_SIZE; i++) {
        grid[i] = []; //Esta linea asigna un array vacio para cada fila del array grid
        for (let j = 0; j < GRID_SIZE; j++) {
            // Esta linea rellena las columnas de las filas en donde esta posicionado el ciclo for
            // Y estas columnas contienen el colo de su relleno en hex
            grid[i][j] = "#FFFFFF";
        }
    }

    switch (forma) {
        case "circle":
            Circle(49, 49, 30);
            break;
        case "square":
            Square(60, 60, 17, 17);
            break;
        default:
            break;
    }
}

function setup() {
    createCanvas(700, 700);
    //Esta linea asigna el tamaño de cada cuadro dividiendo el ancho del canvas entre el tamño del grid
    sizeOfSquare = width / GRID_SIZE;
    strokeWeight(1); //Esta linea establece el grosor de la lineas en el grid
    frameRate(60);
    setGrid();

    let canvas = document.getElementById("defaultCanvas0");
    let btnCirle = document.getElementById("circle");
    let btnSquare = document.getElementById("square");
    let btnReset = document.getElementById("reset");

    btnSquare.onclick = () => {
        setGrid("square"); //Esta funcion crea la cuadricula
    };

    btnCirle.onclick = () => {
        setGrid("circle"); //Esta funcion crea la cuadricula
    };

    btnReset.onclick = () => {
        setGrid(); //Esta funcion crea la cuadricula
    };

    canvas.addEventListener("click", (event) => {
        // Obtener las coordenadas del clic en el canvas
        let x = event.clientX - canvas.getBoundingClientRect().left;
        let y = event.clientY - canvas.getBoundingClientRect().top;

        // Calcular los índices de la matriz basados en las coordenadas del clic
        let indiceColumna = Math.floor(x / sizeOfSquare);
        let indiceFila = Math.floor(y / sizeOfSquare);

        // Llamamos a la funcion FloodFill para que el algoritmo empiece donde hicimos click
        FloodFill(indiceFila, indiceColumna, "#0b5ee3", "#000000");
    });
}

function draw() {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            fill(grid[i][j]); //Rellena la cuadricula con el valor que se la da
            // rect dibuja rectangulos dados (coord_x, coord_y, ancho, altura)
            rect(
                i * sizeOfSquare,
                j * sizeOfSquare,
                sizeOfSquare,
                sizeOfSquare
            );
        }
    }
}
