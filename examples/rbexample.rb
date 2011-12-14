# Ruby example script, by Myers Carpenter of Bukkit forums.

require 'java'

SCRIPT_PDF = {
    "name" => "rbexample", # SHOULD BE THE SCRIPT FILENAME WITHOUT EXTENSION. Or things may break.
    "version" => "3",
    "commands" => {
            "rbes" => { "description" => "rbexample Example Command", "usage" => "/<command>" }
        }
    }
HELPER_VARIABLE_NAME = "helper"
PLUGIN_VARIABLE_NAME = "plugin"
SERVER_VARIABLE_NAME = "server"

Event = org.bukkit.event.Event
Level = java.util.logging.Level

def onEnable()
  $helper.log(Level::INFO, "rbexample loaded!")
  $helper.registerEvent(Event::Type::PLAYER_JOIN, Event::Priority::Lowest, "onPlayerJoin")
end

def onDisable()
  $helper.log(Level::INFO, "rbexample unloaded!")
end

def onCommand(sender, command, label, args)
  if label.downcase() == "rbes"
    sender.sendMessage("You called /rbes.")
  end
  return True
end

def onPlayerJoin(type, args)
  args.getPlayer().sendMessage("rbexample says hi, " + args.getPlayer().getName())
end