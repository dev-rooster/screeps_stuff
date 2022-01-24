var creepFunctions = require("creep.functions");
var roleUpgrader = {

    //PRIORITY LIST
    // Collect energy
    // Build construction sites
    // Repair?
    // Upgrade

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }

        if(!creep.memory.building){
           if(creepFunctions.collect(creep)){
                return;
            }
        }

        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
           if(creepFunctions.build(creep)){
               return;
           }
           if(creepFunctions.upgrade(creep)){

           }
        }
    },
    
};

module.exports = roleUpgrader;
