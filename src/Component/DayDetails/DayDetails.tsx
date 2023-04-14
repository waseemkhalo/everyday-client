import { useEffect, useState } from 'react';
import { Day, getNextDay, getPreviousDay, getToday } from "../../services/dayService";

export default function DayDetails({ day, setDay }: { day: Day | undefined, setDay: React.Dispatch<React.SetStateAction<Day | undefined>> }) {

  interface Today {
    date: string,
    time: string,
    number: number
  }
  const [today, setToday] = useState<Today>()

  const handlePrevious = async () => {
    if ((day && day.number !== 1) || (!day && today?.number !== 1)) {
      const newDay = await getPreviousDay(day?.number)
      setDay(newDay)
    }
  }

  const handleNext = async () => {
    if (day) {
      const newDay = await getNextDay(day.number)
      setDay(newDay)
    }
  }

  useEffect(() => {
    if (!day) {
      getToday().then(data => setToday(data as Today))
    }
  }, [day])

  return (
    <div className="py-1 px-4 border-b-2">
      <div className="flex justify-between ">
        <button onClick={handlePrevious}>previous day</button>
        <button onClick={handleNext}>next day</button>
      </div>
      <div className="flex justify-between">
        <span>Todo - {day ? day.time : today?.time || 'Time to get started!'}</span>
        <span>#{day ? day.number : today?.number}</span>
        <span>{day ? day.date : today?.date}</span>
      </div>
    </div>
  )
}