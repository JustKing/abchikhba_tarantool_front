<template>
  <div id="app">
    <h2>Абчихба - ссылочный сокращатель</h2>
    <div class="flex flex-column">
      <input v-model="url" />
      <button type="submit" @click="cutIt">Сократить</button>
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
  public qrCode = "";

  public async cutIt(): Promise<void> {
    try {
      const response: Response = await fetch("/api/set", {
        method: "POST",
        body: JSON.stringify({ link: this.url }),
      });
      if (!response.ok) {
        throw new Error();
      }
      this.result = await response.json();
      this.getQrCode();
    } catch (e) {
      alert("Не удалось сократить ссылку");
    }
  }

  private async getQrCode(): Promise<void> {
    try {
      const response: Response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.result}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      this.qrCode = await response.json();
    } catch (e) {
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
