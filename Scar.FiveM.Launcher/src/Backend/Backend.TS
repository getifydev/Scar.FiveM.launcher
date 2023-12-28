// Import necessary classes from the FiveM API
import { on, emit, resource } from 'fivem-js';

// Define a basic map class
class GameMap {
  constructor(public name: string, public description: string) {}
}

// Store the current map in a variable
let currentMap: GameMap | null = null;

// Define an array to store available maps
const maps: GameMap[] = [
  new GameMap('Map1', 'Description for Map1'),
  new GameMap('Map2', 'Description for Map2'),
  // Add more maps as needed
];

// Event handler for player connecting
on('playerConnecting', (name: string, setKickReason: Function, deferrals: any) => {
  // Perform authentication logic here (not implemented in this example)

  // Approve the connection
  deferrals.defer();

  // Simulate an asynchronous task (replace this with your actual async task)
  setTimeout(() => {
    deferrals.done();
  }, 0);
});

// Event handler for player connected
on('playerConnected', (playerId: number, playerName: string) => {
  // Trigger a custom event to send the available maps to the player
  emitNet('server:sendMaps', playerId, maps);

  // If a map is set, inform the player about the current map
  if (currentMap) {
    emitNet('server:announceMap', playerId, currentMap.name, currentMap.description);
  }

  console.log(`Player ${playerName} connected.`);
});

// Event handler for player disconnecting
on('playerDropped', (reason: string) => {
  console.log(`Player disconnected. Reason: ${reason}`);
});

// Command handler for changing the map
on('command:changeMap', (source: number, mapName: string) => {
  // Find the selected map by name
  const selectedMap = maps.find((map) => map.name === mapName);

  if (selectedMap) {
    // Set the current map
    currentMap = selectedMap;

    // Announce the map change to all players
    emitNet('server:announceMap', -1, currentMap.name, currentMap.description);

    console.log(`Map changed to ${currentMap.name}`);
  } else {
    console.log(`Map not found: ${mapName}`);
  }
});

// API endpoint for getting the current map
resource('api').get('/map', (req: any, res: any) => {
  if (currentMap) {
    res.send({ map: currentMap });
  } else {
    res.status(404).send({ error: 'Map not found' });
  }
});
    