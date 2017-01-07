import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { ErrorCodes } from '../constants/error-codes.enum';

@Injectable()
export class DashboardDataValidaterService {

  constructor( private log: Logger) { }

   /**
    * Method is used to check wheather object is valid or not.
    */
  isValidObject(object: any) {
    try {

      if (object == null || object === undefined) {
        return false;
      }
      return true;

    } catch (e) {
       this.log.error('Error while checking object integrity.', e);
       return false;
    }
  }

  /**
   * Method is used for checking error code and getting message related to error code.
   */
  getErrorMessageByErrorCode(errorCode: number) {
    try {

      switch(errorCode) {
        case ErrorCodes.DATA_NOT_AVAILABLE:
          return 'Data Not Available.';
        case ErrorCodes.DATA_CREATION_ERROR:
          return 'Error in creating data with specified inputs.';
        case ErrorCodes.EXECEPTION_ON_DATA_CREATION:
          return 'Exception while creating data with specified inputs.';
        default:
          return null;
      }
    } catch (e) {
      this.log.error('Error while checking error code.', e);
    }
  }

  /**
   * Getting Number with fixed decimal and comma seperated/
   */
  getNumberWithPrecisionAndComma(number: number) {
    try {

     if (number < 10) {
       return number.toFixed(3);
     } else {
      return this.getNumberWithComma(number.toFixed(0));
     }
    } catch (e) {
      this.log.error('Error while converting number to decimal points.', e);
      return number;
    }
  }

  /** Getting number with comma seperated. */
  getNumberWithComma(number: any) {
    try {
      let parts = number.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    } catch (e) {
      this.log.error('Error while trancating decimal number to specific digit.', e);
      return number;
    }
  }
}
