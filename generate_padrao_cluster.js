const fs = require('fs');
const path = require('path');

const pages = [
    { slug: 'instalacao-padrao-monofasico-bh', title: 'Instalação de Padrão Monofásico CEMIG em BH', desc: 'Especialistas em padrão monofásico residencial em Belo Horizonte. Aprovação rápida na CEMIG.' },
    { slug: 'instalacao-padrao-bifasico-bh', title: 'Instalação de Padrão Bifásico CEMIG em BH', desc: 'Instalamos Padrão Bifásico 127V/220V em BH. Ideal para imóveis com maior carga e ar-condicionado.' },
    { slug: 'instalacao-padrao-trifasico-bh', title: 'Instalação de Padrão Trifásico CEMIG em BH', desc: 'Padrão Trifásico para comércios e indústrias em BH. Projetos robustos e aprovação garantida.' },
    { slug: 'aumento-de-carga-bh', title: 'Aumento de Carga Elétrica na CEMIG em BH', desc: 'Projetos e execução para aumento de carga elétrica do seu imóvel junto à CEMIG em Belo Horizonte.' },
    { slug: 'entrada-de-energia-bh', title: 'Entrada de Energia e Ramais CEMIG em BH', desc: 'Adequação de entrada de energia subterrânea e aérea conforme normas da CEMIG em BH.' },
    { slug: 'caixa-de-medicao-bh', title: 'Instalação de Caixa de Medição CEMIG em BH', desc: 'Montagem de caixas de medição individuais e múltiplas de policarbonato em Belo Horizonte.' },
    { slug: 'aterramento-eletrico-bh', title: 'Aterramento Elétrico Residencial e Comercial em BH', desc: 'Instalação de hastes de aterramento (Fio Terra) de alta performance em Belo Horizonte.' }
];

const template = (p) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${p.title}</title>
    <meta name="description" content="${p.desc}">
    <link rel="canonical" href="https://bheletricista.com.br/${p.slug}.html">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="bg-gray-50 text-slate-800 font-sans">
    <header class="bg-slate-900 text-white shadow-md">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/index.html" class="text-xl font-bold text-yellow-500">BH Eletricista</a>
            <a href="https://wa.me/5531999999999" class="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded font-bold transition">Falar no WhatsApp</a>
        </div>
    </header>

    <section class="py-20 bg-slate-800 text-white text-center border-b-8 border-orange-500">
        <div class="container mx-auto px-4 max-w-3xl">
            <h1 class="text-4xl md:text-5xl font-extrabold mb-4">${p.title}</h1>
            <p class="text-xl mb-8">${p.desc}</p>
            <a href="https://wa.me/5531999999999" class="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-xl shadow-lg transition inline-block">Solicitar Orçamento Urgente</a>
        </div>
    </section>

    <section class="py-16 bg-white">
        <div class="container mx-auto px-4 max-w-4xl">
            <h2 class="text-3xl font-bold mb-6 text-slate-800">Serviço Especializado em Belo Horizonte</h2>
            <p class="text-lg mb-6 text-gray-700">Somos especialistas registrados e executamos serviços com extrema conformidade técnica seguindo as normas ND da concessonária de energia de Minas Gerais.</p>
            
            <div class="bg-orange-50 p-6 rounded-xl border border-orange-200 mb-8">
                <h3 class="font-bold text-xl text-orange-800 mb-3">Por que nos escolher?</h3>
                <ul class="list-disc pl-6 space-y-2 text-orange-900 font-medium">
                    <li>Montagem com materiais 100% homologados (Inmetro/NBR)</li>
                    <li>Sistemas de proteção contra surtos (DPS) e choques (DR)</li>
                    <li>Equipe ágil com atendimento em toda a grande BH</li>
                    <li>Aprovação rápida e garantida na primeira vistoria do fiscal</li>
                </ul>
            </div>

            <div class="border-t-2 border-gray-100 pt-8 mt-8 text-center">
                 <p class="text-lg font-bold mb-4">Veja mais serviços da nossa matriz de regularização:</p>
                 <a href="/padrao-cemig-bh.html" class="inline-block bg-slate-100 border border-slate-300 px-6 py-3 rounded-md text-slate-700 font-bold hover:bg-slate-200 transition shadow-sm">⬅ Voltar para a Página Principal: Padrão CEMIG BH</a>
            </div>
        </div>
    </section>

    <footer class="bg-slate-950 text-gray-400 py-8 text-sm text-center">
        <div class="container mx-auto px-4">
            <p class="font-bold text-yellow-500 mb-2">BH Eletricista - Atendimento Rápido e Seguro</p>
        </div>
    </footer>
</body>
</html>`;

pages.forEach(p => {
    const filePath = path.join(__dirname, `${p.slug}.html`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, template(p));
        console.log(`Created ${p.slug}.html`);
    } else {
        console.log(`${p.slug}.html already exists`);
    }
});
