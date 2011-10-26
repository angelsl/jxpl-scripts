importPackage(org.bukkit.event);
importPackage(java.lang);
importPackage(java.text);
importPackage(java.math);

SCRIPT_PDF = {
    "name" : "jxpl.command",
    "version" : "2",
    "commands" : {
            "jxpl" : { "description" : "Check free memory", "usage" : "/<command> <reload/load> <script filename>", "permission" : "jxpl.command" }
        }
    };

function onEnable() {}

function onDisable() {}

function onCommand(p, command, cl, args)
{
    switch(cl.toLowerCase())
    {
        case "jxpl":
            if(args.length < 2) { p.sendMessage("Usage: /jxpl <reload/load> <script filename>"); break; }
            switch (args[0].toLowerCase())
            {
                case "reload":
                    var toReload = server.getPluginManager().getPlugin(args[1]);
                    if(toReload != null && toReload instanceof org.angelsl.bukkit.jxpl.ScriptPlugin) {
                        toReload.reloadScript();
                        p.sendMessage("Script reloaded.");
                    } else {
                        p.sendMessage("Could not find the specified plugin, or it is not a jxpl ScriptPlugin.");
                    }
                    break;
                case "load":
                    // TODO
                    break;
            }
    }
    return true;
}