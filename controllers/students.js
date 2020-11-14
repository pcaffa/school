const Intl = require('intl')
const fs = require('fs')
const data = require('../data.json')
const { grade, date } = require('../utils')

exports.index = function(req,res){
    const foundStudents= data.students
    const lengthListStudents = data.students.length
    let index = 0
    let students = []

    for(i=0; i<lengthListStudents; i++){  
        students.push({
            ...foundStudents[index],
            schoolYear : grade(foundStudents[index].schoolYear)
        })

        index ++ 

        if(index == lengthListStudents){
            return res.render("students/index", { students })
        }
    }
}

exports.create = function(req,res){
    return res.render("students/create")
}

exports.post = function(req,res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill in all fields")
        }
    }

    birth = Date.parse(req.body.birth)
    
    let id =1;
    const lastStudent = data.students[data.students.length - 1]

    if(lastStudent){
        id = lastStudent.id + 1;
    }

    data.students.push({
        ...req.body,
        id,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")
        return res.redirect(`/students/${id}`) 
    })

}

exports.show = function(req,res){
    const { id } = req.params
    
    const foundStudent = data.students.find(function(student){
        return id == student.id
    })

    if(!foundStudent){
        return res.send("Student not found!")
    }

    const student = {
        ...foundStudent,
        schoolYear : grade(foundStudent.schoolYear),
        birth: date(foundStudent.birth).birthDay        
    }

    return res.render("students/show",{ student })
}

exports.edit = function(req,res){
    const { id } = req.params

    const foundStudent = data.students.find(student =>{
        return id == student.id  
    })

    if(!foundStudent){
        return res.send("Student not found!")
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }    

    return res.render("students/edit", { student })
}

exports.update = function(req,res){
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex) {
  
        if(id == student.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        ...req.body,
        id: Number(req.body.id),
        birth : Date.parse(req.body.birth)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2),function(err){
        if (err) return req.send("Write error!")

        return res.redirect(`/students/${id}`)
    })

}

exports.delete = function(req,res){
    const { id } = req.body

    const filteredStudent = data.students.filter(function(student){
        return student.id != id 
    })

    data.students = filteredStudent

    fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect('/students')
    })
}