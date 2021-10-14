const bcrypt = require('bcrypt')
const fs = require('fs')
const users = []
const database = require('../../db.json')

// Data which will write in a file."
  
// Write data in 'Output.txt' .



module.exports = 
{
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
     // const { enteredUsername, enteredPassword } = req.body
      for (let i = 0; i < database.length; i++) {

        if (database[i].username === req.body.username) 
        {
          const authenticated = bcrypt.compareSync(req.body.password, database[i].passwordHash) 
          if(authenticated)
          {
          res.status(200).send(database[i])
          console.log("account Found")
          }
        }
      }
      res.status(400).send("User not found.")
      console.log("User not found.")
    },



    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)

        const {username, email, firstName, lastName, password} = req.body
        //hash here
        //user
        //password

        for(let i = 0; i< users.length; i++)
        {
          let existing = bcrypt.compareSync(password, users[i].passwordHash)
            if(existing){
                users[i].registeredUser.push(registeredUser)
                let messagesToUser = {...users[i]}
                delete messagesToUser.passwordHash
                res.status(200).send(users[i])
                return
            }
        }

        let salt = bcrypt.genSaltSync(5)
        console.log(salt)
        let passwordHash = bcrypt.hashSync(password, salt)
        //let passwordHash = password
        console.log(password, passwordHash)

        const registeredUser = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }

        let messagesToUser = {...registeredUser}
        users.push(registeredUser)
        console.log(users)

        if(registeredUser){
        const myJSON = JSON.stringify(users);
        fs.writeFile(`db.json`, myJSON, (err) => {
      
          // In case of a error throw err.
          if (err) throw err;
        })
        }

        delete messagesToUser.passwordHash
        res.status(200).send(messagesToUser)
        console.log(messagesToUser)

    }


}