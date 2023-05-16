document.querySelector('#btn-search').addEventListener('click', buscarTemplates)
document.querySelector('#btn-search-inicio').addEventListener('click', funcionalidadeEmDesenvolvimento)
document.querySelector('#btn-copiar-referencia').addEventListener('click', handleCopiarReferencia)
document.querySelector('#tipo').addEventListener('change', handleInserirDadosTextArea)
document.querySelectorAll('input').forEach(input => input.addEventListener('keyup', handleCapturandoCaracterDigitado))

const templates = [
    { arquivo: '/templates/Guia_normatizacao.pdf', desc: 'Guia de Normalização' , data: '02/2023'},
    { arquivo: '/templates/Projeto Integrador.docx', desc: 'Projeto Integrador' , data: '01/2023'},
    { arquivo: '/templates/PTI Padrao.docx', desc: 'PTI Padrão' , data: '09/2022'},
    { arquivo: '/templates/TCC.docx', desc: 'TCC' , data: '04/2022'}
]

const inputValues = {
    nomeAutor: '',
    tituloLivro: '',
    subtitulo: '',
    cidade: '',
    editora: '',
    ano: ''
}

function buscarTemplates() {
    const inputPesquisa = document.querySelector('#search-documentos').value.toUpperCase()
    document.querySelector('#container-documentos-tamplate-resultado').innerHTML = null
    document.querySelector('#contador-resultados').innerHTML = 0

    templates.forEach(template => {
        if(template.desc.toUpperCase().includes(inputPesquisa)) {
            document.querySelector('#container-documentos-tamplate-resultado').innerHTML += `
            <div class="container-tamplate">
                <div class="container-tamplate-download">
                    <div class="container-intertno-template-download">
                        <img src="./assets/images/svg/logo-senac.svg" alt="logo-senac">

                        <div class="container-desc-tamplate-download">
                            <h3>${template.desc}</h3>
                            <p>Data atualizada: ${template.data}</p>
                        </div>

                        <img id="${template.arquivo}" onclick="handleDownloadTemplate(this.id)" class="hover active" src="./assets/images/svg/download.svg" alt="download">
                    </div>
                </div>
            `
        }
        document.querySelector('#contador-resultados').innerHTML ++
    })
}

function buscarTemplatesInicio() {
    document.querySelector('.container-tamplate').innerHTML = null

    templates.forEach(tamplate => {
            document.querySelector('.container-tamplate').innerHTML += `
            <div class="container-tamplate">
                <div class="container-tamplate-download">
                    <div class="container-intertno-template-download">
                        <img src="./assets/images/svg/logo-senac.svg" alt="logo-senac">

                        <div class="container-desc-tamplate-download">
                            <h3>${tamplate.desc}</h3>
                            <p>Data atualizada: ${tamplate.data}</p>
                        </div>

                        <img id="${tamplate.arquivo}" onclick="handleDownloadTemplate(this.id)" class="hover active" src="./assets/images/svg/download.svg" alt="download">
                    </div>
                </div>
            `
        })        
}

function funcionalidadeEmDesenvolvimento() {
    return alert('Funcionalidade em desenvolvimento!')
}

function handleDownloadTemplate(caminho) {
    window.open(`${window.location.href}${caminho}`)
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

buscarTemplatesInicio()




