const http = require('http');

const port = process.env.PORT || 2000;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://sigmentium.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    async function GetBase(game) {
        const response = await fetch('https://sigmentium-777-default-rtdb.europe-west1.firebasedatabase.app/Data.json');
        const data = await response.json();

        if (!data) return [];

        const List = Object.entries(data).map(([id, player]) => {
            const WinsArray = player?.Victories?.[game] ?? [];
            const TotalWins = WinsArray.reduce((a, b) => a + b, 0);

            return {
                id,
                Name: player.Name,
                Victories: TotalWins
            };
        });

        return List.slice(0, 100);
    }

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/YouSkuff/TsuEFa') {
        const Top = GetBase('TsuEFa');

        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(Top));
        return;
    }
});

server.listen(port, '0.0.0.0', () => {
    console.log('> Successful start');
});