const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "assign1",
    port: "3306"
  });

app.get('/',(req,res)=>{
    res.send("hello wolrd");
});

app.get('/tasks',(req, res)=>{
    const sql ='SELECT * FROM tasks';
    con.query(sql,(error,result,fields)=>{
      if(error){
          throw error;
      }else{
          if(result.length < 0){
              res.send("no task found");
              console.log("no task found");
          }else{
              res.send(result);
              console.log(result);
              console.log(fields);
          }
      }
    });
});

app.post('/task',(req,res)=>{
    const {name, steps, time} = req.body;
    const task={
        "tname": name,
        "tsteps": steps,
        "ttime": time
    }
    con.query('INSERT INTO tasks SET ?',[task],(error)=>{
        if(error){
            console.log("error ocurred: ",error);
            res.send("error ocurred: ",error);
        }else{
            console.log("Task Added Successfully ");
            res.send("Task Added Successfully ");
        }
    });
});

app.delete('/task/id',(req, res)=>{
    const{ tid } =req.body;
    con.query('delete from tasks where tid = ?',tid,(error,result)=>{
        if(error){
            console.log('error :',error);
            res.send('error :',error);
        }else{
                if(result.affectedRows == 0){
                console.log("task doesnot exist");
                res.send("task doesnot exist");
            }
            else{
                console.log("task deleted successfully");
                res.send("task deleted successfully");            }
        }
    });
});

app.put('/task/id',(req,res)=>{
    const {steps,time,tid} = req.body;
    console.log(req.body);
    console.log(steps,time,tid);
    sql='UPDATE tasks SET tsteps=?,ttime=? WHERE tid=?';
    con.query(sql,[steps,time,tid],(error,result)=>{
        if(error){
            console.log('error :',error);
            res.send('error :',error);
        }else
        {
            console.log("taskUpadted: " + result.affectedRows);
            res.send("taskUpdated: " + result.affectedRows);
            console.log(result);
        }
    });
});
app.listen(3128,()=>{
    console.log("app is running at 3128");
});