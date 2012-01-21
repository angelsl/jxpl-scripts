from org.bukkit.event import EventPriority
from java.util.logging import Level
from org.bukkit.event.player import PlayerJoinEvent

SCRIPT_PDF = {
    "name" : "pyexample", # SHOULD BE THE SCRIPT FILENAME WITHOUT EXTENSION. Or things may break.
    "version" : "3",
    "commands" : {
            "pyes" : { "description" : "pyexample Example Command", "usage" : "/<command>" }
        }
    }
HELPER_VARIABLE_NAME = "helper"
PLUGIN_VARIABLE_NAME = "plugin"
SERVER_VARIABLE_NAME = "server"

def onEnable():
    helper.log(Level.INFO, "pyexample loaded!")
    helper.registerEvent(PlayerJoinEvent, EventPriority.LOWEST, "onPlayerJoin")

def onDisable():
    helper.log(Level.INFO, "pyexample unloaded!")

def onPlayerJoin(args):
    args.getPlayer().sendMessage("pyexample says hi, " + args.getPlayer().getName())
    
def onCommand(sender, command, label, args):
    if label.lower() == "pyes":
        sender.sendMessage("You called /pyes.")
    return True


   