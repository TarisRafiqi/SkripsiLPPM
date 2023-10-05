module.exports = `<script>
let socketUrl="ws://localhost:65535";
let wss = new WebSocket(socketUrl);
wss.onclose = () => {
   let start = () => {
      wss = new WebSocket(socketUrl);
      wss.onerror = () => setTimeout(start, 3000);
      wss.onopen = () => location.reload();
   };
   start();
};
wss.onmessage = e => location.reload() 
</script> `;
