# ListaQuestao

Aplicação web em Vue 3 + TypeScript que busca perguntas de programação na Open Trivia DB, embaralha alternativas e valida respostas.

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

- src/App.vue: composição da tela principal
- src/components/StatusInfo.vue: mensagens e carregamento
- src/components/QuizQuestionCard.vue: pergunta, opções e botão de acão
- src/composables/useQuiz.ts: estado e regras do quiz
- src/interface/QuizQuestion.ts: tipos da API
- src/service/api.ts: cliente HTTP

## Como executar

Pre-requisitos:

- Node.js 18 ou superior
- npm

Instalação:

```sh
npm install
```

Ambiente de desenvolvimento:

```sh
npm run dev
```

Build de produção:

```sh
npm run build
```

Lint:

```sh
npm run lint
```

## Fluxo da aplicação

1. A aplicação inicia e busca uma nova pergunta.
2. A API retorna enunciado, resposta correta e respostas incorretas.
3. As alternativas são embaralhadas e exibidas.
4. O usuário escolhe uma opcao e envia.
5. O sistema compara a resposta e mostra o resultado.
6. O botao permite carregar a proxima questao.

## Próximas melhorias

- Placar de acertos e erros
- Histórico de perguntas respondidas
- Configuração de categoria e dificuldade