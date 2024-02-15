module.exports.loop = function () {
    // 建立 Creep
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker1');
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker2');
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker3');
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker4');
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker5');
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Worker6');

    // 取得相關遊戲物件
    let spawn = Game.spawns["Spawn1"];
    let creep1 = Game.creeps["Worker1"];
    let creep2 = Game.creeps["Worker2"];
    let creep3 = Game.creeps["Worker3"];
    let creep4 = Game.creeps["Worker4"];
    let creep5 = Game.creeps["Worker5"];
    let creep6 = Game.creeps["Worker6"];
    let source = Game.getObjectById("5bbcabb29099fc012e63424c");
    let controller = creep1 && creep1.room.controller;

    // 更新工人的状态和行为
    updateWorker(creep1);
    updateWorker(creep2);
    updateWorker(creep3);
    updateWorker(creep4);
    updateWorker(creep5);
    updateWorker(creep6);

    // 定义工人行为的函数
    function updateWorker(creep) {
        if (!creep) return;

        // 如果工人正在挖矿并且存储满了，则转变为转移能量的状态
        if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = false;
        }
        // 如果工人正在转移能量并且存储空了，则转变为挖矿的状态
        if (!creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = true;
        }

        // 根据工人的状态执行相应的行为
        if (creep.memory.working) {
            creep.moveTo(source);
            creep.harvest(source);
        } else {
            if (creep.transfer(controller, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        }
    }
    
    if (creep6.store.getFreeCapacity() > 0) {
        creep6.moveTo(source);
        creep6.harvest(source);
    } else {
        let constructionSite = creep2.room.find(FIND_CONSTRUCTION_SITES)[0];
        if (constructionSite) {
            if (creep6.build(constructionSite) == ERR_NOT_IN_RANGE) {
                creep6.moveTo(constructionSite);
            }
        }
    }
}
