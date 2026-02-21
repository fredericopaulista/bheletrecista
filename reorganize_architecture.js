const fs = require('fs');
const path = require('path');

const projectDir = __dirname;

// The directories to create
const dirs = [
    'eletricista-24-horas-bh',
    'eletricista-residencial-bh',
    'eletricista-comercial-bh',
    'padrao-cemig-bh'
];

dirs.forEach(dir => {
    const dirPath = path.join(projectDir, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(`Created directory: ${dir}`);
    }
});

// Map of existing files to their new silo destinations
const moves = [
    // 24H
    { from: 'disjuntor-desarmando-bh.html', to: 'eletricista-24-horas-bh/disjuntor-desarmando-bh.html' },

    // Residencial
    { from: 'instalacao-chuveiro-bh.html', to: 'eletricista-residencial-bh/instalacao-chuveiro-bh.html' },
    { from: 'aterramento-eletrico-bh.html', to: 'eletricista-residencial-bh/aterramento-eletrico-bh.html' },

    // Comercial
    { from: 'aumento-de-carga-bh.html', to: 'eletricista-comercial-bh/aumento-de-carga-bh.html' },

    // CEMIG
    { from: 'instalacao-padrao-monofasico-bh.html', to: 'padrao-cemig-bh/instalacao-padrao-monofasico.html' },
    { from: 'instalacao-padrao-bifasico-bh.html', to: 'padrao-cemig-bh/instalacao-padrao-bifasico.html' },
    { from: 'instalacao-padrao-trifasico-bh.html', to: 'padrao-cemig-bh/instalacao-padrao-trifasico.html' },
    { from: 'entrada-de-energia-bh.html', to: 'padrao-cemig-bh/entrada-de-energia.html' },
    { from: 'caixa-de-medicao-bh.html', to: 'padrao-cemig-bh/caixa-de-medicao.html' }
];

moves.forEach(m => {
    const fromPath = path.join(projectDir, m.from);
    const toPath = path.join(projectDir, m.to);

    if (fs.existsSync(fromPath)) {
        fs.renameSync(fromPath, toPath);
        console.log(`Moved: ${m.from} -> ${m.to}`);
    } else {
        console.log(`Skipped (not found): ${m.from}`);
    }
});

console.log('Directories created and existing files moved successfully.');
