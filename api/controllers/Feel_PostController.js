/**
 * FeelpostController
 *
 * @description :: Server-side logic for managing feelposts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getlist_option:function(req,res){

    try {
      let response = [
        {
          value:1,
          label:'Buon'
         },
         {
          value:1,
          label:'Vui'
         },
         {
          value:1,
          label:'Hao Hung'
         }
      ]
      return res.send(OutputInterface.success(response))


    } catch (error) {

    }



  }
};

