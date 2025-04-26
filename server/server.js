const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static assets (CSS, images, JS)
app.use("/static", express.static(path.join(__dirname, "public")));

// ========================
// ROUTES
// ========================

// GET: Generator form
app.get("/generator", (req, res) => {
  res.render("generator");
});

// POST: Handle form and save data
app.post("/generate", (req, res) => {
  const { name, phone, email, address } = req.body;
  const clientSlug = name.toLowerCase().replace(/\s+/g, "-");

  const clientData = {
    name,
    phone,
    email,
    address,
  };

  // Save as JSON (optional but useful)
  const outputPath = path.join(__dirname, "data", `${clientSlug}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(clientData, null, 2));

  // ✅ Inject data into prototype HTML
  const prototypePath = path.join(__dirname, "../frontend/painting-prototype.html");
  let html = fs.readFileSync(prototypePath, "utf-8");

  html = html
    .replace(/{{name}}/g, name)
    .replace(/{{phone}}/g, phone)
    .replace(/{{email}}/g, email)
    .replace(/{{address}}/g, address);

  const outputHtmlPath = path.join(__dirname, "../frontend/demos", `${clientSlug}.html`);
  fs.writeFileSync(outputHtmlPath, html);

  // ✅ Redirect to generated HTML
  res.redirect(`/demos/${clientSlug}.html`);
});

// GET: Client demo page
app.get("/demo/:client", (req, res) => {
  const clientSlug = req.params.client;
  const dataPath = path.join(__dirname, "data", `${clientSlug}.json`);

  if (fs.existsSync(dataPath)) {
    const clientData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    res.render("demo", clientData);
  } else {
    res.status(404).send("Client not found.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
