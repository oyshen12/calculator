<template>
  <v-app>
    <v-main class="d-flex justify-center align-center"
      ><calculator-component></calculator-component>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import CalculatorComponent from "@/components/CalculatorComponent.vue";

export default Vue.extend({
  name: "App",

  components: { CalculatorComponent },

  data: () => ({}),
});
</script>

<style>
.v-main__wrap {
  display: flex;
  justify-content: center;
}
.text-white {
  color: white !important;
}
.v-card__text {
  width: auto;
}
.divider {
  height: 2px;
  background: white;
  width: 100%;
}
</style>
