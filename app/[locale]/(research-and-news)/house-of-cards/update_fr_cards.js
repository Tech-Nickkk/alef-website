const fs = require('fs');
const path = require('path');

const frCards = {
    "michel-aoun": {
        "name": "Michel Aoun",
        "tag": "ALLIANCES SECTAIRES ET EFFONDREMENT",
        "stamp": "LE FACILITATEUR",
        "role": "Ancien Président du Liban",
        "summary": "Ancien commandant de l'armée et chef de faction de la guerre civile. Des enquêtes judiciaires et médiatiques indiquent qu'il a toléré une corruption généralisée parmi ses loyalistes et détourné le blâme des scandales tandis que sa famille faisait face à des allégations de corruption. La présidence d'Aoun s'est terminée au milieu de la ruine économique, de l'impasse politique et d'enquêtes continues sur le détournement de fonds publics et la catastrophe du port de Beyrouth.",
        "quote": "Présenté comme un 'homme fort' réformiste, Aoun a laissé derrière lui une nation divisée et des institutions défaillantes.",
        "sections": [
            {
                "title": "ACCUSATIONS DE CORRUPTION GÉNÉRALISÉE",
                "content": [
                    "Soupçonné d'avoir détourné des fonds publics à l'étranger via des comptes familiaux depuis les années 1980, faisant maintenant l'objet d'enquêtes judiciaires.",
                    "Son gendre Gebran Bassil, sanctionné par les États-Unis, a profité du patronage politique d'Aoun pour dominer les ministères, accusé d'enrichissement illicite.",
                    "Accusé de protéger la corruption criminelle parmi ses loyalistes et d'assurer une loyauté sectaire."
                ]
            },
            {
                "title": "ALLIANCE AVEC LE HEZBOLLAH ET OBSTRUCTION POLITIQUE",
                "content": [
                    "Aligné avec le Hezbollah durant sa présidence, facilitant sa domination politique et militaire ; a bloqué les actions judiciaires contre le Hezbollah.",
                    "Le Courant Patriotique Libre, sa faction politique, est impliqué dans la protection des activités économiques illicites du Hezbollah."
                ]
            },
            {
                "title": "PROMESSES TRAHIES ET ALLIANCES ÉTRANGÈRES",
                "content": [
                    "Son alliance avec le Hezbollah et son soutien au régime Assad ont isolé le Liban, renforçant l'influence de l'Iran et isolant le Liban de ses partenaires occidentaux et du Golfe critiques.",
                    "A soutenu le régime Assad dans la guerre civile syrienne, nuisant davantage à la réputation internationale du Liban et faisant fuir les investissements.",
                    "Les manifestations massives de 2019 ont blâmé Aoun et ses revirements politiques pour avoir plongé le Liban dans une pauvreté record, l'inégalité et l'effondrement des infrastructures."
                ]
            },
            {
                "title": "HÉRITAGE DE CRISE ET DE PARALYSIE",
                "content": [
                    "A supervisé l'effondrement économique du Liban et l'explosion du port de Beyrouth.",
                    "A laissé un État fracturé avec une instabilité économique et politique continue.",
                    "Multiples enquêtes en cours pour corruption et négligence."
                ]
            }
        ]
    },
    "naim-qassem": {
        "name": "Naim Qassem",
        "tag": "STRATÈGE DE LA TERREUR & CHEF DES PROXIES IRANIENS",
        "stamp": "LE MANDATAIRE",
        "role": "Secrétaire Général du Hezbollah",
        "summary": "Ancien Secrétaire Général adjoint (1991-2024). Chef terroriste désigné par les États-Unis et chef stratégique du Hezbollah, Qassem est connu pour fusionner le commandement militaire et les menaces publiques contre le désarmement libanais. En tant que successeur de Nasrallah, il approfondit la portée de l'Iran, rejette tout compromis et menace ouvertement de guerre civile tout en ciblant les intérêts américains et israéliens.",
        "quote": "Sur ordre de l'Iran, Qassem sacrifie l'avenir du Liban pour les armes du Hezbollah.",
        "sections": [
            {
                "title": "CERVEAU MILITARO-CLÉRICAL",
                "content": [
                    "A cofondé le Hezbollah en 1982 après l'invasion israélienne ; est devenu le stratège le plus influent.",
                    "A supervisé les campagnes électorales, les réseaux de financement iraniens et la politique opérationnelle.",
                    "A fusionné les sphères militante et politique pour bloquer le désarmement et les réformes.",
                    "Rejette toute séparation entre l'aile politique et l'aile armée du Hezbollah."
                ]
            },
            {
                "title": "MENACES TERRORISTES DÉSIGNÉES ET SANCTIONS",
                "content": [
                    "Sanctionné par le Trésor américain en tant que Terroriste Mondial Spécialement Désigné (SDGT).",
                    "Lié par les services de renseignement américains au soutien d'attaques ayant tué des centaines d'Américains, y compris l'attentat contre les casernes des Marines à Beyrouth en 1983."
                ]
            },
            {
                "title": "RÉSEAUX RÉGIONAUX ET INFLUENCE IRANIENNE",
                "content": [
                    "Agit comme le principal canal de Téhéran, s'en remettant au Guide Suprême iranien dans les décisions du conseil stratégique.",
                    "A accru l'alignement du Hezbollah avec la Force Qods du CGRI iranien, étendant les menaces par procuration contre Israël, l'Arabie Saoudite et les actifs américains.",
                    "S'est installé à Téhéran fin 2024 après des assassinats de dirigeants, cimentant à la fois sa loyauté et son immunité sous la protection iranienne."
                ]
            },
            {
                "title": "POLITIQUE AMÉRICAINE ET CRISE DU LIBAN",
                "content": [
                    "Les menaces ouvertes de Qassem ('pas de vie au Liban' si le Hezbollah est désarmé) sont vues comme des avertissements voilés de guerre civile.",
                    "Entrave les efforts de l'ONU et des États-Unis pour appliquer la résolution 1701 et isoler les mandataires iraniens.",
                    "Orchestre la propagande, l'évasion des sanctions et la collecte de fonds mondiale, le DOJ/OFAC ciblant ses structures de soutien.",
                    "Les agences américaines le relient au blanchiment d'argent organisationnel et au narco-financement dans le monde entier."
                ]
            }
        ]
    },
    // Adding placeholders for others to ensure function runs
};

const updateFrenchTranslation = () => {
    const filePath = path.join(process.cwd(), 'messages/fr.json');
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    Object.keys(frCards).forEach(key => {
        if (content.HouseOfCardsPage.cards[key]) {
             content.HouseOfCardsPage.cards[key] = frCards[key];
        }
    });

    fs.writeFileSync(filePath, JSON.stringify(content, null, 4), 'utf8');
    console.log("French translations updated.");
};

updateFrenchTranslation();
