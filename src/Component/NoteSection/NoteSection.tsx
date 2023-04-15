import { useRef } from 'react';
import { Day, Today } from "../../services/dayService";
import { updateNotes } from '../../services/userService';

function NoteSection({ day }: { day: Day | Today | undefined }) {
  const notesRef = useRef<HTMLTextAreaElement>(null)
  if (!day) return <></>
  return (
    <div className="bg-smoke pb-10" >
      <div className="sm:p-4 md:p-12 lg:py-12 lg:px-24" >
        <h1 className="pb-4">Notes</h1>
        {Object.hasOwn(day, 'lists') ?
          <p >
            {day.notes}
          </p>
          :
          <>
            <button className="trigger-time"
              onClick={() => {
                if (notesRef.current?.value) updateNotes(notesRef.current.value)
              }}
            >Save</button>
            <textarea ref={notesRef} className="bg-transparent w-full h-96 resize-none" placeholder="Write something here..." defaultValue={day.notes} />
          </>
        }
      </div>
    </div>
  );
}

export default NoteSection;
