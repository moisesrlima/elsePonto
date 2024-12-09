# elsePonto

Else Ponto é uma extensão do Chrome que facilita o registro e o acompanhamento das batidas de ponto eletrônico. A extensão registra automaticamente as batidas de ponto, calcula as horas trabalhadas e informa quanto tempo falta para completar 8 horas de trabalho.

## Demonstração

![screenshot](./Scheenshot-1.png)

## Funcionalidades

- **Registro de Ponto**: Captura as batidas de ponto ao clicar em um botão específico na página.
- **Cálculo de Horas Trabalhadas**: Calcula a diferença de horas entre as batidas de ponto e informa quanto tempo falta para completar 8 horas.
- **Exibição de Registros**: Exibe uma tabela com todas as batidas de ponto registradas.
- **Limpeza de Registros**: Permite limpar todos os registros salvos no local storage.
- **Feedback Visual**: Exibe alertas para confirmar o registro de ponto e informar o tempo trabalhado.

## Instalação

1. Clone este repositório ou baixe os arquivos.
2. Abra o Chrome e vá para `chrome://extensions/`.
3. Ative o "Modo do desenvolvedor" no canto superior direito.
4. Clique em "Carregar sem compactação" e selecione a pasta do projeto.

## Uso

1. Acesse a página `https://awstou.ifractal.com.br/poupex/phonto.php`.
2. Clique no botão com a classe `arrow` para registrar o ponto.
3. Abra a extensão Ponto Fácil para ver os registros e os cálculos das horas trabalhadas.
4. Use o botão "Limpar Registros" para limpar todos os registros salvos.

## Estrutura do Projeto

- `manifest.json`: Arquivo de configuração da extensão.
- `popup.html`: Interface do popup da extensão.
- `popup.js`: Script para manipulação do popup e exibição dos registros.
- `content.js`: Script injetado na página para capturar as batidas de ponto.
- `icon.png`: Ícone da extensão.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias e correções.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.

Aceito melhorias...
