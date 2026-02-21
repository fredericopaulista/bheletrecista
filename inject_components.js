const fs = require('fs');
const path = require('path');

const projectDir = __dirname;

const headerHTML = `
    <!-- GLOBAL HEADER (PREMIUM UX) -->
    <header class="glass-header sticky top-0 z-50 border-b border-white/10 shadow-lg text-white transition-all duration-300">
        <div class="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
            <a href="/index.html" class="flex items-center gap-2 group">
                <span class="text-3xl text-amber-500 transition-transform group-hover:scale-110">⚡</span>
                <div class="flex flex-col">
                    <span class="text-xl md:text-2xl font-black tracking-tight leading-none">BH<span class="text-amber-500">Eletricista</span></span>
                    <span class="text-[10px] md:text-xs text-slate-400 font-medium uppercase tracking-widest hidden sm:block">Engenharia & Serviços</span>
                </div>
            </a>
            
            <div class="flex items-center gap-6">
                <nav class="hidden md:flex gap-6 text-sm font-semibold text-slate-300">
                    <a href="/eletricista-residencial-bh.html" class="hover:text-amber-400 transition">Residencial</a>
                    <a href="/eletricista-comercial-bh.html" class="hover:text-amber-400 transition">Comercial</a>
                    <a href="/padrao-cemig-bh.html" class="hover:text-amber-400 transition">Padrão CEMIG</a>
                </nav>
                <a href="https://wa.me/5531999999999" class="btn-pulse btn-glow bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 md:px-6 py-2 md:py-2.5 rounded-full font-bold transition-all flex items-center gap-2 text-sm md:text-base">
                    <span class="hidden sm:inline">Plantão</span> 24H
                </a>
            </div>
        </div>
    </header>
`;

const footerHTML = `
    <!-- GLOBAL FOOTER (SEO SILOS & TRUST) -->
    <footer class="bg-slate-950 text-slate-400 py-16 border-t border-white/10 mt-auto">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                <!-- Brand Info -->
                <div class="flex flex-col gap-4">
                    <a href="/index.html" class="flex items-center gap-2">
                        <span class="text-2xl text-amber-500">⚡</span>
                        <span class="text-xl font-black text-white tracking-tight">BH<span class="text-amber-500">Eletricista</span></span>
                    </a>
                    <p class="text-sm leading-relaxed mt-2">Empresa referência em manutenções elétricas prediais, comerciais e residenciais na região metropolitana de Belo Horizonte.</p>
                    <div class="flex items-center gap-2 mt-2">
                        <span class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-amber-500 border border-white/5">🔒</span>
                        <span class="text-xs font-bold text-slate-300">Técnicos Certificados NR-10</span>
                    </div>
                </div>

                <!-- Silo 1 -->
                <div>
                    <h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm">Emergência & Residência</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/eletricista-24-horas-bh.html" class="hover:text-amber-500 transition">Atendimento Plantão 24H</a></li>
                        <li><a href="/eletricista-residencial-bh.html" class="hover:text-amber-500 transition">Eletricista Residencial BH</a></li>
                        <li><a href="/eletricista-residencial-bh/instalacao-chuveiro-bh.html" class="hover:text-amber-500 transition">Instalação de Chuveiro</a></li>
                        <li><a href="/eletricista-24-horas-bh/curto-circuito-bh.html" class="hover:text-amber-500 transition">Socorro: Curto Circuito</a></li>
                        <li><a href="/eletricista-24-horas-bh/disjuntor-desarmando-bh.html" class="hover:text-amber-500 transition">Disjuntor Desarmando</a></li>
                    </ul>
                </div>

                <!-- Silo 2 -->
                <div>
                    <h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm">Comercial & Projetos</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/eletricista-comercial-bh.html" class="hover:text-amber-500 transition">Eletricista para Lojas (B2B)</a></li>
                        <li><a href="/eletricista-comercial-bh/instalacao-trifasica-bh.html" class="hover:text-amber-500 transition">Instalação Trifásica</a></li>
                        <li><a href="/eletricista-comercial-bh/aumento-de-carga-bh.html" class="hover:text-amber-500 transition">Aumento de Carga</a></li>
                        <li><a href="/padrao-cemig-bh.html" class="hover:text-amber-500 transition">Adequação Padrão CEMIG</a></li>
                        <li><a href="/padrao-cemig-bh/instalacao-padrao-trifasico.html" class="hover:text-amber-500 transition">Padrão CEMIG Trifásico</a></li>
                    </ul>
                </div>

                <!-- Contact & Local -->
                <div>
                    <h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm">Atendimento Local</h4>
                    <ul class="space-y-3 text-sm">
                        <li class="flex items-start gap-3">
                            <span class="text-amber-500 mt-0.5">📍</span>
                            <span>Atendimento volante expresso em toda Belo Horizonte e Região.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-amber-500 mt-0.5">📞</span>
                            <a href="tel:+5531999999999" class="hover:text-amber-500 transition text-white font-bold">(31) 99999-9999</a>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="text-amber-500 mt-0.5">✉️</span>
                            <a href="/contato.html" class="hover:text-amber-500 transition">Fale Conosco</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
                <p>&copy; ${new Date().getFullYear()} BH Eletricista. Todos os direitos reservados.</p>
                <div class="flex gap-4">
                    <span>CNPJ Fictício: 00.000.000/0001-00</span>
                    <a href="/blog/por-que-disjuntor-desarma.html" class="hover:text-white transition">Blog Técnico</a>
                </div>
            </div>
        </div>
    </footer>
`;

function processHtmlFiles(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!file.startsWith('.') && file !== 'assets' && file !== 'node_modules') {
                processHtmlFiles(fullPath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // 1. REPLACE HEADER
            const headerRegex = /<header[\s\S]*?<\/header>/i;
            if (headerRegex.test(content)) {
                content = content.replace(headerRegex, headerHTML);
                modified = true;
            } else {
                // If no header, inject right after <body>
                content = content.replace(/<body[^>]*>/i, `$&${headerHTML}`);
                modified = true;
            }

            // 2. REPLACE FOOTER
            const footerRegex = /<footer[\s\S]*?<\/footer>/i;
            if (footerRegex.test(content)) {
                content = content.replace(footerRegex, footerHTML);
                modified = true;
            } else {
                // If no footer, inject right before </body>
                content = content.replace(/<\/body>/i, `${footerHTML}\n</body>`);
                modified = true;
            }

            // 3. Optional: Add a smooth flex layout to body to push footer down
            const bodyClassRegex = /<body\s+class="([^"]+)"/;
            if (bodyClassRegex.test(content)) {
                const match = content.match(bodyClassRegex);
                const classes = match[1];
                if (!classes.includes('flex flex-col min-h-screen')) {
                    content = content.replace(bodyClassRegex, `<body class="$1 flex flex-col min-h-screen"`);
                    modified = true;
                }
            } else {
                content = content.replace(/<body>/i, `<body class="flex flex-col min-h-screen">`);
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Injected components into: ${fullPath}`);
            }
        }
    }
}

processHtmlFiles(projectDir);
console.log('Component injection script finished successfully.');
