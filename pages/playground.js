import { useState } from 'react';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ShowValue = ({ date }) => {
  if (date === '') return null;

  const dateObj = new Date(date);
  const monthIndex = dateObj.getMonth();
  return (
    <div className="grid-2">
      <label>Date object</label>
      <span>{dateObj.toString()}</span>
      <label>Date</label>
      <span>{dateObj.getDate()}</span>
      <label>Month</label>
      <span>
        {monthIndex} : {monthNames[monthIndex]}
      </span>
      <label>Year</label>
      <span>{dateObj.getFullYear()}</span>
    </div>
  );
};

const PlayGround = () => {
  const [date, setDate] = useState('');

  return (
    <>
      <label htmlFor="inputDate">Select your date</label>
      <input
        type="date"
        name="inputDate"
        id="inputDate"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <ShowValue date={date} />
    </>
  );
};

export default PlayGround;
