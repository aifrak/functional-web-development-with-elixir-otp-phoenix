// We import the CSS which is extracted to its own file by esbuild.
// Remove this line if you add a your own CSS build pipeline (e.g postcss).
// Establish Phoenix Socket and LiveView configuration.
import { Socket } from "phoenix"
// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"
// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//
// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
import { LiveSocket } from "phoenix_live_view"
import "../css/app.css"
import topbar from "../vendor/topbar"
import { add_player, guess_coordinate, join, leave, new_channel, new_game, position_island, say_hello, set_islands, socket } from "./chapter7_channel.js"


let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, { params: { _csrf_token: csrfToken } })

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" })
window.addEventListener("phx:page-loading-start", info => topbar.show())
window.addEventListener("phx:page-loading-stop", info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket

// ONLY TO TEST DIRECTLY FROM THE BROWSER
window.socket = socket
window.new_channel = new_channel
window.join = join
window.leave = leave
window.say_hello = say_hello
window.new_game = new_game
window.add_player = add_player
window.position_island = position_island
window.set_islands = set_islands
window.guess_coordinate = guess_coordinate