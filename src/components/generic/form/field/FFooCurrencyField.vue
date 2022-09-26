<template>
  <div>
    <v-text-field
      v-bind="$props"
      outlined
      :value="modelValue"
      v-on:keypress="keyPress"
      prefix="$"
      @input="(newValue) => (modelValue = newValue)"
    ></v-text-field>
  </div>
</template>
  <script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib/components";

@Component({
  components: {
    VTextField,
  },
})
export default class FFooCurrencyField extends VTextField {
  @Prop()
  value: string;
  precession: string = "2";
  mounted() {}

  get modelValue() {
    return this.getMaskedValued(this.value);
  }

  set modelValue(newModelValue: string) {
    this.$emit("input", this.getUnMaskedValue(newModelValue));
  }
  getMaskedValued(value: any) {
    if (!value && value !== 0) {
      return "";
    }
    return Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: +this.precession,
      minimumFractionDigits: +this.precession,
    });
  }

  getUnMaskedValue(value: string) {
    if (!value) {
      return "";
    }

    value = this.clearNumber(value);
    // Ajustar quantidade de zeros à esquerda
    value = value.padStart(parseInt(this.precession) + 1, "0");
    // Incluir ponto na casa correta, conforme a precisão configurada
    value =
      value.substring(0, value.length - parseInt(this.precession)) +
      "." +
      value.substring(value.length - parseInt(this.precession), value.length);
    return value;
  }

  // Retira todos os caracteres não numéricos e zeros à esquerda
  clearNumber(value: string) {
    let result = "";
    if (value) {
      let flag = false;
      let arrayValue = value.toString().split("");
      for (let i = 0; i < arrayValue.length; i++) {
        if (this.isInteger(arrayValue[i])) {
          if (!flag) {
            // Retirar zeros à esquerda
            if (arrayValue[i] !== "0") {
              result = result + arrayValue[i];
              flag = true;
            } else {
              // Permitir zero quando valor igual a zero - Tipo 3 (Money or Percent)
              if (Number(value) === 0) {
                result = result + arrayValue[i];
              }
            }
          } else {
            result = result + arrayValue[i];
          }
        }
      }
    }
    return result;
  }

  keyPress(event: any) {
    // console.log(event.keyCode); //keyCodes value
    let keyCode = event.keyCode ? event.keyCode : event.which;
    // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    if (keyCode < 48 || keyCode > 57) {
      // 46 is dot
      event.preventDefault();
    }
  }

  isInteger(value: string) {
    let result = false;
    if (Number.isInteger(parseInt(value))) {
      result = true;
    }
    return result;
  }
}
</script>
  