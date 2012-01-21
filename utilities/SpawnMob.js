importPackage(org.bukkit.entity);
importPackage(java.lang);
SCRIPT_PDF = {
    "name" : "SpawnMob",
    "version" : "1",
    "commands" : {
            "spawnmob" : { "description" : "Spawns a monster. Monster names are case-sensitive!", "usage" : "/<command> <monster>", "permission" : "spawnmob.command" },
            "command2" : { "descrption" : "Another command", "usage" : "/<command>" }
        },
    "permissions" : {
            "spawnmob.command" : { "description" : "Allows access to /spawnmob" }
        }
    };

function onEnable() {}

function onDisable() {}

function onCommand(p, command, cl, args)
{
    command = command.getName().toLowerCase();
    if(command == "spawnmob") {
        if(args.length < 1) { p.sendMessage("Usage: /spawnmob <monster>"); return true; }
        var cType = CreatureType.fromName(args[0]);
        p.getWorld().spawnCreature(p.getLocation(), cType);
        p.sendMessage("Spawned one " + cType);
        return true;
    } else if(command == "command2") {
        p.sendMessage("You called /command2.");
        return true;
    } else return false;
}