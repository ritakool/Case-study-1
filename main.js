// Khai báo các hình khối
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
    ],
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
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
let score  = 0;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// khai báo kích thước bảng
let ROW = 20;
let COL = 10;
let SQ = 30;
let COLOR = "white";
// Vẽ bảng
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
    ctx.fillRect(x*SQ,(y-3)*SQ,SQ,SQ)
    ctx.strokeStyle = "#cccf";
    ctx.strokeRect(x*SQ,(y-3)*SQ,SQ,SQ)
}
// khai báo class khối hình
class Cubes {
        constructor(cube, color) {
            this.cube = cube;
            this.color = color;
    
            this.cubeN = 0;
            this.activecube = this.cube[this.cubeN];
    
            this.posX = 3;
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
        // Di chuyển xuống dưới
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
            this.posX = 3;
            this.posY = 0;
            if (this.checkCollision(this.posX,this.posY +1,this.activecube)){
            alert('kết thúc trò chơi')
            alert("điểm của bạn là: " +score)
            }
        }
        // Di chuyển sang trái
        moveLeft() {
            if (!this.checkCollision(this.posX - 1, this.posY, this.activecube)){
                this.unDraw();
                this.posX--;
                this.draw()
            } 
        }
        // Di chuyển sang phải
        moveRight() {
            if (!this.checkCollision(this.posX + 1, this.posY,this.activecube)){
                this.unDraw();
                this.posX++;
                this.draw()
            }  
        }
        // Quay hình
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
        // Kiểm tra va chạm
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
        // Khóa khối hình vào bảng khi chạm đáy
        lock (){
            for (let r = 0; r < this.activecube.length; r++) {
                for (let c = 0; c < this.activecube.length; c++) {
                    if (this.activecube[r][c]){
                        board[this.posY + r ][this.posX + c] = this.color;
                    }
                }
            }
            // Xử lý xập hàng và ăn điểm
            for (let r = 0; r < ROW; r++){
                let rowFull = true;
                for (let c = 0; c < COL; c++){
                    rowFull = rowFull && board[r][c] != COLOR
                }
                if (rowFull){
                    for (let y = r; y > 1; y--){
                        for ( let c = 0; c < ROW;c++){
                            board[y][c] = board[y - 1][c];
                        }
                    }
                    score +=10;
                    for (let c =0; c< COL;c++){
                        board[0][c] = COLOR;
                    }
                }
            }
            document.getElementById("score").innerHTML=score;
            drawBoard()
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
// ADD sự kiện bàn phím
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
// set tự động chạy.
let gameOver = false;
function drop(){
    let timedrop = setInterval(function(){
        if (!gameOver){
            p.moveDown()
        }else {
            clearInterval(timedrop)
        }
    },250)
}
 drop();