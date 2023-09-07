import express from "express";
import bodyParser from "body-parser";
import $ from 'jquery';

const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
//to do: date, empty arrays,
let dayList = [];
let workingList = [];
let date = new Date();
const month = date.getMonth();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = months[month];
const day = date.getDay();
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const dayOfMonth = date.getDate();
let currentDay = days[day-1]
if(day ===0){
    currentDay = days[6];
}
const fullDate = currentDay +", "+ dayOfMonth+ " " + currentMonth;
app.get("/", (req, res)=>{
    dayList= [];
    res.render("index.ejs", {dailyList: dayList, workList: workingList, newDate: fullDate});
})

app.post("/", (req, res)=>{
    let toDoItem = req.body["listItem"];
    console.log(toDoItem);
    dayList.push(toDoItem);
    //push arrays and callback same moments//
        res.render("index.ejs", {listItem: toDoItem, dailyList: dayList, workList: workingList, newDate: fullDate});
});

app.get("/work", (req,res)=>{
    workingList= [];
    res.render("work.ejs", {dailyList: dayList, workList: workingList, newDate: fullDate});
})

app.post("/work", (req, res)=>{
    let toDoItem = req.body["listItem"];
    console.log(toDoItem);
    workingList.push(toDoItem);
    res.render("work.ejs", {listItem: toDoItem, dailyList: dayList, workList: workingList, newDate: fullDate});
})


app.listen(port, (req, res)=>{
    console.log(`server running on port ${port}`);
})