var creepFunctions = require("creep.functions");
var roleWorker = {
   
    // PRIORITY LIST
    // Collect Energy
    // Repair

    /** @param {Creep} creep **/
    run: function(creep) {
        
        // clear the building flag if we're out of energy
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }

        if(!creep.memory.building){
            // collect energy
            if(creepFunctions.collect(creep)) {
                return;
            }
        }

        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }

        //build
        if(creepFunctions.repair(creep)){
            return;
        }
    }
};

module.exports = roleWorker;