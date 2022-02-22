const express = require('express')
const app = express();
const parser = require('body-parser')
const mysql = require('mysql2')
const port = 3000;
app.use(parser.json())
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql@gauri16",
    database:"webdev-cat-3"
  });
  
  connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        
  });

 

  app.listen(port,() => console.log("server started..."));



  app.get("/stadium",(req,res) => {
        const sql = "SELECT * FROM stadium;"
        connection.query(sql,(err,rows,fields) => {
            if(!err){
                res.send(rows)
            }else{
                console.log("Error")
            } 
        })
  })

  

  app.get("/stadium1",(req,res) => {
    const sql = "SELECT * FROM stadium WHERE idstadium=1"
    connection.query(sql,[req.params.id],(err,rows,fields) => {
        if(!err){
            res.send(rows)
        }else{
            console.log("Error")
        } 
    })
})

app.get('/add',(req,res) => {
    const json = {"idstadium":54,"sName":"pqr","capacity":"67000"};
    const sql = 'INSERT INTO stadium set ?'
    connection.query(sql,json,(err,result) => {
        if(err) throw err
        else res.send("record added");
    })
})

app.get('/update/:id',(req,res) => {
    const name = 'abc'
    const sql = `UPDATE stadium SET sName='${name}' WHERE idstadium=?`
    connection.query(sql,[req.params.id],(err,result) => {
        if(err) throw err
        else res.send("record updated");
    })
})

app.get('/delete/:id',(req,res) => {
    
    const sql = `DELETE FROM stadium WHERE idstadium=?`
    connection.query(sql,[req.params.id],(err,result) => {
        if(err) throw err
        else res.send("record updated");
    })
})