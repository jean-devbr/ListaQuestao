<script setup lang="ts">
import StatusInfo from "./components/StatusInfo.vue";
import QuizQuestionCard from "./components/QuizQuestionCard.vue";
import { useQuiz } from "@/composables/useQuiz";

const {
  quizQuestion,
  answers,
  answerResult,
  selectedAnswer,
  hasAnswered,
  loading,
  message,
  correctAnswers,
  wrongAnswers,
  handleMainButton,
} = useQuiz();
</script>


<template>
  <div id="app">

    <section class="score">

      <span>Acertos: {{ correctAnswers }}</span>
      <span>Erros: {{ wrongAnswers }}</span>

    </section>

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

.score {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.score span {
  padding: 8px 12px;
  border: 1px solid #2c3e50;
  border-radius: 6px;
  font-weight: 600;
}


</style>
