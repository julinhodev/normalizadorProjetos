document.querySelector('#btn-inicio').addEventListener('click', handleClickMenu)
document.querySelector('#btn-documentos').addEventListener('click', handleClickMenu)
document.querySelector('#btn-referenciador').addEventListener('click', handleClickMenu)
document.querySelector('#btn-comoUsar').addEventListener('click', handleClickMenu)
document.querySelector('#btn-sobre').addEventListener('click', handleClickMenu)

const viewInicio = document.querySelector('#inicio')
const viewDocumentos = document.querySelector('#documentos')
const viewReferenciador = document.querySelector('#referenciador')
const viewComoUsar = document.querySelector('#comoUsar')
const viewSobre = document.querySelector('#sobre')

const arrayViews = [
    viewInicio,
    viewDocumentos,
    viewReferenciador,
    viewComoUsar,
    viewSobre
]

function handleClickMenu() {
    const viewRequisitada = this.id.replace('btn-', '')
    arrayViews.forEach(view => {
        if(view.id == viewRequisitada) {
            view.style.display = 'block'
        } else {
            view.style.display = 'none'
        }
    })
}