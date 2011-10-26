importPackage(org.bukkit.event);
importPackage(java.lang);
importPackage(java.io);
SCRIPT_PDF = {
    "name" : "jxpl.command",
    "version" : "2",
    "commands" : {
            "jxpl" : { "description" : "Check free memory", "usage" : "/<command> <reload/load> <script filename>", "permission" : "jxpl.command" }
        },
    "permissions" : {
            "jxpl.command" : { "description" : "Allows access to /jxpl" }
        }
    };

function onEnable() {}

function onDisable() {}

function onCommand(p, command, cl, args)
{
    if(args.length < 2) { p.sendMessage("Usage: /jxpl [reload script_name]/[load filename]"); return; }
    var argslower = args[0].toLowerCase();
    if(argslower == "reload") {
        var toReload = server.getPluginManager().getPlugin(args[1]);
        if(toReload != null && toReload instanceof org.angelsl.bukkit.jxpl.ScriptPlugin) {
            toReload.reloadScript();
            p.sendMessage("Script reloaded.");
        } else {
            p.sendMessage("Could not find the specified plugin, or it is not a jxpl ScriptPlugin.");
        }
    } else if(argslower == "load") {
        var scriptsDir = server.getPluginManager().getPlugin("jxpl").getConfig().getString("scripts-dir", "scripts");
        var plugin = new File(scriptsDir + "/" + args[1]);
        if(plugin.exists()) {
            server.getPluginManager().loadPlugin(plugin);
            p.sendMessage("Script loaded.");
        } else {
            p.sendMessage("Could not find the specified script.");
        } 
    } else {
        p.sendMessage("Usage: /jxpl [reload script_name]/[load filename]");
    }
return true;
}