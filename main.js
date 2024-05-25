const player =  {
	"name": "cojone",
	"level": 5,
	"gold": 100,
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
	"weapon" : "None",
	"shield" : "None",
	"head" : "None",
	"body" : "None",
	"legs" : "None",
	"inventory": ["potion", "antidote"],
	"quantity": [1, 2],
}

const shop = {
	"items" : ["potion", "antidote", "bronze_sword"],
	"cost": [10, 20, 50],
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
	document.getElementById("player-gold").innerHTML = player.gold;
	document.getElementById("player-maxhp").innerHTML = player.maxhp;
	document.getElementById("player-currenthp").innerHTML = player.hp;
	document.getElementById("player-atk").innerHTML = player.atk;
	document.getElementById("player-def").innerHTML = player.def;
	document.getElementById("weapon").innerHTML = player["weapon"];
	document.getElementById("shield").innerHTML = player["shield"];
	document.getElementById("head").innerHTML = player.head;
	document.getElementById("body").innerHTML = player.body;
	document.getElementById("legs").innerHTML = player.legs;
	for (var i = 0; i < player.inventory.length; i++){
		document.getElementById("inventory-items").innerHTML += "<img class='item' id=" + player.inventory[i] + " onClick='useItem(this)' onMouseOver='setItemDesc(this)' src=img/items/"+ player.inventory[i]+".png> x" + String(player.quantity[i]) + " ";
	}
	updateShop();
}

function updateShop(){
	document.getElementById("shop").innerHTML ="";
	for (var i = 0; i<shop.items.length; i++){
		document.getElementById("shop").innerHTML+= "<img class='item' id=" + shop.items[i] + " onclick='buyItem(this)' onMouseOver='setItemDesc(this)' src=img/items/" + shop.items[i] + ".png> G: " + String(shop.cost[i]) + " ";
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
function setItemDesc(item){
	switch (item.id){
	case "potion":
		itemBox.innerHTML = "Potion used to cure 20HP";
		break;
	case "antidote":
		itemBox.innerHTML = "Antidote used to heal from poison.";
		break;
	case "bronze_sword":
		itemBox.innerHTML = "A sword made out of bronze. Useful against weak enemies."
	}
}

function useItem(item){
	switch (item.id){
	case "potion":
		player.hp = player.hp + 20;
		if (player.hp > player.maxhp){
			player.hp = player.maxhp;
		}
		messageBox.innerHTML = addMessage("Restored 20 HP!");
		break;
	case "antidote":
		messageBox.innerHTML = addMessage("Healed from poison.");
		break;
	case "bronze_sword":
		player.weapon = "bronze_sword";
		updateStats();
		addMessage("Equipped Bronze Sword.");
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
	switch(player["weapon"]){
	case "bronze_sword":
		player.atk = player.batk + 5;
		break;
	default:
		player.atk = player.batk;
		break;
	}
}

function calculate_def_stat(){
	switch(player["shield"]) {
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
		player.exp += enemy.exp;
		addMessage(player.name + " gained " + String(enemy.exp) + " experience points!");
		addMessage(player.name + " got " + String(enemy.gold) + " gold!");
		player.gold += enemy.gold;
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

function openInventory(){
	document.getElementById("rightmenutext").innerText = "Inventory";
	document.getElementById("shop").style.display = "none"
	document.getElementById("inventory-items").style.display = "block";
}

function openShop(){
	document.getElementById("rightmenutext").innerText = "Shop";
	document.getElementById("inventory-items").style.display = "none";
	document.getElementById("shop").style.display = "block"
}

function buyItem(item){
	var index_shop = shop.items.indexOf(item.id);
	var index_inv = player.inventory.indexOf(item.id);
	var cost = shop.cost[index_shop];
	if (player.gold >= cost){
		if (index_inv == -1){
			player.inventory.push(item.id);
			player.quantity.push(1);
		}
		else {
			player.quantity[index_inv] += 1;
		} 
		player.gold -= cost;
		if (item.id == "bronze_sword"){
			shop.items.splice(index_shop, 1);
			shop.cost.splice(index_shop, 1);
		}
	}
	else {
		addMessage("You don't have enough money!");
	}
	updatePlayer();

}