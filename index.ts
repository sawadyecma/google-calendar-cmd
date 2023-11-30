import ical from "ical";

import { calcTotal, filterByMonth } from "./domain/workingHistory.js";
import { WorkingHistoryBuilder } from "./domain/builder.js";
import { WorkHourReporter } from "./domain/WorkHourReporter.js";

const data = ical.parseFile("./input.ics");
const workingHistories = WorkingHistoryBuilder.create(data, "稼働");

const totalMins: { month: number; minutes: number }[] = [
  { month: 10, minutes: calcTotal(filterByMonth(workingHistories, 10)) },
  { month: 11, minutes: calcTotal(filterByMonth(workingHistories, 11)) },
];

const remainedMinutes =
  24 * 4 * 60 - (totalMins.find((m) => m.month === 11)?.minutes ?? 0);

const whs = filterByMonth(workingHistories, 11);

new WorkHourReporter().report(whs);
