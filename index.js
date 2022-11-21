const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.style.background = 'black'
canvas.width = innerWidth
canvas.height = innerHeight - 50

let particles = []
// document.querySelector(".wrapper").style.height = canvas.height
console.log(document.querySelector('.wrapper'))
class particle{
    constructor(x,y,size,vX,vY,color){
        this.x = x
        this.y = y
        this.size = size
        this.vX = vX
        this.vY = vY
        this.color = color
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update(){
        if (this.x < 0 || this.x > canvas.width){
            this.vX = -this.vX
        }
        if (this.y < 0 || this.y > canvas.height){
            this.vY = -this.vY
        }
        this.x += this.vX
        this.y += this.vY
        this.draw()
    }
}

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    particles.forEach((particle) =>{
        particle.update()
    })
    connect()
}
function connect(){
    let opacity = 1
    for (let i = 0; i < particles.length; i++){
        for (let j = i; j < particles.length; j++){
            let dx = particles[i].x - particles[j].x
            let dy = particles[i].y - particles[j].y
            let distance = dx*dx + dy*dy
            if (distance < canvas.width/7*canvas.height/7){
                opacity = 1 - (distance/20000)
                ctx.strokeStyle = 'rgba(140,85,31,' + opacity + ')'
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.stroke()
            }
        }
    }
}
function init(){
    particles = []
    let number = (canvas.width*canvas.height)/9000
    for (let i = 0; i < number;i++){
        let size = Math.random()*5 + 1
        let x = Math.random()*(canvas.width - 4*size) + 2*size
        let y = Math.random()*(canvas.height - 4*size) + 2*size
        let vX = Math.random()*5 - 2.5
        let vY = Math.random()*5 - 2.5
        let p = new particle(x,y,size,vX,vY,'red')
        particles.push(p)
    }
}
window.addEventListener('resize',(e)=>{
    canvas.width = innerWidth
    canvas.height = innerHeight - 50
    init()
})
init()
animate()