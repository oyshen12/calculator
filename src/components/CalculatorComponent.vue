<!-- eslint-disable prettier/prettier -->
<template>
  <v-card
    class="
      d-flex
      flex-column
      align-end
      px-0 px-sm-12 px-md-12 px-lg-12 px-xl-12
      card-calc
      blue
    "
    width="470"
    height="616px"
  >
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-card-text
          v-bind="attrs"
          v-on="on"
          class="text-h3 font-weight-bold calc-experession text-white px-0"
          >{{ fisrNumber }} {{ sign }} {{ lastNumber }}</v-card-text
        >
      </template>
      <span>{{ fisrNumber }} {{ sign }} {{ lastNumber }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-card-text
          v-if="checkLengthExpression"
          class="text-h5 font-weight-bold calc-text text-white pr-0"
          >Превышен лимит числа</v-card-text
        >
        <v-card-text
          v-else
          v-bind="attrs"
          v-on="on"
          class="text-h2 font-weight-bold calc-text text-white px-0"
          >{{ experessionValue }}</v-card-text
        >
      </template>
      <span>{{ experessionValue }}</span>
    </v-tooltip>
    <div class="divider mb-4"></div>
    <div class="grid-wrap-btns">
      <button-calculator @click.native="clear">C</button-calculator>
      <button-calculator @click.native="root">√</button-calculator>
      <button-calculator @click.native="procent">%</button-calculator>
      <button-calculator @click.native="share">/</button-calculator>
      <div class="btns-numbers">
        <button-calculator
          v-for="(number, index) in numbers"
          :key="index"
          @click.native="addNumber(number)"
          >{{ number }}</button-calculator
        >
        <button-calculator @click.native="dot">.</button-calculator>
      </div>
      <button-calculator @click.native="multiply">×</button-calculator>
      <button-calculator @click.native="subtract">-</button-calculator>
      <button-calculator @click.native="add">+</button-calculator>
      <button-calculator @click.native="equalClick">=</button-calculator>
    </div>
  </v-card>
</template>
<script lang="ts">
import ButtonCalculator from "@/components/ButtonCalculator.vue";
import * as operators from "@/const";

export default {
  components: { ButtonCalculator },
  data() {
    return {
      experessionValue: "0",
      fisrNumber: "",
      lastNumber: "",
      equal: false,
      sign: "",
      numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00"],
    };
  },
  computed: {
    checkNumbers(): boolean {
      return this.fisrNumber && !this.lastNumber ? true : false;
    },
    checkLengthExpression(): boolean {
      return this.fisrNumber.length + this.experessionValue.length <= 45
        ? false
        : true;
    },
  },
  methods: {
    add(): void {
      if (this.generalFunctionality(operators.PLUS) && this.checkNumbers) {
        this.fisrNumber = (
          parseFloat(this.fisrNumber) + parseFloat(this.experessionValue)
        ).toString();
        this.experessionValue = "";
      }
    },
    subtract(): void {
      if (this.generalFunctionality(operators.MINUS) && this.checkNumbers) {
        this.fisrNumber = (
          parseFloat(this.fisrNumber) - parseFloat(this.experessionValue)
        ).toString();
        this.experessionValue = "";
      }
    },
    multiply(): void {
      if (this.generalFunctionality(operators.MULTIPLY) && this.checkNumbers) {
        this.fisrNumber = (
          parseFloat(this.fisrNumber) * parseFloat(this.experessionValue)
        ).toString();
        this.experessionValue = "";
      }
    },
    share(): void {
      if (this.generalFunctionality(operators.SHARE) && this.checkNumbers) {
        const number =
          parseFloat(this.fisrNumber) / parseFloat(this.experessionValue);
        if (Number.isInteger(number)) {
          this.fisrNumber = number.toString();
        } else {
          this.fisrNumber = number.toFixed(3).toString();
        }

        this.experessionValue = "";
      }
    },
    root(): void {
      let value: string | number = Math.sqrt(parseFloat(this.experessionValue));
      if (isNaN(value)) {
        return;
      }
      if (!Number.isInteger(value)) {
        value = value.toFixed(3);
      }
      if (this.checkNumbers && this.experessionValue) {
        this.experessionValue = value.toString();
        this.equalClick();
      } else if (this.experessionValue && this.fisrNumber && this.lastNumber) {
        this.fisrNumber = "√";
        this.lastNumber = this.experessionValue;
        this.sign = "";
        this.experessionValue = value.toString();
      } else if (this.experessionValue) {
        this.fisrNumber = "√";
        this.lastNumber = this.experessionValue;
        this.experessionValue = value.toString();
      }
    },
    procent(): void {
      if (this.checkNumbers && this.experessionValue) {
        let procent: string | number =
          (parseFloat(this.fisrNumber) / 100) *
          parseFloat(this.experessionValue);
        if (!Number.isInteger(procent)) {
          procent = procent.toFixed(3);
          while (procent.slice(-1) === "0") {
            procent = procent.slice(0, -1);
          }
        }
        this.experessionValue = procent.toString();
        this.equalClick();
      }
    },
    dot(): void {
      if (this.experessionValue && !this.experessionValue.includes(".")) {
        this.experessionValue += ".";
        this.equal = false;
      }
    },
    generalFunctionality(sign: string): boolean {
      this.removeExcessZero();
      this.lastDotRemove();
      this.equal = false;
      if (sign !== this.sign && this.checkNumbers && this.experessionValue) {
        this.fisrNumber = this.switchSign(this.sign);
        this.experessionValue = "";
        this.sign = sign;
        return false;
      }

      this.sign = sign;
      if (this.checkNumbers && !this.experessionValue) {
        return false;
      }
      if (!this.fisrNumber && this.experessionValue) {
        this.fisrNumber = this.experessionValue;
        this.experessionValue = "";
        return false;
      } else if (this.fisrNumber && this.lastNumber) {
        this.fisrNumber = this.experessionValue;
        this.lastNumber = "";
        this.experessionValue = "";
        return false;
      }
      return true;
    },
    lastDotRemove(): void {
      if (this.fisrNumber.slice(-1) === operators.DOT) {
        this.fisrNumber = this.fisrNumber.slice(0, -1);
      }
      if (this.experessionValue.slice(-1) === operators.DOT) {
        this.experessionValue = this.experessionValue.slice(0, -1);
      }
    },
    addNumber(numberParam: string): void {
      if (this.excessZero(numberParam) || this.checkLengthExpression) {
        return;
      }

      if (this.equal) {
        if (this.fisrNumber && this.lastNumber) {
          this.fisrNumber = "";
          this.lastNumber = "";
          this.sign = "";
          this.experessionValue = numberParam;
        } else if (!this.fisrNumber) {
          this.experessionValue += numberParam;
        }
      } else if (!this.equal && this.experessionValue !== "0") {
        this.experessionValue += numberParam;
      } else if (this.experessionValue === "0") {
        this.experessionValue = numberParam;
      }
    },
    equalClick(): void {
      if (this.fisrNumber && this.experessionValue) {
        this.equal = true;
        this.removeExcessZero();
        this.lastDotRemove();
        this.lastNumber = this.experessionValue;
      }
      const experessionValue = this.switchSign(this.sign);
      if (isNaN(parseFloat(experessionValue))) {
        this.experessionValue = "0";
      } else {
        this.experessionValue = experessionValue;
      }
    },
    excessZero(number: string): boolean {
      const expression =
        !this.experessionValue.includes(".") && this.experessionValue === "0";
      if (number === "0" && !this.equal && expression) {
        return true;
      }
      if (number === "00" && (expression || this.experessionValue === "")) {
        return true;
      }
      return false;
    },
    removeExcessZero(): void {
      if (this.experessionValue.includes(".")) {
        while (this.experessionValue.slice(-1) === "0") {
          this.experessionValue = this.experessionValue.slice(0, -1);
        }
      }
    },
    switchSign(sign: string): string {
      let experessionValue = "";
      const numberShare =
        parseFloat(this.fisrNumber) / parseFloat(this.experessionValue);
      switch (sign) {
        case operators.PLUS:
          experessionValue = (
            parseFloat(this.fisrNumber) + parseFloat(this.experessionValue)
          ).toString();
          break;
        case operators.MINUS:
          experessionValue = (
            parseFloat(this.fisrNumber) - parseFloat(this.experessionValue)
          ).toString();
          break;
        case operators.MULTIPLY:
          experessionValue = (
            parseFloat(this.fisrNumber) * parseFloat(this.experessionValue)
          ).toString();
          break;
        case operators.SHARE:
          if (Number.isInteger(numberShare)) {
            experessionValue = numberShare.toString();
          } else {
            experessionValue = numberShare.toFixed(3).toString();
          }
          break;
      }
      return experessionValue ? experessionValue : this.experessionValue;
    },
    deleteLastSymbol(): void {
      if (
        this.experessionValue &&
        this.experessionValue !== "0" &&
        !this.equal
      ) {
        this.experessionValue = this.experessionValue.slice(0, -1);
        if (this.experessionValue === "") {
          this.experessionValue = "0";
        }
      }
    },
    clear(): void {
      this.fisrNumber = "";
      this.lastNumber = "";
      this.equal = false;
      this.sign = "";
      this.experessionValue = "0";
    },
    listenerKey(event: KeyboardEvent): void {
      const { key } = event;
      if (this.numbers.includes(key)) {
        this.addNumber(key);
      }
      switch (key) {
        case "+":
          this.add();
          break;
        case "-":
          this.subtract();
          break;
        case "/":
          this.share();
          break;
        case "*":
          this.multiply();
          break;
        case "=":
          this.equalClick();
          break;
        case "Enter":
          this.equalClick();
          break;
        case "%":
          this.procent();
          break;
        case "Escape":
          this.clear();
          break;
        case "Backspace":
          this.deleteLastSymbol();
          break;
        case "Delete":
          this.deleteLastSymbol();
          break;
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.listenerKey);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.listenerKey);
  },
};
</script>

<style scoped>
.calc-text {
  color: white;
  height: 82px;
  max-width: 422px;
  word-break: normal !important;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.calc-experession {
  height: 72px;
  max-width: 422px;
  word-break: normal !important;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.grid-wrap-btns {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  width: 100%;
}
.flex-wrap-btn {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}
.btns-numbers {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 6;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  width: 100%;
}
</style>
