import { format } from 'date-fns/format';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { isToday } from 'date-fns/isToday';
import { isYesterday } from 'date-fns/isYesterday';
import { getYear } from 'date-fns/getYear';
import { getMonth } from 'date-fns/getMonth';
import { getDate } from 'date-fns/getDate';
import { addMinutes } from 'date-fns/addMinutes';
import { addHours } from 'date-fns/addHours';
import { getUnixTime } from 'date-fns/getUnixTime';
import { differenceInYears } from 'date-fns/differenceInYears';
import { zhTW as zhTWLocale } from 'date-fns/locale/zh-TW';

class MyDateTime {
  public readonly datetime: Date;

  constructor(time?: number | Date) {
    if (time instanceof Date) {
      this.datetime = time;
    } else {
      this.datetime = time ? new Date(time) : new Date();
    }
  }

  formatString = (strFormat: string) =>
    format(this.datetime, strFormat, { locale: zhTWLocale });

  fromNow = () => {
    if (this.isToday()) {
      const result = formatDistanceToNow(this.datetime, {
        locale: zhTWLocale,
        addSuffix: true,
      });
      return result.replace('少於 1 分鐘', '幾秒鐘').replace('大約', '');
    }
    if (this.isYesterday()) {
      return this.formatString('昨天 HH:mm');
    }
    if (this.isThisYear()) {
      return this.formatString('MM-dd HH:mm');
    }
    return this.formatString('yyyy-MM-dd HH:mm');
  };

  isToday = () => isToday(this.datetime);

  isYesterday = () => isYesterday(this.datetime);

  isThisYear = () => getYear(this.datetime) === getYear(new Date());

  getYear = () => getYear(this.datetime);

  getMonth = () => getMonth(this.datetime);

  getDate = () => getDate(this.datetime);

  addMinutes = (minutes: number) => addMinutes(this.datetime, minutes);

  addHours = (hours: number) => addHours(this.datetime, hours);

  getUnixTime = () => getUnixTime(this.datetime);

  /**
   * 計算年紀
   * @returns
   */
  calculateAge = () => differenceInYears(new Date(), this.datetime);
}
export default MyDateTime;
