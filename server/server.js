import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve __dirname properly (ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go UP from /server to project root
const rootDir = path.join(__dirname, '..');

// Dummy product data
const products = [
    { id: 1, name: "iPhone 15" },
    { id: 2, name: "Samsung Galaxy S23" },
    { id: 3, name: "MacBook Pro" },
    { id: 4, name: "Dell Laptop" }
];

// Product search API
app.get("/products", (req, res) => {
    const search = (req.query.search || "").toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search)
    );
    res.json(filtered);
});

// Point to React build
const clientBuildPath = path.join(rootDir, 'client', 'dist');

// Serve static files
app.use(express.static(clientBuildPath));

// SPA fallback (fixes / and deep links)
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});