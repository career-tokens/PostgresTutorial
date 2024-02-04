import { getClient } from "../utils";

//function to fetch a user's details and todos such that even if no todo is there atleast the user
//details would be given
async function getUserAndTodosWithJoin(userId: number) {
    const client = await getClient();

    const joinQuery = `
        SELECT users.*, todos.title, todos.description, todos.done
        FROM users
        LEFT JOIN todos ON users.id = todos.user_id
        WHERE users.id = $1;
    `;
    /**lets understand what this means
       firstly we are going to consider both "users" and "todos" table for selecting properties
       so for a given userId , there can be a matching row in "users" and there may or may not be some todos under 
       "todos" 
       now we simply match them such that we take all the user details and from todos we take the title , 
       description and done status( if 2 todos are there for the same user then there will be two such rows produced)
       which we can later store in some other table
       lets take an example:
       users table :
       id      |      email       | password
       1       |  john@gmail.com  | 123456
       2       |  main@gmail.com  | 456789

       todos table:
       title   |  description     | done   | user_id
       football|  lets play       | false  |  1
       chowmein|  lets eat        | false  |  1
       study   |  lets study      | true   |  2

       if we consider the user id to be 1 then accordingly we are going to get the row:
       id   | email         | password  |  title   |   description  | done
       1    | john@gmail.com|  123456   |  football|   lets play  | false
       1    | john@gmail.com|  123456   |  chowmein|   lets eat   | false  
       
       But whats the use of LEFT here ? It simply means that whatever you can get from the left table that is
       "users" here give that and if there is no row from the right table then simply leave null for those properties.
       In this context , if there was no todo for user id =1 then the user details would be given and rest would
       be null 
       id   | email         | password  |  title   |   description  | done
       1    | john@gmail.com|  123456   |  null    |   null         | null
     */

    const res = await client.query(joinQuery, [userId]);
    const results = res.rows;

    console.log("User and Todos:", results);
}

getUserAndTodosWithJoin(1)