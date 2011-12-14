from org.bukkit.event import Event
from java.util.logging import Level

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
    helper.registerEvent(Event.Type.PLAYER_JOIN, Event.Priority.Lowest, "onPlayerJoin")

def onDisable():
    helper.log(Level.INFO, "pyexample unloaded!")

def onPlayerJoin(type, args):
    args.getPlayer().sendMessage("pyexample says hi, " + args.getPlayer().getName())
    
def onCommand(sender, command, label, args):
    if label.lower() == "pyes":
        sender.sendMessage("You called /pyes.")
    return True


   