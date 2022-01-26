var creepFunctions = require("creep.functions");
var rampartCapacity = 37000;
var wallCapacity = 37000;
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
            if(creepFunctions.collect(creep) && creep.store.getFreeCapacity() > 0) {
                return;
            }
        }

        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }

        //keep ramparts and walls at minimum hits
        if(creepFunctions.repairRamparts(creep, rampartCapacity)){
            return;
        }
        if(creepFunctions.fortifyWalls(creep, wallCapacity)){
            return;
        }

        //repair roads
        if(creepFunctions.repair(creep)){
            return;
        }

        //help out with construction
        if(creepFunctions.build(creep)){
            return;
        }

        //repair ramparts to max
        // if(creepFunctions.repairRamparts(creep,3000000)){
        //     return;
        // }

        //fortify walls to max
        // if(creepFunctions.fortifyWalls(creep,300000000)){
        //     return;
        // }
        

    }
};

module.exports = roleWorker;