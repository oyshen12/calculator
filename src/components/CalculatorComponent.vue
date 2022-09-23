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
    height="600px"
  >
    <v-card-text
      class="text-h3 font-weight-bold calc-experession text-white pr-0"
      >{{ fisrNumber }} {{ sign }} {{ lastNumber }}
    </v-card-text>
    <v-card-text class="text-h2 font-weight-bold calc-text text-white pr-0">{{
      experessionValue
    }}</v-card-text>
    <div class="divider"></div>
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
        this.fisrNumber = (
          parseFloat(this.fisrNumber) / parseFloat(this.experessionValue)
        ).toString();
        this.experessionValue = "";
      }
    },
    root(): void {
      let value: string | number = Math.sqrt(parseFloat(this.experessionValue));
      if (!Number.isInteger(value)) {
        value = value.toFixed(10);
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
          procent = procent.toFixed(5);
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
      this.lastDotRemove();
      this.equal = false;
      if (sign !== this.sign && this.checkNumbers && this.experessionValue) {
        this.fisrNumber = this.switchSign(this.sign);
        this.experessionValue = "";
        this.sign = sign;
        return false;
      }

      this.sign = sign;
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
      console.log("number ", numberParam);
    },
    equalClick(): void {
      if (this.fisrNumber && this.experessionValue) {
        this.equal = true;
        this.lastDotRemove();
        this.lastNumber = this.experessionValue;
      }
      this.experessionValue = this.switchSign(this.sign);
    },
    removeZero(): void {
      //
    },
    switchSign(sign: string): string {
      let experessionValue = "";
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
          experessionValue = (
            parseFloat(this.fisrNumber) / parseFloat(this.experessionValue)
          ).toString();
          break;
      }
      return experessionValue ? experessionValue : this.experessionValue;
    },
    clear(): void {
      this.fisrNumber = "";
      this.lastNumber = "";
      this.equal = false;
      this.sign = "";
      this.experessionValue = "0";
    },
  },
};
</script>

<style scoped>
.calc-text {
  color: white;
  height: 92px;
}
.calc-experession {
  height: 82px;
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
