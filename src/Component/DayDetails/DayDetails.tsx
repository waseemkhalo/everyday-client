import { Day, getNextDay, getPreviousDay } from "../../services/dayService";

export default function DayDetails({ day, setDay }: { day: Day | undefined, setDay: React.Dispatch<React.SetStateAction<Day | undefined>> }) {

  const handlePrevious = async () => {
    if ((day && day.number !== 1) || !day) {
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

  return (
    <div className="py-1 px-4 border-b-2">
      <div className="flex justify-between ">
        <button onClick={handlePrevious}>previous day</button>
        <button onClick={handleNext}>next day</button>
      </div>
      <div className="flex justify-between">
        <span>Todo - time</span>
        <span># number</span>
        <span>date</span>
      </div>
    </div>
  )
}