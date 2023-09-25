let grid = [];
let GRID_SIZE = 50;
let sizeOfSquare;
let select;
let algorithm;
let directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];


// Esta funcion crea un array grid donde cada posicion es un sub-array
// Y estos sub-arrays contienen en sus posiciones el color en hex de cada cuadro        
function setGrid() {
    for (let i = 0; i < GRID_SIZE; i++) {
        grid[i] = []; //Esta linea asigna un array vacio para cada fila del array grid 
        for (let j = 0; j < GRID_SIZE; j++) {
            // Esta linea rellena las columnas de las filas en donde esta posicionado el ciclo for
            // Y estas columnas contienen el colo de su relleno en hex
            grid[i][j] = "#FFFFFF"; 
        }
    }
}


function setup() {
    createCanvas(700, 700);
    //Esta linea asigna el tamaño de cada cuadro dividiendo el ancho del canvas entre el tamño del grid
    sizeOfSquare = width / GRID_SIZE; 
    strokeWeight(1); //Esta linea establece el grosor de la lineas en el grid
    frameRate(60);
    setGrid(); //Esta funcion crea la cuadricula

    /* select = createSelect();
    select.option("Span");
    select.option("Stack");
    select.option("Queue");
    select.option("Recursive");
    select.changed(() => {
        setGrid();
        let item = select.value();

        if (item === "Recursive") {
            algorithm = new RecursiveFill();
        }

        if (item === "Stack") {
            algorithm = new StackFill();
        }

        if (item === "Queue") {
            algorithm = new QueueFill();
        }

        if (item === "Span") {
            algorithm = new SpanFill();
        }

        restart();
    });

    visualiseCheckbox = createCheckbox("Performance test", performanceTest);

    visualiseCheckbox.changed(() => {
        performanceTest = visualiseCheckbox.checked();
    });

    restart(); */
}

function draw() {
    //background(220);
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            //push();
            fill(grid[i][j]); //Rellena la cuadricula con el valor que se la da

            // rect dibuja rectangulos dados (coord_x, coord_y, ancho, altura)
            // Esta linea dibuja el arreglo dentro de grid
            rect(
                i * sizeOfSquare,
                j * sizeOfSquare,
                sizeOfSquare,
                sizeOfSquare
            );
            //pop();
        }
    }
}
