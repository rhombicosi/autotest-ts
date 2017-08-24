import * as _ from 'lodash';

export class Utils {
   private randomVal;
   private name;

   getRandomName (item) {
    this.randomVal = _.sampleSize('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 10).join('');
    this.name = 'New ' + item + ' ' + this.randomVal;
    return this.name;
   }
}
