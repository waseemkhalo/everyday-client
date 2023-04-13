import { useEffect } from "react"
export default function DayDetails({ day, setDay }: { day: number, setDay: React.Dispatch<React.SetStateAction<number>> }) {

  useEffect(() => {

  }, [day])

  return (
    <div className="py-1 px-4 border-b-2">
      <div className="flex justify-between ">
        <button>previous day</button>
        <button>next day</button>
      </div>
      <div className="flex justify-between">
        <span>Todo - time</span>
        <span># number</span>
        <span>date</span>
      </div>
    </div>
  )
}