var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleWorker = require('role.worker');
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
    }
}