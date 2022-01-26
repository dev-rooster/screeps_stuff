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

}