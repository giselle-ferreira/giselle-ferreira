const fetch = require('node-fetch');
const fs = require('fs');

async function updateReadme() {
  const devToUsername = 'giselletech'; 
  const devToApiToken = secrets.DEVTO_TOKEN;

  const response = await fetch(`https://dev.to/api/articles?username=${devToUsername}`, {
    headers: {
      'api-key': devToApiToken
    }
  });

  if (!response.ok) {
    console.error('Erro ao buscar artigos do Dev.to:', response.statusText);
    return;
  }

  const articles = await response.json();

  // Lê o conteúdo atual do README.md
  const readmeContent = fs.readFileSync('README.md', 'utf8');

  // Encontra a posição dos marcadores
  const startMarker = '<!-- START_DEVTO_ARTICLES -->';
  const endMarker = '<!-- END_DEVTO_ARTICLES -->';
  const startIndex = readmeContent.indexOf(startMarker);
  const endIndex = readmeContent.indexOf(endMarker);

  if (startIndex !== -1 && endIndex !== -1) {
    // Atualiza a parte entre os marcadores com a lista de artigos
    const updatedContent = readmeContent.substring(0, startIndex + startMarker.length) +
      articles.map(article => `- [${article.title}](${article.url})`).join('\n') +
      readmeContent.substring(endIndex);

    // Escreve o conteúdo atualizado de volta no README.md
    fs.writeFileSync('README.md', updatedContent);
  }
}

updateReadme();
