const admin = require("firebase-admin");
const serviceAccount = require("../../firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


let db = admin.firestore();

let todosRef = db.collection('todos');
let allTodos = await todosRef.get();

for (let todo of allTodos.docs) {
    let uniqueId = generateUniqueId(); // replace this with your own unique ID generator
  
    let todoRef = db.collection('todos').doc(todo.id);
    await todoRef.update({
      'uniqueId': uniqueId
    });
  }
  