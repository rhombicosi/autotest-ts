import * as _ from 'lodash';

/**
 * Generate random 10 char string
 */
export function getRandomString(): string {
    let string = '';
  
   while (string.length !== 10) {
      // string = _.sampleSize(Math.random().toString(36).slice(2), 10).join('');
      string = Math.random().toString(32).slice(2);
   }
  
    return string;
  }  
  
  export function getRandomName(): string {
    return _.sampleSize('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 10).join('');
  }
  