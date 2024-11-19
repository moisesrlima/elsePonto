document.getElementById('limparPontos').addEventListener('click', () => {
  chrome.storage.local.set({ pontos: [] }, () => {
      atualizarListaPontos([]);
      atualizarResultados([]);
      alert('Todos os registros foram limpos.');
  });
});

function atualizarListaPontos(pontos) {
  const lista = document.getElementById('listaPontos');
  lista.innerHTML = '';
  pontos.forEach((ponto) => {
      const tr = document.createElement('tr');
      const tdData = document.createElement('td');
      const tdHora = document.createElement('td');
      tdData.textContent = ponto.data;
      tdHora.textContent = ponto.hora;
      tr.appendChild(tdData);
      tr.appendChild(tdHora);
      lista.appendChild(tr);
  });
}

function atualizarResultados(pontos) {
  let horasTrabalhadas = 0;
  let mensagemHorasTrabalhadas = '';
  let mensagemHorasRestantes = '';
  let mensagemProximoHorario = '';

  const jornada = document.querySelector('input[name="jornada"]:checked').value;
  const horasNecessarias = jornada === '8' ? 8 : 6;

  if (pontos.length >= 2) {
      horasTrabalhadas += (pontos[1].timestamp - pontos[0].timestamp) / (1000 * 60 * 60);
  }

  if (pontos.length >= 4) {
      horasTrabalhadas += (pontos[3].timestamp - pontos[2].timestamp) / (1000 * 60 * 60);
  }

  if (pontos.length < 4) {
      const horasRestantes = horasNecessarias - horasTrabalhadas;
      mensagemHorasTrabalhadas = `Você já trabalhou ${horasTrabalhadas.toFixed(2)} horas.`;
      mensagemHorasRestantes = `Faltam ${horasRestantes.toFixed(2)} horas para completar ${horasNecessarias} horas.`;

      if (pontos.length === 3) {
          const proximoHorario = new Date(pontos[2].timestamp + horasRestantes * 60 * 60 * 1000);
          const horarioFormatado = proximoHorario.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
          mensagemProximoHorario = `Para completar ${horasNecessarias} horas, você deve bater o 4º ponto às ${horarioFormatado}.`;
      }
  } else {
      mensagemHorasTrabalhadas = `Você completou ${horasTrabalhadas.toFixed(2)} horas de trabalho.`;
  }

  document.getElementById('horasTrabalhadas').textContent = mensagemHorasTrabalhadas;
  document.getElementById('horasRestantes').textContent = mensagemHorasRestantes;
  document.getElementById('proximoHorario').textContent = mensagemProximoHorario;
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get({ pontos: [] }, (result) => {
      atualizarListaPontos(result.pontos);
      atualizarResultados(result.pontos);
  });

  document.querySelectorAll('input[name="jornada"]').forEach((input) => {
      input.addEventListener('change', () => {
          chrome.storage.local.get({ pontos: [] }, (result) => {
              atualizarResultados(result.pontos);
          });
      });
  });
});