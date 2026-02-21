const fs = require('fs');

const bairros = ['Barreiro', 'Pampulha', 'Venda Nova', 'Buritis', 'Savassi', 'Centro'];

const bairroTemplate = (nome) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eletricista no ${nome} em Belo Horizonte | Atendimento Rápido</title>
    <meta name="description" content="Eletricista urgente no ${nome}, BH. Chegamos rápido na sua região para curtos, instalação de chuveiro e emergências 24h.">
    <link rel="canonical" href="https://bheletricista.com.br/bairros/${nome.toLowerCase().replace(' ', '-')}">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body class="bg-gray-50 text-slate-900 font-sans antialiased">
    <header class="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" class="text-xl font-bold text-yellow-500">BH Eletricista</a>
            <a href="https://wa.me/5531999999999" class="btn-whatsapp px-4 py-2 rounded font-bold text-sm">WhatsApp Rápido</a>
        </div>
    </header>

    <section class="py-16 bg-slate-800 text-white text-center">
        <div class="container mx-auto px-4 fade-up">
            <h1 class="text-3xl md:text-5xl font-extrabold mb-4 text-yellow-500">Eletricista no ${nome} em Belo Horizonte</h1>
            <p class="text-lg max-w-2xl mx-auto mb-6 text-gray-200">Estamos pertinho de você! Nossa equipe baseada na região do ${nome} permite chegar muito mais rápido na sua emergência elétrica.</p>
            <a href="tel:+5531999999999" class="btn-primary hover:bg-yellow-400 text-slate-900 px-8 py-3 rounded-lg font-bold">Ligar para Eletricista no ${nome}</a>
        </div>
    </section>

    <section class="py-12 bg-white">
        <div class="container mx-auto px-4 max-w-3xl fade-up text-center block">
             <h2 class="text-2xl font-bold mb-4 text-slate-800">Serviços Mais Solicitados na Região</h2>
             <ul class="text-gray-700 mb-6 space-y-2 inline-block text-left">
                <li>⚡ Troca de resistência e chuveiros queimados</li>
                <li>⚡ Quedas de energia e curto-circuito noturno</li>
                <li>⚡ Instalação de ventiladores de teto e ar-condicionado</li>
             </ul>
        </div>
    </section>
</body>
</html>`;

bairros.forEach(b => {
    const filename = b.toLowerCase().replace(' ', '-');
    fs.writeFileSync(`./bairros/${filename}.html`, bairroTemplate(b));
    console.log(`Created bairros/${filename}.html`);
});

const blogs = [
    { slug: 'fio-2-5-aguenta-chuveiro', title: 'Fio 2,5mm aguenta chuveiro elétrico? Cuidado com o perigo!' },
    { slug: 'chuveiro-127-ou-220-bh', title: 'Chuveiro 127V ou 220V em BH: Qual a melhor escolha para sua casa?' },
    { slug: 'quanto-custa-trocar-quadro-de-luz', title: 'Quanto custa trocar um quadro de luz (QDC) antigo em BH?' },
    { slug: 'quando-trocar-padrao-cemig', title: 'Sinais de que está na hora de trocar seu Padrão CEMIG' }
];

const blogTemplate = (post) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | Blog BH Eletricista</title>
    <meta name="description" content="${post.title} - Dicas de elétrica por profissionais credenciados de Belo Horizonte.">
    <link rel="canonical" href="https://bheletricista.com.br/blog/${post.slug}">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../assets/css/style.css">
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${post.title}",
      "author": {
        "@type": "Person",
        "name": "Eletricista Especialista BH"
      }
    }
    </script>
</head>
<body class="bg-gray-50 text-slate-900 font-sans antialiased">
    <header class="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" class="text-xl font-bold text-yellow-500">BH Eletricista | Blog</a>
            <a href="https://wa.me/5531999999999" class="btn-whatsapp px-4 py-2 rounded font-bold text-sm">Problema Elétrico? Fale Conosco</a>
        </div>
    </header>

    <article class="py-16 bg-white">
        <div class="container mx-auto px-4 max-w-3xl fade-up">
            <h1 class="text-3xl md:text-4xl font-extrabold mb-6 text-slate-800">${post.title}</h1>
            <p class="text-gray-700 mb-6 font-medium leading-relaxed">Artigo técnico para os moradores de Belo Horizonte. Informação essencial para a segurança da sua residência ou comércio.</p>
            <p class="text-gray-700 mb-6 leading-relaxed">Em caso de dúvidas na instalação, não arrisque. Chame um eletricista profissional e garanta que sua fiação esteja dentro da norma.</p>
            
            <div class="mt-12 bg-slate-100 p-6 rounded-lg text-center border border-slate-200">
                 <h3 class="font-bold text-xl mb-2 text-slate-900">Precisa implementar isso na sua casa hoje mesmo?</h3>
                 <a href="https://wa.me/5531999999999" class="btn-primary px-6 py-3 rounded-lg font-bold text-lg inline-block mt-4 shadow-md">Chamar Eletricista em BH</a>
            </div>
        </div>
    </article>
</body>
</html>`;

blogs.forEach(b => {
    fs.writeFileSync(`./blog/${b.slug}.html`, blogTemplate(b));
    console.log(`Created blog/${b.slug}.html`);
});
