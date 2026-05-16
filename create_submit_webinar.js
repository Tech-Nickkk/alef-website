const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'app', '[locale]', '(media)', 'submit-video', 'page.tsx');
const destDir = path.join(__dirname, 'app', '[locale]', '(media)', 'submit-webinar');
const destPath = path.join(destDir, 'page.tsx');

let content = fs.readFileSync(srcPath, 'utf8');

content = content.replace(/SubmitVideoPage/g, 'SubmitWebinarPage');
content = content.replace(/video/g, 'webinar');
content = content.replace(/Video/g, 'Webinar');
content = content.replace(/videos/g, 'webinars');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

fs.writeFileSync(destPath, content, 'utf8');
console.log('Created submit-webinar/page.tsx');
