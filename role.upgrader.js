var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            //creep.say('🔄');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            //creep.say('🚧');
        }

        if(creep.memory.building) {
            //creep.say('🚧');
            var nearest = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(nearest!= null) {
                if(creep.build(nearest) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearest, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
              //  creep.say("🔧")
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL && structure.hits < 50000);
                }});

                if(targets.length > 0)
                {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                else{
                //    creep.say("⬆️")
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }

                }
            }
        }
        else {
            //creep.say('🔄');
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },
    
};

module.exports = roleUpgrader;
