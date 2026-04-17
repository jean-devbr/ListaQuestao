<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api } from "@/service/api";
import type { QuizQuestion, ApiResponse } from "@/interface/QuizQuestion";
import StatusInfo from "./components/StatusInfo.vue";
import QuizQuestionCard from "./components/QuizQuestionCard.vue";

const quizQuestion = ref<QuizQuestion | null>(null);
const answers = ref<string[]>([]);
const answerResult = ref("");
const isCorrect = ref<boolean | null>(null);
const selectedAnswer = ref("");
const hasAnswered = ref(false);


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


  if (now - lastRequestTime.value < 5000 ) {
    message.value = "Aguerde alguns segundos de atualizar.";
    return;
  }


  lastRequestTime.value = now;
  loading.value = true;
  message.value = "";
  answerResult.value = "";
  isCorrect.value = null;
  hasAnswered.value = false;
  selectedAnswer.value = "";


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

const handleMainButton = async () => {
  if (loading.value) return;

  if (hasAnswered.value) {
    await getNewQuestion();
    return;
  }

  submitAnswer();
};

const submitAnswer = () => {
  if(hasAnswered.value) return;
  if(!quizQuestion.value) return;

  if(!selectedAnswer.value.trim()) {
    answerResult.value = "Seleciona uma resposta antes de enviar.";
    isCorrect.value = false;
    return;
  }

  const expected = normalize(quizQuestion.value.correct_answer);
  const typed = normalize(selectedAnswer.value);

  if (typed === expected) {
    answerResult.value = "Resposta corretar! Clique para próxima questão.";
    isCorrect.value = true;
  }

  else {
    answerResult.value = "Resposta incorreta. Correta: "
    + decodeHtml(quizQuestion.value.correct_answer)
    + ". Clique para próxima questão.";
    isCorrect.value = false;
  }

  hasAnswered.value = true;

};




onMounted(() => {
  getNewQuestion();
});


</script>

<template>
  <div id="app">

    <template v-if="loading || message">
      <StatusInfo :message="message" :loading="loading" />
    </template>

   <template v-else-if="quizQuestion">
      <QuizQuestionCard
      :quiz-question="quizQuestion"
      :answers="answers"
      :loading="loading"
      :has-answered="hasAnswered"
      :answer-result="answerResult"
      v-model="selectedAnswer"
      @main-action="handleMainButton"
    />
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
</style>
