// Lógica para alternar entre o tema claro e escuro
const themeSwitcher = document.getElementById('themeSwitcher');
const themeIcon = themeSwitcher.querySelector('i');

// Verifica se há uma preferência de tema salva no localStorage
// Se não houver, verifica a preferência do sistema operacional
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Aplica o tema inicial com base nas preferências
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark'); // Adiciona a classe 'dark' ao <html>
    themeIcon.classList.remove('fa-moon'); // Muda o ícone para sol
    themeIcon.classList.add('fa-sun');
}

// Adiciona um listener de clique para alternar o tema
themeSwitcher.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark'); // Alterna a classe 'dark'
    
    // Salva a preferência de tema no localStorage e atualiza o ícone
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Lógica para alternar entre os idiomas (Português e Inglês)
const languageSwitcher = document.getElementById('languageSwitcher');
const languageText = languageSwitcher.querySelector('span');

// Verifica a preferência de idioma salva ou usa o idioma do navegador
const savedLanguage = localStorage.getItem('language');
const prefersPT = navigator.language.startsWith('pt');

let currentLanguage = savedLanguage || (prefersPT ? 'pt' : 'en');

// Define o idioma inicial da página
setLanguage(currentLanguage);

// Adiciona um listener de clique para alternar o idioma
languageSwitcher.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt'; // Alterna entre 'pt' e 'en'
    setLanguage(currentLanguage); // Aplica o novo idioma
    localStorage.setItem('language', currentLanguage); // Salva a preferência
});

// Função para aplicar o idioma aos elementos da página
function setLanguage(lang) {
    languageText.textContent = lang.toUpperCase(); // Atualiza o texto do switcher (PT/EN)
    
    // Itera sobre todos os elementos que possuem atributos 'data-pt' e 'data-en'
    document.querySelectorAll('[data-pt][data-en]').forEach(element => {
        // Define o texto do elemento com base no idioma selecionado
        element.textContent = element.getAttribute(`data-${lang}`);
    });
}

// Lógica para o menu mobile
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

// Adiciona um listener de clique para mostrar/esconder o menu mobile
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden'); // Alterna a classe 'hidden' para mostrar/esconder
});

// Fecha o menu mobile ao clicar em um link dentro dele
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden'); // Esconde o menu após o clique
    });
});

// Lógica para o estado ativo da navegação e botão "Voltar ao Topo"
const sections = document.querySelectorAll('section[id]'); // Seleciona todas as seções com ID
const navLinks = document.querySelectorAll('.nav-link'); // Seleciona todos os links de navegação

window.addEventListener('scroll', () => {
    let current = ''; // Variável para armazenar a seção atual visível
    
    // Itera sobre as seções para determinar qual está visível
    sections.forEach(section => {
        const sectionTop = section.offsetTop; // Posição do topo da seção
        const sectionHeight = section.clientHeight; // Altura da seção
        
        // Se a posição de rolagem estiver dentro da seção (com um offset de 200px)
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id'); // Define a seção atual
        }
    });
    
    // Atualiza a classe 'active-nav' nos links de navegação
    navLinks.forEach(link => {
        link.classList.remove('active-nav'); // Remove a classe de todos os links
        // Se o href do link corresponder à seção atual, adiciona a classe 'active-nav'
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active-nav');
        }
    });
    
    // Lógica para mostrar/ocultar o botão "Voltar ao Topo"
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) { // Se a rolagem for maior que 500px
        backToTop.classList.add('visible'); // Torna o botão visível
    } else {
        backToTop.classList.remove('visible'); // Esconde o botão
    }
});

// Funcionalidade do botão "Voltar ao Topo"
document.getElementById('backToTop').addEventListener('click', scrollToTop);

// Função para rolar suavemente para o topo da página
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rolagem suave
    });
}

// Implementa a rolagem suave para todos os links de navegação (ancoragem)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previne o comportamento padrão de "pular" direto

        const targetId = this.getAttribute('href'); // Obtém o ID da seção alvo (ex: "#about")
        const targetElement = document.querySelector(targetId); // Encontra o elemento correspondente

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Rolagem suave
                block: 'start' // Alinha o topo do elemento com o topo da viewport
            });
        }
    });
});


// Lógica para o Formulário de Contato
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário
    
    // Em um cenário real, você enviaria os dados do formulário para um servidor (ex: via Fetch API)
    // Aqui, estamos apenas simulando um envio bem-sucedido com um atraso
    setTimeout(() => {
        formSuccess.classList.remove('hidden'); // Mostra a mensagem de sucesso
        contactForm.reset(); // Limpa o formulário
        
        // Esconde a mensagem de sucesso após 5 segundos
        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 5000);
    }, 1000); // Simula um atraso de 1 segundo
});

// REMOVIDO: Lógica anterior para download de CV simulado.
// Agora o download é tratado diretamente pelo atributo 'href' do HTML.

// Atualiza o ano atual no rodapé dinamicamente
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Lógica para animar as barras de habilidade ao rolar
// Cria um Intersection Observer para detectar quando as barras entram na viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // Se a barra estiver visível
            entry.target.style.width = entry.target.dataset.width; // Anima a largura para o valor salvo
        }
    });
}, { threshold: 0.5 }); // Dispara quando 50% do elemento está visível

// Para cada barra de progresso de habilidade
document.querySelectorAll('.skill-progress-bar').forEach(bar => {
    bar.dataset.width = bar.style.width; // Salva a largura final no data-attribute
    bar.style.width = '0%'; // Define a largura inicial como 0% para a animação
    observer.observe(bar); // Começa a observar a barra
});

// Integração com a API do GitHub para exibir projetos
const username = 'boltreskh'; // Seu nome de usuário do GitHub
const githubProjectsContainer = document.getElementById('github-projects');
const githubProjectsLoading = document.getElementById('github-projects-loading');
const githubProjectsError = document.getElementById('github-projects-error');
const githubProjectsSkeleton = document.getElementById('github-projects-skeleton');
const retryGithubLoad = document.getElementById('retry-github-load');

// Referências para os elementos do botão de atualização de repositórios
const refreshGithubReposButton = document.getElementById('refreshGithubRepos');
const refreshButtonContent = document.getElementById('refreshButtonContent'); // Conteúdo original do botão (texto e ícone)
const refreshSpinner = document.getElementById('refreshSpinner'); // O spinner

// Integração da Imagem de Perfil do GitHub
const profileImage = document.getElementById('github-profile-image');
const profileImageLoading = document.getElementById('profile-image-loading');
const profileImageFallback = document.getElementById('profile-image-fallback');

// Mapeamento de cores para linguagens de programação (para os badges dos projetos)
const languageColors = {
    "JavaScript": "#f1e05a",
    "TypeScript": "#2b7489",
    "Python": "#3572A5",
    "Java": "#b07219",
    "C#": "#178600",
    "C++": "#f34b7d",
    "C": "#555555",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "PHP": "#4F5D95",
    "Ruby": "#701516",
    "Go": "#00ADD8",
    "Swift": "#ffac45",
    "Kotlin": "#F18E33",
    "Rust": "#dea584",
    "Dart": "#00B4AB",
    "Shell": "#89e051",
    "PowerShell": "#012456",
    "Jupyter Notebook": "#DA5B0B",
    "Vue": "#2c3e50",
    "React": "#61dafb",
    "Angular": "#DD0031"
};

// Função assíncrona para buscar a imagem de perfil do GitHub
async function fetchGitHubProfileImage() {
    try {
        profileImageLoading.classList.remove('hidden'); // Mostra o loading
        profileImage.classList.add('hidden'); // Esconde a imagem real
        profileImageFallback.classList.add('hidden'); // Esconde o fallback SVG
        
        const response = await fetch(`https://api.github.com/users/${username}`); // Faz a requisição à API
        
        if (!response.ok) {
            throw new Error('Falha ao buscar perfil do GitHub'); // Lança erro se a resposta não for OK
        }
        
        const userData = await response.json(); // Converte a resposta para JSON
        
        if (userData.avatar_url) {
            profileImage.src = userData.avatar_url; // Define a URL da imagem
            
            // Quando a imagem carregar, esconde o loading e mostra a imagem
            profileImage.onload = () => {
                profileImageLoading.classList.add('hidden');
                profileImage.classList.remove('hidden');
            };
            
            // Se a imagem falhar ao carregar, esconde o loading e mostra o fallback SVG
            profileImage.onerror = () => {
                profileImageLoading.classList.add('hidden');
                profileImageFallback.classList.remove('hidden');
            };
        } else {
            throw new Error('URL do avatar não encontrada'); // Erro se não houver URL de avatar
        }
        
    } catch (error) {
        console.error('Erro ao buscar imagem de perfil do GitHub:', error);
        profileImageLoading.classList.add('hidden'); // Esconde o loading
        profileImageFallback.classList.remove('hidden'); // Mostra o fallback SVG
    }
}

// Função para obter o ícone Font Awesome apropriado para o repositório
function getRepoIcon(repoName) {
    const name = repoName.toLowerCase();
    // Verifica o nome do repositório para retornar um ícone relevante
    if (name.includes('game')) return 'gamepad';
    if (name.includes('api') || name.includes('rest')) return 'server';
    if (name.includes('web') || name.includes('site')) return 'globe';
    if (name.includes('app')) return 'mobile-alt';
    if (name.includes('bot')) return 'robot';
    if (name.includes('data') || name.includes('analytics')) return 'database';
    if (name.includes('ui') || name.includes('interface')) return 'palette';
    return 'code'; // Ícone padrão
}

// Função assíncrona para buscar os repositórios do GitHub
async function fetchGitHubRepos() {
    try {
        // Mostra o spinner dentro do botão e esconde o conteúdo original
        if (refreshGithubReposButton && refreshButtonContent && refreshSpinner) {
            refreshButtonContent.classList.add('hidden');
            refreshSpinner.classList.remove('hidden');
            refreshGithubReposButton.disabled = true; // Desabilita o botão enquanto carrega
            // Ajusta a largura do botão para o spinner não "dançar"
            refreshGithubReposButton.style.width = `${refreshGithubReposButton.offsetWidth}px`;
        }

        githubProjectsLoading.classList.remove('hidden'); // Mostra o loading principal da seção
        githubProjectsError.classList.add('hidden'); // Esconde a mensagem de erro
        githubProjectsSkeleton.classList.remove('hidden'); // Mostra o esqueleto de carregamento
        githubProjectsContainer.classList.add('hidden'); // Esconde o contêiner de projetos
        
        // Faz a requisição à API do GitHub para os repositórios, ordenados por atualização
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        
        if (!response.ok) {
            throw new Error('Falha ao buscar repositórios do GitHub');
        }
        
        const repos = await response.json(); // Converte a resposta para JSON
        
        // Filtra repositórios que não são forks e os ordena por número de estrelas
        const ownRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        // Pega os 4 repositórios com mais estrelas
        const topRepos = ownRepos.slice(0, 4);
        
        githubProjectsContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novos projetos
        
        // Cria um cartão de projeto para cada repositório principal
        for (let i = 0; i < topRepos.length; i++) {
            const repo = topRepos[i];
            
            const projectCard = document.createElement('div');
            // Adiciona classes de animação e atraso para um efeito visual agradável
            projectCard.className = `project-card animate-fade-in ${i > 0 ? `delay-${i}00` : ''}`;
            
            // Define a descrição do repositório, com fallback se não houver
            const description = repo.description || 
                (currentLanguage === 'pt' ? 'Sem descrição disponível' : 'No description available');
            
            // Formata a data da última atualização para o idioma atual
            const updatedAt = new Date(repo.updated_at);
            const formattedDate = updatedAt.toLocaleDateString(currentLanguage === 'pt' ? 'pt-BR' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            // Obtém a cor da linguagem do repositório, com fallback para cinza
            const languageColor = repo.language ? (languageColors[repo.language] || '#858585') : '#858585';
            
            // Obtém o ícone apropriado para o repositório
            const repoIcon = getRepoIcon(repo.name);
            
            // Constrói o HTML do cartão do projeto
            projectCard.innerHTML = `
                <div class="project-header">
                    <h3 class="text-xl font-semibold">${repo.name}</h3>
                    <div class="project-icon">
                        <i class="fas fa-${repoIcon}"></i>
                    </div>
                </div>
                
                <div class="project-content">
                    <p class="mb-6">${description}</p>
                    
                    <div class="project-meta">
                        <div class="project-meta-item">
                            <i class="far fa-calendar-alt mr-2 text-[var(--primary)]"></i>
                            ${formattedDate}
                        </div>
                        ${repo.language ? `
                        <div class="project-meta-item">
                            <span class="repo-language-color" style="background-color: ${languageColor}"></span>
                            ${repo.language}
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="flex flex-wrap gap-2">
                        ${repo.topics && repo.topics.length > 0 ? 
                            repo.topics.slice(0, 3).map(topic => 
                                `<span class="tech-badge text-xs">#${topic}</span>`
                            ).join('') : 
                            ''
                        }
                    </div>
                </div>
                
                <div class="project-footer">
                    <div class="project-stats">
                        <div class="project-stat">
                            <i class="fas fa-star"></i>
                            ${repo.stargazers_count}
                        </div>
                        <div class="project-stat">
                            <i class="fas fa-code-branch"></i>
                            ${repo.forks_count}
                        </div>
                    </div>
                    
                    <a href="${repo.html_url}" target="_blank" class="btn-github">
                        <i class="fab fa-github"></i>
                        <span>${currentLanguage === 'pt' ? 'Ver Código' : 'View Code'}</span>
                    </a>
                </div>
            `;
            
            githubProjectsContainer.appendChild(projectCard); // Adiciona o cartão ao contêiner
        }
        
        // Esconde o loading principal e o esqueleto, e mostra os projetos carregados
        githubProjectsLoading.classList.add('hidden');
        githubProjectsSkeleton.classList.add('hidden');
        githubProjectsContainer.classList.remove('hidden');
        
    } catch (error) {
        console.error('Erro ao buscar repositórios do GitHub:', error);
        
        // Em caso de erro, esconde o loading principal e o esqueleto, e mostra a mensagem de erro
        githubProjectsLoading.classList.add('hidden');
        githubProjectsSkeleton.classList.add('hidden');
        githubProjectsError.classList.remove('hidden');
    } finally {
        // Sempre esconde o spinner do botão e mostra o texto, e reabilita o botão
        if (refreshGithubReposButton && refreshButtonContent && refreshSpinner) {
            refreshButtonContent.classList.remove('hidden');
            refreshSpinner.classList.add('hidden');
            refreshGithubReposButton.disabled = false;
            refreshGithubReposButton.style.width = ''; // Remove a largura fixa
        }
    }
}

// Carrega a imagem de perfil e os repositórios do GitHub ao carregar a página
window.addEventListener('load', () => {
    fetchGitHubProfileImage();
    fetchGitHubRepos();
});

// Adiciona um listener ao botão de tentar novamente em caso de erro no carregamento do GitHub
retryGithubLoad.addEventListener('click', () => {
    fetchGitHubRepos(); // Tenta carregar os repositórios novamente
    fetchGitHubProfileImage(); // Tenta carregar a imagem de perfil novamente
});

// Adiciona um listener ao botão de atualizar repositórios do GitHub
if (refreshGithubReposButton) { // Verifica se o botão existe antes de adicionar o listener
    refreshGithubReposButton.addEventListener('click', () => {
        fetchGitHubRepos(); // Chama a função para buscar e renderizar os repositórios novamente
    });
}

// Recarrega os dados do GitHub quando o idioma muda (para atualizar as descrições)
languageSwitcher.addEventListener('click', () => {
    // Pequeno atraso para garantir que o idioma já foi atualizado antes de buscar os repositórios
    setTimeout(fetchGitHubRepos, 100);
});