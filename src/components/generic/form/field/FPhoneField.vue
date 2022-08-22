<template>
  <v-text-field v-bind="$props" :value="modelValue"  @input="(newValue) => modelValue = newValue" ></v-text-field>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib/components";

@Component({
  components: {
    VTextField,
  },
})
export default class FPhoneField extends VTextField {

  // @Prop()
  // mask: (x:any) => {}

  // mask = (value: string | number) => {
  //   const stringValue = value.toString();
  //   return stringValue
  //     .replace(/\D/g, '')
  //     .replace(/(\d{2})(\d)/, '($1) $2')
  //     .replace(/(\d{3})(\d{4})/, '$1-$2')
  // };
  
  
  // mask = function(value: any) {
  //   const regex = new RegExp(/^\d{0,16}$/g)
  //   if(value.match(regex)) {
  //     var output = [];
  //       for(var i = 0; i < value.length; i++) {
  //         if(i !== 0 && i % 4 === 0) {
  //           output.push(" "); // add the separator
  //         }
  //         output.push(value[i]);
  //       }
  //       return output.join("");
  //   }else{
  //     // return value
  //   }
  // }
  // unmask = function(value: any) {
  //   const regex = new RegExp(/^\d{0,16}$/g)
  //   if(value.match(regex)) {
  //   var output = value.replace(new RegExp(/[^\d]/, 'g'), ''); // Remove every non-digit character
  //   return output;
  //   }
  // }


  // MODEL VALUE - START
  @Prop()
  value: string;

  get modelValue() {
    // return this.mask(this.value)
    return this.value
  }

  set modelValue(newModelValue: string) {
    if(newModelValue) {
      // this.$emit("input",this.unmask(newModelValue));
      this.$emit("input",newModelValue);
    } else {
      this.$emit("input", 0);
    }
    
  }
  // MODEL VALUE - END

}
</script>
