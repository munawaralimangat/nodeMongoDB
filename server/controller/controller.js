const Userdb = require('../model/model')

//create and save user

exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message : "content cannot be empty"})
        return
    }
    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })
    //save user in the data base
    user
    .save(user)
    .then(data=>{
        //res.send(data)
        res.redirect('/add-user')
    })
    .catch(err =>{
        res.status(500).send({
            message:err.message || 'some error occur while creating a create operation'
        })
    })

}

//retrive and return all users/retrive and return a single user
exports.find = (req,res)=>{
    
    if(req.query.id){
        const id = req.query.id

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.data(404).send({message:"NOt found user with ID "+id})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message:"error retriving user with id "+id})
        })
    }else{
        Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "error occured while retriving user information"})
    })

    }
}

//update a new identified user by user ID
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update can not be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot update user with ${id}.maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message:"Error update user information"})
    })

}

//delete a user with specifiied user ID in the request
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot delete with id ${id}. maybe id is wrong`})
        }else{
            res.send({
                message:'user was deleted successfully'
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"could not delete user with id = "+id
        })
    })

}

