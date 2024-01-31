import ical from "ical";

import { calcTotal, filterByMonth } from "./domain/workingHistory.js";
import { WorkingHistoryBuilder } from "./domain/builder.js";
import { WorkHourReporter } from "./domain/WorkHourReporter.js";

const data = ical.parseFile("./input.ics");
const workingHistories = WorkingHistoryBuilder.create(data, "稼働");

const totalMins: { month: number; minutes: number }[] = [
  { month: 10, minutes: calcTotal(filterByMonth(workingHistories, 10)) },
  { month: 11, minutes: calcTotal(filterByMonth(workingHistories, 11)) },
  { month: 12, minutes: calcTotal(filterByMonth(workingHistories, 12)) },
  { month: 1, minutes: calcTotal(filterByMonth(workingHistories, 1)) },
  { month: 2, minutes: calcTotal(filterByMonth(workingHistories, 2)) },
];

const currentMonth = 1;

const whs = filterByMonth(workingHistories, currentMonth);

new WorkHourReporter().report(whs);
