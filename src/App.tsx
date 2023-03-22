import React, {useRef} from 'react';
import { firestore } from './firebase';
import { addDoc, collection} from '@firebase/firestore';

function App() {

  
  const formRef = useRef<HTMLInputElement>(null);
  const ref = collection(firestore, 'todos');



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formRef.current?.value);

    let data = {
       message: formRef.current?.value,
    }
    try {
      addDoc(ref, data)
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  return (
    <div className="App">
      <h1>Everyday TODOs</h1>
      <form onSubmit={handleSubmit}>
        <label>Something</label>
        <input type="text" ref={formRef}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
