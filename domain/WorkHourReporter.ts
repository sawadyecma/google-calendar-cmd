import { WorkingHistory, calcTotal } from "./workingHistory.js";

const defaultRowFormat = "${MM}-${DD},${hours}";
export class WorkHourReporter {
  constructor(private rowFormat: string = defaultRowFormat) {}

  report(workingHistory: WorkingHistory[]) {
    const sorted = workingHistory.sort((a, b) => {
      return a.date.day - b.date.day;
    });

    const texts: string[] = sorted.map((wh) => {
      return this.rowFormat
        .replace("${MM}", wh.date.month.toString())
        .replace("${DD}", wh.date.day.toString())
        .replace("${hours}", (wh.minutes / 60).toString());
    });

    console.log("MM-DD,稼働時間");
    texts.forEach((t) => console.log(t));

    console.log("合計稼働時間: " + calcTotal(workingHistory) / 60 + "時間");
    return;
  }
}
