import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgres://prmjskwy:lxFdSEOpiRP40_C6UInEmuZVuqV-AHC2@tai.db.elephantsql.com/prmjskwy");
    await client.connect();
    return client;
}