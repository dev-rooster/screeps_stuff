var creepFunctions = require("creep.functions");
var roleCourier = {
   

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creepFunctions.moveEnergy(creep))
        {
            return;
        }
        if(creepFunctions.fillStorage(creep)){
            return;
        }
    }
};

module.exports = roleCourier;