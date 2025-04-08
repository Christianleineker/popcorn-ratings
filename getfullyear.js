
function carregarAno(){
    const anoElement = document.getElementById('ano');
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    anoElement.textContent = anoAtual;
}