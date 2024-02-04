import { getClient } from "../utils";

//function to return all the todos such that additionally the email and password for the corresponding user will 
//also be there 
async function getAllTodosWithUserDetails() {
    const client = await getClient();

    const joinQuery = `
        SELECT todos.*, users.email, users.password
        FROM todos
        JOIN users ON todos.user_id = users.id;
    `;

    const res = await client.query(joinQuery);
    const results = res.rows;

    console.log("Todos with User Details:", results);
}

getAllTodosWithUserDetails();
