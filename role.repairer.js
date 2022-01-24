var roleRepairer
 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // if we have space for energy, go get energy
	    if(creep.store.getFreeCapacity() > 0 ) {
            var nearest = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(nearest) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearest, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
             creep.say("🔧");

            if(creep.memory.currentlyRepairing == null){
                var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax);
                }});

                targets.sort(function(a,b){
                    return (a.hitsMax - a.hits) > (b.hitsMax - b.hits);
                });

                creep.memory.currentlyRepairing = targets[0].id;
            }
            var repairTarget = Game.getObjectById(creep.memory.currentlyRepairing);
            
            if(repairTarget != null){
                if(creep.repair(repairTarget) == ERR_NOT_IN_RANGE){
                    creep.moveTo(repairTarget), {visualizePathStyle: {stroke: '#ffaa00'}};
                }
                if(repairTarget.hits == repairTarget.hitsMax) {
                    creep.say("FIXED");
                    creep.memory.currentlyRepairing = null;
                }
            }
        }
	}
};

module.exports = roleRepairer;