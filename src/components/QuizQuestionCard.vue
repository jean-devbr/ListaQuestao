<script setup lang="ts">
import type { QuizQuestion } from "@/interface/QuizQuestion";

defineProps<{
  quizQuestion: QuizQuestion;
  answers: string[];
  loading: boolean;
  hasAnswered: boolean;
  answerResult: string;
}>();

const model = defineModel<string>({ default: "" });

const emit = defineEmits<{
  (e: "main-action"): void;
}>();
</script>

<template>
  <h1 v-html="quizQuestion.question"></h1>

  <div class="answer-input">
    <div v-for="(answer, index) in answers" :key="answer" class="option">
      <input :id="'answer-' + index" v-model="model" type="radio" name="quiz-answer" :value="answer" />
      <label :for="'answer-' + index">{{ answer }}</label>
    </div>
  </div>

  <button class="send" type="button" :disabled="loading || (!hasAnswered && !model)" @click="emit('main-action')">
    {{ hasAnswered ? "Proxima questao" : "Enviar Resposta" }}
  </button>

  <p v-if="answerResult">{{ answerResult }}</p>
</template>

<style scoped>
h1 {
  margin-top: 40px;
}

.answer-input {
  margin-top: 16px;
}

.option {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 8px 0;
}

input[type="radio"] {
  margin: 0;
}

button.send {
  margin-top: 12px;
  height: 40px;
  min-width: 140px;
  padding: 0 16px;
  color: #fff;
  background-color: #1867c0;
  border: 1px solid #1867c0;
  border-radius: 6px;
  cursor: pointer;
}

button.send:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style
