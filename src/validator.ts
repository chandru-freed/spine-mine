import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en";
import moment from "moment";

export default class Validator {
  public static setup() {
    this.verifyPassword();
    this.verifySalary();
    this.allMessages();
    this.minSelect();
    this.dateRequired();
    this.timeValidator();
    this.timeValidatorwithSeconds();
    this.positiveNumber();
    this.documentRequired();
    this.validateIfsc();
    this.validatePan();
    this.validateAge();
  }

  private static verifyPassword() {
    extend("verify_password", {
      message: (field: any) =>
        "The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)",
      validate: (value: string): boolean => {
        const colonStartWithPattern =
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
        return colonStartWithPattern.test(value);
      },
    });
  }

  private static positiveNumber() {
    extend("positive", {
      message: (field: string) => "Only positive number allowed",
      validate: (value: number): boolean => {
        const colonStartWithPattern =
          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
        return value > 0;
      },
    });
  }

  private static documentRequired() {
    extend("document_required", {
      message: (field: string) => field + " field is required",
      validate: (value: any): boolean => {
        return value?.documentPath !== "";
      },
    });
  }

  // rules + messages
  private static allMessages() {
    Object.entries(rules).forEach(([key, value]) => {
      extend(key, {
        ...value,
        message: en.messages[key],
      });
    });
  }

  // only rules , no meesages (only default message)
  private static allRules() {
    Object.entries(rules).forEach(([key, value]) => {
      extend(key, value);
    });
  }

  private static verifySalary() {
    extend("verify_salary", {
      message: (field: any) => "The salary should be greater than 0.",
      validate: (value: number): boolean => {
        return value > 0;
      },
    });
  }

  private static minSelect() {
    extend("minSelect", {
      message: (field: any, params: any, data: any) =>
        "Select atleast " + params[0] + " items.",
      validate: (value: string[], params: number): boolean => {
        console.log(value.length !== 0);
        console.log(value);
        return value.length >= params;
      },
    });
  }

  private static dateRequired() {
    extend("dateRequired", {
      message: (field: any) => "Date not selected.",
      validate: (value: string): boolean => {
        return value !== "";
      },
    });
  }

  private static validateIfsc() {
    extend("validate_ifsc", {
      message: (field: any) => "IFSC code not valid",
      validate: (value: any): boolean => {
        //::TODO 5th place has to be 0
        const regex = /^[A-Za-z]{4}\d{7}$/;
        return value.match(regex);
      },
    });
  }

  private static validateAge() {
    extend("validate_age", {
      message: (field: any) => "Eligibility 18 years above.",
      validate: (value: any): boolean => {
        const age = moment().year() - moment(new Date(value)).year();
        if (age < 18) {
          return false;
        } else {
          return true;
        }
      },
    });
  }

  private static timeValidator() {
    extend("time", {
      message: (field: any) => "Invalid Time Format.",
      validate: (value: string): boolean => {
        const regexpNumber = new RegExp(
          "^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9])|(24:?00))"
        );
        return regexpNumber.test(value);
      },
    });
  }

  private static timeValidatorwithSeconds() {
    extend("time_with_seconds", {
      message: (field: any) => "Invalid Time Format.",
      validate: (value: string): boolean => {
        const regexpNumber = new RegExp(
          "^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9]):?[0-5][0-9]|(24:?00))"
        );
        return regexpNumber.test(value);
      },
    });
  }

  private static validatePan() {
    extend("validate_pan", {
      message: (field: any) => "PAN is not valid",
      validate: (value: any): boolean => {
        //::TODO 5th place has to be 0
        const regex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
        return value.match(regex);
      },
    });
  }

  // add more validators ... and call them in setup as shown above

  // private static 123() {
  //   extend('123', {
  //     message: (field: any) => 'Invalid Time Format.',
  //     validate: (value: string): boolean => {
  //       const regexpNumber = new RegExp('([01]?[0-9]|2[0-3]):[0-5][0-9]');
  //       return regexpNumber.test(value);
  //   }
  //   });
  // }
}
