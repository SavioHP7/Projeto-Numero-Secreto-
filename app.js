let listaDeNumerosSorteados = [];
let limiteDaLista = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
    
}
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'O Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Adivinhe o número entre 1 e 100');
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p' , mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto) {    
            exibirTextoNaTela('p' , 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++; 
        limparCampo();  
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteDaLista + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == limiteDaLista) {
        listaDeNumerosSorteados.shift();
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input').value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    exibirMensagemInicial();
}
