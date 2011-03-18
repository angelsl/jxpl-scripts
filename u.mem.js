importPackage(org.bukkit.event);
importPackage(java.lang);
importPackage(java.text);
importPackage(java.math);
scriptName = "SL.Utility.Memory";
scriptVersion = "1";

function onEnable() {
    helper.registerEvent(Event.Type.PLAYER_COMMAND, Event.Priority.Normal, "onCommand");
}

function onDisable() { }

function onCommand(type, args) {
    var split = args.getMessage().split(" ");
    var p = args.getPlayer();
    
    if(split[0].equals("/u.mem")) {
        var maxMem = Runtime.getRuntime().totalMemory();
        var memUsed = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
        p.sendMessage("Memory used: " + getHumanReadable(memUsed) + " / " + getHumanReadable(maxMem) + " / " + getHumanReadable(Runtime.getRuntime().maxMemory()));
        p.sendMessage("Players online: " + server.getOnlinePlayers().length);
    }
}

var formatter = new DecimalFormat();
formatter.setMaximumFractionDigits(3);
formatter.setMinimumFractionDigits(1);
formatter.setMaximumIntegerDigits(310);
formatter.setMinimumIntegerDigits(1);
formatter.setRoundingMode(RoundingMode.HALF_UP);
formatter.setGroupingSize(3);

var units = [" B", " KB", " MB", " GB", " TB"];

function getHumanReadable(bytes) {
    
    var fBytes = bytes;
    var unitIndx = 0;
    
    while (unitIndx + 1 < units.length && fBytes >= 1024) {
        ++unitIndx;
        fBytes /= 1024;
    }
    
    return formatter.format(fBytes) + units[unitIndx];
}