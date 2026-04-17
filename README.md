# ListaQuestao

Aplicacao web em Vue 3 + TypeScript que busca perguntas de programacao na Open Trivia DB, embaralha alternativas e valida respostas.

## Objetivo

Projeto de estudo para praticar:

- Componentizacao com Vue
- Estado reativo com Composition API
- Consumo de API
- Organizacao de logica com composables
- Tipagem com TypeScript

## Funcionalidades

- Busca uma pergunta por vez na API
- Exibe enunciado e alternativas de multipla escolha
- Embaralha respostas a cada rodada
- Valida se a alternativa selecionada esta correta
- Exibe feedback de acerto ou erro
- Alterna acao do botao entre enviar resposta e proxima questao
- Exibe estado de carregamento e mensagens de status
- Evita chamadas repetidas em curto intervalo de tempo

## Tecnologias

- Vue 3
- TypeScript
- Vite
- Axios
- ESLint

## Estrutura

- src/App.vue: composicao da tela principal
- src/components/StatusInfo.vue: mensagens e carregamento
- src/components/QuizQuestionCard.vue: pergunta, opcoes e botao de acao
- src/composables/useQuiz.ts: estado e regras do quiz
- src/interface/QuizQuestion.ts: tipos da API
- src/service/api.ts: cliente HTTP

## Como executar

Pre-requisitos:

- Node.js 18 ou superior
- npm

Instalacao:

```sh
npm install
```

Ambiente de desenvolvimento:

```sh
npm run dev
```

Build de producao:

```sh
npm run build
```

Lint:

```sh
npm run lint
```

## Fluxo da aplicacao

1. A aplicacao inicia e busca uma nova pergunta.
2. A API retorna enunciado, resposta correta e respostas incorretas.
3. As alternativas sao embaralhadas e exibidas.
4. O usuario escolhe uma opcao e envia.
5. O sistema compara a resposta e mostra o resultado.
6. O botao permite carregar a proxima questao.

## Proximas melhorias

- Placar de acertos e erros
- Historico de perguntas respondidas
- Configuracao de categoria e dificuldade