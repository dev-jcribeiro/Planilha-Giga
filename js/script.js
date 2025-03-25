// Arrays para armazenar os itens e suas observações
const frotaItems = [];
const equipamentoItems = [];
const operadorItems = [];
const obraItems = [];
const municipioItems = [];

// Objeto para armazenar observações
const observacoes = {
  frota: {},
  equipamento: {},
  operador: {},
  obra: {},
  municipio: {}
};

// Função para preencher as opções de um select
function preencherSelect(selectId, items) {
  const select = document.getElementById(selectId);
  select.innerHTML = '<option value="">Selecione...</option>';
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });
}

// Função para salvar o registro na tabela
document.getElementById('planilha-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Capturar os valores dos campos
  const frota = document.getElementById('frota').value;
  const equipamento = document.getElementById('equipamento').value;
  const operador = document.getElementById('operador').value;
  const obra = document.getElementById('obra').value;
  const municipio = document.getElementById('municipio').value;
  const observacao = document.getElementById('observacao').value;

  // Criar uma nova linha na tabela
  const table = document.getElementById('registros').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${frota}</td>
    <td>${equipamento}</td>
    <td>${operador}</td>
    <td>${obra}</td>
    <td>${municipio}</td>
    <td>${observacao}</td>
  `;

  // Limpar os campos do formulário
  document.getElementById('planilha-form').reset();
});

// Função para adicionar novos itens
document.getElementById('add-item-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const tipoItem = document.getElementById('tipo-item').value;
  const novoItem = document.getElementById('novo-item').value.trim();

  if (!novoItem) return;

  switch (tipoItem) {
    case 'frota':
      if (!frotaItems.includes(novoItem)) frotaItems.push(novoItem);
      preencherSelect('frota', frotaItems);
      break;
    case 'equipamento':
      if (!equipamentoItems.includes(novoItem)) equipamentoItems.push(novoItem);
      preencherSelect('equipamento', equipamentoItems);
      break;
    case 'operador':
      if (!operadorItems.includes(novoItem)) operadorItems.push(novoItem);
      preencherSelect('operador', operadorItems);
      break;
    case 'obra':
      if (!obraItems.includes(novoItem)) obraItems.push(novoItem);
      preencherSelect('obra', obraItems);
      break;
    case 'municipio':
      if (!municipioItems.includes(novoItem)) municipioItems.push(novoItem);
      preencherSelect('municipio', municipioItems);
      break;
  }

  // Limpar o formulário
  document.getElementById('add-item-form').reset();
});

// Função para preencher os itens no campo "Item" do formulário de observações
document.getElementById('tipo-item-obs').addEventListener('change', function () {
  const tipoItem = this.value;
  const selectItemObs = document.getElementById('item-obs');
  selectItemObs.innerHTML = '<option value="">Selecione...</option>';

  let items = [];
  switch (tipoItem) {
    case 'frota':
      items = frotaItems;
      break;
    case 'equipamento':
      items = equipamentoItems;
      break;
    case 'operador':
      items = operadorItems;
      break;
    case 'obra':
      items = obraItems;
      break;
    case 'municipio':
      items = municipioItems;
      break;
  }

  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    selectItemObs.appendChild(option);
  });
});

// Função para adicionar observações
document.getElementById('add-observacao-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const tipoItem = document.getElementById('tipo-item-obs').value;
  const item = document.getElementById('item-obs').value;
  const observacao = document.getElementById('observacao-item').value.trim();

  if (!observacao) return;

  // Salvar a observação no objeto
  if (!observacoes[tipoItem][item]) {
    observacoes[tipoItem][item] = [];
  }
  observacoes[tipoItem][item].push(observacao);

  // Atualizar a lista de observações
  atualizarListaObservacoes();

  // Limpar o formulário
  document.getElementById('add-observacao-form').reset();
});

// Função para atualizar a lista de observações
function atualizarListaObservacoes() {
  const lista = document.getElementById('lista-observacoes');
  lista.innerHTML = '';

  for (const tipo in observacoes) {
    for (const item in observacoes[tipo]) {
      observacoes[tipo][item].forEach(obs => {
        const li = document.createElement('li');
        li.textContent = `[${tipo}] ${item}: ${obs}`;
        lista.appendChild(li);
      });
    }
  }
}

// Função para imprimir a planilha
function imprimir() {
  window.print();
}

// Função para enviar por WhatsApp
function enviarWhatsApp() {
  const table = document.getElementById('registros').getElementsByTagName('tbody')[0];
  let mensagem = "Registros da Planilha:\n\n";

  for (let row of table.rows) {
    mensagem += `Frota: ${row.cells[0].innerText}\n`;
    mensagem += `Equipamento: ${row.cells[1].innerText}\n`;
    mensagem += `Operador: ${row.cells[2].innerText}\n`;
    mensagem += `Obra: ${row.cells[3].innerText}\n`;
    mensagem += `Município: ${row.cells[4].innerText}\n`;
    mensagem += `Observação: ${row.cells[5].innerText}\n\n`;
  }

  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}