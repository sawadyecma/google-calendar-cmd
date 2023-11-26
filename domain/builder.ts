import dayjs from "dayjs";
import { WorkingHistory } from "./workingHistory.js";
import ical from "ical";

export class WorkingHistoryBuilder {
  static create(
    parsedCalendar: ical.FullCalendar,
    searchText: string
  ): WorkingHistory[] {
    const workingHistories: WorkingHistory[] = [];

    Object.entries(parsedCalendar).forEach(([, value]) => {
      const start = dayjs(value.start);
      const end = dayjs(value.end);
      const { summary } = value;
      const minutes = dayjs(end).diff(dayjs(start), "minutes");

      const his: WorkingHistory = {
        date: {
          month: parseInt(start.format("MM")),
          day: parseInt(start.format("DD")),
        },
        minutes,
        name: summary ?? "",
      };

      if (summary?.includes(searchText)) {
        workingHistories.push(his);
      }
    });

    return workingHistories;
  }
}
