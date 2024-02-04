import { getClient } from "./utils";

//function to delete certain row/s from a table
async function deleteTodo(todoId: number) {
    const client = await getClient();
    
    const deleteTodoText = 'DELETE FROM todos WHERE id = $1';
    await client.query(deleteTodoText, [todoId]);
    //sending query to delete a row from "todos" for which the id==id sent as a parameter
    
    console.log(`Todo with ID ${todoId} deleted!`);
}

const todoIdToDelete = 1;
deleteTodo(todoIdToDelete);
