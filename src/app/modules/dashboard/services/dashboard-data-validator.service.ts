import { Injectable } from '@angular/core';
import { Logger } from '../../../../vendors/angular2-logger/core';
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
}
