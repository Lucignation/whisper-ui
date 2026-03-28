import {
  format,
  isToday,
  isYesterday,
  isSameWeek,
  isSameYear,
} from "date-fns";

export const formatDateHeader = (date: Date) => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  if (isSameWeek(date, new Date(), { weekStartsOn: 1 }))
    return format(date, "EEEE"); // Example: "Friday"
  if (isSameYear(date, new Date())) return format(date, "MMMM d"); // Example: "December 10"
  return format(date, "MMMM d, yyyy"); // Example: "December 10, 2024"
};

// Group messages by date
export const groupMessagesByDate = (messages: any) => {
  console.log({ messages });
  return messages?.reduce((acc: any, message: any) => {
    const messageDate = new Date(message.timestamp);
    const dateKey = formatDateHeader(messageDate);

    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(message);

    return acc;
  }, {} as Record<string, any>);
};
