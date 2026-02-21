const fs = require('fs');
const path = require('path');

const missingPages = [
    // 24H
    { path: 'eletricista-24-horas-bh/emergencia-eletrica-bh.html', title: 'Emergência Elétrica em Belo Horizonte', desc: 'Sua rede parou? Equipe focada em emergências elétricas urgentes 24 horas por dia.' },
    { path: 'eletricista-24-horas-bh/falta-de-energia-bh.html', title: 'Falta de Energia em BH', desc: 'Resolva rapidamente a falta de energia isolada em seu imóvel. Atendimento rápido em BH.' },
    { path: 'eletricista-24-horas-bh/curto-circuito-bh.html', title: 'Curto Circuito em Belo Horizonte', desc: 'Identificação e resolução imediata de problemas com curto circuito para evitar incêndios.' },
    { path: 'eletricista-24-horas-bh/quadro-de-luz-com-problema-bh.html', title: 'Quadro de Luz com Problema (QDC) - Manutenção', desc: 'Quadros elétricos derretidos com cheiro de queimado? Realizamos manutenção emergencial 24h.' },

    // Residencial
    { path: 'eletricista-residencial-bh/troca-disjuntor-bh.html', title: 'Troca de Disjuntor Residencial em BH', desc: 'Troca e upgrade de disjuntores para prevenir quedas por aquecedores e chuveiros potentes.' },
    { path: 'eletricista-residencial-bh/tomada-nao-funciona-bh.html', title: 'Tomada Não Funciona em Casa - Reparos Rápidos BH', desc: 'Tomadas em curto, derretidas ou com fiação rompida. Nossos técnicos trocam de forma ágil.' },
    { path: 'eletricista-residencial-bh/quadro-de-luz-residencial-bh.html', title: 'Manutenção de Quadro de Luz Residencial em BH', desc: 'Atualização e adequação completa do quadro de luz de casas inteiras em Belo Horizonte.' },

    // Comercial
    { path: 'eletricista-comercial-bh/instalacao-trifasica-bh.html', title: 'Instalação Trifásica Empresarial em BH', desc: 'Distribuição simétrica da instalação trifásica para fábricas, açougues, padarias e motores em BH.' },
    { path: 'eletricista-comercial-bh/projeto-eletrico-comercial-bh.html', title: 'Projeto Elétrico Comercial - Automação B2B (BH)', desc: 'Reforma elétrica corporativa com confecção de projetos 100% integrados às NBRs para CNPJs.' },
    { path: 'eletricista-comercial-bh/manutencao-preventiva-eletrica-bh.html', title: 'Manutenção Elétrica Preventiva para Lojas', desc: 'Contratos preventivos de manutenção para lojas e galpões comerciais. Evite paralisações nos seus lucros.' },
    { path: 'eletricista-comercial-bh/quadro-trifasico-bh.html', title: 'Montagem de Quadro Trifásico Robusto Comercial BH', desc: 'Executamos projetos e confecção de Painéis Trifásicos robustos corporativos na grande BH.' },

    // CEMIG
    { path: 'padrao-cemig-bh/aumento-de-carga.html', title: 'Aumento de Carga CEMIG - Regularização Técnica', desc: 'Compramos os cabos, projeto técnico e adequação na hora de Aumento de Carga homologado via CEMIG.' },

    // BLOG (Fora dos silos, na raiz do blog)
    { path: 'blog/qual-disjuntor-usar-para-chuveiro.html', title: 'Qual disjuntor usar para chuveiro de alta potência?', desc: 'Aprenda os segredos para dimensionar disjuntores da curva certa (C e B) em duchas no banho.' },
    { path: 'blog/fio-6mm-aguenta-7500w.html', title: 'Mito ou Verdade: O Fio 6mm aguenta duchas de 7500w?', desc: 'Analise técnica: por que os fios derretem nos canos e qual bitola usar em banheiros antigos.' },
    { path: 'blog/monofasico-bifasico-trifasico-diferenca.html', title: 'Padrão Mono, Bi ou Trifásico: Qual a real diferença?', desc: 'Guia completo e fácil para entender os relógios medidores sem mistério nenhum com tensão e picos.' },
    { path: 'blog/por-que-disjuntor-desarma.html', title: 'Desvendado: Por que afinal o disjuntor desarma?', desc: 'Entenda os princípios térmicos e por indução de como a física protege sua família de incêndios elétricos.' }
];

const template = (p) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${p.title}</title>
    <meta name="description" content="${p.desc}">
    <!-- Path fix for styles since these are in subdirectories -->
    <link rel="stylesheet" href="/assets/css/style.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 text-slate-800 font-sans">
    <header class="bg-slate-900 text-white shadow-md">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/index.html" class="text-xl font-bold text-yellow-500">BH Eletricista</a>
            <a href="https://wa.me/5531999999999" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold transition">WhatsApp Expresso</a>
        </div>
    </header>

    <section class="py-20 bg-slate-800 text-white text-center border-b-8 border-red-500">
        <div class="container mx-auto px-4 max-w-3xl">
            <h1 class="text-4xl md:text-5xl font-extrabold mb-4">${p.title}</h1>
            <p class="text-xl mb-8">${p.desc}</p>
            <a href="https://wa.me/5531999999999" class="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-lg font-bold text-xl shadow-lg transition inline-block">Chamar Equipe de Apoio Urgente</a>
        </div>
    </section>

    <section class="py-16 bg-white">
        <div class="container mx-auto px-4 max-w-4xl">
            <h2 class="text-3xl font-bold mb-6 text-slate-800 border-l-4 border-red-500 pl-4">Serviço Especializado Tático em BH</h2>
            <p class="text-lg mb-6 text-gray-700">Seja um reparo cirúrgico na fiação da sua casa ou uma troca robusta no quadro da sua empresa, resolvemos.</p>
            
            <div class="bg-red-50 p-6 rounded-xl border border-red-100 mb-8">
                <h3 class="font-bold text-xl text-red-900 mb-3">Atenção Extrema em Instalações</h3>
                <p class="text-red-800 font-medium">Jamais ignore sintomas de pane em casa ou nos escritórios. Cheiro de queimado ou barulhos (zumbidos) no QDC demandam socorro prático.</p>
            </div>

            <div class="border-t-2 border-gray-100 pt-8 mt-8 text-center text-sm font-bold">
                 <a href="/index.html" class="inline-block bg-slate-100 border border-slate-300 px-6 py-3 rounded-md text-slate-700 hover:bg-slate-200 transition shadow-sm">⬅ Voltar para a Página Inicial do Especialista</a>
            </div>
        </div>
    </section>
</body>
</html>`;

const projectDir = __dirname;
missingPages.forEach(p => {
    const fullPath = path.join(projectDir, p.path);
    // Ensure dir exists
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, template(p));
        console.log(`Generated: ${p.path}`);
    } else {
        console.log(`Already exists: ${p.path}`);
    }
});
