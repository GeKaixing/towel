export const formattingDate = (day: any) => {
    console.log(day)
  const dateObj = new Date(day);
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date");
  }
  const date = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dateObj);
  return date;
};
