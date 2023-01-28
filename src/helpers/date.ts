import moment from 'moment';
import 'moment/locale/ru';

export function formateDate(date: moment.MomentInput):string {
  return moment(date).locale('ru').format('HH:mm D MMMM');
}
