import { Vue } from "vue-property-decorator";
import Moment from "moment";

export default class CustomFilters {
  public static setup() {
    this.toUSD();
    this.toINR();
    this.toDate();
    this.fromNow();
    this.duration();
    this.toDateTime();
    this.toDateTimeWithDuration();
    this.toDateWithDuration();
    this.parseJson();
    this.emptyObject();
    this.withBase();
    this.toDateAndTime();
    this.maskPhone();
    this.toMonthDay();
    this.toMaskedAccountNumber();
    this.toRoundedINR();
  }

  private static toUSD() {
    Vue.filter("toUSD", (value: any) => {
      return `$${value}`;
    });
  }


  private static toINR() {
    Vue.filter("toINR", (value: any) => {
      return `${value.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
     })}`;
    });
  }

  private static toRoundedINR() {
    Vue.filter("toRoundedINR", (value: number = 0) => {
      return `₹ ${Math.round(value).toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
     })}`;
    });
  }  
  
  private static toMaskedAccountNumber() {
    Vue.filter("masked-account-number", (value: string) => {
      return `XXXX ${value.substring(value.length - 4)}`;
    });
  }
  private static toDate() {
    Vue.filter("date", (value: any) => {
      if (!value) { return "-"}
      return Moment(new Date(value)).format("Do MMM YY");
    });
  }

  private static toMonthDay() {
    Vue.filter("monthday", (value: any) => {
      return Moment(new Date(value)).format("Do MMM");
    });
  }

  private static fromNow() {
    Vue.filter("fromNow", (value: any) => {
      return value?Moment(new Date(value)).fromNow():'--';
    });
  }

  private static duration() {
    Vue.filter("duration", (value: any) => {
      return Moment.duration(value).humanize();
    });
  }

  private static toDateTime() {
    Vue.filter("date-time", (value: any) => {
      return value?Moment(new Date(value)).format("MMM Do, h:mm a"):'--';
    });
  }
  private static toDateAndTime() {
    Vue.filter("datetime", (value: any) => {
      return value?Moment(new Date(value)).format("MMM Do, h:mm a"):'--';
    });
  }

  private static toDateTimeWithDuration() {
    Vue.filter("date-time-duration", (value: any) => {
      return (
        Moment(new Date(value)).format("MMMM Do YYYY, h:mm:ss a") +
        " ( " +
        Moment(new Date(value)).fromNow() +
        " ) "
      );
    });
  }

  private static toDateWithDuration() {
    Vue.filter("date-duration", (value: any) => {
      const daysDiffFromNow = Moment(new Date(value)).diff(Moment(), "days");
      return (
        Moment(new Date(value)).format("Do MMM YYYY") +
        " ( " +
        (daysDiffFromNow === 0
          ? "Today"
          : daysDiffFromNow > 0
            ? `${daysDiffFromNow} days to go`
            : `${daysDiffFromNow} days ago`)
        +
        " ) "
      );
    });
  }

  private static parseJson() {
    Vue.filter("json-parse", (value: string) => {
      // console.log('value : ' + value);
      return value ? JSON.parse(value) : {};
    });
  }

  private static emptyObject() {
    Vue.filter("empty-object", (value: string) => {
      return Object.getOwnPropertyNames(value).length === 0;
    });
  }



  private static withBase() {
    Vue.filter("withBase", (value: string) => {
      // console.log('I am in custom filter: withBase : ');
      // console.log(process.env.BASE_URL);
      return process.env.BASE_URL + value;
    });
  }

  private static maskPhone() {
    Vue.filter("phone", (value: string) => {
      // console.log('I am in custom filter: withBase : ');
      // console.log(process.env.BASE_URL);
      return this.formatDefault(value, "(+91) ##### #####");
    });
  }


  private static formatDefault(value: string, mask: string) {
    value = this.clearValue(value);
    let result = "";
    let count = 0;
    if (value) {
      let arrayValue = value.toString().split("");
      let arrayMask = mask.toString().split("");
      for (var i = 0; i < arrayMask.length; i++) {
        if (i < arrayValue.length + count) {
          if (arrayMask[i] === "#") {
            result = result + arrayValue[i - count];
          } else {
            result = result + arrayMask[i];
            count++;
          }
        }
      }
    }
    return result;
  }

  private static clearValue(value: string) {
    let result = "";
    if (value) {
      let arrayValue = value.toString().split("");
      for (var i = 0; i < arrayValue.length; i++) {
        if (this.isInteger(arrayValue[i])) {
          result = result + arrayValue[i];
        }
      }
    }
    return result;
  }

  public static isInteger(value: string) {
    let result = false;
    if (Number.isInteger(parseInt(value))) {
      result = true;
    }
    return result;
  }
}
