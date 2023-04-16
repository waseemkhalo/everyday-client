import next from '../../assets/icons/next.svg';
import previous from '../../assets/icons/previous.svg';
import { Day, Today, getNextDay, getPreviousDay } from "../../services/dayService";

export default function DayDetails({ day, setDay, today }: { today: Today | undefined, day: Day | undefined, setDay: React.Dispatch<React.SetStateAction<Day | undefined>> }) {

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

  return (
    <div className="py-1 px-4 border-b-2 border-ghost">
      <div className="flex justify-between ">
        <button onClick={handlePrevious} className={`flex gap-1 items-center ${day?.number === 1 || today?.number === 1 ? 'opacity-50 cursor-default' : ''}`}>
          <img src={previous} alt="previous" className='pt-1' />
          <span>previous day</span>
        </button>
        {day &&
          <button onClick={handleNext} className='flex gap-1 items-center'>
            next day
            <img src={next} alt="next" className='pt-1' />
          </button>
        }
      </div>
      <div className="flex justify-between">
        <span>Todo - {day ? day.time : today?.time || 'Time to get started!'}</span>
        <span>#{day ? day.number : today?.number}</span>
        <span>{day ? day.date : today?.date}</span>
      </div>
    </div>
  )
}