var creepFunctions = require("creep.functions");
var roleFighter = {
   
    // PRIORITY LIST
    // Collect Energy
    // Fill storage
    // Build construction sites
    // Upgrade controller

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creepFunctions.attack(creep)){
            return;
        }
        if(creepFunctions.moveToRampart(creep)){
            return;
        }
        
    }
};

module.exports = roleFighter;