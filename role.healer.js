var creepFunctions = require("creep.functions");
var roleHealer = {
   
    // PRIORITY LIST
    // Collect Energy
    // Fill storage
    // Build construction sites
    // Upgrade controller

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creepFunctions.heal(creep)){
            return;
        }
        if(creepFunctions.moveToRampart(creep)){
            return;
        }
    }
};

module.exports = roleHealer;