// Seleciona todos os botões com a classe 'arrow'
const botoesPonto = document.getElementsByClassName('arrow');

Array.from(botoesPonto).forEach(botao => {
    botao.addEventListener('click', () => {
        const agora = new Date();
        const registro = {
            data: agora.toLocaleDateString('pt-BR'),
            hora: agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            timestamp: agora.getTime()
        };

        chrome.storage.local.get({ pontos: [], notificacoes: [] }, (result) => {
            const pontos = result.pontos;
            const notificacoes = result.notificacoes;
            pontos.push(registro);
            notificacoes.push(`Ponto registrado: ${registro.data} - ${registro.hora}`);
            chrome.storage.local.set({ pontos, notificacoes }, () => {
                console.log('Ponto registrado:', registro);
                calcularHoras(pontos);
            });
        });
    });
});

function calcularHoras(pontos) {
    let horasTrabalhadas = 0;

    if (pontos.length >= 2) {
        horasTrabalhadas += (pontos[1].timestamp - pontos[0].timestamp) / (1000 * 60 * 60);
    }

    if (pontos.length >= 4) {
        horasTrabalhadas += (pontos[3].timestamp - pontos[2].timestamp) / (1000 * 60 * 60);
    }

    const jornada = document.querySelector('input[name="jornada"]:checked').value;
    const horasNecessarias = jornada === '8' ? 8 : 6;

    if (pontos.length < 4) {
        const horasRestantes = horasNecessarias - horasTrabalhadas;
        let mensagem = `Você já trabalhou ${horasTrabalhadas.toFixed(2)} horas. Faltam ${horasRestantes.toFixed(2)} horas para completar ${horasNecessarias} horas.`;

        if (pontos.length === 3) {
            const proximoHorario = new Date(pontos[2].timestamp + horasRestantes * 60 * 60 * 1000);
            const horarioFormatado = proximoHorario.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            mensagem += ` Para completar ${horasNecessarias} horas, você deve bater o 4º ponto às ${horarioFormatado}.`;
        }

        chrome.storage.local.get({ notificacoes: [] }, (result) => {
            const notificacoes = result.notificacoes;
            notificacoes.push(mensagem);
            chrome.storage.local.set({ notificacoes }, () => {
                console.log('Notificação adicionada:', mensagem);
            });
        });
    } else {
        const mensagem = `Você completou ${horasTrabalhadas.toFixed(2)} horas de trabalho.`;
        chrome.storage.local.get({ notificacoes: [] }, (result) => {
            const notificacoes = result.notificacoes;
            notificacoes.push(mensagem);
            chrome.storage.local.set({ notificacoes }, () => {
                console.log('Notificação adicionada:', mensagem);
            });
        });
    }
}