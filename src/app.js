const express = require("express");
require("./db/conn");
const Student = require("./models/students")
const app = express();
const port = process.env.PORT || 3000;

//convert upcomming requestinto JSON
app.use(express.json());


//When a POST request is sent at "localhost:3000/students", This will happen:
// app.post("/students", (req,res)=>{

//     const user = new Student(req.body);
//     //saving into database
//     user.save()
//     .then(()=>{
//         //Display success message on console and requested body on screen
//         console.log("successfully saved in database");
//         console.log(req.body);
//         res.status(201).send(user);
//     })
//     .catch((e)=>{
//         // Display error on console as well as on screen
//         console.log(e);
//         res.status(400).send(e);
//         console.log("Unsuccesful");
//     })
// })


app.post("/students", async(req,res)=>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch(e){
        res.status(400).send(e);
    }
})

//read the data of registered students
app.get("/students", async(req, res)=>{
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }
    catch(e){
        res.send(e);
    }
})


//Get the individual Student data using id
app.get("/students/:id", async(req,res)=>{
    try{
        const _id = req.params.id;
        console.log(_id);
        const studentData = await Student.findById(_id);
        console.log(studentData);
    
        if(!studentData){
            return res.status(404).send();
        }
        else{
            res.send(studentData);
        }
    }
    catch(e){
        res.send(e);
    }

})

//update the student by it's id
app.patch("/students/:id", async(req, res)=>{
    try{
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body);
        res.send(updateStudents);
    }
    catch(e){
        res.status(404).send(e);
    }
})

//delete the student by it's id
app.delete("/students/:id", async (req, res)=>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }
    catch(e){
        res.status(400).send(e);
    }
})

//listen
app.listen(port, ()=>{
    console.log(`listening to port ${port}`)
})