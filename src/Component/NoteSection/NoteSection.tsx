import { useEffect, useState } from 'react';
import { Day, Today } from "../../services/dayService";
import { updateNotes } from '../../services/userService';
import MarkdownPreview from '../MarkdownPreview/MarkdownPreview';

function NoteSection({ day }: { day: Day | Today | undefined }) {
  const [notes, setNotes] = useState<Day['notes'] | Today['notes']>()
  const [saveVisible, setSaveVisible] = useState(false)


  useEffect(() => {
    if (day) setNotes(day.notes)
  }, [day])

  //on notes change, display save button
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.currentTarget.value)
    setSaveVisible(true)
  }

  // wait for notes before rendering
  if (!day) return <></>
  return (
    <div className="bg-smoke pb-10" >
      <div className="sm:p-4 md:px-16 md:py-8 lg:px-32 lg:py-10" >
        <h1 className="pb-4 flex justify-between gap-6 items-center md:font-bold">
          Notes
          <button className={`trigger-time bg-lightGrey rounded-xl px-6 py-1 font-normal ${!saveVisible ? 'hidden' : ''}`}
            onClick={() => {
              updateNotes(notes)
              setSaveVisible(false)
            }}
          >
            Save
          </button>
        </h1>
        {/* if the day object has a 'lists' property, (ie. is a prev day and not today) render notes as an uneditable paragraph */}
        {Object.hasOwn(day, 'lists') ?
          <>
            <MarkdownPreview content={day.notes} />
          </>
          :
          <textarea
            className="bg-transparent w-full h-96 resize-none lg:pt-4 outline-none text-ghostShade"
            placeholder="Write something here..."
            value={notes}
            onChange={handleChange}
          />
        }
      </div>
    </div>
  );
}

export default NoteSection;
