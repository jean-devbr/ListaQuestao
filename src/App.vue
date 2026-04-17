<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api } from "@/service/api";
import type { QuizQuestion, ApiResponse } from "@/interface/QuizQuestion";

const quizQuestion = ref<QuizQuestion | null>(null);
const answers = ref<string[]>([]);
const answerResult = ref("");
const isCorrect = ref<Boolean | null>(null);
const selectedAnswer = ref("");


const loading = ref(false);
const lastRequestTime = ref(0);
const message = ref("");

const decodeHtml = (value: string) => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(value, "text/html");
  return parsed.documentElement.textContent ?? value;
};

const normalize = (value: string ) => decodeHtml(value).trim().toLowerCase();

const shuffleAnswers = (items: string[]) => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i --) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = array[i]!;
    array[i] = array[j]!;
    array[j] = current;
  }
  return array
};


const getNewQuestion = async () => {

  const now = Date.now();
  selectedAnswer.value = "";

  if (now - lastRequestTime.value < 5000 ) {
    message.value = "Aguerde alguns segundes de atualizar.";
    return;
  }


  lastRequestTime.value = now;
  loading.value = true;
  message.value = "";
  answerResult.value = "";
  isCorrect.value = null;



  try {
    const response = await api.get<ApiResponse>(
      "/api.php?amount=1&category=18&difficulty=easy&type=multiple"
    );

    const firstQuestion = response.data.results[0];
    quizQuestion.value = firstQuestion ?? null;

    if (firstQuestion) {
      answers.value = shuffleAnswers([
        firstQuestion.correct_answer,...firstQuestion.incorrect_answers,
      ]).map((answer) => decodeHtml(answer));


    }

  } catch (error) {
    console.error("Error:" , error);
    message.value = "Error ao carregar a pergunta. Espera 5 segundos"
  } finally {
    loading.value = false
  }

};

const submitAnswer = () => {

  if(!quizQuestion.value) return;

  if(!selectedAnswer.value.trim()) {
    answerResult.value = "Seleciona uma resposta antes de enviar.";
    isCorrect.value = false;
    return;
  }

  const expected = normalize(quizQuestion.value.correct_answer);
  const typed = normalize(selectedAnswer.value);

  if (typed === expected) {
    answerResult.value = "Resposta corretar!";
    isCorrect.value = true;
    return;
  }

  answerResult.value = "Resposta incorreta. Correta: " + decodeHtml(quizQuestion.value.correct_answer);
  isCorrect.value = false;


};


onMounted(() => {
  getNewQuestion();
});


</script>

<template>
  <div id="app">
    <p v-if="message"> {{ message }}</p>
    <p v-if="loading"> Carregando a pergunta...</p>

    <template v-else-if="quizQuestion">
      <h1 v-html="quizQuestion?.question || ''"></h1>

    <div class="answer-input">

      <div v-for="(answer, index) in answers" :key="answer" class="option">
        <input
        :id="'answer-' + index"
        v-model="selectedAnswer"
        type="radio"
        name="quiz-answer"
        :value="answer"
      />
      <label :for="'answer-' + index">{{ answer }}</label>
      </div>
    </div>

    <button class="send" type="button" @click="submitAnswer">
         Enviar resposta
    </button>

    <p v-if="answerResult">{{ answerResult }}</p>
    </template>
 </div>
</template>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;
}

h1 {
  margin-top: 40px;
}

input[type='radio'] {
  margin: 12px 4px;
}

button.send {
  margin-top: 12px;
  height: 40px;
  min-width: 120px;
  padding: 0 16px;
  color: #fff;
  background-color: #1867c0;
  border: 1px solid #1867c0;
  cursor: pointer;
}

section.score {
  border-bottom: 1px solid black;
  padding: 24px;
  font-size: 18px;
}

/* Aqui estava o SCSS aninhado */
section.score span {
  padding: 8px;
  font-weight: bold;
  border: 1px solid black;
}

</style>
