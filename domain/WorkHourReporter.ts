import { WorkingHistory, calcTotal } from "./workingHistory.js";

const defaultRowFormat = "${MM}-${DD},${hours},${min}";
export class WorkHourReporter {
  constructor(private rowFormat: string = defaultRowFormat) {}

  report(workingHistory: WorkingHistory[]) {
    const sorted = workingHistory.sort((a, b) => {
      return a.date.day - b.date.day;
    });

    const texts: string[] = sorted.map((wh) => {
      const hour = Math.floor(wh.minutes / 60);
      const min = wh.minutes - hour * 60;

      return this.rowFormat
        .replace("${MM}", wh.date.month.toString())
        .replace("${DD}", wh.date.day.toString())
        .replace("${hours}", hour.toString())
        .replace("${min}", min.toString());
    });

    console.log("MM-DD,稼働時間(h),稼働時間(min)");
    texts.forEach((t) => console.log(t));

    const totalMin = calcTotal(workingHistory);
    const hour = Math.floor(totalMin / 60);
    const min = totalMin - hour * 60;
    console.log("total," + hour + "," + min);
    return;
  }
}
