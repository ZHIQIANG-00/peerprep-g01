import http from "http";
import index from "./index.js";
import "dotenv/config";
import MatchSyncSocketController from "./controller/match-sync-socket-controller.js"

const port = process.env.PORT || 3003;

const server = http.createServer(index);

try{
  server.listen(port);
  console.log("Matching service server listening on http://localhost:" + port);
  MatchSyncSocketController.initializeSocket(server);
}

catch(err){
  console.error("Failed to connect to DB");
  console.error(err);
}
                        

