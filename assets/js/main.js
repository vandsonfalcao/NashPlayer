//GLOBAL
var totalSongs = 0;
let artistas = '';
let musicas = '';

//CONFIG MUSICA
var musica = {
    atualTagId: "",
    cover: "",
    titulo: "Titulo",
    artista: "Artista",
    atualAudio: "",
};
//CONFIG PLAYER
const player = {
    cover: document.querySelector(".card"),
    artista: document.querySelector(".card-content h4"),
    titulo: document.querySelector(".card-content p"),
    audio: document.querySelector("audio"),
    botao: document.querySelector("#btplay"),
    btrandom: document.querySelector("#btrandom"),
    linhadotempo: document.querySelector("#linhadotempo"),
    aleatorioOn: false,
    tocando: false,
    status: false,
};

function gerarLista() {
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "/musica",
        true
    );
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //console.log(xhttp.responseText);
            musicas = JSON.parse(xhttp.responseText);
            for (var i = 0; i < musicas.length; i++) {
                let divsong = document.createElement("div");
                divsong.setAttribute("class", "song");
                let divinfo = document.createElement("div");
                divinfo.setAttribute("class", "info");
                let img = document.createElement("img");
                img.setAttribute("class", "img");
                img.setAttribute("src", "/cover/" + musicas[i].covername);
                let divtitles = document.createElement("div");
                divtitles.setAttribute("class", "titles");
                let h5titulo = document.createElement("h5");
                h5titulo.innerText = musicas[i].name
                let partista = document.createElement("p");
                partista.innerText = musicas[i].artistaId.name
                divtitles.appendChild(h5titulo);
                divtitles.appendChild(partista);
                divinfo.appendChild(img);
                divinfo.appendChild(divtitles);
                let divstate = document.createElement("div");
                divstate.setAttribute("class", "stateplaying");
                let opt = document.createElement("option");
                opt.setAttribute("class", "bt-musica");
                opt.setAttribute("value", JSON.stringify(musicas[i]));
                opt.setAttribute("onclick", "tocar(this)");
                opt.setAttribute("id", "song" + i);
                opt.innerText = "▶";
                divstate.appendChild(opt);
                divsong.appendChild(divinfo);
                divsong.appendChild(divstate);
                lista.appendChild(divsong);
                totalSongs = ++totalSongs
            }
        }
    };
    xhttp.send();
}

function showArtista() {
    let divtopo = document.createElement("div");
    divtopo.setAttribute("class", "content-topo");
    let divtopico = document.createElement("div")
    divtopico.setAttribute("class", "content-topo");
    let h1 = document.createElement("h1")
    h1.innerText = "Artistas";
    divtopico.appendChild(h1)
    divtopo.appendChild(divtopico)
    lista.appendChild(divtopo)

    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "/artista",
        true
    );
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //console.log(xhttp.responseText);
            artistas = JSON.parse(xhttp.responseText);
            for (var i = 0; i < artistas.length; i++) {
                let divartista = document.createElement("div");
                divartista.setAttribute("class", "card-artista");
                divartista.setAttribute("onclick", "selectArtista()");
                let optionartista = document.createElement("option");
                optionartista.setAttribute("class", "option-artista");
                optionartista.setAttribute("value", artistas[i]._id);
                let divcximg = document.createElement("div");
                divcximg.setAttribute("class", "cx-img-artista");
                let imgartista = document.createElement("img");
                imgartista.setAttribute("class", "img-artista");
                imgartista.setAttribute("src", "/cover/" + artistas[i].covername);
                let txtartista = document.createElement("div");
                txtartista.setAttribute("class", "txt-artista");
                let span = document.createElement("span");
                span.innerText = artistas[i].name
                txtartista.appendChild(span);
                divcximg.appendChild(imgartista);
                divartista.appendChild(divcximg);
                divartista.appendChild(optionartista);
                divartista.appendChild(txtartista);
                lista.appendChild(divartista);
            }
        }
    }
    xhttp.send();
}

async function tocar(tag) {
    if (player.status) {
        console.log(musica.atualTagId);
        let id = document.querySelector(musica.atualTagId);
        console.log(id.id);
        id.innerText = "▶";
        id.style.color = "white";
        id.setAttribute("onclick", "tocar(this)");
    }

    //obtendo valores
    let track = JSON.parse(tag.value)
    console.log(track)
    musica.artista = track.artistaId.name
    musica.titulo = track.name
    musica.atualAudio =
        "/audio/" + track.filename;
    musica.atualTagId = "#" + tag.id;
    musica.cover = track.covername

    //configurando player
    player.artista.innerText = musica.artista;
    player.titulo.innerText = musica.titulo;
    player.audio.src = musica.atualAudio;
    //player.cover.style.background = musica.cover
    player.status = true;

    tag.innerText = "♫";
    tag.style.color = "var( --cor)";
    tag.setAttribute("onclick", "#");
    player.linhadotempo;
    player.tocando = false;
    playPause();
}
function playPause() {
    if (player.tocando) {
        player.audio.pause();
        player.tocando = false;
        player.botao.style.background = "url(/assets/imagens/circleplayc.png)"
        console.log("pause");
    } else {
        player.audio.play();
        player.tocando = true;
        player.botao.style.background = "url(/assets/imagens/circlestopc.png)"
        console.log("play");
    }
}
function currentTempo() {
    player.linhadotempo.value = player.audio.currentTime;
    //console.log(player.linhadotempo.value)
}
function configTempo() {
    player.linhadotempo.max = player.audio.duration;
    //console.log(player.linhadotempo.max)
}
function setCurrentTempo() {
    player.audio.currentTime = player.linhadotempo.value;
}
function uploadFile() {
    var file = document.querySelector("#file");
    file.click();
}
function random() {
    if (player.aleatorioOn) {
        player.aleatorioOn = false;
        player.btrandom.style.background = "url(/assets/imagens/randomw.png)"
    } else {
        player.aleatorioOn = true;
        player.btrandom.style.background = "url(/assets/imagens/randomc.png)"
    }
}
function proximaMusica() {
    var current = musica.atualTagId;
    var next = current.substring(5);

    if (player.aleatorioOn) {
        numero = Math.floor(Math.random() * totalSongs)
        while (numero == next) {
            console.log(`${numero} & ${next} são iguais.`)
            numero = Math.floor(Math.random() * totalSongs)
        }
        next = "#song" + numero;
        console.log(next);
        var bt = document.querySelector(next);
        bt.onclick();
    } else {
        try {
            next = "#song" + (parseInt(next) + 1);
            var bt = document.querySelector(next);
            bt.onclick();
        } catch (error) { }
    }
}
function musicaAnterior() {
    var current = musica.atualTagId;
    var next = current.substring(5);
    next = "#song" + (parseInt(next) - 1);
    try {
        var bt = document.querySelector(next);
        bt.onclick();
    } catch (error) { }
}