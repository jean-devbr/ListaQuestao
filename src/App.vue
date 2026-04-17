<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api } from "@/service/api";
import type { QuizQuestion, ApiResponse } from "@/interface/QuizQuestion";

const quizQuestion = ref<QuizQuestion | null>(null);
const loading = ref(false);
const lastRequestTime = ref(0);
const message = ref("");


const getNewQuestion = async () => {

  const now = Date.now();

  if (now - lastRequestTime.value < 5000 ) {
    message.value = "Aguerde alguns segundes de atualizar.";
    return;
  }

  lastRequestTime.value = now;
  loading.value = true;
  message.value = "";

  try {
    const response = await api.get<ApiResponse>(
      "/api.php?amount=1&category=18&difficulty=easy&type=multiple"
    );

    const firstQuestion = response.data.results[0];
    quizQuestion.value = firstQuestion ?? null;
  } catch (error) {
    console.error("Error:" , error);
    message.value = "Error ao carregar a pergunta. Espera 5 segundos"
  } finally {
    loading.value = false
  }

};

onMounted(() => {
  getNewQuestion();
});


</script>

<template>
  <div id="app">
    <p v-if="message"> {{ message }}</p>
    <p v-if="loading"> Carregando a pergunta...</p>
    <h1 v-else v-html="quizQuestion?.question || ''"></h1>

    <div>
      <label for="answer-true">True</label>
      <input id="answer-true" type="radio" name="answer" value="true" />
    </div>

    <div>
      <label for="answer-false">False</label>
      <input id="answer-false" type="radio" name="answer" value="false" />
    </div>

    <button class="send" type="button">Enviar resposta</button>
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
