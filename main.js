var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleWorker = require('role.worker');
var roleFighter = require('role.fighter');
var roleHealer = require('role.healer');
var roleCourier = require('role.courier');
var spawner = require('spawner');


module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    spawner.spawn();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
         if(creep.memory.role == 'upgrader') {
             roleUpgrader.run(creep);
         }
         if(creep.memory.role == 'worker'){
             roleWorker.run(creep);
         }
         if(creep.memory.role == 'fighter')
         {
             roleFighter.run(creep);
         }
         if(creep.memory.role == 'healer')
         {
             roleHealer.run(creep);
         }
        if(creep.memory.role == 'courier'){
            roleCourier.run(creep);
        }
    }
    
    // super basic tower defense
    var roomName = 'W41N41';
    var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    var hostiles = Game.rooms['W41N41'].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);

        towers.forEach(tower => tower.attack(hostiles[0]));
    }
    else
    {
        var hurt = Game.rooms[roomName].find(FIND_MY_CREEPS, {filter: (creep) =>  { return creep.hits < creep.hitsMax}});
        if(hurt.length > 0)
        {
            towers.forEach(tower => tower.heal(hurt[0]));
        }
        else
        {
            var hurtStruct = Game.rooms[roomName].find(FIND_STRUCTURES, {filter: (s) => {return (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART) && s.hits < s.hitsMax && s.hits < 50000}});
            if(hurtStruct.length > 0)
            {
                towers.forEach(tower => tower.repair(hurtStruct[0]));
            }
            /*else{
                var hurtStruct = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: (s) => {return s.hits < s.hitsMax}});    
                if(hurtStruct.length > 0){
                    towers.forEach(tower => tower.repair(hurtStruct[0]));
                }
            }*/
        }
    }
}
