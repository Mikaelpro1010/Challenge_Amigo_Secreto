const listaAmigos = []; // Lista onde os nomes serão armazenados

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nome = inputAmigo.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    if (listaAmigos.includes(nome)) {
        alert("Este nome já foi adicionado!");
        return;
    }

    listaAmigos.push(nome);
    inputAmigo.value = ""; // Limpa o input

    atualizarLista();
}

// Função para atualizar a lista exibida na tela
function atualizarLista() {
    const ulLista = document.getElementById("listaAmigos");
    ulLista.innerHTML = ""; // Limpa a lista antes de atualizar

    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "✖";
        botaoRemover.classList.add("remove-btn");
        botaoRemover.setAttribute("aria-label", `Remover ${amigo}`);
        botaoRemover.onclick = () => removerAmigo(index);

        li.appendChild(botaoRemover);
        ulLista.appendChild(li);
    });
}

// Função para remover um amigo da lista
function removerAmigo(index) {
    listaAmigos.splice(index, 1);
    atualizarLista();
}

// Função para sortear os amigos secretos
function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para sortear!");
        return;
    }

    let sorteioValido = false;
    let sorteados = [];

    while (!sorteioValido) {
        let embaralhado = [...listaAmigos];
        embaralhar(embaralhado);

        if (verificarSorteioValido(listaAmigos, embaralhado)) {
            sorteados = embaralhado;
            sorteioValido = true;
        }
    }

    exibirResultado(sorteados);
}

// Função para embaralhar a lista (Algoritmo de Fisher-Yates)
function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]]; // Troca os elementos
    }
}

// Função para verificar se alguém tirou a si mesmo
function verificarSorteioValido(original, sorteados) {
    return original.every((nome, index) => nome !== sorteados[index]);
}

// Função para exibir os pares sorteados na tela
function exibirResultado(sorteados) {
    const ulResultado = document.getElementById("resultado");
    ulResultado.innerHTML = ""; // Limpa a lista antes de mostrar o resultado

    listaAmigos.forEach((nome, index) => {
        const li = document.createElement("li");
        li.textContent = `${nome} → ${sorteados[index]}`;
        ulResultado.appendChild(li);
    });
}
