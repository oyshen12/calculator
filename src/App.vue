<template>
  <v-app>
    <v-main class=""><calculator-component></calculator-component> </v-main>
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
  align-items: center;
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
.v-main__wrap {
  height: 100%;
}

@media (max-width: 600px) {
  .card-calc {
    height: 100% !important;
    width: 100% !important;
    justify-content: center;
  }
  .calc-text {
    margin-right: 24px;
  }
}
@media (max-width: 422px) {
  .calc-experession {
    max-width: 90% !important;
  }
  .calc-text {
    max-width: 90% !important;
  }
}
</style>
