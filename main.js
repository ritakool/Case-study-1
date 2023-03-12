

let I = [
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
    ],
    [
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]
    ],
    [
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
    ]
]
let J = [
    [
        [0,1,0],
        [0,1,0],
        [1,1,0]
    ],
    [
        [1,0,0],
        [1,1,1],
        [0,0,0]
    ],
    [
        [1,1,0],
        [1,0,0],
        [1,0,0]
    ],
    [
        [1,1,1],
        [0,0,1],
        [0,0,0]
    ]
]
let E = [
    [
        [0,0,0],
        [1,1,1],
        [0,1,0]
    ],
    [
        [0,1,0],
        [1,1,0],
        [0,1,0]
    ],
    [
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ],
    [
        [0,1,0],
        [0,1,1],
        [0,1,0]
    ]
]
let Z = [
    [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    
    [
        [0,1,0],
        [1,1,0],
        [1,0,0]
    ],
    [
        [0,0,0],
        [1,1,0],
        [0,1,1]
    ],
    [
        [0,0,1],
        [0,1,1],
        [0,1,0]
    ]
    
]
let O = [
    [
        [1,1],
        [1,1]
    ],
    [
        [1,1],
        [1,1]
    ],
    [
        [1,1],
        [1,1]
    ], 
    [
        [1,1],
        [1,1]
    ]
]
let L = [
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ],
    [
        [0,0,0],
        [1,1,1],
        [1,0,0]
    ],
    [
        [1,1,0],
        [0,1,0],
        [0,1,0]
    ],
    [
        [0,0,1],
        [1,1,1],
        [0,0,0]
    ]
]
let R = [
    [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    [
        [1,0,0],
        [1,1,0],
        [0,1,0]
    ],
    [
        [0,0,0],
        [0,1,1],
        [1,1,0]
    ],
    [
        [0,1,0],
        [0,1,1],
        [0,0,1]

    ]
]
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let ROW = 20;
let COL = 11;
let SQ = 35;
let COLOR = "WHITE";

let board = [];

for (let r = 0; r < ROW; r++) {
    let row = [];
    for (let c = 0; c < COL; c++) {
        row.push(COLOR)
    }
    board.push(row);
}

function drawBoard (){
    for (let r = 0; r < ROW; r++) {
        for (let c =0; c < COL; c++){
           drawSquare(c,r,board[r][c]) 
        }
    }
}

function drawSquare (x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ)
    ctx.strokeStyle = "#cccf";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ)
}


class Cubes {
        constructor(cube, color) {
            this.cube = cube;
            this.color = color;
    
            this.cubeN = 0;
            this.activecube = this.cube[this.cubeN];
    
            this.posX = 4;
            this.posY = -2;
            this.x = this.posX * SQ;
            this.y = this.posY * SQ;
        }
    
        fill(color) {
            for (let r = 0; r < this.activecube.length; r++) {
                for (let c = 0; c < this.activecube.length; c++) {
                    if (this.activecube[r][c]) {
                        drawSquare(this.posX + c, this.posY + r, color)
                    }
                }
            }
        }
    
        draw() {
            this.fill(this.color)
        }
    
        unDraw() {
            this.fill(COLOR)
        }
    
        moveDown() {
            this.posY++;
            this.updatePosition();
            drawBoard()
            // console.log(`posX: ${this.posX}  posY: ${this.posY}  x: ${this.x}  y: ${this.y}`);
            this.draw();
        }
    
        updatePosition() {
            this.x = this.posX * SQ;
            this.y = this.posY * SQ;
        }
    }
    
    function Randomhex() {
        return Math.floor(Math.random() * 255);
    }
    
    function getRandomcolor() {
        let red = Randomhex();
        let blue = Randomhex();
        let green = Randomhex();
        return "rgb(" + red + "," + blue + "," + green + ")"
    }
    
    let cubeColor = [
        [I, getRandomcolor()],
        [J, getRandomcolor()],
        [E, getRandomcolor()],
        [Z, getRandomcolor()],
        [O, getRandomcolor()],
        [L, getRandomcolor()],
        [R, getRandomcolor()]
    ];
    
    function randomCube() {
        let r = Math.floor(Math.random() * cubeColor.length);
        return new Cubes(cubeColor[r][0], cubeColor[r][1])
    }
    
    let p = randomCube();
    console.log(p);
    
    let gameOver = false;
    
    function drop() {
        let timedrop = setInterval(function () {
            if (!gameOver) {
                p.moveDown();
            } else {
                clearInterval(timedrop)
            }
        }, 1000)
    }
    
    drop();




// const canvas = document.getElementById('canvas');
// const context = canvas.getContext('2d');

// const ROWS = 20;
// const COLS = 10;
// const SQUARE_SIZE = 30;
// const COLOR = "white";

// let board = [];

// for (let r = 0; r < ROWS; r++) {
//     let row = [];
//     for (let c = 0; c < COLS; c++) {
//         row.push(COLOR)
//     }
//     board.push(row);
// }

// function drawBoard() {
//     for (let r = 0; r < ROWS; r++) {
//         for (let c = 0; c < COLS; c++) {
//             drawSquare(c, r, board[r][c]);
//         }
//     }
// }

// function drawSquare(x, y, color) {
//     context.fillStyle = color;
//     context.fillRect(x * SQUARE_SIZE,y* SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
//     context.strokeStyle = "#444";
//     context.strokeRect(x * SQUARE_SIZE, y* SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
// }

// class Cubes {
//     constructor(cube, color) {
//         this.cube = cube;
//         this.color = color;

//         this.cubeN = 0;
//         this.activecube = this.cube[this.cubeN];

//         this.posX = 3;
//         this.posY = -2;
//         this.x = this.posX * SQUARE_SIZE;
//         this.y = this.posY * SQUARE_SIZE;
//     }

//     fill(color) {
//         for (let r = 0; r < this.activecube.length; r++) {
//             for (let c = 0; c < this.activecube.length; c++) {
//                 if (this.activecube[r][c]) {
//                     drawSquare(this.posX + c, this.posY + r, color)
//                 }
//             }
//         }
//     }

//     draw() {
//         this.fill(this.color)
//     }

//     unDraw() {
//         this.fill(COLOR)
//     }

//     moveDown() {
//         this.posY++;
//         this.updatePosition();
//         drawBoard()
//         // console.log(`posX: ${this.posX}  posY: ${this.posY}  x: ${this.x}  y: ${this.y}`);
//         this.draw();
//     }

//     updatePosition() {
//         this.x = this.posX * SQUARE_SIZE;
//         this.y = (ROWS - 1 - this.posY) * SQUARE_SIZE;
//     }
// }

// function Randomhex() {
//     return Math.floor(Math.random() * 255);
// }

// function getRandomcolor() {
//     let red = Randomhex();
//     let blue = Randomhex();
//     let green = Randomhex();
//     return "rgb(" + red + "," + blue + "," + green + ")"
// }

// let cubeColor = [
//     [I, getRandomcolor()],
//     [J, getRandomcolor()],
//     [E, getRandomcolor()],
//     [Z, getRandomcolor()],
//     [O, getRandomcolor()],
//     [L, getRandomcolor()],
//     [R, getRandomcolor()]
// ];

// function randomCube() {
//     let r = Math.floor(Math.random() * cubeColor.length);
//     return new Cubes(cubeColor[r][0], cubeColor[r][1])
// }

// let p = randomCube();
// console.log(p);

// let gameOver = false;

// function drop() {
//     let timedrop = setInterval(function () {
//         if (!gameOver) {
//             p.moveDown();
//             // drawBoard();
//         } else {
//             clearInterval(timedrop)
//         }
//     }, 1000)
// }

// drop();
