const fs = require('fs');
const path = require('path');
const messagesDir = path.join(process.cwd(), 'messages');
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));

const translations = {
  en: 'Explore Event Media',
  ar: 'استكشاف وسائط الحدث',
  fr: 'Explorer les médias de l\'événement',
  es: 'Explorar los medios del evento'
};

files.forEach(file => {
  const lang = file.split('.')[0];
  const filePath = path.join(messagesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.EventsPage) data.EventsPage = {};
  if (!data.EventsPage.hero) data.EventsPage.hero = {};
  
  data.EventsPage.hero.learnMore = translations[lang] || translations.en;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log('Updated ' + file);
});
