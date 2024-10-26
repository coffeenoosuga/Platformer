const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 800
canvas.height = 500
const gravity = 0.75

c.fillStyle = 'red'
c.fillRect(200, 100, 100, 100)

class Sprite {
    constructor({ position, imageSrc }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.image.onload = () => {
            this.isLoaded = true;
        };
    }
    draw() {
        if (this.isLoaded) {
            c.drawImage(this.image, this.position.x, this.position.y);
        }
    }
    update() {
        this.draw();
    }
}


class Player {
    constructor(position){
        this.position = position
        this.velocity = {x: 0, y: 0}
        this.height = 100
        this.isOnGround = false
        this.jumpCount = 0
    }
    draw(){
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, 100, this.height)
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity
            this.isOnGround = false
        } else {
            this.velocity.y = 0
            this.isOnGround = true
            this.jumpCount = 0
            this.position.y = canvas.height - this.height
        }
    }
}

const player = new Player({x: 0, y: 0})
const player2 = new Player({x: 200, y: 0})

const background = new Sprite({
    position:{x: 0, y: 0},
    imageSrc: './kiki/background.png'
})

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    player.update()
    player2.update()
}
animate()

window.addEventListener('keydown', (event) =>{
    switch (event.key){
        case 'd':
            player.velocity.x = 2
            break
        case 'a':
            player.velocity.x = -2
            break
        case ' ':
            if (player.isOnGround || player.jumpCount < 2) {
                player.velocity.y = -15
                player.jumpCount++
                player.isOnGround = false
            }
            break

            player.velocity.y = -1
            break
        }
})

window.addEventListener('keyup', (event) => {switch (event.key){ 
    case 'd':
    case 'a':
        player.velocity.x = 0
        break

}})