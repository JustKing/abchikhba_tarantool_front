<template>
  <div id="app">
    <h2>Абчихба - ссылочный сокращатель</h2>
    <div class="flex flex-column">
      <input v-model="url" />
      <button type="submit" @click="cutIt">Скоратить</button>
      <div>
        {{ result }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  public url = "";
  public result = "";
  private currentResponse: Response = new Response();

  public async cutIt(): Promise<void> {
    try {
      const response: Response = await fetch("http://89.208.198.209:8081/set", {
        method: "POST",
        body: JSON.stringify({ link: this.url }),
      });
      if (!response.ok) {
        this.currentResponse = response;
        throw new Error();
      }
      this.result = await response.json();
    } catch (e) {
      this.currentResponse = new Response();
      alert("Не удалось сократить ссылку");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
