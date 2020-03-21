const connection = require('./connection');

//SELECT, INSERT, UPDATE, DELETE
const orm = {
    all: function(table, cb) {
        let queryString = "SELECT * FROM " + table;

        connection.query(queryString, function(err, result) {
            if(err) throw err;
            cb(result);
        });
    },
    create: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;
        queryString += " (" + cols.toString() + ") ";
        queryString += "VALUES" + " (" + printQuestionMarks(vals.length) +  ")";

        connection.query(queryString, vals, function(err, result) {
            if(err) throw err;
            cb(result);
        });
    },
    update: function(table, objVal, condition, cb) {
        let queryString = "UPDATE " + table;
        queryString += " SET " + objToSql(objVal);
        queryString += " WHERE " + condition;

        connection.query(queryString, function(err, result) {
            if(err) throw err;
            cb(result);
        })
    },
    delete: function(table, condition, cb) {
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE " + condition;

        connection.query(queryString, function(err, result) {
            if(err) throw err;
            cb(result);
        })
    }
};

function printQuestionMarks(num) {
    let qMarks = [];
  
    for (let i = 0; i < num; i++) {
      qMarks.push("?");
    }
  
    return qMarks.toString();
}
  
  function objToSql(obj) {
    let arr = [];
  
    for (var key in obj) {
      const value = obj[key];
      if (Object.hasOwnProperty.call(obj, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
    return arr.toString();
}
  
module.exports = orm;