module.exports.loop = function () {
    // 建立 Creep
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1');
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker2');
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker3');

    // 取得相關遊戲物件
    let spawn = Game.spawns["Spawn1"];
    let creep = Game.creeps["Worker1"];
    let creep1 = Game.creeps["Worker2"];
    let creep2 = Game.creeps["Worker3"];
    let source = Game.getObjectById("5bbcabb29099fc012e63424c");
    let controller = creep.room.controller;

    // Creep1 的行為
    if (creep1.store.getFreeCapacity() > 0) {
        creep1.moveTo(source);
        creep1.harvest(source);
    } else {
        creep1.moveTo(controller);
        creep1.transfer(controller, RESOURCE_ENERGY);
    }

    // Creep 的行為
    if (creep.store.getFreeCapacity() > 0) {
        creep.moveTo(source);
        creep.harvest(source);
    } else {
        creep.moveTo(controller);
        creep.transfer(controller, RESOURCE_ENERGY);
    }

    // 檢查並將 Creep 的所有能量存儲到控制器
    if (creep.store[RESOURCE_ENERGY] > 0) {
        creep.moveTo(controller);
        creep.transfer(controller, RESOURCE_ENERGY);
    }

    // Worker3 的行為
    if (creep2.store.getFreeCapacity() > 0) {
        creep2.moveTo(source);
        creep2.harvest(source);
    } else {
        let constructionSite = creep2.room.find(FIND_CONSTRUCTION_SITES)[0];
        if (constructionSite) {
            if (creep2.build(constructionSite) == ERR_NOT_IN_RANGE) {
                creep2.moveTo(constructionSite, RESOURCE_ENERGY);
            }
        }
      
    }
}
