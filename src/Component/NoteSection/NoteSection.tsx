import React from "react";

function NoteSection() {
  return (
    <div className="bg-smoke pb-10" >
      <div className="sm:p-4 md:p-12 lg:py-12 lg:px-24" >
        <h1 className="pb-4">Notes</h1>
        <textarea className="bg-transparent w-full h-96 resize-none" placeholder="Write something here..." />
      </div>
    </div>
  );
}

export default NoteSection;
