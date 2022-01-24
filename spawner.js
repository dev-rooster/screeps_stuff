var spawner = {
    
    spawn: function(){
    var harversterCount = 3;
    var upgraderCount = 3;
    var repairerCount = 0;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps,(creep) => creep.memory.role == 'repairer');

    // TOUGH = 10
    // MOVE, CARRY = 50
    // ATTACK = 80
    // WORK = 100
    // RANGE_ATTACK = 150
    // HEAL = 250
    // CLAIM = 600

    if(harvesters.length < harversterCount) {
        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}}); // 700
    }
    if(upgraders.length < upgraderCount){
        var newName = "Upgrader" + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}}); //800
    }
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
}
};
module.exports = spawner;
