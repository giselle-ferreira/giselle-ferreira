const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs/promises");

async function updateReadme() {
  const response = await axios.get("https://dev.to/giselletech");
  const $ = cheerio.load(response.data);

  const articles = [];
  $(".single-article").each((_, element) => {
    const title = $(element).find(".title").text().trim();
    const url = $(element).find("a").attr("href");
    articles.push(`- [${title}](${url})`);
  });

  const readmeContent = `# Meus Artigos no Dev.to\n\n${articles.join("\n")}`;
  await fs.writeFile("README.md", readmeContent);
}

updateReadme();
