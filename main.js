/*variáveis*/
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = []; /*a variável é uma array; funciona junto com a funcão "criarCobrinha()"*/
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; /*funciona junto com a funcão "iniciarJogo()" */
let food = { /*variável para funcão "drawFood"*/
    x: Math.floor (Math.random() * 15 + 1) * box,
    y: Math.floor (Math.random() * 15 + 1) * box
}

/*funcões*/
function criarBG(){
    context.fillStyle = "lightgray"; /*Sets or returns the color, gradient, or pattern used to fill the drawing*/ 
    context.fillRect (0, 0, 16 * box, 16 * box); /* Draws a "filled" rectangle; (position x, position y, width, height) */
} 

function criarCobrinha(){
    for (i=0; i < snake.length; i++) {
        context.fillStyle = "black";
        context.fillRect (snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "#BB2200";
    context.fillRect (food.x, food.y, box, box)
}

document.addEventListener('keydown', update); /*Attaches an event handler to the document*/

function update (event){ /*funcao vinculada ao HTML DOM acima; serve para fazer a cobrinha mudar a direcão a partir do comando de tecla*/
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}


function iniciarJogo(){
   if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0; /*condicional para manter a cobrinha saindo de um lado e voltando de outro */
   if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box; 
   if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
   if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box; 

    for(i = 1; i < snake.length; i++){ /*condicional para encerrar o jogo*/
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert ("Game Over, my friend :(")
        }
    }

    criarBG(); /*chamando a funcão para quando iniciar o jogo*/
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x; /*posicão da cobrinha no eixo x ao iniciar o jogo */
    let snakeY = snake[0].y;

    /*condicionais para direcão da cobrinha*/
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){ /*condicional para cobrinha comer a comida e crescer*/
        snake.pop(); /*funcão para criar a ilusão de movimento; retira último elemento da array*/
    }
    else {
        food.x = Math.floor (Math.random() * 15 + 1) * box;
        food.y = Math.floor (Math.random() * 15 + 1) * box;
    }
    

    let newHead = { /*variável para gerar nova cabeca da cobrinha e criar ilusão de movimento*/
        x: snakeX,
        y: snakeY
    }
    
    snake.unshift(newHead); 
}
 
let jogo = setInterval(iniciarJogo, 100); /*funcão de tempo; reinicia a funcão "iniciarJogo" a cada 100ms */
