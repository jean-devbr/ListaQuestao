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
  handleMainButton,
} = useQuiz();
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
