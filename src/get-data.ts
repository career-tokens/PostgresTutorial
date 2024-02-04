import { getClient } from "./utils";

//function to get all the users
async function getUsers() {
    const client = await getClient();
    
    const selectUsersText = 'SELECT * FROM users';//means we want all the rows from the "users" table
    const userRes = await client.query(selectUsersText);
    
    console.log("Users:");
    //mapping over all the row objects in the returned array
    for (let user of userRes.rows) {
        console.log(`ID: ${user.id}, Email: ${user.email}`);
    }
}

//function to get the user using the email
async function getUserFromEmail(email: string) {
    const client = await getClient();
    
    const selectUserText = 'SELECT * FROM users WHERE email = $1';
    const userRes = await client.query(selectUserText, [email]);
    //query sent such that all the users whose email==email sent as parameter which effectively should be only 1
    //since email is unique
    console.log("Single User detail:");
    for (let user of userRes.rows) {
        console.log(`ID: ${user.id}, Email: ${user.email}`);
    }
}

//function to get all the todos for an user using the userId
async function getTodosForUser(userId: number) {
    const client = await getClient();
    
    const selectTodosText = 'SELECT * FROM todos WHERE user_id = $1';
    const todoRes = await client.query(selectTodosText, [userId]);
    //I hope now you can tell what the above line does
    console.log(`Todos for User ID ${userId}:`);
    for (let todo of todoRes.rows) {
        console.log(`ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}, Done: ${todo.done}`);
    }
}

//lets call the functions
getUsers();

getUserFromEmail("john.do11e@gmail2.com")

const userIdToFetch = 1;
getTodosForUser(userIdToFetch);