import { databaseSync } from "node:sqlite";

const db = new databaseSync(":memory:");

db.exec(`
    CREATE TABLE user (
        id INTEGER,
        username TEXT UNIQUE,
        password TEXT
    )
    `);
