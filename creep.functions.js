var creepFunctions = {
    collect: function(creep){
        var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s=>s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
        });
        if(container == undefined)
        {
            container = creep.room.storage;
        }
        if(container != undefined)
        {
            if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(container,{visualizePathStyle: {sroke: '#00ffff'}});
            }
            return true;
        }
        return false;
    },

    harvest: function(creep)
    {       
        if(creep.store.getFreeCapacity() > 0 ){
        var nearest = creep.pos.findClosestByPath(FIND_SOURCES, {
            filter: s=>s.energy > 0
        });
        if(creep.harvest(nearest) == ERR_NOT_IN_RANGE) {
            creep.moveTo(nearest, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        return true;
        }
        return false;
    },

    fillStorage: function(creep){
        structure = creep.room.storage;
        if(structure != undefined) {
            if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
    },

    upgrade: function(creep){
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    },

    build: function(creep){
        var nearest = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if(nearest!= null) {
            if(creep.build(nearest) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearest, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
    },

    repair: function(creep){
        var nearest = creep.pos.findClosestByPath(FIND_STRUCTURES,{
            filter: (structure) =>{
                return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_STORAGE) && structure.hits < structure.hitsMax
            }
        });
        if(nearest != null)
        {
            if(creep.repair(nearest) == ERR_NOT_IN_RANGE){
                creep.moveTo(nearest,{visualizePathStyle: {stroke: '#ff00ff'}});
                return true;
            }
        }     
            
        
        return false;
    },
    
    fortifyWalls: function(creep, capacity)
    {
        var nearest = creep.pos.findClosestByPath(FIND_STRUCTURES,{
            filter: (structure) => { return structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.hits < capacity}
        });
        if(nearest != null)
        {
            if(creep.repair(nearest) == ERR_NOT_IN_RANGE){
                creep.moveTo(nearest,{visualPathStyle: {stroke: '#ff0000'}});
            }
            return true;
        }
        return false;
    },
    repairRamparts: function(creep, capacity){
        var nearest = creep.pos.findClosestByPath(FIND_STRUCTURES,{
            filter: (structure) => { return structure.structureType == STRUCTURE_RAMPART && structure.hits < structure.hitsMax && structure.hits < capacity}
        });
        if(nearest != null)
        {
            if(creep.repair(nearest) == ERR_NOT_IN_RANGE){
                creep.moveTo(nearest,{visualPathStyle: {stroke: '#ff0000'}});
            }
            return true;
        }
        return false;
    },

    attack: function(creep)
    {
        var nearestEnemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            if(creep.attack(nearestEnemy) == ERR_NOT_IN_RANGE){
                creep.moveTo(nearestEnemy);
            }
    },
    heal: function(creep)
    {
        var nearestHurt = creep.pos.findClosestByPath(FIND_MY_CREEPS,{
            filter: (c) => {return c.hits < c.hitsMax}
        });
        if(creep.heal(nearestHurt)==ERR_NOT_IN_RANGE)
        {
            creep.moveTo(nearestHurt);
        }
    },
    moveEnergy: function(creep)
    {
        var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER) && 
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        
        if(structure != undefined){
            if(creep.store[RESOURCE_ENERGY] == 0){
                return this.collect(creep);
            }
            if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
        },
        
    moveToRampart: function(creep){
        var nearest = creep.pos.findClosestByPath(FIND_STRUCTURES,{
            filter: (structure) => { return structure.structureType == STRUCTURE_RAMPART}});
            creep.moveTo(nearest);
       return true;
    }
}

module.exports = creepFunctions;