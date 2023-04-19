import next from '../../assets/icons/next.svg';
import previous from '../../assets/icons/previous.svg';
import { Day, Today, getNextDay, getPreviousDay } from "../../services/dayService";

export default function DayDetails({ day, setDay, today }: { today: Today | undefined, day: Day | undefined, setDay: React.Dispatch<React.SetStateAction<Day | undefined>> }) {

  // get previous day unless current day being viewed is day #1
  const handlePrevious = async () => {
    if ((day && day.number !== 1) || (!day && today?.number !== 1)) {
      const newDay = await getPreviousDay(day?.number)
      setDay(newDay)
    }
  }

  //if viewing a previous day, get next day
  const handleNext = async () => {
    if (day) {
      const newDay = await getNextDay(day.number)
      setDay(newDay)
    }
  }

  return (
    <div className="py-4 sm:px-4 md:px-16 lg:px-32 border-b-2 border-lightGrey">
      <div className="flex justify-between ">
        <button onClick={handlePrevious} className={`flex gap-1 items-center ${day?.number === 1 || today?.number === 1 ? 'opacity-50 cursor-default' : ''}`}>
          <img src={previous} alt="previous" className='pt-1' />
          <span className='text-black'>Previous Day</span>
        </button>
        {day &&
          <button onClick={handleNext} className='flex gap-1 items-center'>
            Next day
            <img src={next} alt="next" className='pt-1' />
          </button>
        }
      </div>
      <div className="flex justify-between sm:pt-4 md:pt-3 lg:pt-4">
        <span className='md:font-bold'>ToDo - {day ? day.time : today?.time || 'Time to get started!'}</span>
        <span className='md:font-bold'>#{day ? day.number : today?.number}</span>
        <span className='md:font-bold'>{day ? day.date : today?.date}</span>
      </div>
    </div>
  )
}