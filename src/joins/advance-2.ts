import { getClient } from "../utils";

// we need to get all todos for a give user
//this function wont  return a row if no todos exist for the user and for that INNER JOIN is used
async function getUserAndTodosWithJoin(userId: number) {
    const client = await getClient();

    const joinQuery = `
        SELECT users.*, todos.title, todos.description, todos.done
        FROM users
        INNER JOIN todos ON users.id = todos.user_id
        WHERE users.id = $1;
    `;

    const res = await client.query(joinQuery, [userId]);
    const results = res.rows;

    console.log("User and Todos:", results);
}

getUserAndTodosWithJoin(5)