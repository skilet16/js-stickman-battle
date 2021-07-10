// Intial settings
const PLAYER_NAME = "Swadley";
const PLAYER_HEALTH = 100;
const PLAYER_ARMOR = 32;
const PLAYER_ATTACK = 11;
const PLAYER_HEAL = 2;

const ENEMY_NAME = "Legtoe";
const ENEMY_HEALTH = 100;
const ENEMY_ARMOR = 32;
const ENEMY_ATTACK = 15;
const ENEMY_HEAL = 3;

// The main code

function gameObj() {
  this.printStatistics = function(object, stats_id) {
      document.querySelector(stats_id + " .stat_health").innerHTML = "Health: " + object.health;
      document.querySelector(stats_id + " .stat_damage").innerHTML = "Damage: " + object.attack;
      document.querySelector(stats_id + " .stat_heal").innerHTML = "Heal: " + object.heal + " HP";
      document.querySelector(stats_id + " .stat_armor").innerHTML = "Armor: " + object.armor;
  }
  this.printConsole = function(message) {
    let span = document.createElement("span");
    span.innerHTML = "<b>Console:</b> " + message;
    let log = document.querySelector("#logbox");
    log.appendChild(span);

    log.scrollTop = log.scrollHeight;
  }

}
function PersonObj(name, health, armor, attack, heal) {
  this.name = name;
  this.health = health;
  this.armor = armor;
  this.attack = attack;
  this.heal = heal;
  this.attackEnemy = function(enemy) {
    let attackDamage = (this.attack / (enemy.armor * 0.05 ));
    attackDamage = attackDamage.toFixed(2);
    enemy.health = enemy.health - attackDamage;
    enemy.health = parseFloat(enemy.health.toFixed(2));
    if(enemy.health < 1) {
      alert("GAME OVER!");
      document.location.reload(true)
    } else {
      consoleObj.printConsole(this.name + " damaged "+ attackDamage + " to " + enemy.name);
      consoleObj.printConsole(enemy.name + " has " + enemy.health + " HP");
    }
  }
  this.healSelf = function () {
    if(this.health < 100) {
      if(this.health < 1) {
        alert("GAME OVER!");
        document.location.reload(true)
      } else {
        this.health = this.health + this.heal;
        if(this.health > 100) {
          this.health = 100;
        }
        consoleObj.printConsole(this.name + " healed " + this.heal + " HP");
        consoleObj.printConsole(this.name + " has " + this.health + " HP");
      }
    }
  }
  this.passAction = function() {
    this.armor = parseFloat((parseFloat(this.armor) + 0.15).toFixed(2));

    consoleObj.printConsole(this.name + " passed and armor has increased to " + this.armor);
  }
}
function GamingBattle(player, enemy) {
  this.enemyAction = function () {
    let randomNum = Math.floor(Math.random() * 3) + 1;
    switch(randomNum) {
      case 1:
        enemy.attackEnemy(player);
        break;
      case 2:
        if(enemy.health == 100) {
          enemy.attackEnemy(player);
        } else {
          enemy.healSelf();
        }
        break;
      case 3:
        enemy.passAction();
        break;
    }
    consoleObj.printStatistics(enemy, "#enemy");
  }

  this.attack = function () {
    player.attackEnemy(enemy);
    this.enemyAction();
    consoleObj.printStatistics(player, "#player");
  }
  this.heal = function () {
    player.healSelf();
    this.enemyAction();
    consoleObj.printStatistics(player, "#player");
  }

  this.pass = function() {
    player.passAction();
    this.enemyAction();
    consoleObj.printStatistics(player, "#player");
  }

}

var consoleObj = new gameObj();
let playerObj = new PersonObj(PLAYER_NAME, PLAYER_HEALTH, PLAYER_ARMOR, PLAYER_ATTACK, PLAYER_HEAL);
let enemyObj = new PersonObj(ENEMY_NAME, ENEMY_HEALTH, ENEMY_ARMOR, ENEMY_ATTACK, ENEMY_HEAL);
let battleActions = new GamingBattle(playerObj, enemyObj);


consoleObj.printStatistics(playerObj, "#player");
consoleObj.printStatistics(enemyObj, "#enemy");
