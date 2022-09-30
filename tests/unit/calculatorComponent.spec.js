import CalculatorComponent from "@/components/CalculatorComponent.vue";
import { mount } from "@vue/test-utils";

describe("CalculatorComponent.vue", () => {
  const wrapper = mount(CalculatorComponent);
  const { vm } = wrapper;
  const buttons = wrapper.findAll(".v-btn").wrappers;

  const findEl = (name) => buttons.find((el) => el.text() === name);
  const clear = () => findEl("C").trigger("click");
  const equal = () => findEl("=").trigger("click");

  const fullOperation = (operationName) => {
    vm.experessionValue = "2";
    const operation = findEl(operationName);
    operation.trigger("click");
    vm.experessionValue = "3";
    equal();
  };

  const chainOperation = (operationName) => {
    vm.experessionValue = "2";
    const operation = findEl(operationName);
    operation.trigger("click");
    vm.experessionValue = "3";
    operation.trigger("click");
  };

  it("Проверка сложения", () => {
    fullOperation("+");
    expect(vm.experessionValue).toBe("5");
    expect(vm.fisrNumber).toBe("2");
    expect(vm.lastNumber).toBe("3");
    expect(vm.sign).toBe("+");
    clear();

    chainOperation("+");
    expect(vm.experessionValue).toBe("");
    expect(vm.fisrNumber).toBe("5");
    expect(vm.lastNumber).toBe("");
    expect(vm.sign).toBe("+");
    clear();
  });

  it("Проверка вычитания", () => {
    fullOperation("-");
    expect(vm.experessionValue).toBe("-1");
    expect(vm.fisrNumber).toBe("2");
    expect(vm.lastNumber).toBe("3");
    expect(vm.sign).toBe("-");
    clear();

    chainOperation("-");
    expect(vm.experessionValue).toBe("");
    expect(vm.fisrNumber).toBe("-1");
    expect(vm.lastNumber).toBe("");
    expect(vm.sign).toBe("-");
    clear();
  });

  it("Проверка умножения", () => {
    fullOperation("×");
    expect(vm.experessionValue).toBe("6");
    expect(vm.fisrNumber).toBe("2");
    expect(vm.lastNumber).toBe("3");
    expect(vm.sign).toBe("×");
    clear();

    chainOperation("×");
    expect(vm.experessionValue).toBe("");
    expect(vm.fisrNumber).toBe("6");
    expect(vm.lastNumber).toBe("");
    expect(vm.sign).toBe("×");
    clear();
  });

  it("Проверка деления", () => {
    fullOperation("/");
    expect(vm.experessionValue).toBe((2 / 3).toString());
    expect(vm.fisrNumber).toBe("2");
    expect(vm.lastNumber).toBe("3");
    expect(vm.sign).toBe("/");
    clear();

    chainOperation("/");
    expect(vm.experessionValue).toBe("");
    expect(vm.fisrNumber).toBe((2 / 3).toString());
    expect(vm.lastNumber).toBe("");
    expect(vm.sign).toBe("/");
    clear();
  });

  it("Проверка удаления", () => {
    fullOperation("/");
    clear();
    expect(vm.experessionValue).toBe("0");
    expect(vm.fisrNumber).toBe("");
    expect(vm.lastNumber).toBe("");
    expect(vm.sign).toBe("");
  });

  it("Проверка корня", () => {
    vm.experessionValue = "9";
    const root = findEl("√");
    root.trigger("click");

    expect(vm.experessionValue).toBe("3");
    expect(vm.fisrNumber).toBe("√");
    expect(vm.lastNumber).toBe("9");
    expect(vm.sign).toBe("");
    clear();

    const add = findEl("+");
    vm.experessionValue = "2";
    add.trigger("click");
    vm.experessionValue = "9";
    root.trigger("click");

    expect(vm.experessionValue).toBe("5");
    expect(vm.fisrNumber).toBe("2");
    expect(vm.lastNumber).toBe("3");
    expect(vm.sign).toBe("+");
    clear();
  });

  it("Проверка процента", () => {
    vm.experessionValue = "100";
    const procent = findEl("%");
    procent.trigger("click");

    expect(vm.experessionValue).toBe("100");
    expect(vm.fisrNumber).toBe("");
    expect(vm.lastNumber).toBe("");
    expect(vm.sign).toBe("");
    clear();

    const add = findEl("+");
    vm.experessionValue = "200";
    add.trigger("click");
    vm.experessionValue = "10";
    procent.trigger("click");

    expect(vm.experessionValue).toBe("220");
    expect(vm.fisrNumber).toBe("200");
    expect(vm.lastNumber).toBe("20");
    expect(vm.sign).toBe("+");
  });

  it("Проверка нажатия на цифры", () => {
    const numbersExpression =
      "1" ||
      "2" ||
      "3" ||
      "4" ||
      "5" ||
      "6" ||
      "7" ||
      "8" ||
      "9" ||
      "0" ||
      "00";
    const numbersBtns = buttons.filter((el) => el.text() === numbersExpression);
    numbersBtns.map((btn) => {
      btn.trigger("click");
      expect(vm.experessionValue).toBe(btn.text());
      clear();
    });
  });
});
