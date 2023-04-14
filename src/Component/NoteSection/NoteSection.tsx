import { Day } from "../../services/dayService";

function NoteSection({ notes }: { notes: Day['notes'] | undefined }) {
  return (
    <div className="bg-smoke pb-10" >
      <div className="sm:p-4 md:p-12 lg:py-12 lg:px-24" >
        <h1 className="pb-4">Notes</h1>
        {notes ?
          <p >
            {notes}
          </p>
          :
          <textarea className="bg-transparent w-full h-96 resize-none" placeholder="Write something here..." />
        }
      </div>
    </div>
  );
}

export default NoteSection;
