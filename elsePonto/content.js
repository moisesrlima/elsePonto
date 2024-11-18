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

        chrome.storage.local.get({ pontos: [] }, (result) => {
            const pontos = result.pontos;
            pontos.push(registro);
            chrome.storage.local.set({ pontos }, () => {
                alert('Ponto registrado com sucesso!');
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

    if (pontos.length < 4) {
        const horasRestantes = 8 - horasTrabalhadas;
        let mensagem = `Você já trabalhou ${horasTrabalhadas.toFixed(2)} horas. Faltam ${horasRestantes.toFixed(2)} horas para completar 8 horas.`;

        if (pontos.length === 3) {
            const proximoHorario = new Date(pontos[2].timestamp + horasRestantes * 60 * 60 * 1000);
            const horarioFormatado = proximoHorario.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            mensagem += ` Para completar 8 horas, você deve bater o 4º ponto às ${horarioFormatado}.`;
        }

        alert(mensagem);
    } else {
        alert(`Você completou ${horasTrabalhadas.toFixed(2)} horas de trabalho.`);
    }
}