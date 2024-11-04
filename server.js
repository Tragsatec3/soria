const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/proxy', createProxyMiddleware({
    target: 'http://mi-servidor-wms.com', // Cambia esto a la URL de tu servidor WMS
    changeOrigin: true,
    pathRewrite: {
        '^/proxy': '', // Elimina el prefijo /proxy de la URL antes de hacer la solicitud
    },
    onProxyRes(proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Permite CORS
    },
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor proxy corriendo en el puerto ${PORT}`);
});
