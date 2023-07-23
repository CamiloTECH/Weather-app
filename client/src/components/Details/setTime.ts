export const unixTimeNormalDate = (unix: number, short: boolean): string => {
  const milliseconds = unix * 1000;
  const dateObject = new Date(milliseconds);
  const weekday = dateObject.toLocaleString("en-US", { weekday: "short" });
  const dayNumber = dateObject.toLocaleString("en-US", { day: "numeric" });
  const month = dateObject.toLocaleString("en-US", { month: "short" });
  const hourt = dateObject.toLocaleString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric"
  });

  return short ? hourt : `${weekday}.,${dayNumber} of ${month} ${hourt}`;
};

export const weekDay = (unix: number): string => {
  const milliseconds = unix * 1000;
  const dateObject = new Date(milliseconds);
  const weekday = dateObject.toLocaleString("en-US", { weekday: "long" });
  const dayNumber = dateObject.toLocaleString("en-US", { day: "numeric" });

  return `${dayNumber} - ${weekday}`;
};
