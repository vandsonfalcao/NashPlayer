//GLOBAL

let formulario = {
    name: '',
    bio: '',
    cover: ''
}

function enviarForm() {
    if (document.querySelector('#name').value == '') {
        Swal.fire(
            'Alerta!',
            'Campo "Nome", obrigatorio!',
            'warning'
        )
    } else {
        //OBTENDO VALORES DO FORMULARIO
        formulario.name = document.querySelector('#name').value
        formulario.bio = document.querySelector('#bio').value
        //MONTANDO FORMULARIO
        const data = new FormData();
        data.append('name', formulario.name)
        data.append('bio', formulario.bio)
        data.append('cover', formulario.cover)
        //ENVIANDO REQUISICAO COM FORM DENTRO
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "POST",
            "/artista",
            true
        );

        updateProgress()
        xhttp.addEventListener("load", transferComplete, false);
        xhttp.send(data);

    }
}

function updateProgress() {
    Swal.fire({
        title: 'Carregando...',
        html: '',
        timerProgressBar: true,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
    })
}

function transferComplete() {
    Swal.disableLoading()
    Swal.hideLoading()
    //APAGANDO CAMPOS
    //APAGANDO CAMPOS
    document.querySelector('#name').value = ""
    document.querySelector('#bio').value = ""
    document.querySelector('#cover').value = ""
    document.getElementById("moldura").src = "/assets/imagens/cover-artista.png"
    formulario = { name: '', bio: '', cover: '' }
    Swal.fire(
        'Sucesso!',
        'Artista adicionado(a)!',
        'success'
    )
}

function upperFistLeter(string) {
    return string.toLocaleLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

function readImage() {
    if (this.files[0].type.includes('image/')) {
        if (this.files && this.files[0]) {
            var file = new FileReader();
            file.onload = function (e) {
                document.getElementById("moldura").src = e.target.result;
            };
            file.readAsDataURL(this.files[0]);
            formulario.cover = this.files[0]
        }
    } else {
        Swal.fire(
            'Falha!',
            'Tipo de arquivo invalido!',
            'error'
        )
        this.value = ""
    }
}
document.getElementById("cover").addEventListener("change", readImage, false);

