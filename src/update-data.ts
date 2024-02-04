import { getClient } from "./utils";

//function to update a certain todo in the "todos" table
async function updateTodo(todoId: number) {
    const client = await getClient();
    
    const updateTodoText = 'UPDATE todos SET done = $1 WHERE id = $2';
    await client.query(updateTodoText, [true, todoId]);
    //so we are sending a query such that we need to UPDATE the "todos" table such that we are choosing the row 
    //for which id==id sent as parameter and for that row SET done=true 
    
    console.log(`Todo with ID ${todoId} updated to done!`);
}

const todoIdToUpdate = 1;
updateTodo(todoIdToUpdate);
