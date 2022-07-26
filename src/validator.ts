import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import en from 'vee-validate/dist/locale/en';

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
  }

  private static verifyPassword() {
    extend('verify_password', {
      message: (field: any) => 'The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)',
      validate: (value: string): boolean => {
        const colonStartWithPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
        return colonStartWithPattern.test(value);
      }
    });
  }

  private static positiveNumber() {
    extend('positive', {
      message: (field: string) => 'Only positive number allowed',
      validate: (value: number): boolean => {
        const colonStartWithPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
        return (value > 0)
      }
    });
  }


  // rules + messages
  private static allMessages() {
    Object.entries(rules).forEach( ([key, value]) => {
      extend(key, {
        ...value,
        message: en.messages[key] 
      });
    });
  }

  // only rules , no meesages (only default message)
  private static allRules() {
    Object.entries(rules).forEach( ([key, value]) => {
      extend(key, value);
    });
  }

  private static verifySalary() {
    extend('verify_salary', {
      message: (field: any) => 'The salary should be greater than 0.',
      validate: (value: number): boolean => {
        return value > 0;
    }
    });
  }

  private static minSelect() {
    extend('minSelect', {
      message: (field: any, params: any, data: any) => 'Select atleast ' + params[0] + ' items.',
      validate: (value: string[], params: number): boolean => {
        console.log(value.length !== 0);
        console.log(value);
        return (value.length >= params);
    }
    });
  }

  private static dateRequired() {
    extend('dateRequired', {
      message: (field: any) => 'Date not selected.',
      validate: (value: string): boolean => {
        return (value !== '');
    }
    });
  }

  private static timeValidator() {
    extend('time', {
      message: (field: any) => 'Invalid Time Format.',
      validate: (value: string): boolean => {
        const regexpNumber = new RegExp('^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9])|(24:?00))');
        return regexpNumber.test(value);
    }
    });
  }

  private static timeValidatorwithSeconds() {
    extend('time_with_seconds', {
      message: (field: any) => 'Invalid Time Format.',
      validate: (value: string): boolean => {
        const regexpNumber = new RegExp('^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9]):?[0-5][0-9]|(24:?00))');
        return regexpNumber.test(value);
    }
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





