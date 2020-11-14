const Intl = require('intl')
const fs = require('fs')
const data = require('../data.json')
const { age, graduation, date } = require('../utils')

exports.index = function(req,res){

    const foundTeachers= data.teachers
    const lengthListTeacher = data.teachers.length
    let index = 0
    let teachers = []

    for(i=0; i<lengthListTeacher; i++){    

            teachers.push(
                {
                    ...foundTeachers[index],
                    services: foundTeachers[index].services.split(",")
                }
            )

        index ++ 

        if(index == lengthListTeacher){
            return res.render("teachers/index", {teachers})
        }          
    }   
}

exports.create = function(req,res){
    return res.render("teachers/create")
}

exports.post = function(req,res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill in all fields")
        }
    }

    let {avatar, name, birth, schooling, classType, services} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id =  Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar,
        name, 
        birth, 
        schooling,
        classType, 
        services,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")
        return res.redirect(`/teachers/${id}`) 
    })

}

exports.show = function(req,res){
    const { id } = req.params
    
    const foundTeacher = data.teachers.find(function(teacher){
        return id == teacher.id
    })

    if(!foundTeacher){
        return res.send("Teacher not found!")
    }

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        schooling: graduation(foundTeacher.schooling),
        services: foundTeacher.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    }

    return res.render("teachers/show",{ teacher })
}

exports.edit = function(req,res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(teacher =>{
        return id == teacher.id  
    })

    if(!foundTeacher){
        return res.send("Teacher not found!")
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }    

    return res.render("teachers/edit", { teacher })
}

exports.update = function(req,res){
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
  
        if(id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        id: Number(req.body.id),
        birth : Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2),function(err){
        if (err) return req.send("Write error!")

        return res.redirect(`/teachers/${id}`)
    })

}

exports.delete = function(req,res){
    const { id } = req.body

    const filteredTeacher = data.teachers.filter(function(teacher){
        return teacher.id != id 
    })

    data.teachers = filteredTeacher

    fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect('/teachers')
    })
}