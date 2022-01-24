var creepFunctions = {
    collect: function(creep){
        if(creep.store.getFreeCapacity() > 0 ){
            creep.say("Harvest!");
            var nearest = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(nearest) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearest, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return true;
        }
        return false;
    },

    fillStorage: function(creep){
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER) && 
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        
        if(targets.length > 0) {
            creep.say("Fill!");
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
    },

    upgrade: function(creep){
        creep.say("Upgrade!");
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    },

    build: function(creep){
        var nearest = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if(nearest!= null) {
            creep.say("Build!");
            if(creep.build(nearest) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearest, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
    },

    repair: function(creep){

    },



}

module.exports = creepFunctions;