var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./test_test.db');
var debug = require('debug')('infeedo:database');

async function createTableSchema() {
    db.serialize(() => {

        // Create Table if Not Exist
        db.run(`
            CREATE TABLE IF NOT EXISTS task (
                'id' integer PRIMARY KEY,
                'title' varchar(100) DEFAULT '',
                'description' varchar(255) DEFAULT '',
                'status' varchar(20) NOT NULL DEFAULT 'OPEN',
                'createdAt' datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                'updatedAt' datetime NOT NULL DEFAULT CURRENT_TIMESTAMP)
            `);
        debug("Table is created!!!");
        // db.each("SELECT COUNT(*) as count FROM task", (err, row) => {
        //     debug("row count", row.count);
        // });
    });
}

module.exports = {
    createTableSchema
}