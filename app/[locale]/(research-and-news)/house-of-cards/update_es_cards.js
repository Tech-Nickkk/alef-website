const fs = require('fs');
const path = require('path');

const esCards = {
    "michel-aoun": {
        "name": "Michel Aoun",
        "tag": "ALIANZAS SECTARIAS Y COLAPSO",
        "stamp": "EL FACILITADOR",
        "role": "Ex Presidente del Líbano",
        "summary": "Ex Comandante del Ejército y Líder de Facción en la Guerra Civil. Investigaciones judiciales y mediáticas indican que toleró la corrupción generalizada entre sus leales y desvió la culpa de los escándalos mientras su familia enfrentaba alegaciones de corrupción. La presidencia de Aoun terminó en medio de la ruina económica, el estancamiento político e investigaciones continuas sobre malversación estatal y el desastre del puerto de Beirut.",
        "quote": "Comercializado como un 'hombre fuerte' reformista, Aoun dejó atrás una nación dividida e instituciones fallidas.",
        "sections": [
            {
                "title": "ACUSACIONES DE CORRUPCIÓN GENERALIZADA",
                "content": [
                    "Presuntamente desvió fondos públicos al extranjero a través de cuentas familiares desde la década de 1980, ahora sujeto a investigaciones judiciales.",
                    "Su yerno Gebran Bassil, figura sancionada por EE. UU., aprovechó el patrocinio político de Aoun para dominar ministerios, acusado de enriquecimiento ilícito.",
                    "Acusado de proteger la corrupción criminal entre leales y asegurar la lealtad sectaria."
                ]
            },
            {
                "title": "ALIANZA CON HEZBOLLAH Y OBSTRUCCIÓN POLÍTICA",
                "content": [
                    "Alineado con Hezbollah durante su presidencia, facilitando su dominio político y militar; bloqueó acciones judiciales contra Hezbollah.",
                    "El Movimiento Patriótico Libre, su facción política, implicado en proteger las actividades económicas ilícitas de Hezbollah."
                ]
            },
            {
                "title": "PROMESAS TRAICIONADAS Y ALIANZAS EXTRANJERAS",
                "content": [
                    "Su alianza con Hezbollah y apoyo al régimen de Assad aislaron al Líbano, afianzando la influencia de Irán y aislando al Líbano de socios occidentales y del Golfo críticos.",
                    "Apoyó al régimen de Assad en la guerra civil de Siria, dañando aún más la reputación internacional del Líbano y ahuyentando la inversión.",
                    "Protestas masivas en 2019 culparon a Aoun y sus reversiones políticas por hundir al Líbano en una pobreza récord, desigualdad y colapso de infraestructura."
                ]
            },
            {
                "title": "LEGADO DE CRISIS Y PARÁLISIS",
                "content": [
                    "Supervisó el colapso económico del Líbano y la explosión del puerto de Beirut.",
                    "Dejó un estado fracturado con inestabilidad económica y política continua.",
                    "Múltiples investigaciones en curso por corrupción y negligencia."
                ]
            }
        ]
    },
    "naim-qassem": {
        "name": "Naim Qassem",
        "tag": "ESTRATEGA DEL TERROR Y JEFE DE LOS PODERES IRANÍES",
        "stamp": "EL APODERADO",
        "role": "Secretario General de Hezbollah",
        "summary": "Ex Vicesecretario General (1991-2024). Líder terrorista designado por EE. UU. y jefe estratégico de Hezbollah, Qassem es conocido por fusionar el mando militante y las amenazas públicas contra el desarme libanés. Como sucesor de Nasrallah, profundiza el alcance de Irán, rechaza el compromiso y amenaza abiertamente con una guerra civil mientras apunta a los intereses de EE. UU. e Israel.",
        "quote": "Bajo la orden de Irán, Qassem sacrifica el futuro del Líbano por las armas de Hezbollah.",
        "sections": [
            {
                "title": "CEREBRO MILITAR-CLERICAL",
                "content": [
                    "Cofundó Hezbollah en 1982 tras la invasión israelí; se convirtió en el estratega más influyente.",
                    "Supervisó campañas electorales, redes de financiamiento iraníes y política operativa.",
                    "Fusionó esferas militantes y políticas para bloquear el desarme y las reformas.",
                    "Rechaza cualquier separación entre el ala política y el ala armada de Hezbollah."
                ]
            },
            {
                "title": "AMENAZAS TERRORISTAS DESIGNADAS Y SANCIONES",
                "content": [
                    "Sancionado por el Tesoro de EE. UU. como Terrorista Global Especialmente Designado (SDGT).",
                    "Vinculado por la inteligencia de EE. UU. al apoyo de ataques que mataron a cientos de estadounidenses, incluido el bombardeo de los cuarteles de los Marines en Beirut en 1983."
                ]
            },
            {
                "title": "REDES REGIONALES E INFLUENCIA IRANÍ",
                "content": [
                    "Actúa como el conducto clave de Teherán, cediendo ante el Líder Supremo iraní en decisiones del consejo estratégico.",
                    "Aumentó la alineación de Hezbollah con la Fuerza Qods del IRGC iraní, extendiendo amenazas por poder contra Israel, Arabia Saudita y activos de EE. UU.",
                    "Se trasladó a Teherán a finales de 2024 tras asesinatos de líderes, cimentando tanto su lealtad como su inmunidad bajo protección iraní."
                ]
            },
            {
                "title": "POLÍTICA DE EE. UU. Y CRISIS DEL LÍBANO",
                "content": [
                    "Las amenazas abiertas de Qassem ('no hay vida en el Líbano' si Hezbollah es desarmado) se ven como advertencias veladas de guerra civil.",
                    "Obstruye los esfuerzos de la ONU y EE. UU. para hacer cumplir la Resolución 1701 y aislar a los poderes iraníes.",
                    "Orquesta propaganda, evasión de sanciones y recaudación de fondos global, con el DOJ/OFAC apuntando a sus estructuras de apoyo.",
                    "Las agencias de EE. UU. lo conectan con el lavado de dinero organizacional y el narcofinanciamiento en todo el mundo."
                ]
            }
        ]
    }
};

const updateSpanishTranslation = () => {
    const filePath = path.join(process.cwd(), 'messages/es.json');
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    Object.keys(esCards).forEach(key => {
        if (content.HouseOfCardsPage.cards[key]) {
             content.HouseOfCardsPage.cards[key] = esCards[key];
        }
    });

    fs.writeFileSync(filePath, JSON.stringify(content, null, 4), 'utf8');
    console.log("Spanish translations updated.");
};

updateSpanishTranslation();
