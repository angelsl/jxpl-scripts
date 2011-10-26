importPackage(org.bukkit.event);
importPackage(java.lang);
importPackage(java.text);
importPackage(java.math);
SCRIPT_NAME = "jxpl.command";
SCRIPT_VERSION = "1";

function onEnable() {
    helper.registerEvent(Event.Type.PLAYER_COMMAND_PREPROCESS, Event.Priority.Normal, "onCommand");
}

function onDisable() { }

function onCommand(type, args) {
    var split = args.getMessage().split(" ");
    var p = args.getPlayer();
    
    if(split[0].equals("/jxpl")) {
        if(split.length < 3) {
            p.sendMessage("Usage: /jxpl <reload/load> <script filename>");
            return;
        }
        if(split[1].equals("reload")) {
            var toReload = server.getPluginManager().getPlugin(split[2]);
            if(toReload != null && toReload instanceof org.angelsl.bukkit.jxpl.ScriptPlugin) {
                toReload.reloadScript();
            } else {
                p.sendMessage("Could not find the specified plugin, or it is not a jxpl ScriptPlugin.");
            }
            return;
        } else if(split[1].equals("load")) {
            // TODO
        }
    }
}