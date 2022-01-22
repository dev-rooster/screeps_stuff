var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawner = require('spawner');
const { spawn } = require('./spawner');
var harversterCount = 2;
var upgraderCount = 2;
var builderCount = 4;

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
         if(creep.memory.role == 'builder'){
             roleBuilder.run(creep);
         }
     
    }
}