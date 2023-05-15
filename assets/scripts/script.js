document.querySelector('#btn-search').addEventListener('click', funcionalidadeEmDesenvolvimento)
document.querySelector('#btn-add-tamplate').addEventListener('click', funcionalidadeEmDesenvolvimento)
document.querySelector('#btn-download-conclusao-curso').addEventListener('click', handleDownloadTemplate)
document.querySelector('#btn-copiar-referencia').addEventListener('click', handleCopiarReferencia)
document.querySelector('#tipo').addEventListener('change', handleInserirDadosTextArea)
document.querySelectorAll('input').forEach(input => input.addEventListener('keyup', handleCapturandoCaracterDigitado))


const inputValues = {
    nomeAutor: '',
    tituloLivro: '',
    subtitulo: '',
    cidade: '',
    editora: '',
    ano: ''
}

function funcionalidadeEmDesenvolvimento() {
    return alert('Funcionalidade em desenvolvimento!')
}

function handleDownloadTemplate() {
    window.open(window.location.href + '/templates/CENTRO UNIVERSITÁRIO SENAC.docx')
}

function handleCopiarReferencia() {
    const textArea = document.querySelector('textarea')
    if(!textArea.value) return alert('É necessário ter alguma Referência para conseguir copiar!')
    textArea.select()
    document.execCommand('copy')
}

function handleCapturandoCaracterDigitado(e) {
    const id = e.target.id
    const value = document.querySelector(`#${id}`).value

    if(id === 'nome-autor') inputValues.nomeAutor = value
    if(id === 'titulo-livro') inputValues.tituloLivro = value
    if(id === 'subtitulo') inputValues.subtitulo = value
    if(id === 'cidade') inputValues.cidade = value
    if(id === 'editora') inputValues.editora = value
    if(id === 'ano') inputValues.ano = value

    return handleInserirDadosTextArea()
}

function handleInserirDadosTextArea() {
    const modelo = document.querySelector('#tipo').value
    let modeloEscolhido = document.querySelector('textarea')

    const modelosReferencia = {
        livrosDicionariosAtlas : `${isEmpty(`${autor(inputValues.nomeAutor)}`, '. ')}${isEmpty(`${inputValues.tituloLivro}`, ': ')}${isEmpty(`${inputValues.subtitulo}`, '. ')}${isEmpty(`${inputValues.cidade}`, ': ')}${isEmpty(`${inputValues.editora}`, ', ')}${isEmpty(`${inputValues.ano}`, '.')}`,
        bibliografias : `${isEmpty(inputValues.nomeAutor.toUpperCase(), '. ')}${isEmpty(`${inputValues.tituloLivro}`, ': ')}${isEmpty(`${inputValues.cidade}`, ': ')}${isEmpty(`${inputValues.ano}`, '.')}`
    }

    if(modelo === 'livros-impressos' || modelo === 'dicionarios-impressos' || modelo === 'atlas-impressos') modeloEscolhido.value = modelosReferencia.livrosDicionariosAtlas
    
    if(modelo === 'bibliografias-impressas') {
        document.querySelector('#input-subtitulo').style.display = 'none'
        document.querySelector('#input-editora').style.display = 'none'
        modeloEscolhido.value = modelosReferencia.bibliografias
    } else {
        document.querySelector('#input-subtitulo').style.display = 'block'
        document.querySelector('#input-editora').style.display = 'block'
    }

    return modeloEscolhido
}

function isEmpty(campo, sinal = '') {
    let newCampo = ''
    if(campo.length > 0) newCampo = `${campo}${sinal}`
    return newCampo
}

function autor(autor) {
    let newAutor = ''
    if(autor.length > 0) {
        const indice = autor.lastIndexOf(' ')

        if(indice > 0) {
            newAutor = `${autor.substring(indice, autor.length).replace(' ', '').toUpperCase()}, ${autor.substring(0, indice)}`
        }
        else newAutor = autor.toUpperCase()
    }
    return newAutor
}





