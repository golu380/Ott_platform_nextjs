// pages/api/hello.js

export default function handler(req, res) {
    console.log(`Received ${req.method} request`);

    if (req.method === 'GET') {
        // Handle GET request
        res.status(200).json({
            status: 'success',
            message: 'Hello, World!'
        });
    } else {
        // Respond with 405 Method Not Allowed for other methods
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
