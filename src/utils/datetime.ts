export const formatISODate = (
  d: Date,
  type: 'date' | 'time' | 'datetime' = 'datetime'
) => {
  const datetime = d.toISOString();
  const [date, time] = datetime.split('T');

  switch (type) {
    case 'date':
      return date;
    case 'time':
      return time;
    default:
      return datetime;
  }
};
