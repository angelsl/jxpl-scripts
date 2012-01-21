importPackage(org.bukkit.event);
importPackage(org.bukkit.event.entity);
importPackage(java.util.logging);
importPackage(java.lang);

// config: disable in worlds
WORLDS_AFFECTED = ["PwnCreative"];

SCRIPT_PDF = {
    "name" : "NoItems",
    "version" : "1",
    };


function onEnable() {
    helper.registerEvent(ItemSpawnEvent, EventPriority.HIGHEST, "onItemSpawn");
    for(var i = 0; i < WORLDS_AFFECTED.length; i++) 
        WORLDS_AFFECTED[i] = WORLDS_AFFECTED[i].toLowerCase();
}

function onDisable() {}

function onItemSpawn(eventArgs)
{
    for(var i = 0; i < WORLDS_AFFECTED.length; i++) 
        if(WORLDS_AFFECTED[i] == eventArgs.getLocation().getWorld().getName().toLowerCase())
            eventArgs.setCancelled(true);
}
