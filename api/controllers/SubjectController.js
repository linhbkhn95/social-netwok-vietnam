/**
 * SubjectController
 *
 * @description :: Server-side logic for managing subjects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add:function(req,res){
        Subject.create(req.body).exec((err,subject)=>{
            res.send(subject)
        })
    },
    getall:function(req,res){
        Subject.find().exec((err,list)=>{
            if(err)
                return res.send([])
            let result = list.map((item)=>{
                return{
                    value:item.id,
                    label:item.subjectname
                }
            })
            res.send(result)
        })
    }
};  

