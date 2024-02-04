import { getClient } from "./utils";

async function createEntries() {
    const client = await getClient();
    const insertUserText = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id';
    //in the above line ($1,$2) indicate that they will be replaced by corresponding values 
    const userValues = ['john@gmail.com', '123456'];
    //the above array contains the  values which are going to be placed in place of $1 and $2 respectively
    //the reason for doing this is something known as SQL injection where the user can inject SQL in their values  like 
    //"john@gmail.com AND DROP TABLE" and that is going to affect the database badly and so to prevent that , such syntax is 
    //devised where even if SQL is injected , overall it will be stored as string
    let response = await client.query(insertUserText, userValues);
    //in the above line we have sent a query to the database that we need to insert a row under the "users" table such that
    //email="john....." and password="123456" 
    //AND then return the id such that the response may contain all the rows 
    
    const insertTodoText = 'INSERT INTO todos (title, description, user_id, done) VALUES ($1, $2, $3, $4) RETURNING id';
    //insertion into todos such that values will be given for columns (title, description, user_id, done)
    const todoValues = ['Buy groceries', 'Milk, bread, and eggs', response.rows[0].id, false];
    //corresponding values for ($1, $2, $3, $4)
    //response.rows[0].id means that if response gets multiple rows choose the 0th row's id
    await client.query(insertTodoText, todoValues);
    //replace the values and send the query
    console.log("Entries created!");
}


createEntries();