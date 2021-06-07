import {digitsFaToEn, TimeAgo} from "../src";

function getTime(second:number) {
    const date: string[] = new Date(Date.now() + second).toLocaleDateString('fa-IR', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).split('/');
    const time: string[] = new Date(Date.now() +second ).toLocaleTimeString('fa-IR', {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).split(':');

    // console.log(date)
    // console.log(time)

    return digitsFaToEn(date[0] + '-' + date[1] + '-' + date[2] + ' ' +
        time[0] + ':' + time[1] + ':' + time[2])
}

describe("TimeAgo", () => {
    it("Convert to previous", () => {
        expect(TimeAgo(getTime( 0))).toEqual("اکنون");
        expect(TimeAgo(getTime(-10*1000 ))).toEqual("10 ثانیه قبل");
        expect(TimeAgo(getTime( -3*60*1000))).toEqual("3 دقیقه قبل");
        expect(TimeAgo(getTime( -18*60*60*1000))).toEqual("18 ساعت قبل");
        expect(TimeAgo(getTime( -7*24*60*60*1000))).toEqual("حدود 7 روز قبل");
        expect(TimeAgo(getTime( -7*30*24*60*60*1000))).toEqual("حدود 7 ماه قبل");
        expect(TimeAgo(getTime( -14*30*24*60*60*1000))).toEqual("حدود 1 سال قبل");
    });

    it("Convert to Next", () => {
        expect(TimeAgo(getTime(10*1000 ))).toEqual("10 ثانیه بعد");
        expect(TimeAgo(getTime( 3*60*1000))).toEqual("3 دقیقه بعد");
        expect(TimeAgo(getTime( 18*60*60*1000))).toEqual("18 ساعت بعد");
        expect(TimeAgo(getTime( 7*24*60*60*1000))).toEqual("حدود 7 روز بعد");
        expect(TimeAgo(getTime( 7*30*24*60*60*1000))).toEqual("حدود 7 ماه بعد");
        expect(TimeAgo(getTime( 14*30*24*60*60*1000))).toEqual("حدود 1 سال بعد");
    });
});
