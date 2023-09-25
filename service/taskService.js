var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./test_test.db');
var debug = require('debug')('infeedo:taskService');
const moment = require( 'moment' );
const {response} = require("express");

async function createNewTask(body) {
    return new Promise( async (resolve, reject)=> {
        await db.run(`INSERT INTO task ('title', 'description') VALUES ('${body.title}', '${body.description}')`, async function(err) {
            if(err) {
                reject( {
                    Error: err.message
                })
            }
            debug("new task created", this.lastID);
            resolve(this.lastID);
        })
    })
}

async function getOneById(id) {
    return new Promise((resolve, reject) => {
        return db.get(`SELECT * FROM task WHERE id = ${id}`, (err, row) => {
            if(row) {
                resolve(row);
            } else {
                reject({
                    Error: 'No task found'
                })
            }
        });
    })
}

async function updateTask(id, status) {
    return new Promise((resolve, reject) => {
        let datetime = moment().format( 'YYYY-MM-DD HH:mm:ss' );
        db.run(`UPDATE task SET status='${status}', updatedAt='${datetime}' WHERE id=${id}`, (err) => {
            if (err) {
                debug("Error while updating balance", err.message)
                reject({
                    Error : err.message
                })
            }
            getOneById(id).then(data => {
                resolve(data);
            })
        })
    })
}

async function getMetrics(rules) {
    return new Promise((resolve, reject) => {
        let query = `SELECT COUNT(*) as totalCount, status FROM task `;
        if(rules.date) {

            query += `WHERE updatedAt < DATE('${rules.date}')`
        }
        return db.all(`${query} GROUP BY status`, (err, rows) => {
            if (rows.length) {
                resolve(rows);
            } else {
                reject({
                    Error: 'No task found'
                })
            }
        });
    });
}

async function totalRecords() {
    return new Promise( (resolve, reject) => {
        db.get("SELECT COUNT(*) as totalRecords FROM task", (err, data) => {
            if(err) {
                reject({
                    Error: err.message
                })
            }
            debug("Total rewords", data);
            resolve(data);
        });
    })
}
async function getAllPagination(limit=20, page=1) {
    return new Promise( (resolve, reject) => {
        totalRecords().then(data => {
            debug("Total", data.totalRecords);
            if(limit*(page-1) <= parseInt(data.totalRecords)) {
                let offset = limit*(page-1);
                db.all(`SELECT * FROM task LIMIT ${limit} OFFSET ${offset}`, (err, rows) => {
                    if(err) {
                        reject( {
                            Error: err.message
                        })
                    }
                    resolve(rows);
                })
            } else {
                reject({
                    Error: "Record limit reached"
                })
            }
        })
    })
}
module.exports = {
    createNewTask,
    getOneById,
    updateTask,
    getMetrics,
    getAllPagination
}