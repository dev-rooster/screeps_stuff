var creepFunctions = require("creep.functions");
var roleHarvester = {
   
    // PRIORITY LIST
    // Collect Energy
    // Fill storage
    // Build construction sites
    // Upgrade controller

    /** @param {Creep} creep **/
    run: function(creep) {
        
        // clear the building flag if we're out of energy
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }

        if(!creep.memory.building){
            // collect energy
            if(creepFunctions.harvest(creep)) {
                return;
            }
            // fill storage
            if(creepFunctions.fillStorage(creep)){
                return;
            }
        }

        // if all storage is full, go ahead and build/upgrade
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }

        //build
        if(creepFunctions.build(creep)){
            return;
        }
        // upgrade
        if(creepFunctions.upgrade(creep)){

        }
    }
};

module.exports = roleHarvester;