import dayjs, { Dayjs } from "dayjs";

export const timeToSeconds = (value: Dayjs | null) => {
  if (!value) return 0;

  return value.minute() * 60 + value.second();
};

export const secondsToTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return dayjs().minute(minutes).second(secs);
};
