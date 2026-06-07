const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public")); // to serve frontend files

app.get("/weather/:city", async (req, res) => {
    try {
        const city = req.params.city;

        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=bf3df55bd7eb48d6a58172104260606&q=${city}&days=7&aqi=yes&alerts=yes`
        );

        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
