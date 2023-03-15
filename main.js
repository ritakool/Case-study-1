const I = [
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
];
const J = [
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
        [0,1,1],
        [0,1,0],
        [0,1,0]
    ],
    [
        [0,0,0],
        [1,1,1],
        [0,0,1]
    ]
];
const E = [
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
];
const Z = [
    [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    
    [
        [0,0,1],
        [0,1,1],
        [0,1,0]
    ],
    [
        [0,0,0],
        [1,1,0],
        [0,1,1]
    ],
    [
        [0,1,0],
        [1,1,0],
        [1,0,0]
    ]
    
];
const O = [
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
];
const L = [
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
];
const R = [
    [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    [
        [0,1,0],
        [0,1,1],
        [0,0,1]
    ],
    [
        [0,0,0],
        [0,1,1],
        [1,1,0]
    ],
    [
        [1,0,0],
        [1,1,0],
        [0,1,0]

    ]
];
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let ROW = 20;
let COL = 11;
let SQ = 35;
let COLOR = "white";

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
            this.posY = 0;
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
        unDraw(){
            this.fill(COLOR)
        }
        
        moveDown() {
            if (!this.checkCollision(this.posX, this.posY + 1, this.activecube)){
                this.unDraw();
                this.posY++;
                this.draw();
                
                return;
            }
            this.lock();
            let r = Math.floor(Math.random() * cubeColor.length);
            this.cube = cubeColor[r][0];
            this.color = cubeColor[r][1];
            this.cubeN = 0;
            this.activecube = this.cube[this.cubeN];
            this.posX = 4;
            this.posY = 0;
            
        }
        moveLeft() {
            if (!this.checkCollision(this.posX - 1, this.posY, this.activecube)){
                this.unDraw();
                this.posX--;
                this.draw()
            } 
        }
        moveRight() {
            if (!this.checkCollision(this.posX + 1, this.posY,this.activecube)){
                this.unDraw();
                this.posX++;
                this.draw()
            }  
        }

        rotate() {
            const nextCubeN = (this.cubeN + 1) % this.cube.length;
            const nextCube = this.cube[nextCubeN];
            if (!this.checkCollision(this.posX, this.posY, nextCube)) {
                this.unDraw();
                this.cubeN = nextCubeN;
                this.activecube = nextCube;
                this.draw();
            }
        }
        
        checkCollision(posX, posY, cube) {
            for (let r = 0; r < cube.length; r++) {
                for (let c = 0; c < cube.length; c++) {
                    if (!cube[r][c]) {
                        continue;
                    }
                    if (posX + c  < 0 || posX + c >= COL || posY + r >= ROW) {
                        return true;
                    }
                    if (posY < 0) {
                        continue;
                    }
                    if (board[posY + r][posX + c ] !=COLOR) {
                        return true;
                    }
                }
            }
            return false;
        }

        lock (){
            for (let r = 0; r < this.activecube.length; r++) {
                for (let c = 0; c < this.activecube.length; c++) {
                    if (this.activecube[r][c]){
                        board[this.posY + r ][this.posX + c] = this.color;
                    }
                }
            }
        }
    }
    
const colors = ["red", "Violet", "green", "black", "orange", "purple"];
function getRandomcolor() {
    return colors[Math.floor(Math.random() * colors.length)];
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

    document.addEventListener('keydown', function(even){
        if (even.key === "ArrowLeft"){
            p.moveLeft();
        }
        if (even.key === "ArrowRight"){
            p.moveRight();
        }
        if (even.key === "ArrowDown"){
            p.moveDown();
        }
        if (even.key === "ArrowUp"){
            p.rotate();
        
    }
    })
drawBoard()

