const fs = require('fs');
const path = require('path');

const projectDir = __dirname;

const linkMap = {
    'href="/disjuntor-desarmando-bh.html"': 'href="/eletricista-24-horas-bh/disjuntor-desarmando-bh.html"',
    'href="/instalacao-chuveiro-bh.html"': 'href="/eletricista-residencial-bh/instalacao-chuveiro-bh.html"',
    'href="/aterramento-eletrico-bh.html"': 'href="/eletricista-residencial-bh/aterramento-eletrico-bh.html"',
    'href="/aumento-de-carga-bh.html"': 'href="/eletricista-comercial-bh/aumento-de-carga-bh.html"',
    'href="/instalacao-padrao-monofasico-bh.html"': 'href="/padrao-cemig-bh/instalacao-padrao-monofasico.html"',
    'href="/instalacao-padrao-bifasico-bh.html"': 'href="/padrao-cemig-bh/instalacao-padrao-bifasico.html"',
    'href="/instalacao-padrao-trifasico-bh.html"': 'href="/padrao-cemig-bh/instalacao-padrao-trifasico.html"',
    'href="/entrada-de-energia-bh.html"': 'href="/padrao-cemig-bh/entrada-de-energia.html"',
    'href="/caixa-de-medicao-bh.html"': 'href="/padrao-cemig-bh/caixa-de-medicao.html"',

    // Fix CSS and JS relative paths to absolute from root
    'href="assets/css/style.css"': 'href="/assets/css/style.css"',
    'src="assets/js/main.js"': 'src="/assets/js/main.js"'
};

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Ignore node_modules, assets, .git etc.
            if (!file.startsWith('.') && file !== 'assets' && file !== 'node_modules') {
                processDirectory(fullPath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            for (const [oldLink, newLink] of Object.entries(linkMap)) {
                if (content.includes(oldLink)) {
                    content = content.split(oldLink).join(newLink);
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated paths in: ${fullPath}`);
            }
        }
    }
}

processDirectory(projectDir);
