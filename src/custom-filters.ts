import { Vue } from "vue-property-decorator";
import Moment from "moment";

export default class CustomFilters {
  public static setup() {
    this.toUSD();
    this.toDate();
    this.fromNow();
    this.duration();
    this.toDateTime();
    this.toDateTimeWithDuration();
    this.parseJson();
    this.emptyObject();
    this.withBase();
  }

  private static toUSD() {
    Vue.filter("toUSD", (value: any) => {
      return `$${value}`;
    });
  }

  private static toDate() {
    Vue.filter("date", (value: any) => {
      return Moment(new Date(value)).format("MMMM Do YYYY");
    });
  }

  private static fromNow() {
    Vue.filter("fromNow", (value: any) => {
      return Moment(new Date(value)).fromNow();
    });
  }

  private static duration() {
    Vue.filter("duration", (value: any) => {
      return Moment.duration(value).humanize();
    });
  }

  private static toDateTime() {
    Vue.filter("date-time", (value: any) => {
      return Moment(new Date(value)).format("MMMM Do YYYY, h:mm:ss a");
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
}
