<template>
  <div id="app">
    <h2>Абчихба - ссылочный сокращатель</h2>
    <div class="flex flex-column">
      <input v-model="url" />
      <button type="submit" @click="cutIt">Сократить</button>
      <div>
        {{ result }}
      </div>
      <div v-if="result.length > 0">
        <img
          :src="`https://api.qrserver.com/v1/create-qr-code/?data=${result}&size=100x100`"
        />
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

  public async cutIt(): Promise<void> {
    try {
      const response: Response = await fetch("/set", {
        method: "POST",
        body: JSON.stringify({ link: this.url }),
      });
      if (!response.ok) {
        throw new Error();
      }
      this.result = await response.text();
    } catch (e) {
      console.log(e);
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
