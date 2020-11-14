module.exports = {
    age: function(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if(month < 0 || month == 0 
            && today.getDate() < birthDate.getDate()){
                age = age - 1
            }
        return age
    },

    graduation: function(schooling){       

        if(schooling =="EM") {
            return schooling = "Ensino Médio Completo"
        } else if(schooling =="ES") {
            return schooling = "Ensino Superior Completo"
        } else if(schooling =="M") {
            return schooling = "Mestrado"
        } else {
            return schooling = "Doutorado"
        }
    },

    date: function(timestamp){
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()        
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },

   grade: function(schoolYear){       

        if(schoolYear =="5EF") {
            return schoolYear = "5º ano do ensino fundamental"
        } else if(schoolYear =="6EF") {
            return schoolYear = "6º ano do ensino fundamental"
        } else if(schoolYear =="7EF") {
            return schoolYear = "7º ano do ensino fundamental"
        } else if(schoolYear =="8EF") {
            return schoolYear = "8º ano do ensino fundamental"
        } else if(schoolYear =="9EF") {
            return schoolYear = "9º ano do ensino fundamental"
        } else if(schoolYear =="1EM") {
            return schoolYear = "1º ano do ensino médio"
        } else if(schoolYear =="2EM") {
            return schoolYear = "2º ano do ensino médio"
        } else {
            return schoolYear = "3º ano do ensino médio"
        }
    }
}
