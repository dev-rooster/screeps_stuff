var spawner = {
    
    spawn: function(){
    var harversterCount = 4;
    var upgraderCount = 2;
    var workerCount = 1;
    var fighterCount = 0;
    var healerCount = 0;
    var courierCount = 2;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var workers = _.filter(Game.creeps,(creep) => creep.memory.role == 'worker');
    var fighters = _.filter(Game.creeps,(creep)=> creep.memory.role== 'fighter');
    var healers = _.filter(Game.creeps,(creep) => creep.memory.role=="healer");
    var couriers = _.filter(Game.creeps, (creep) => creep.memory.role == "courier");

    // TOUGH = 10
    // MOVE, CARRY = 50
    // ATTACK = 80
    // WORK = 100
    // RANGE_ATTACK = 150
    // HEAL = 250
    // CLAIM = 600
    if(fighters.length < fighterCount)
    {
        var newName = "Fighter" + Game.time;
        Game.spawns["Spawn1"].spawnCreep([
            MOVE,MOVE,MOVE,MOVE,
            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,],newName,
            {memory:{role: 'fighter'}}); // 1000
    }
    if(healers.length < healerCount)
    {
        var newName = "Healer" + Game.time;
        Game.spawns["Spawn1"].spawnCreep([
            MOVE,MOVE,MOVE,MOVE,
            HEAL,HEAL,
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH],newName,
            {memory:{role: 'healer'}}); //900
    }
    if(upgraders.length < upgraderCount){
        var newName = "Upgrader" + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}}); // 800
    }
    if(workers.length < workerCount)
    {
        var newName = "Worker" + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'worker'}}); // 1000
    }
    if(harvesters.length < harversterCount) {
        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}}); // 750
    }
    if(couriers.length < courierCount){
        var newName = "Courier" + Game.time;
        Game.spawns["Spawn1"].spawnCreep([MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],newName,
            {memory:{role:'courier'}}); // 1000
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
