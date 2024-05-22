const player =  {
	"name": "cojone",
	"level": 5,
	"maxhp": 20,
	"hp": 17,
	"batk" : 10,
	"bdef" : 10,
	"bres" : 10,
	"blck" : 10,
	"atk": 10,
	"def": 10,
	"res": 10,
	"lck": 10,
	"exp": 0,
	"next-level": 100,
	"weapon-l" : "None",
	"weapon-r" : "None",
	"head" : "None",
	"body" : "None",
	"legs" : "None",
	"inventory": ["potion", "antidote"],
	"quantity": [1, 2],
}

const enemy = {
	"name": "Name",
	"level": 5,
	"maxhp": 10,
	"hp": 10,
	"batk": 5,
	"bdef": 5,
	"blck": 5,
	"atk": 5, 
	"def": 5,
	"lck": 5,
	"exp": 175,
	"gold": 5,
	"drops": [],
	"drop-chance": [],
	"sprite": "prova"
}


const messageBox = document.getElementById("msgbox");
const itemBox = document.getElementById("itembox");
let fighting = false
 function updatePlayer() {
 	document.getElementById("inventory-items").innerHTML = "";
	document.getElementById("player-name").innerHTML = player.name;
	document.getElementById("player-level").innerHTML = player.level;
	document.getElementById("player-maxhp").innerHTML = player.maxhp;
	document.getElementById("player-currenthp").innerHTML = player.hp;
	document.getElementById("player-atk").innerHTML = player.atk;
	document.getElementById("player-def").innerHTML = player.def;
	document.getElementById("weapon-l").innerHTML = player["weapon-l"];
	document.getElementById("weapon-r").innerHTML = player["weapon-r"];
	document.getElementById("head").innerHTML = player.head;
	document.getElementById("body").innerHTML = player.body;
	document.getElementById("legs").innerHTML = player.legs;
	for (var i = 0; i < player.inventory.length; i++){
		document.getElementById("inventory-items").innerHTML += "<img class='item' id=" + player.inventory[i] + " onClick='useItem(this)' onMouseOver='setItemDesc(this)' src=img/items/"+ player.inventory[i]+".png> x" + String(player.quantity[i]) + " ";
	}
}

function updateItems(){
	document.getElementById("inventory-items").innerHTML = "";
	for (var i = 0; i < player.inventory.length; i++){
		document.getElementById("inventory-items").innerHTML += "<img class='item' id=" + player.inventory[i] + " onClick='useItem(this)' onMouseOver='setItemDesc(this)' src=img/items/"+ player.inventory[i]+".png> x" + String(player.quantity[i]) + " ";
	}
}

function addMessage(message) {
	messageBox.innerHTML = message + "<br>"+ messageBox.innerHTML;
}

updatePlayer();
addMessage("Suca");
function setItemDesc(item){
	switch (item.id){
	case "potion":
		itemBox.innerHTML = "Potion used to cure 20HP";
		break;
	case "antidote":
		itemBox.innerHTML = "Antidote used to heal from poison.";
		break;
	}
}

function useItem(item){
	switch (item.id){
	case "potion":
		player.hp = player.hp + 20;
		if (player.hp > player.maxhp){
			player.hp = player.maxhp;
		}
		messageBox.innerHTML = "Restored 20 HP!<br>" + messageBox.innerHTML;
		break;
	case "antidote":
		messageBox.innerHTML = "Healed from poison.<br>" + messageBox.innerHTML;
		break;
	}
	var index = player.inventory.indexOf(item.id);
	console.log(index);
	console.log(item.id);
	if (player.quantity[index] > 1){
		player.quantity[index]--;
	}
	else {
		player.quantity.splice(index, 1);
		player.inventory.splice(index, 1);
	}
	updatePlayer();
}

function updateStats(){
	calculate_atk_stat();
	calculate_def_stat();
	calculate_res_stat();
	calculate_lck_stat();
}

function calculate_atk_stat(){
	switch(player["weapon-r"]){
	case "Cum Sword":
		player.atk = player.batk + 5;
		break;
	default:
		player.atk = player.batk;
		break;
	}
}

function calculate_def_stat(){
	switch(player["weapon-l"]) {
	case "Cum Shield":
		player.def = player.bdef + 5;
		break;
	default:
		player.def = player.bdef;
		break;
	}
}

function calculate_res_stat(){
	return;
}

function calculate_lck_stat(){
	return;
}

function prova(){
	player["weapon-r"] = "Cum Sword";
	player["weapon-l"] = "Cum Shield";
	updateStats();
	updatePlayer();
}

function prova2() {
	player["weapon-l"] = "None";
	player["weapon-r"] = "None";
	updateStats();
	updatePlayer();
}

function spawnEnemy(){
	document.getElementById("enemySprite").src = "img/enemies/" + enemy.sprite +".png";
	enemy.hp = enemy.maxhp;
	addMessage(enemy.name + " appears!");
	document.getElementById("hpbar").width = (enemy.hp/enemy.maxhp) * 100;
}

function gameStart(){
	spawnEnemy();
	inBattleButtons();
}

function run(){
	outBattleButtons();
	addMessage(player.name + " ran from the battle!");
	document.getElementById("enemySprite").src = "img/enemies/placeholder.png";
	document.getElementById("hpbar").width = 0;

}

function fight(){
	/* Implement speed later*/
	let damage = damageCalc(player.atk, enemy.def);
	enemy.hp = enemy.hp - damage;
	addMessage(player.name + " deals " + String(damage) + " damage to " + enemy.name + "!");
	if (enemy.hp <=0){
		enemy.hp = 0;
		endFight();
		return;
	}
	damage = damageCalc(enemy.atk, player.def);
	document.getElementById("hpbar").width = (enemy.hp/enemy.maxhp) * 100;
	addMessage(enemy.name + " deals " + String(damage) + " damage to " + player.name + "!");
	if (player.hp <= 0){
		player.hp = 0;
		endFight();
		return;
	}
}

function damageCalc(atk, def){
	var dmg = atk - def;
	if (dmg < 0){
		dmg = 0;
	}
	return dmg;
}

function endFight(){
	if (enemy.hp == 0){
		addMessage(player.name + " won the fight!");
		player.exp = player.exp + enemy.exp;
		addMessage(player.name + " gained " + String(enemy.exp) + " experience points!");
		checkLevelUp();
		updateExpBar();
		document.getElementById("hpbar").width = 0;
	}
	else if (player.hp == 0){
		addMessage("You lost the fight.");
	}
	outBattleButtons();
	document.getElementById("enemySprite").src = "img/enemies/placeholder.png";
}

function inBattleButtons(){
	document.getElementById("fight").disabled = false;
	document.getElementById("run").disabled = false;
	document.getElementById("start").disabled = true;
}

function outBattleButtons(){
	document.getElementById("fight").disabled = true;
	document.getElementById("run").disabled = true;
	document.getElementById("start").disabled = false;
}

function updateExpBar(){
	document.getElementById("expbar").width = (player.exp/player["next-level"]) * 100;
}

function checkLevelUp(){
	while (player.exp >= player["next-level"]){
		player.exp = player.exp - player["next-level"];
		player.level++;
		levelUp();
		addMessage("You leveled up! Reached level " + String(player.level));
	}
}

function levelUp(){
		player.maxhp = player.maxhp + 5;
		player.hp = player.maxhp;
		player.batk = player.batk + 2;
		player.bdef = player.bdef + 2;
		player.blck = player.blck + 1;
		updateStats();
		updatePlayer();
}