const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const seleccionarReiniciar = document.getElementById("reiniciar")
const botonMascotajugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")
seleccionarReiniciar.style.display = "none"

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorDeTarjetas = document.getElementById("contenedor-de-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
const anchoMaximoMapa = 350


let jugadorId = null
let botones = []
let mokepones = []
let ataqueJugador =[]
let ataqueEnemigo = []
let indexAtaqueJugador
let indexAtqueEnemigo
let ataquesMokepon 
let ataquesMokeponEnemigo
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let mascotaJugador 
let miMokepon 
let botonFuego 
let botonAgua
let botonTierra 
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intevalo 
let alturaBuscada
let anchoMapa = window.innerWidth - 20
let mapaBackground = new Image()

if (anchoMapa > anchoMaximoMapa) {
    anchoMapa = anchoMaximoMapa - 20
}

mapaBackground.src = "./acses/mokemap.webp"
alturaBuscada = anchoMapa * 600 / 800
mapa.width = anchoMapa
mapa.height = alturaBuscada


class Mokepon {
    constructor(nombre, foto, vida,  fotoMpa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio (0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMpa
        this.velocidadx = 0
        this.velocidady = 0
    }
    pintarMkepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
}

let Hipodoge = new Mokepon("Hipodoge", "./acses/mokepons_mokepon_hipodoge_attack.png", 5,"./acses/hipodoge.webp")

let Capipepo = new Mokepon("Capipepo", "./acses/mokepons_mokepon_capipepo_attack.png",5,"./acses/capipepo.webp")

let Ratigueya =new Mokepon("Ratigueya", "./acses/mokepons_mokepon_ratigueya_attack.png",5,"./acses/ratigueya.webp")

//mascotas enemigos 

let HipodogeEnemigo = new Mokepon("Hipodoge", "./acses/mokepons_mokepon_hipodoge_attack.png", 5,"./acses/hipodoge.webp")

let CapipepoEnemigo = new Mokepon("Capipepo", "./acses/mokepons_mokepon_capipepo_attack.png",5,"./acses/capipepo.webp")

let RatigueyaEnemigo =new Mokepon("Ratigueya", "./acses/mokepons_mokepon_ratigueya_attack.png",5,"./acses/ratigueya.webp")

Hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

Capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

Ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

//ataque del enemigo 

HipodogeEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

CapipepoEnemigo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    
)

RatigueyaEnemigo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

mokepones.push(Hipodoge,Capipepo,Ratigueya)

function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} /> 
        <label class="targeta-de-mokepon" for=${mokepon.nombre}>
           <p>${mokepon.nombre}</p> 
           <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorDeTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    
    })
 
    botonMascotajugador.addEventListener("click",selecionarMascotaJugador)

    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()

}

function unirseAlJuego (){
    fetch("http://localhost:8080/unirse")
        .then(function(res){
            // console.log(res)
                if(res.ok) {
                    res.text()
                        .then(function(respuesta){
                            console.log(respuesta)
                            jugadorId = respuesta
                        })
                }
        })
}

 function selecionarMascotaJugador(){

    sectionSeleccionarMascota.style.display = "none"
    
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
         alert("selecciona una mascota")
    }

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador) 
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques )
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon =`
        <button id=${ataque.id} class="boton-ataque BAtaque ">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon 
    })

     botonFuego = document.getElementById("boton-fuego")
     botonAgua = document.getElementById("boton-agua")
     botonTierra = document.getElementById("boton-tierra")
     botones = document.querySelectorAll(".BAtaque")
    
}

function secuenciaAtaque() {
    botones.forEach((boton) =>{
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                    console.log( ataqueJugador)
                        boton.style.background =  "#FF0000"
                            boton.disabled = true
            }else if (e.target.textContent === "💧") {
                        ataqueJugador.push("AGUA")
                            console.log( ataqueJugador)
                                boton.style.background =  "#FF0000"
                                    boton.disabled = true
            }else {
                ataqueJugador.push("TIERRA")
                    console.log( ataqueJugador)
                        boton.style.background =  "#FF0000"
                            boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {

    let mascotaAleatoria = aleatorio(0, mokepones.length -1)
    
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    console.log("ataques enemigo ",ataquesMokeponEnemigo)
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push ("FUEGO")
    } else if (ataqueAleatorio == 3 ||ataqueAleatorio == 4) {
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push ("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length ===  5) {
        combate() 
    }
}
function indexAmbosOponente (jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente  (index, index )
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
}


function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("ESTO HA SIDO UN EMPATE😶😐")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES HAS GANDO ESTA PARTIDA 🎉🍾🍻🥇")
    }else{
        crearMensajeFinal("PERDISTE NOS VERMOS EN LA PROXIMA")
    }
}

function crearMensaje(resultado) {


    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {


    sectionMensajes.innerHTML = resultadoFinal
    
    seleccionarReiniciar.style.display = "block"
}

 function reiniciarJuego() {
    location.reload()
}
  
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas (){
        
    miMokepon.x = miMokepon.x + miMokepon.velocidadx
    miMokepon.y = miMokepon.y + miMokepon.velocidady
    lienzo.clearRect(0, 0, mapa.Width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    miMokepon.pintarMkepon()
    HipodogeEnemigo.pintarMkepon()
    CapipepoEnemigo.pintarMkepon()
    RatigueyaEnemigo.pintarMkepon()
    if (miMokepon.velocidadx !==0 || miMokepon.velocidady !==0) {
        revisarColision(HipodogeEnemigo)
        revisarColision(CapipepoEnemigo)
        revisarColision(RatigueyaEnemigo)
    }
}

function moverDerecha() {
    miMokepon.velocidadx = 5 
}
function moverIzquierda() {
    miMokepon.velocidadx = -5 
}
function moverAbajo() {
    miMokepon.velocidady = 5 
}
function moverArriba() {
    miMokepon.velocidady= -5 
}

function detenerMovomiento() {
    
    miMokepon.velocidadx = 0 
    miMokepon.velocidady = 0 
}

function teclaPrecionada(event) {
    switch (event.key) {
        case "w":
            moverArriba()
            break;
        case "s":
            moverAbajo()
            break
        case "a":
            moverIzquierda()
            break
        case "d":
            moverDerecha()
            break
        default:
            break;
    }
}

function iniciarMapa(){
    miMokepon = obtenerMascota(mascotaJugador)
    intevalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", teclaPrecionada)
 
    window.addEventListener("keyup", detenerMovomiento)
}

function obtenerMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

//para nuestro mokepon 

    const arribaMascota = miMokepon.y
    const abajoMascota = miMokepon.y + miMokepon.alto
    const derechaMascota = miMokepon.x + miMokepon.ancho
    const izquierdaMascota = miMokepon.x

    if (abajoMascota <arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
        ) {
        return
    }
    detenerMovomiento()
    clearInterval(intevalo)
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
    
}

window.addEventListener("load", iniciarJuego)