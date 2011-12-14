importPackage(Packages.org.bukkit.event);
importPackage(Packages.org.bukkit);
importPackage(Packages.java.util.logging);
importPackage(Packages.java.lang);
importPackage(Packages.ru.tehkode.permissions.bukkit);

TRIGGER = "iliketurtles";
FROM_RANK = "Guest";
TO_RANK = "Default";

SCRIPT_PDF = {
    "name" : "PEXGreylist",
    "version" : "1",
    };


function onEnable() {
    helper.registerEvent(Event.Type.PLAYER_CHAT, Event.Priority.Lowest, "onChat");
}

function onDisable() {}

function onChat(type, ea)
{
    if(ea.getMessage() == TRIGGER)
    {
        try {
            var pman = server.getPluginManager().getPlugin("PermissionsEx").getPermissionManager();
            var puser = pman.getUser(ea.getPlayer());
            if(puser.inGroup(pman.getGroup(FROM_RANK), false)) {
                var groupArray = java.lang.reflect.Array.newInstance(pman.getGroup(FROM_RANK).getClass(), 1);
                groupArray[0] = pman.getGroup(TO_RANK);
                puser.setGroups(groupArray);
                ea.getPlayer().sendMessage("[\u00A77Greylist\u00A7f] Successfully greylisted; you are now in group \u00A74" + TO_RANK + "\u00A7f.");
                ea.setCancelled(true);
            }
        } catch(e) {
            helper.log(Level.WARNING, "Failed to greylist user: " + e.rhinoException);
        }
    }
}
