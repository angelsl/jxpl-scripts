importPackage(org.bukkit.event);
importPackage(java.util.logging);

// config: disable in worlds
WORLDS_AFFECTED = ["PwnCreative"];

importPackage(org.bukkit.event);
importPackage(java.lang);
importPackage(java.text);
importPackage(java.math);
SCRIPT_PDF = {
    "name" : "NoItems",
    "version" : "1",
    };


function onEnable() {
    helper.registerEvent(Event.Type.ITEM_SPAWN, Event.Priority.Monitor, "onItemSpawn");
    for(var i = 0; i < WORLDS_AFFECTED.length; i++) 
        WORLDS_AFFECTED[i] = WORLDS_AFFECTED[i].toLowerCase();
}

function onDisable() {}

function onItemSpawn(type, eventArgs)
{
    for(var i = 0; i < WORLDS_AFFECTED.length; i++) 
        if(WORLDS_AFFECTED[i] == eventArgs.getLocation().getWorld().getName().toLowerCase())
            eventArgs.setCancelled(true);
}
