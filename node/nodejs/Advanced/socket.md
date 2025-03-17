## socket.io 主要特点

1. **跨平台支持**: Socket.IO 可以在多个平台上使用，包括浏览器、服务器和移动设备等。它提供了对多种编程语言和框架的支持，如 JavaScript、Node.js、Python、Java 等，使得开发者可以在不同的环境中构建实时应用程序。
2. **容错性**: Socket.IO 具有容错能力，当 WebSocket 连接不可用时，它可以自动降级到其他传输机制，如 HTTP 长轮询。这意味着即使在不支持 WebSocket 的环境中，Socket.IO 仍然可以实现实时通信。

nodejs 安装

```bash
npm install socket.io
```

浏览器使用

```html
<script src="https://cdn.socket.io/4.9.5/socket.io.min.js"></script>
<script>
    const socket = io('http://localhost:3000');
</script>
```





