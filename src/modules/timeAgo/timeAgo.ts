import {digitsFaToEn} from "../digits";

/**
 * TimeAgo
 *
 * @category timeAgo
 * @description Converting a Jalali datetime into a time ago
 */
class TimeAgo {

    // Timestamp DateTime
    private readonly tsDateTime: number;

    public readonly patternDateTime = /(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/;

    constructor(datetime: string) {
        this.tsDateTime = this.convertToTimeStamp(datetime);
    }

    /**
     *
     * @param datetime
     * @private
     */
    private convertToTimeStamp(datetime: string): number {
        const dateTime = datetime.match(this.patternDateTime);
        if (dateTime) {
            const date: Date = new Date(Number(dateTime[1]),
                parseInt(dateTime[2], 10) - 1,
                Number(dateTime[3]),
                Number(dateTime[4]),
                Number(dateTime[5]),
                Number(dateTime[6]));
            return date.getTime() // 1623036870000
        }
        return 0
    }

    private getTimeNow(): string {

        const date: string[] = new Date(Date.now()).toLocaleDateString('fa-IR', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).split('/');

        const time: string[] = new Date(Date.now()).toLocaleTimeString('fa-IR', {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).split(':');


        return digitsFaToEn(date[0] + '-' + date[1] + '-' + date[2] + ' ' +
            time[0] + ':' + time[1] + ':' + time[2])
    }

    public getTimeAgo() {
        const tsTimeNow: number = this.convertToTimeStamp(this.getTimeNow()),
            minute: number = 60 * 1000,
            hour: number = minute * 60,
            day: number = hour * 24,
            month: number = day * 30,
            year: number = day * 365;
        let elapsed: number = tsTimeNow - this.tsDateTime;
        if (elapsed === 0)  return 'اکنون'
        const prevOrNext: string = elapsed > 0 ? 'قبل' : 'بعد';
        elapsed = elapsed < 0 ? Math.abs(elapsed) : elapsed
        if (elapsed < minute) {
            return Math.round(elapsed / 1000) + ' ثانیه ' + prevOrNext;
        } else if (elapsed < hour) {
            return Math.round(elapsed / minute) + ' دقیقه ' + prevOrNext;
        } else if (elapsed < day) {
            return Math.round(elapsed / hour) + ' ساعت ' + prevOrNext;
        } else if (elapsed < month) {
            return 'حدود ' + Math.round(elapsed / day) + ' روز ' + prevOrNext;
        } else if (elapsed < year) {
            return 'حدود ' + Math.round(elapsed / month) + ' ماه ' + prevOrNext;
        } else {
            return 'حدود ' + Math.round(elapsed / year) + ' سال ' + prevOrNext;
        }
    }
}

export default TimeAgo;
