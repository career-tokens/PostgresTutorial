import { getClient } from "../utils";

async function getUserAndTodosSeparateQueries(userId: number) {
    const client = await getClient();

    // fetch user details for the user using user id
    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const userRes = await client.query(userQuery, [userId]);
    const user = userRes.rows[0];

    // fetch todos for the user using the user id
    const todosQuery = 'SELECT * FROM todos WHERE user_id = $1';
    const todosRes = await client.query(todosQuery, [userId]);
    const todos = todosRes.rows;

    console.log("User Details:", user);
    console.log("Todos:", todos);
}

getUserAndTodosSeparateQueries(1);