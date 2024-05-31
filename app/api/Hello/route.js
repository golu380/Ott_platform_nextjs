// pages/api/hello.js

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Handle GET request
        res.status(200).json({
            status: 'success',
            message: 'Hello, World!'
        });
    } else {
        // Handle other methods or send a 405 Method Not Allowed response
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
