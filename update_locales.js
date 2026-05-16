const fs = require('fs');
const path = require('path');

const locales = ['en', 'ar', 'fr', 'es'];
const messagesDir = path.join(__dirname, 'messages');

locales.forEach(locale => {
    const filePath = path.join(messagesDir, `${locale}.json`);
    let content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);

    // Update Navbar menu
    if (data.Navbar && data.Navbar.menu) {
        data.Navbar.menu.webinars = locale === 'ar' ? 'الندوات عبر الإنترنت' :
                                    locale === 'fr' ? 'Webinaires' :
                                    locale === 'es' ? 'Seminarios web' :
                                    'Webinars';
    }

    // Add WebinarsPage
    if (!data.WebinarsPage) {
        data.WebinarsPage = {
            subtitle: locale === 'ar' ? 'أرشيف الوسائط' : locale === 'fr' ? 'ARCHIVE MÉDIA' : locale === 'es' ? 'ARCHIVO DE MEDIOS' : 'MEDIA ARCHIVE',
            title: locale === 'ar' ? 'الندوات عبر الإنترنت' : locale === 'fr' ? 'WEBINAIRES' : locale === 'es' ? 'SEMINARIOS WEB' : 'WEBINARS',
            description: locale === 'ar' ? 'شاهد أحدث الندوات عبر الإنترنت والتغطية الخاصة بنا.' : locale === 'fr' ? 'Regardez nos derniers webinaires et notre couverture.' : locale === 'es' ? 'Mire nuestros últimos seminarios web y cobertura.' : 'Watch our latest webinars, interviews, and deep dives.',
            submitTitle: locale === 'ar' ? 'أرسل ندوتك' : locale === 'fr' ? 'Soumettre votre webinaire' : locale === 'es' ? 'Envía tu seminario web' : 'Submit Your Webinar',
            submitDesc: locale === 'ar' ? 'شارك ندوتك مع هيئة التحرير لدينا للمراجعة.' : locale === 'fr' ? 'Partagez votre webinaire avec notre comité de rédaction pour examen.' : locale === 'es' ? 'Comparte tu seminario web con nuestro consejo editorial para su revisión.' : 'Share your webinar content with our editorial board for review.'
        };
    }

    // Add SubmitWebinarPage (copy from SubmitVideoPage, adjust accordingly)
    if (!data.SubmitWebinarPage) {
        // Deep copy SubmitVideoPage or use fallback text
        let base = data.SubmitVideoPage || {};
        data.SubmitWebinarPage = JSON.parse(JSON.stringify(base).replace(/Video/g, 'Webinar').replace(/video/g, 'webinar').replace(/فيديو/g, 'ندوة').replace(/vidéo/g, 'webinaire'));
        data.SubmitWebinarPage.title = locale === 'ar' ? 'أرسل ندوتك' : locale === 'fr' ? 'SOUMETTRE VOTRE WEBINAIRE' : locale === 'es' ? 'ENVÍA TU SEMINARIO WEB' : 'SUBMIT YOUR WEBINAR';
        data.SubmitWebinarPage.backToArticles = locale === 'ar' ? 'العودة إلى الندوات' : locale === 'fr' ? 'Retour aux webinaires' : locale === 'es' ? 'Volver a seminarios web' : 'Back to Webinars';
        
        // Fix form specific labels
        if (data.SubmitWebinarPage.form) {
            data.SubmitWebinarPage.form.titleLabel = locale === 'ar' ? 'عنوان الندوة' : locale === 'fr' ? 'Titre du webinaire' : locale === 'es' ? 'Título del seminario web' : 'Webinar Title';
            data.SubmitWebinarPage.form.titlePlaceholder = locale === 'ar' ? 'أدخل عنواناً للندوة' : locale === 'fr' ? 'Entrez un titre pour votre webinaire' : locale === 'es' ? 'Ingresa un título para tu seminario web' : 'Enter a title for your webinar';
            data.SubmitWebinarPage.form.contentLabel = locale === 'ar' ? 'وصف الندوة' : locale === 'fr' ? 'Description du webinaire' : locale === 'es' ? 'Descripción del seminario web' : 'Webinar Description';
            data.SubmitWebinarPage.form.imageLabel = locale === 'ar' ? 'صورة الغلاف (اختياري)' : locale === 'fr' ? 'Miniature/Couverture du webinaire (Optionnel)' : locale === 'es' ? 'Miniatura/Portada del seminario web (Opcional)' : 'Webinar Thumbnail/Cover (Optional)';
            data.SubmitWebinarPage.form.urlLabel = locale === 'ar' ? 'رابط الندوة' : locale === 'fr' ? 'URL du webinaire' : locale === 'es' ? 'URL del seminario web' : 'Webinar URL';
            data.SubmitWebinarPage.form.urlPlaceholder = locale === 'ar' ? 'أدخل رابط الندوة' : locale === 'fr' ? 'Entrez le lien vers votre webinaire' : locale === 'es' ? 'Ingresa el enlace a tu seminario web' : 'Enter the link to your webinar';
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
});

console.log('Locales updated successfully!');
