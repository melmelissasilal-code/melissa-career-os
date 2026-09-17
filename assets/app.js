/* MELISSA CAREER OS - Interactive Local App (app.js) */
/* Atualizado em 2026-09-06 — Alinhamento total com banco SQLite */

// ======================================================================
// FALLBACK_DATA — Espelho completo do banco SQLite para modo offline
// ======================================================================
const FALLBACK_DATA = {
  perfil: {
    nome: "Melissa da Silva Almeida",
    curso: "Administração de Empresas",
    instituicao: "Universidade Federal do Ceará (UFC)",
    semestre: "4º Semestre",
    turno: "Noturno",
    localizacao: "Fortaleza, Ceará, Brasil",
    resumo_profissional: "Estudante de Administração na UFC (4º semestre noturno, total disponibilidade diurna). Estagiária em Gestão de Pessoas no Banco do Nordeste (+7.000 colaboradores), integrando célula corporativa de 3 pessoas responsável por 100% da agenda de DEI, conciliação analítica (Wellhub 4.480 registros), People Analytics e eventos via PPAs. Co-fundadora e Presidente do Dragão do Mar (30+ voluntários, núcleos FEAAC e FADIR) e Analista na Ceará Finance. Inglês Avançado (C1).",
    data_atualizacao: "2026-09-06"
  },
  experiencias: [
    {
      instituicao: "Banco do Nordeste (BNB)",
      cargo: "Estagiária em Gestão de Pessoas (Célula de Diversidade | +7.000 Colaboradores)",
      tipo: "Estágio",
      data_inicio: "2026-01-22",
      data_fim: "Atual",
      area_principal: "Recursos Humanos e Gestão de Pessoas",
      resumo_atividades: "Centralização de 100% das demandas de DEI do banco em célula corporativa de 3 pessoas para mais de 7.000 colaboradores.",
      competencias_chave: "People Analytics, Auditoria de Benefícios (PROCV), DEI em Escala, Gestão de Eventos e PPAs",
      impacto_quantitativo: "Conciliação de 4.480 cobranças do Wellhub; expedição de 110 envelopes para 4 estados."
    },
    {
      instituicao: "Projeto de Extensão Dragão do Mar",
      cargo: "Co-fundadora e Presidente",
      tipo: "Liderança Estudantil / Extensão",
      data_inicio: "2025-12-01",
      data_fim: "Atual",
      area_principal: "Corporate, Estratégia e Negócios",
      resumo_atividades: "Liderança executiva de equipe voluntária com mais de 30 membros, reestruturando o organograma e criando núcleos especializados.",
      competencias_chave: "Liderança Executiva, Governança, Gestão de Equipes, Notion, Fundraising",
      impacto_quantitativo: "Gestão direta de 30+ voluntários; criação de 3 núcleos acadêmicos por campus."
    },
    {
      instituicao: "Ceará Finance",
      cargo: "Analista de Macro, Renda Fixa, Eventos e Relações Externas",
      tipo: "Projeto Acadêmico / Extensão",
      data_inicio: "2025-11-01",
      data_fim: "Atual",
      area_principal: "Finanças e Mercado Financeiro",
      resumo_atividades: "Análise macroeconômica, taxa de juros, inflação e análise fundamentalista de balanços contábeis.",
      competencias_chave: "Macroeconomia, Renda Fixa, Equity, Análise de Balanços",
      impacto_quantitativo: "Elaboração contínua de relatórios macro e setoriais."
    }
  ],
  competencias: [
    { categoria: "Auditoria & Dados", nome: "Conciliação e Auditoria de Benefícios (Wellhub)", nivel_proficiencia: "Avançado", areas_aplicadas: "RH, Finanças, Dados", evidencias_projetos: "Conferência mensal de 4.480 cobranças via PROCV no Excel no Banco do Nordeste" },
    { categoria: "Ferramenta / Software", nome: "Inteligência Artificial & Engenharia de Prompts", nivel_proficiencia: "Avançado", areas_aplicadas: "Todas as áreas", evidencias_projetos: "Uso estratégico de LLMs para automação de relatórios, pesquisa setorial e ideação" },
    { categoria: "Ferramenta / Software", nome: "Microsoft Excel", nivel_proficiencia: "Intermediário-Avançado", areas_aplicadas: "Finanças, BI, RH, Estratégia", evidencias_projetos: "Fórmulas avançadas (PROCV/X, SOMASES), tabelas dinâmicas, tratamento de dados" },
    { categoria: "Ferramenta / Software", nome: "Microsoft Forms", nivel_proficiencia: "Avançado", areas_aplicadas: "RH, Pesquisas, People Experience", evidencias_projetos: "Concepção de formulário de pesquisa de interesse e demanda para o Programa AmadureSER." },
    { categoria: "Ferramenta / Software", nome: "Microsoft Planner", nivel_proficiencia: "Intermediário-Avançado", areas_aplicadas: "Projetos, RH, Operações", evidencias_projetos: "Acompanhamento estruturado de demandas e fluxos de atendimento do Centro de Saúde do BNB." },
    { categoria: "Ferramenta / Software", nome: "Microsoft PowerPoint", nivel_proficiencia: "Avançado", areas_aplicadas: "Marketing, Estratégia, Produtos", evidencias_projetos: "Apresentações executivas de alto impacto, pitch decks" },
    { categoria: "Ferramenta / Software", nome: "Notion", nivel_proficiencia: "Avançado", areas_aplicadas: "Estratégia, Projetos, Organização", evidencias_projetos: "Estruturação de wikis, bancos de dados relacionais e gestão de tarefas" },
    { categoria: "Ferramenta / Software", nome: "Plataforma Senior (HCM)", nivel_proficiencia: "Intermediário-Avançado", areas_aplicadas: "RH, Gestão de Pessoas", evidencias_projetos: "Operação diária no Banco do Nordeste para gestão de rotinas de RH" },
    { categoria: "Ferramenta / Software", nome: "Portal Meu RH & ERPs Internos", nivel_proficiencia: "Avançado", areas_aplicadas: "RH, Gestão de Pessoas", evidencias_projetos: "Gestão de solicitações e processos administrativos no BNB" },
    { categoria: "Ferramenta / Software", nome: "Power BI & Dashboards", nivel_proficiencia: "Intermediário", areas_aplicadas: "BI, RH, Finanças", evidencias_projetos: "Criação de dashboards e relatórios visuais de acompanhamento de eventos e programas de GP" },
    { categoria: "Finanças", nome: "Fundos de Investimento & Mercado de Capitais", nivel_proficiencia: "Intermediário", areas_aplicadas: "Finanças, Corporate", evidencias_projetos: "Certificado Universidade Corporativa BNB e preparação para ANBIMA C-PRO I" },
    { categoria: "Hard Skill", nome: "Auditoria de Faturamento & Conciliação", nivel_proficiencia: "Avançado", areas_aplicadas: "Finanças, BI, RH", evidencias_projetos: "Conferência mensal de 4.480 cobranças do Wellhub no BNB" },
    { categoria: "Hard Skill", nome: "Dossiês para Premiações Externas", nivel_proficiencia: "Avançado", areas_aplicadas: "ESG, RH, Marketing", evidencias_projetos: "Cases para Vittude Awards 2026, XII Concurso de Ética e Selo +Diversidade" },
    { categoria: "Hard Skill", nome: "Engenharia de Prompt & IA Generativa Corporativa", nivel_proficiencia: "Avançado", areas_aplicadas: "Gestão de Pessoas, Estratégia, Automação", evidencias_projetos: "Certificação IA para Todos (BNB/FIAP/Alura), MELISSA CAREER OS" },
    { categoria: "Hard Skill", nome: "Engenharia de Requisitos para BI", nivel_proficiencia: "Intermediário-Avançado", areas_aplicadas: "BI, RH, ESG", evidencias_projetos: "Especificação de regras de negócio para BI de Diversidade do BNB" },
    { categoria: "Hard Skill", nome: "Gestão de Indicadores & Relatórios", nivel_proficiencia: "Intermediário", areas_aplicadas: "BI, RH, Finanças", evidencias_projetos: "Consolidação de dados operacionais e preparação de relatórios gerenciais" },
    { categoria: "Hard Skill", nome: "Gestão de Suprimentos & Eventos (PPAs)", nivel_proficiencia: "Avançado", areas_aplicadas: "RH, Operações, Marketing", evidencias_projetos: "Elaboração de briefings, pedidos de coffee-break e PPAs" },
    { categoria: "Hard Skill", nome: "Inteligência Artificial Quantitativa & Modelagem Sistemática", nivel_proficiencia: "Intermediário-Avançado", areas_aplicadas: "Finanças, Dados, Análise de Ativos", evidencias_projetos: "Desafio Quant AI 2026 (Itaú Asset) - Aequitas Value Robot" },
    { categoria: "Hard Skill", nome: "Inteligência Territorial & Relatórios Regionais", nivel_proficiencia: "Avançado", areas_aplicadas: "Estratégia, RH, BI", evidencias_projetos: "Consolidação de indicadores de GP para Fóruns de Gestão do PI e RN" },
    { categoria: "Hard Skill", nome: "Logística Corporativa via Malote", nivel_proficiencia: "Avançado", areas_aplicadas: "Operações, Logística, Corporate", evidencias_projetos: "Rastreamento e despacho de 110+ envelopes para unidades em múltiplos estados" },
    { categoria: "Hard Skill", nome: "People Analytics & Absenteísmo", nivel_proficiencia: "Intermediário-Avançado", areas_aplicadas: "BI, RH, Gestão", evidencias_projetos: "Puxada e correlação de dados de jornada, sobrecarga feminina e afastamentos no BNB" },
    { categoria: "Hard Skill", nome: "Práticas de DEI & ESG", nivel_proficiencia: "Intermediário", areas_aplicadas: "ESG, RH", evidencias_projetos: "Apoio a políticas de inclusão, campanhas de diversidade e bem-estar no BNB" },
    { categoria: "Idiomas", nome: "Inglês Avançado (C1)", nivel_proficiencia: "Avançado", areas_aplicadas: "Geral, Negócios, Relações Externas", evidencias_projetos: "Certificado Wizard 280h; PET ADM UFC Speak Up 64h; SFL Global Local Coordinator" },
    { categoria: "Inteligência Artificial", nome: "IA Generativa & Engenharia de Prompt", nivel_proficiencia: "Intermediário-Avançado", areas_aplicadas: "Geral, Produtividade, Dados", evidencias_projetos: "Certificado oficial BNB / FIAP / Alura (IA para Todos)" },
    { categoria: "Liderança", nome: "Desenvolvimento de Lideranças & Fundraising", nivel_proficiencia: "Avançado", areas_aplicadas: "Gestão, Liderança", evidencias_projetos: "BTG Pactual Filantropia; Co-fundadora do Dragão do Mar e LC na SFL Global" },
    { categoria: "Metodologia", nome: "Estruturação Organizacional", nivel_proficiencia: "Avançado", areas_aplicadas: "Corporate, Estratégia", evidencias_projetos: "Desenho de organogramas, alocação de responsabilidades e rituais de gestão" },
    { categoria: "Metodologia", nome: "Gamificação Organizacional", nivel_proficiencia: "Intermediário", areas_aplicadas: "RH, Gestão de Pessoas, Produtos", evidencias_projetos: "Aplicação de mecânicas de jogos para engajamento de equipes no Dragão do Mar" },
    { categoria: "Soft Skill", nome: "Comunicação e Articulação Institucional", nivel_proficiencia: "Avançado", areas_aplicadas: "Marketing, RH, Estratégia", evidencias_projetos: "Comunicação corporativa no BNB e representação institucional do SFLB" },
    { categoria: "Soft Skill", nome: "Liderança e Gestão de Equipes", nivel_proficiencia: "Avançado", areas_aplicadas: "Corporate, Estratégia, RH", evidencias_projetos: "Presidência do Dragão do Mar coordenando membros e projetos voluntários" }
  ],
  historias_star: [
    { id: 1, titulo: "Reestruturação e Engajamento da Equipe no Dragão do Mar", competencia_principal: "Liderança e Estratégia", competencias_secundarias: "Gamificação, Gestão de Mudança, Comunicação", situacao: "Ao assumir a liderança do projeto de extensão, a equipe enfrentava desmobilização e baixa frequência nas entregas pós-mudança de ciclo.", tarefa: "Restabelecer o alinhamento estratégico, definir metas claras de entregas de pesquisa e eventos, e motivar o time de voluntários.", acao: "Implementei uma estrutura de comitês com metas semanais e introduzi dinâmicas de gamificação no acompanhamento de projetos via Notion, alinhando reconhecimentos às entregas.", resultado: "Aumento de 70% na assiduidade das reuniões gerais, entrega antecipada do planejamento semestral e realização bem-sucedida das conferências extensionistas.", areas_relevantes: "Corporate, Estratégia e Negócios; Recursos Humanos e Gestão de Pessoas", instituicao_origem: "Dragão do Mar" },
    { id: 2, titulo: "Organização e Padronização de Dados de GP no Banco do Nordeste", competencia_principal: "Organização de Dados e Performance", competencias_secundarias: "Excel, Atenção aos Detalhes, Análise Crítica", situacao: "Demandas dispersas de programas de qualidade de vida e campanhas de saúde exigiam consolidação rápida para relatórios à gestão.", tarefa: "Criar uma rotina de organização de dados e evidências de eventos para viabilizar relatórios periódicos sem retrabalho.", acao: "Estruturei planilhas padronizadas em Excel categorizando ações por tipo de evento, público atendido e indicadores de adesão, criando templates reutilizáveis.", resultado: "Redução significativa no tempo de consolidação de relatórios mensais e maior precisão nos registros de campanhas internas.", areas_relevantes: "Recursos Humanos e Gestão de Pessoas; Business Intelligence, Dados e Performance", instituicao_origem: "Banco do Nordeste" },
    { id: 3, titulo: "Análise Setorial e Síntese Executiva no Ceará Finance", competencia_principal: "Raciocínio Analítico e Finanças", competencias_secundarias: "Mercado Financeiro, Trabalho em Equipe, Apresentações", situacao: "Necessidade de analisar a performance setorial de empresas de consumo e commodities em cenário macroeconômico de juros voláteis.", tarefa: "Aprofundar nos demonstrativos contábeis (DRE, balanço) e sintetizar os principais vetores de receita e riscos em apresentação executiva.", acao: "Pesquisei relatórios de mercado, compilei dados históricos em planilha e colaborei na estruturação dos slides executivos para o núcleo de estudos.", resultado: "Elogio pela clareza na exposição dos riscos de margem e capacidade de traduzir números em narrativa de negócios sólida.", areas_relevantes: "Finanças e Mercado Financeiro; Corporate, Estratégia e Negócios", instituicao_origem: "Ceará Finance" },
    { id: 4, titulo: "People Analytics: Diagnóstico de Sobrecarga Feminina e Absenteísmo no BNB", competencia_principal: "People Analytics & Tratamento de Dados", competencias_secundarias: "Plataforma Senior, Excel PROCV, DEI, Qualidade de Vida", situacao: "Necessidade de mapear o impacto das rotinas e sobrecarga sobre as colaboradoras mulheres do Banco do Nordeste para apoiar ações afirmativas de saúde e bem-estar.", tarefa: "Extrair e correlacionar dados operacionais de colaboradores para gerar um diagnóstico numérico consistente.", acao: "Utilizei a Plataforma Senior, portal Meu RH e planilhas em Excel com PROCV para correlacionar volumes de horas extras com taxas de absenteísmo por área, montando visualizações no Excel e Power BI.", resultado: "Construção de indicadores sólidos que subsidiaram a liderança de GP na formulação de campanhas de saúde integral e cases de diversidade do banco.", areas_relevantes: "Recursos Humanos e Gestão de Pessoas; Business Intelligence, Dados e Performance; ESG e Sustentabilidade", instituicao_origem: "Banco do Nordeste" },
    { id: 5, titulo: "Gestão de Diversidade em Escala (+7.000 Colaboradores com Célula de 3 Pessoas)", competencia_principal: "Senso de Dono (Ownership) e Gestão em Escala", competencias_secundarias: "Diversidade & Inclusão (DEI), Eficiência Operacional, PPAs, Brindes Comunitários", situacao: "Banco do Nordeste com mais de 7.000 colaboradores e célula corporativa de Diversidade composta por apenas 3 pessoas (incluindo Melissa).", tarefa: "Garantir a execução ágil e sem gargalos de 100% da agenda de DEI do banco.", acao: "Centralização dos fluxos operacionais; concepção de programas de equidade; seleção, cotação e compra de brindes comunitários; distribuição de cordões de crachá; emissão de PPAs e suporte a eventos corporativos.", resultado: "Cobertura integral da pauta de diversidade para +7.000 pessoas sem falhas, comprovando maturidade corporativa, senso de dona e resiliência operacional.", areas_relevantes: "Recursos Humanos, Estratégia, Liderança, ESG, Trainee", instituicao_origem: "Banco do Nordeste (BNB)" },
    { id: 6, titulo: "Auditoria Analítica e Conciliação de Faturamento do Wellhub (4.480 Cobranças)", competencia_principal: "Raciocínio Analítico e Auditoria de Dados", competencias_secundarias: "Excel Avançado (PROCV), Conciliação Financeira, Atenção aos Detalhes", situacao: "No Centro de Saúde e Qualidade de Vida do BNB, era necessário conferir o faturamento mensal do Wellhub referente a 4.480 cobranças.", tarefa: "Cruzar a base enviada pelo fornecedor com a relação funcional oficial do banco, identificando inconsistências.", acao: "Estruturei uma planilha no Excel aplicando fórmulas PROCV e filtros relacionais entre a base do Wellhub e o quadro de colaboradores. Classifiquei 4.475 registros regulares e isolei divergências cadastrais.", resultado: "Prevenção de erros de faturamento, garantia de conformidade contratual e aprovação do processo sem atrasos no cronograma financeiro.", areas_relevantes: "Finanças, People Analytics, Dados, Auditoria, Controladoria", instituicao_origem: "Banco do Nordeste (BNB)" },
    { id: 7, titulo: "Inteligência Territorial & Detecção de Inconsistência para Fórum do RN", competencia_principal: "Pensamento Crítico e Rigor Metodológico", competencias_secundarias: "Inteligência Regional, Análise de Dados, Comunicação com Lideranças", situacao: "A Superintendência Estadual do Rio Grande do Norte demandou panorama executivo consolidado com indicadores de GP para o Fórum de Gestão regional.", tarefa: "Reunir dados de múltiplos relatórios dispersos e consolidar um relatório executivo territorializado.", acao: "Consolidei as bases operacionais e detectei que um colaborador constava vinculado ao RN, embora sua lotação física fosse em outro estado. Sinalizei preventivamente a divergência à gerência.", resultado: "Apresentação 100% precisa entregue à alta liderança regional, adotada como modelo oficial de referência para as demais superintendências.", areas_relevantes: "Corporate, Estratégia e Negócios; Business Intelligence, Dados e Performance; Recursos Humanos e Gestão de Pessoas", instituicao_origem: "Banco do Nordeste (BNB)" },
    { id: 8, titulo: "Logística de Distribuição Nacional de Cordões de Crachá via Malote", competencia_principal: "Logística Operacional e Suprimentos", competencias_secundarias: "Controle de Estoque, Malote Corporativo, Acessibilidade, DEI", situacao: "A Célula de DEI precisava distribuir milhares de cordões de crachá de identificação da diversidade para a Direção Geral e centenas de agências em múltiplos estados.", tarefa: "Criar mecanismo de controle de estoque e organizar remessas via malote corporativo sem perdas.", acao: "Criei a planilha mestre e realizei a triagem e envelopamento de 110 envelopes para 4 estados e 12 envelopes para 6 estados.", resultado: "Operação logística executada com zero extravios em rede geográfica dispersa.", areas_relevantes: "Corporate, Estratégia e Negócios; ESG, Diversidade e Sustentabilidade; Recursos Humanos e Gestão de Pessoas", instituicao_origem: "Banco do Nordeste (BNB)" },
    { id: 9, titulo: "Articulação de Evidências e Case para o Vittude Awards 2026", competencia_principal: "Gestão de Projetos e Premiações Nacionais", competencias_secundarias: "Saúde Mental, HSE, Riscos Psicossociais, GPTW, Redação Executiva", situacao: "O Banco do Nordeste decidiu concorrer ao Vittude Awards 2026 com o Programa De Bem com o Trabalho.", tarefa: "Redigir o case institucional conectando riscos psicossociais (metodologia HSE), pesquisa de clima GPTW e iniciativas internas.", acao: "Redigi e revisei o documento, criei seção exclusiva sobre a pesquisa GPTW, articulei com diferentes áreas internas para coletar vídeos, fotos e métricas.", resultado: "Entrega tempestiva de um case executivo altamente competitivo, estruturado e com base documental sólida.", areas_relevantes: "Recursos Humanos e Gestão de Pessoas; ESG, Diversidade e Sustentabilidade; Marketing, Comunicação e Marca", instituicao_origem: "Banco do Nordeste (BNB)" },
    { id: 10, titulo: "Especificação de Regras de Negócio para o BI de Indicadores de Diversidade", competencia_principal: "Engenharia de Requisitos e Ética de Dados", competencias_secundarias: "People Analytics, Power BI, Regras de Negócio, LGPD, Equidade", situacao: "A área de TI e BI do banco necessitava de definições funcionais para estruturar o painel corporativo de Indicadores de Diversidade no Power BI.", tarefa: "Atuar como ponte entre as políticas de GP e os desenvolvedores técnicos, desenhando dimensões e regras de negócio éticas.", acao: "Especifiquei critérios para avaliar tempo de carreira e ascensão à liderança, adotei postura crítica questionando o horizonte temporal e exigindo conformidade com a LGPD.", resultado: "Arquitetura do painel validada com métricas consistentes e auditáveis, com total conformidade legal.", areas_relevantes: "Business Intelligence, Dados e Performance; Recursos Humanos e Gestão de Pessoas; ESG, Diversidade e Sustentabilidade", instituicao_origem: "Banco do Nordeste (BNB)" },
    { id: 11, titulo: "Desenvolvimento do Aequitas Value Robot no Desafio Quant AI 2026 (Itaú Asset)", competencia_principal: "Inteligência Artificial Quantitativa & Resolução de Problemas Complexos", competencias_secundarias: "Finanças Quantitativas, Value Investing, Trabalho em Equipe, Python, Modelagem Sistemática", situacao: "Participação no Desafio Quant AI 2026 promovido pela Itaú Asset Management, disputado por talentos de ponta do país.", tarefa: "Modelar e programar uma estratégia sistemática de investimentos baseada em inteligência artificial e métricas de Value Investing.", acao: "Trabalho em equipe com Weberson Santos e Jack Gregori Rodriguez Cachi, sob mentoria do especialista Vitor Borges Monteiro.", resultado: "Aprovação e conclusão bem-sucedida de todas as fases com entrega do trabalho final homologada pela Itaú Asset.", areas_relevantes: "Finanças, BI & Dados, Corporate & Estratégia, Tecnologia", instituicao_origem: "Itaú Asset Management" }
  ],
  radar_areas: [
    { area_nome: "Recursos Humanos e Gestão de Pessoas", fit_percentual: 92, nivel_afinidade: "Alta", principais_forcas: "Experiência real corporativa no Banco do Nordeste em GP, saúde, qualidade de vida e DEI.", gaps_identificados: "Aprofundar em People Analytics avançado e métricas formais de turnover/eNPS.", plano_acao: "Estudar modelos preditivos de retenção e métricas de RH estratégico.", prioridade_estudo: 1 },
    { area_nome: "Business Intelligence, Dados e Performance", fit_percentual: 92, nivel_afinidade: "Média-Alta", principais_forcas: "People Analytics no BNB (sobrecarga feminina), auditoria relacional Wellhub (4.480 registros via PROCV), modelagem de BI de Diversidade e IA Quantitativa (Itaú Asset).", gaps_identificados: "Power BI/Tableau e SQL formal para extração direta.", plano_acao: "Construir 2 dashboards práticos para portfólio no GitHub/Web.", prioridade_estudo: 3 },
    { area_nome: "ESG, Diversidade e Sustentabilidade", fit_percentual: 92, nivel_afinidade: "Média-Alta", principais_forcas: "People Analytics no BNB (sobrecarga feminina), auditoria relacional Wellhub, modelagem de BI de Diversidade e IA Quantitativa (Itaú Asset).", gaps_identificados: "Normas globais de relato ESG (GRI, SASB) e métricas de governança ambiental.", plano_acao: "Elaborar diagnóstico conceitual de indicadores ESG para empresa da região.", prioridade_estudo: 5 },
    { area_nome: "Corporate, Estratégia e Negócios", fit_percentual: 88, nivel_afinidade: "Alta", principais_forcas: "Presidência do Dragão do Mar, gestão de pessoas, governança e planejamento estratégico.", gaps_identificados: "Frameworks formais de consultoria (SWOT, OKRs, Balanced Scorecard).", plano_acao: "Criar projeto prático de planejamento estratégico e OKRs.", prioridade_estudo: 2 },
    { area_nome: "Finanças e Mercado Financeiro", fit_percentual: 88, nivel_afinidade: "Média", principais_forcas: "Vivência no Ceará Finance, conclusão do Desafio Quant AI 2026 do Itaú Asset (Aequitas Value Robot), conciliação Wellhub e preparação C-PRO I.", gaps_identificados: "Modelagem financeira profunda (DCF) e certificações (ex: CPA-20/CEA).", plano_acao: "Simular valuation simplificado e aprofundar em contabilidade societária.", prioridade_estudo: 6 },
    { area_nome: "Marketing, Comunicação e Marca", fit_percentual: 82, nivel_afinidade: "Média-Alta", principais_forcas: "Comunicação institucional no BNB, campanhas, design de apresentações e eventos.", gaps_identificados: "Estratégias de Growth, métricas de funil (CAC/LTV) e inbound marketing.", plano_acao: "Mapear cases de campanhas com mensuração quantitativa de alcance.", prioridade_estudo: 4 },
    { area_nome: "Produtos, Inovação e Experiência do Usuário", fit_percentual: 72, nivel_afinidade: "Média", principais_forcas: "Aplicação de gamificação no Dragão do Mar e visão de jornada de voluntários/colaboradores.", gaps_identificados: "Metodologias ágeis (Scrum/Kanban) e ferramentas de product discovery/Figma.", plano_acao: "Desenhar protótipo de jornada de onboarding gamificado.", prioridade_estudo: 7 }
  ],
  processos_seletivos: [
    { empresa: "Google", cargo_vaga: "Google Business Internship Program (Estágio Corporativo)", area: "Produtos, Inovação e Dados", plataforma: "Google Careers / Gupy", status: "Exemplo / Simulação", etapa_atual: "Caso de Estudo / Calibração", proximo_prazo: "N/A (Exemplo)", curriculo_usado: "02_CURRICULO_CAMALEAO/CURRICULOS_POR_VAGA/2026-09_GOOGLE_BUSINESS_INTERNSHIP.pdf", anotacoes_estrategicas: "Vaga utilizada como exemplo prático de calibração para o Currículo Cirúrgico." },
    { empresa: "M. Dias Branco", cargo_vaga: "Estágio Corporativo em Gente & Gestão (People Operations)", area: "Recursos Humanos e Gestão de Pessoas", plataforma: "Gupy / Vagas M. Dias Branco", status: "Exemplo / Simulação", etapa_atual: "Caso de Estudo / Calibração", proximo_prazo: "N/A (Exemplo)", curriculo_usado: "02_CURRICULO_CAMALEAO/CURRICULOS_POR_VAGA/2026-09_M_DIAS_BRANCO_ESTAGIO_GENTE_E_GESTAO.pdf", anotacoes_estrategicas: "Vaga utilizada como exemplo prático de calibração para o Currículo Cirúrgico." },
    { empresa: "Banco do Nordeste (BNB)", cargo_vaga: "Estagiária em Gestão de Pessoas (Acompanhamento e Consolidação)", area: "Recursos Humanos e Gestão de Pessoas", plataforma: "Interno / IEL-CE", status: "Exemplo / Simulação", etapa_atual: "Caso de Estudo / Calibração", proximo_prazo: "N/A (Exemplo)", curriculo_usado: "02_CURRICULO_CAMALEAO/CURRICULOS_POR_VAGA/2026-09_BANCO_DO_NORDESTE_GESTAO_DE_PESSOAS.pdf", anotacoes_estrategicas: "Vaga utilizada como exemplo prático de calibração para o Currículo Cirúrgico." }
  ],
  projetos: [
    { id: 1, titulo: "Governança e Reestruturação Operacional do Dragão do Mar", organizacao: "Dragão do Mar / SFLB", tipo_projeto: "Liderança e Estratégia", descricao: "Estruturação integral dos comitês internos do projeto de extensão, integrando Notion para alocação de tarefas e metas.", desafio: "Baixo engajamento e descentralização de informações entre voluntários.", solucao: "Criação de organograma funcional, rituais semanais de alinhamento e manual de onboarding com dinâmica de gamificação.", resultados_impacto: "Engajamento contínuo de mais de 20 membros voluntários, fóruns de debate e publicações regulares.", ferramentas_utilizadas: "Notion, Trello, Google Workspace, Metodologia de Gamificação" },
    { id: 2, titulo: "Fluxo de Monitoramento de Campanhas de Qualidade de Vida e DEI", organizacao: "Banco do Nordeste", tipo_projeto: "Recursos Humanos e Gestão de Pessoas", descricao: "Organização de rotinas de suporte às campanhas institucionais de bem-estar, saúde preventiva e DEI.", desafio: "Múltiplos pontos de contato e necessidade de relatórios para os gestores da área de GP.", solucao: "Padronização das bases de apoio em Excel e acompanhamento da participação das equipes nos eventos.", resultados_impacto: "Aumento da rastreabilidade das ações de GP e suporte à tomada de decisão da liderança de RH.", ferramentas_utilizadas: "Microsoft Excel, PowerPoint, Ferramentas Internas de Comunicação" },
    { id: 3, titulo: "Relatório Setorial de Bens de Consumo e Varejo", organizacao: "Ceará Finance", tipo_projeto: "Finanças e Mercado Financeiro", descricao: "Pesquisa e elaboração de dossiê setorial para avaliar o impacto da taxa Selic e inflação sobre a rentabilidade de empresas listadas.", desafio: "Necessidade de sintetizar dados macroeconômicos e contábeis de forma acessível e estratégica.", solucao: "Coleta de demonstrativos financeiros (DRE, Margem EBITDA, Endividamento) e compilação em gráficos e slides.", resultados_impacto: "Apresentação para o núcleo de extensão com aprovação e destaque para a visão holística.", ferramentas_utilizadas: "Excel Financeiro, Análise Fundamentalista, PowerPoint Executivo" },
    { id: 4, titulo: "Auditoria de Faturamento e Conciliação Wellhub (4.480 Registros)", organizacao: "Banco do Nordeste", tipo_projeto: "Finanças e Dados", descricao: "Conferência mensal da base de faturamento de 4.480 cobranças do benefício Wellhub.", desafio: "Risco de cobranças indevidas de colaboradores desligados ou com inconsistências cadastrais.", solucao: "Cruzamento relacional no Excel (PROCV), checagens lógicas e apuração monetária de divergências.", resultados_impacto: "4.475 cobranças regulares validadas (99,89%) e 5 divergências apuradas, garantindo conformidade contábil.", ferramentas_utilizadas: "Microsoft Excel (PROCV, Testes Lógicos), Outlook" },
    { id: 5, titulo: "Inteligência Territorial para Fóruns de Gestão (PI e RN)", organizacao: "Banco do Nordeste", tipo_projeto: "Estratégia e Dados", descricao: "Consolidação de indicadores regionais de GP, saúde, bem-estar e serviço social para as Superintendências do PI e RN.", desafio: "Fontes de dados fragmentadas e risco de dados inconsistentes chegarem aos superintendentes.", solucao: "Consolidação analítica por município e agência; identificação e sinalização preventiva de inconsistência territorial.", resultados_impacto: "Entrega de relatórios 100% precisos e adoção da apresentação do RN como modelo oficial de referência.", ferramentas_utilizadas: "Excel, PowerPoint Executivo, Planner do Serviço Social" },
    { id: 6, titulo: "Dossiê do Programa De Bem com o Trabalho para o Vittude Awards 2026", organizacao: "Banco do Nordeste", tipo_projeto: "Gestão de Pessoas e ESG", descricao: "Elaboração do case oficial do BNB concorrendo ao prêmio nacional de saúde mental corporativa.", desafio: "Necessidade de narrativa consistente fundamentada em metodologia científica (HSE) e comprovação por evidências auditáveis.", solucao: "Redação do case, integração com resultados GPTW, articulação intersetorial para coleta de vídeos/fotos e saneamento de evidências.", resultados_impacto: "Dossiê executivo submetido com alto rigor e criação de repositório central de evidências para premiações futuras.", ferramentas_utilizadas: "Microsoft Word, M365, Metodologia HSE, Pesquisa GPTW" },
    { id: 7, titulo: "Distribuição Nacional de Cordões da Diversidade via Malote", organizacao: "Banco do Nordeste", tipo_projeto: "Operações e Logística", descricao: "Planejamento, triagem e expedição de cordões de crachá para centenas de unidades do BNB.", desafio: "Dispersão geográfica em múltiplos estados e risco de extravios.", solucao: "Criação de planilha mestre de rastreamento por UF, embalagem de 110 envelopes para 4 UFs e 12 para 6 UFs.", resultados_impacto: "Distribuição em escala nacional com zero extravios e entrega ágil.", ferramentas_utilizadas: "Excel, Logística de Malote, M365" },
    { id: 8, titulo: "Modelagem de Requisitos do BI de Indicadores de Diversidade", organizacao: "Banco do Nordeste", tipo_projeto: "People Analytics e BI", descricao: "Definição de regras de negócio, dimensões e governança de dados para o dashboard de DEI no Power BI.", desafio: "Complexidade de indicadores de carreira e risco de violação de privacidade (LGPD).", solucao: "Mapeamento funcional de trajetórias até cargos de liderança, diferenciação de cargos interinos e apresentação agregada de dados sensíveis.", resultados_impacto: "Validação conceitual da arquitetura do painel com métricas auditáveis e total conformidade com a LGPD.", ferramentas_utilizadas: "Power BI, Excel, Metodologias de People Analytics, LGPD" },
    { id: 9, titulo: "Desafio Quant AI 2026: Robô de Investimentos Aequitas Value Robot", organizacao: "Itaú Asset Management", tipo_projeto: "Finanças Quantitativas e Inteligência Artificial", descricao: "Desenvolvimento de modelo algorítmico e quantitativo unindo Value Investing com inteligência artificial.", desafio: "Transformar indicadores contábeis em algoritmo preditivo com proteção contra value traps.", solucao: "Triagem sistemática de fatores contábeis (P/L, EV/EBITDA, ROIC), modelagem quantitativa sob mentoria de Vitor Borges Monteiro.", resultados_impacto: "Conclusão de todas as etapas eliminatórias com homologação pela Itaú Asset; certificado oficial emitido.", ferramentas_utilizadas: "Python, Algoritmos Quantitativos, Machine Learning, Análise Fundamentalista, Value Investing, Excel" },
    { id: 10, titulo: "Automação Corporativa e Engenharia de Prompts com IA Generativa", organizacao: "Banco do Nordeste / Autônomo", tipo_projeto: "Inteligência Artificial Generativa e Produtividade", descricao: "Desenvolvimento de fluxos estruturados de prompting para suporte a People Analytics, redação executiva e governança do Career OS.", desafio: "Otimizar rotinas corporativas garantindo 100% de aderência factual e respeito à LGPD.", solucao: "Criação de prompts parametrizados para correlação de dados de clima, briefings e arquitetura de 3 camadas (Framework DOE).", resultados_impacto: "Aumento exponencial de produtividade e consolidação do ecossistema MELISSA CAREER OS.", ferramentas_utilizadas: "Microsoft Copilot (M365), ChatGPT, Engenharia de Prompts, Python, SQLite, Markdown" }
  ],
  empresas_alvo: [
    { nome: "Ambev", setor: "Bens de Consumo / Bebidas", perfil_empresa: "Grande Multinacional", programas_interesse: "Estágio / Trainee Ambev", fit_cultural: "Cultura de dono, ambição, resolução de problemas e capacidade de execução.", palavras_chave: "gente e gestão, logística, finanças, dados, liderança de impacto", status_monitoramento: "Mapeando" },
    { nome: "Banco do Nordeste (BNB)", setor: "Serviços Financeiros / Desenvolvimento Regional", perfil_empresa: "Instituição Financeira Pública", programas_interesse: "Estágio Atual / Continuidade em Projetos de Alto Impacto", fit_cultural: "Foco no desenvolvimento do Nordeste, sustentabilidade, ESG e gestão de pessoas.", palavras_chave: "gestão de pessoas, clima organizacional, fne, impacto regional, desenvolvimento", status_monitoramento: "Estágio Atual (Colaboradora)" },
    { nome: "Google", setor: "Tecnologia / Internet", perfil_empresa: "Big Tech Global", programas_interesse: "Google Business Internship / Programas de Jovens Talentos", fit_cultural: "Inovação, diversidade, raciocínio estruturado, comunicação clara e adaptabilidade rápida.", palavras_chave: "people operations, business strategy, data analytics, product support, dei", status_monitoramento: "Mapeando" },
    { nome: "Itaú Unibanco", setor: "Serviços Financeiros / Bancário", perfil_empresa: "Instituição Financeira Privada", programas_interesse: "Programa de Estágio Corporativo / Trainee", fit_cultural: "Foco em resultados, inovação digital, meritocracia e liderança jovem.", palavras_chave: "corporate banking, rh estratégico, data analytics, agilidade", status_monitoramento: "Mapeando" },
    { nome: "M. Dias Branco", setor: "Bens de Consumo / Indústria Alimentícia", perfil_empresa: "Grande Nacional / Multinacional Brasileira", programas_interesse: "Estágio / Trainee Corporativo", fit_cultural: "Forte cultura de eficiência, liderança regional e global, valorização de talentos UFC.", palavras_chave: "supply chain, governança, finanças corporativas, gente e gestão, d&i", status_monitoramento: "Mapeando" }
  ]
};

let appData = FALLBACK_DATA;

// ======================================================================
// Carregamento de dados (data.js > data.json > fallback)
// ======================================================================
async function loadData() {
  if (window.CAREER_DATA && window.CAREER_DATA.perfil) {
    appData = window.CAREER_DATA;
  } else {
    try {
      const res = await fetch("data.json");
      if (res.ok) {
        const json = await res.json();
        if (json && json.perfil) {
          appData = json;
        }
      }
    } catch (e) {
      console.warn("Modo offline: utilizando dados embutidos de fallback.");
    }
  }
  renderAll();
}

// ======================================================================
// Tabs e Tema
// ======================================================================
function setupTabs() {
  document.querySelectorAll(".nav-btn[data-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-btn[data-tab]").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      const pane = document.getElementById(target);
      if (pane) pane.classList.add("active");
    });
  });
}

function setupTheme() {
  const toggle = document.getElementById("themeToggle");
  const isDark = localStorage.getItem("theme") === "dark";
  if (isDark) document.body.classList.add("dark-mode");

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const activeDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", activeDark ? "dark" : "light");
    toggle.textContent = activeDark ? "☀️ Claro" : "🌙 Escuro";
  });
}

// ======================================================================
// Renderização Principal
// ======================================================================
function renderAll() {
  renderCockpitMetrics();
  renderRadar();
  renderNetflixCards();
  renderStarStories();
  renderWarRoom();
  renderCompetencias();
  setupResumeViewer();
  setupIFoodStudyModule();
  renderFooter();
}

// ======================================================================
// COCKPIT — Métricas Dinâmicas
// ======================================================================
function renderCockpitMetrics() {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setVal("statAreas", (appData.radar_areas || []).length);
  setVal("statProjetos", (appData.projetos || []).length);
  setVal("statSTAR", (appData.historias_star || []).length);
  setVal("statCompetencias", (appData.competencias || []).length);
  setVal("statEmpresas", (appData.empresas_alvo || []).length);

  // Processos ativos (não-exemplos)
  const procs = appData.processos_seletivos || [];
  const activeCount = procs.filter(p => {
    const st = (p.status || "").toLowerCase();
    return !st.includes("exemplo") && !st.includes("simula") && st !== "concluido";
  }).length;
  setVal("statActiveProcesses", activeCount);
}

// ======================================================================
// RADAR — Mini (Cockpit) + Full (Tab)
// ======================================================================
function renderRadar() {
  const miniContainer = document.getElementById("radarList");
  const fullContainer = document.getElementById("radarFullContainer");
  if (miniContainer) miniContainer.innerHTML = "";
  if (fullContainer) fullContainer.innerHTML = "";

  const areas = appData.radar_areas || [];
  areas.forEach((a, idx) => {
    // Mini radar (Cockpit - top 4)
    if (miniContainer && idx < 4) {
      const div = document.createElement("div");
      div.className = "radar-item";
      div.innerHTML = `
        <div class="radar-header">
          <span class="radar-title">${a.area_nome}</span>
          <span class="radar-badge">${a.fit_percentual}% Match</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${a.fit_percentual}%"></div>
        </div>
      `;
      miniContainer.appendChild(div);
    }

    // Full radar (Tab Radar)
    if (fullContainer) {
      const card = document.createElement("div");
      card.className = "radar-item";
      card.style.marginBottom = "1.25rem";
      card.innerHTML = `
        <div class="radar-header">
          <span class="radar-title" style="font-size: 1.05rem;">${a.area_nome}</span>
          <span class="tag" style="background: rgba(37,99,235,0.15); color: var(--primary); font-size: 0.85rem;">${a.fit_percentual}% Match (${a.nivel_afinidade})</span>
        </div>
        <div class="progress-bar-bg" style="height: 10px; margin: 0.5rem 0 1rem 0;">
          <div class="progress-bar-fill" style="width: ${a.fit_percentual}%"></div>
        </div>
        <div class="radar-details" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
          <div><strong>Principais Forças:</strong><p>${a.principais_forcas}</p></div>
          <div><strong>Gaps Identificados:</strong><p>${a.gaps_identificados}</p></div>
          <div style="grid-column: 1 / -1; background: rgba(37,99,235,0.06); padding: 0.6rem 0.8rem; border-radius: 6px; border-left: 3px solid var(--primary);">
            <strong>Plano de Ação para Nota Máxima:</strong> ${a.plano_acao}
          </div>
        </div>
      `;
      fullContainer.appendChild(card);
    }
  });
}

// ======================================================================
// PORTFÓLIO — Netflix Cards (10 projetos)
// ======================================================================
function renderNetflixCards() {
  const container = document.getElementById("netflixGrid");
  if (!container) return;
  container.innerHTML = "";

  const bannerColors = [
    "linear-gradient(135deg, #1e3a8a, #3b82f6)",
    "linear-gradient(135deg, #064e3b, #10b981)",
    "linear-gradient(135deg, #7c2d12, #f59e0b)",
    "linear-gradient(135deg, #312e81, #8b5cf6)",
    "linear-gradient(135deg, #1e40af, #0ea5e9)",
    "linear-gradient(135deg, #831843, #ec4899)",
    "linear-gradient(135deg, #365314, #84cc16)",
    "linear-gradient(135deg, #78350f, #d97706)",
    "linear-gradient(135deg, #134e4a, #14b8a6)",
    "linear-gradient(135deg, #1e1b4b, #6366f1)"
  ];

  const projs = appData.projetos || [];
  projs.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "netflix-card";
    const bg = bannerColors[i % bannerColors.length];

    // Separar ferramentas em tags individuais
    const tools = (p.ferramentas_utilizadas || "").split(",").map(t => t.trim()).filter(Boolean);
    const toolTags = tools.map(t => `<span class="tag" style="background: rgba(14, 165, 233, 0.1); color: var(--accent); font-size: 0.7rem;">${t}</span>`).join(" ");

    card.innerHTML = `
      <div class="card-banner" style="background: ${bg};">
        <span class="banner-org">${p.organizacao}</span>
        <span class="banner-title">${p.titulo}</span>
      </div>
      <div class="card-body">
        <p class="card-synopsis"><strong>Desafio:</strong> ${p.desafio}</p>
        <p class="card-synopsis"><strong>Solução:</strong> ${p.solucao}</p>
        <div class="card-impact">
          <strong>Impacto & Resultados:</strong> ${p.resultados_impacto}
        </div>
        <div class="hero-tags" style="margin-top: auto;">
          <span class="tag">${p.tipo_projeto}</span>
          ${toolTags}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ======================================================================
// HISTÓRIAS STAR (11 histórias completas)
// ======================================================================
function renderStarStories() {
  const container = document.getElementById("starContainer");
  if (!container) return;
  container.innerHTML = "";

  const stories = appData.historias_star || [];

  // Setup search/filter
  const searchInput = document.getElementById("starSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase();
      const cards = container.querySelectorAll(".star-card");
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? "block" : "none";
      });
    });
  }

  stories.forEach(s => {
    const card = document.createElement("div");
    card.className = "star-card";

    const secondaryBadges = (s.competencias_secundarias || "").split(",").map(c => c.trim()).filter(Boolean)
      .map(c => `<span class="tag" style="font-size: 0.68rem; background: rgba(14, 165, 233, 0.1); color: var(--accent);">${c}</span>`).join(" ");

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
        <h3 style="font-size: 1.1rem; color: var(--text-main);">${s.titulo}</h3>
        <span class="tag">${s.competencia_principal}</span>
      </div>
      ${s.instituicao_origem ? `<div class="star-origin">📍 ${s.instituicao_origem}</div>` : ""}
      ${secondaryBadges ? `<div class="hero-tags" style="margin: 0.4rem 0;">${secondaryBadges}</div>` : ""}
      <div class="star-block">
        <strong>📍 Situação (Contexto)</strong>
        ${s.situacao}
      </div>
      <div class="star-block" style="border-left-color: var(--accent);">
        <strong>🎯 Tarefa (Desafio / Objetivo)</strong>
        ${s.tarefa}
      </div>
      <div class="star-block" style="border-left-color: var(--warning);">
        <strong>⚙️ Ação (O Que Melissa Fez)</strong>
        ${s.acao}
      </div>
      <div class="star-block" style="border-left-color: var(--success); background: rgba(16, 185, 129, 0.05);">
        <strong>🏆 Resultado (Impacto Mensurável)</strong>
        ${s.resultado}
      </div>
    `;
    container.appendChild(card);
  });
}

// ======================================================================
// SALA DE GUERRA — Processos + Empresas
// ======================================================================
function renderWarRoom() {
  const compContainer = document.getElementById("companiesList");
  const procContainer = document.getElementById("activeProcessesList");

  if (compContainer) {
    compContainer.innerHTML = "";
    (appData.empresas_alvo || []).forEach(c => {
      const statusColor = (c.status_monitoramento || c.status || "").toLowerCase().includes("atual")
        ? "background: rgba(37, 99, 235, 0.15); color: var(--primary);"
        : "background: rgba(16, 185, 129, 0.15); color: var(--success);";

      const card = document.createElement("div");
      card.className = "radar-item";
      card.style.marginBottom = "0.75rem";
      card.innerHTML = `
        <div class="radar-header">
          <span class="radar-title">${c.nome} <span style="font-weight: 400; font-size: 0.8rem; color: var(--text-muted);">&bull; ${c.setor}</span></span>
          <span class="tag" style="${statusColor}">${c.status_monitoramento || c.status}</span>
        </div>
        <div class="radar-details">
          <p><strong>Programas:</strong> ${c.programas_interesse || c.perfil || c.perfil_empresa}</p>
          ${c.fit_cultural ? `<p><strong>Fit Cultural:</strong> ${c.fit_cultural}</p>` : ""}
          <p><strong>Palavras-Chave:</strong> <code style="font-size: 0.78rem;">${c.palavras_chave}</code></p>
        </div>
      `;
      compContainer.appendChild(card);
    });
  }

  if (procContainer) {
    procContainer.innerHTML = "";
    const procs = appData.processos_seletivos || [];
    const activeProcs = procs.filter(p => {
      const st = (p.status || "").toLowerCase();
      return !st.includes("exemplo") && !st.includes("simula") && st !== "concluido";
    });
    const exampleProcs = procs.filter(p => {
      const st = (p.status || "").toLowerCase();
      return st.includes("exemplo") || st.includes("simula");
    });

    const statCountElem = document.getElementById("statActiveProcesses");
    if (statCountElem) {
      statCountElem.textContent = activeProcs.length;
    }

    if (activeProcs.length === 0) {
      const emptyCard = document.createElement("div");
      emptyCard.className = "radar-item";
      emptyCard.style.borderLeft = "4px solid #94a3b8";
      emptyCard.style.marginBottom = "1rem";
      emptyCard.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
          <span style="font-size: 1.1rem;">🎯</span>
          <strong style="color: var(--text-main); font-size: 0.95rem;">Nenhum Processo Seletivo Ativo no Momento</strong>
        </div>
        <p style="font-size: 0.83rem; color: var(--text-muted); margin: 0.2rem 0 0 0;">
          O pipeline da Sala de Guerra está livre. Assim que você se candidatar a uma vaga real, ela será registrada aqui para acompanhamento de prazos e etapas.
        </p>
      `;
      procContainer.appendChild(emptyCard);
    } else {
      activeProcs.forEach(p => {
        const card = document.createElement("div");
        card.className = "radar-item";
        card.style.marginBottom = "0.75rem";
        card.style.borderLeft = "4px solid var(--primary)";
        card.innerHTML = `
          <div class="radar-header">
            <span class="radar-title">${p.empresa} — ${p.cargo_vaga}</span>
            <span class="tag" style="background: rgba(37,99,235,0.15); color: var(--primary);">${p.status}</span>
          </div>
          <div class="radar-details" style="margin-top: 0.4rem;">
            <p><strong>Etapa Atual:</strong> ${p.etapa_atual} | <strong>Próximo Prazo:</strong> ${p.proximo_prazo || 'Acompanhando'}</p>
            <p><strong>Estratégia:</strong> ${p.anotacoes_estrategicas}</p>
            <div style="margin-top: 0.5rem;">
              <a href="../../${p.curriculo_usado}" target="_blank" class="nav-btn" style="background: #eff6ff; color: var(--primary); text-decoration: none; font-size: 0.78rem; padding: 0.25rem 0.6rem; display: inline-block;">
                📄 Abrir Currículo Cirúrgico (PDF)
              </a>
            </div>
          </div>
        `;
        procContainer.appendChild(card);
      });
    }

    if (exampleProcs.length > 0) {
      const headerDiv = document.createElement("div");
      headerDiv.style.marginTop = "1.2rem";
      headerDiv.style.marginBottom = "0.6rem";
      headerDiv.innerHTML = `
        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.6px; color: var(--text-muted); margin: 0;">
          🧪 Exemplos de Calibração & Simulações Práticas (${exampleProcs.length})
        </h4>
      `;
      procContainer.appendChild(headerDiv);

      exampleProcs.forEach(p => {
        const card = document.createElement("div");
        card.className = "radar-item";
        card.style.marginBottom = "0.75rem";
        card.style.borderLeft = "4px solid #64748b";
        card.innerHTML = `
          <div class="radar-header">
            <span class="radar-title">${p.empresa} — ${p.cargo_vaga}</span>
            <span class="tag" style="background: #f1f5f9; color: #475569; font-size: 0.75rem;">Simulação / Exemplo</span>
          </div>
          <div class="radar-details" style="margin-top: 0.4rem;">
            <p><strong>Status:</strong> ${p.etapa_atual} | <strong>Finalidade:</strong> Calibração de Currículo Cirúrgico</p>
            <p><strong>Estratégia:</strong> ${p.anotacoes_estrategicas}</p>
            <div style="margin-top: 0.5rem;">
              <a href="../../${p.curriculo_usado}" target="_blank" class="nav-btn" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #334155; text-decoration: none; font-size: 0.78rem; padding: 0.25rem 0.6rem; display: inline-block;">
                📄 Ver Currículo Customizado (PDF)
              </a>
            </div>
          </div>
        `;
        procContainer.appendChild(card);
      });
    }
  }
}

// ======================================================================
// COMPETÊNCIAS — Grid Agrupada por Categoria (29 competências)
// ======================================================================
function renderCompetencias() {
  const container = document.getElementById("competenciasContainer");
  if (!container) return;
  container.innerHTML = "";

  const comps = appData.competencias || [];

  // Agrupar por categoria
  const grupos = {};
  comps.forEach(c => {
    const cat = c.categoria || "Outros";
    if (!grupos[cat]) grupos[cat] = [];
    grupos[cat].push(c);
  });

  // Emojis para categorias
  const catEmoji = {
    "Hard Skill": "🔧",
    "Soft Skill": "💡",
    "Ferramenta / Software": "💻",
    "Metodologia": "📐",
    "Idiomas": "🌍",
    "Finanças": "💰",
    "Liderança": "👑",
    "Inteligência Artificial": "🤖",
    "Auditoria & Dados": "📊"
  };

  // Mapeamento de nível para classe CSS
  function nivelClass(nivel) {
    const n = (nivel || "").toLowerCase();
    if (n.includes("avançado") && !n.includes("intermediário")) return "avancado";
    if (n.includes("intermediário-avançado") || n.includes("intermediario-avançado")) return "intermediario-avancado";
    if (n.includes("intermediário") || n.includes("intermediario")) return "intermediario";
    return "basico";
  }

  Object.keys(grupos).sort().forEach(cat => {
    const section = document.createElement("div");
    section.className = "competencia-categoria";
    const emoji = catEmoji[cat] || "📌";
    const items = grupos[cat];

    let html = `<h3>${emoji} ${cat} <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-muted);">(${items.length})</span></h3>`;
    items.forEach(c => {
      const cls = nivelClass(c.nivel_proficiencia);
      html += `
        <div class="competencia-item">
          <div>
            <div class="competencia-nome">${c.nome}</div>
            <div class="competencia-evidencias">${c.evidencias_projetos || c.areas_aplicadas || ""}</div>
          </div>
          <span class="competencia-nivel ${cls}">${c.nivel_proficiencia}</span>
        </div>
      `;
    });

    section.innerHTML = html;
    container.appendChild(section);
  });
}

// ======================================================================
// CURRÍCULO CAMALEÃO — Viewer por Iframe
// ======================================================================
function setupResumeViewer() {
  const pills = document.querySelectorAll(".resume-pill");
  const resumeFrame = document.getElementById("resumeViewerFrame");
  const resumeDownloadBtn = document.getElementById("resumeDownloadPdf");

  const resumeMap = {
    "MESTRE": { folder: "CURRICULO_MESTRE", file: "CURRICULO_MESTRE", isVaga: false },
    "RH": { folder: "RH_E_GESTAO_DE_PESSOAS", file: "CURRICULO_RH_E_GESTAO_DE_PESSOAS", isVaga: false },
    "CORPORATE": { folder: "CORPORATE_E_ESTRATEGIA", file: "CURRICULO_CORPORATE_E_ESTRATEGIA", isVaga: false },
    "FINANCAS": { folder: "FINANCAS", file: "CURRICULO_FINANCAS", isVaga: false },
    "BI": { folder: "BI_DADOS_E_PERFORMANCE", file: "CURRICULO_BI_DADOS_E_PERFORMANCE", isVaga: false },
    "ESG": { folder: "ESG_E_SUSTENTABILIDADE", file: "CURRICULO_ESG_E_SUSTENTABILIDADE", isVaga: false },
    "PRODUTOS": { folder: "PRODUTOS_E_INOVACAO", file: "CURRICULO_PRODUTOS_E_INOVACAO", isVaga: false },
    "MARKETING": { folder: "MARKETING_E_COMUNICACAO", file: "CURRICULO_MARKETING_E_COMUNICACAO", isVaga: false },
    "GOOGLE": { folder: "CURRICULOS_POR_VAGA", file: "2026-09_GOOGLE_BUSINESS_INTERNSHIP", isVaga: true },
    "M_DIAS": { folder: "CURRICULOS_POR_VAGA", file: "2026-09_M_DIAS_BRANCO_ESTAGIO_GENTE_E_GESTAO", isVaga: true },
    "BNB": { folder: "CURRICULOS_POR_VAGA", file: "2026-09_BANCO_DO_NORDESTE_GESTAO_DE_PESSOAS", isVaga: true }
  };

  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      const key = pill.getAttribute("data-resume");
      const r = resumeMap[key];
      if (r && resumeFrame) {
        let htmlPath = "";
        let pdfPath = "";
        if (r.isVaga) {
          htmlPath = `../../02_CURRICULO_CAMALEAO/CURRICULOS_POR_VAGA/${r.file}.html`;
          pdfPath = `../../02_CURRICULO_CAMALEAO/CURRICULOS_POR_VAGA/${r.file}.pdf`;
        } else {
          htmlPath = `../../02_CURRICULO_CAMALEAO/${r.folder}/${r.file}.html`;
          pdfPath = `../../02_CURRICULO_CAMALEAO/${r.folder}/${r.file}.pdf`;
        }
        resumeFrame.src = htmlPath;
        if (resumeDownloadBtn) {
          resumeDownloadBtn.href = pdfPath;
          resumeDownloadBtn.textContent = `📥 Baixar PDF (${key})`;
        }
      }
    });
  });
}

// ======================================================================
// MÓDULO DE ESTUDO IFOOD (iFuture 2027 — Webcase Salão)
// ======================================================================
function setupIFoodStudyModule() {
  const stepper = document.getElementById("journeyStepper");
  const detailBox = document.getElementById("journeyDetailBox");

  // --- Contagem Regressiva para a Dinâmica (24/09 às 09:30) ---
  function updateCountdown() {
    // 24 de Setembro de 2026 às 09:30 (mês 8 = setembro no JS)
    const target = new Date(2026, 8, 24, 9, 30, 0).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    const daysEl = document.getElementById("cdDays");
    const hoursEl = document.getElementById("cdHours");
    const minsEl = document.getElementById("cdMins");
    const secsEl = document.getElementById("cdSecs");

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(mins).padStart(2, "0");
    secsEl.textContent = String(secs).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const JOURNEY_STEPS = [
    {
      titulo: "1. Descobrir (App iFood & iFood Ads)",
      dorCliente: "Indecisão sobre onde comer fora; pesquisa dispersa no Google/Instagram sem ver cardápio, fotos reais ou benefícios consolidados.",
      dorRestaurante: "Dependência de WhatsApp e redes sociais (onde 60% pedem informalmente); alto custo com marketing digital sem conversão de salão mensurável.",
      solucaoIFood: "Aba 'Comer Fora' geolocalizada com filtros por ocasião, culinária e iFood Ads impulsionando descoberta e atraindo clientes em horários ociosos.",
      metricaChave: "Taxa de conversão de busca para check-in presencial."
    },
    {
      titulo: "2. Escolher (Cardápio Digital & Avaliações)",
      dorCliente: "Cardápios em QR Code mal formatados (PDFs pesados, sem preços atualizados ou ilegíveis no celular).",
      dorRestaurante: "Custo recorrente de impressão de cardápios físicos e lentidão para pausar itens esgotados na cozinha.",
      solucaoIFood: "Cardápio Digital interativo nativo no app do iFood com fotos de alta qualidade, avaliações verificadas e sincronização em tempo real.",
      metricaChave: "Tempo médio de decisão e visualização de pratos de alta margem."
    },
    {
      titulo: "3. Reservar (Gestão Inteligente de Filas & Reservas)",
      dorCliente: "Esperar de 30 a 60 minutos em pé na calçada com fome e estresse sem previsão confiável de liberação.",
      dorRestaurante: "Abandono silencioso de fila (clientes indo para o concorrente), no-shows de reservas telefônicas e mesas ociosas.",
      solucaoIFood: "Fila de espera virtual com notificação push quando a mesa estiver pronta e gestão preditiva de ocupação com IA.",
      metricaChave: "Queda na taxa de abandono de fila e redução de no-shows."
    },
    {
      titulo: "4. Visitar (Check-in via Geolocalização no Salão)",
      dorCliente: "Dificuldade de sinalizar ao garçom que já sentou e está pronto para ser atendido.",
      dorRestaurante: "O restaurante é 'cego' no salão: não sabe quem é o cliente, histórico de pedidos ou ticket médio histórico.",
      solucaoIFood: "Check-in presencial via QR Code na mesa ou geolocalização, conectando o cliente ao CRM do restaurante para ofertas personalizadas.",
      metricaChave: "Adoção de check-in e ativação de dados para o CRM de salão."
    },
    {
      titulo: "5. Consumir (Pagar na Mesa + PDVs)",
      dorCliente: "A maior dor de quem come fora: pedir a conta, esperar o garçom trazer a maquininha, dividir conta e pegar recibo (15 a 25 min perdidos).",
      dorRestaurante: "Garçons gastam 25% do tempo apenas transportando maquininhas; mesas ficam bloqueadas sem consumo após a refeição.",
      solucaoIFood: "Solução 'Pagar na Mesa': divisão de conta pelo app em segundos, pagamento com cartão cadastrado ou iFood Benefícios e liberação imediata.",
      metricaChave: "Redução de 15 min por mesa = aumento de até 25% no giro de mesas no horário de pico!"
    },
    {
      titulo: "6. Retornar (Cashback Unificado & Fidelidade)",
      dorCliente: "Paga caro no salão e sai sem incentivos palpáveis para retornar ao mesmo estabelecimento.",
      dorRestaurante: "Custo elevado de aquisição de novos clientes (CAC) por falta de mecanismos integrados de retenção e recompra.",
      solucaoIFood: "Cashback unificado no app (acumulado no salão para usar no delivery e vice-versa) e integração com o Clube iFood.",
      metricaChave: "Frequência de retorno (recorrência em 30 e 60 dias) e LTV do ecossistema."
    }
  ];

  function renderJourneyStep(idx) {
    if (!detailBox) return;
    const s = JOURNEY_STEPS[idx] || JOURNEY_STEPS[0];
    detailBox.innerHTML = `
      <div style="font-weight: 800; font-size: 1.05rem; color: #ea1d2c; margin-bottom: 0.75rem;">${s.titulo}</div>
      <div class="journey-grid">
        <div class="journey-item-card">
          <div class="journey-item-title">👤 Dor do Consumidor</div>
          <div style="font-size: 0.85rem; color: var(--text-main);">${s.dorCliente}</div>
        </div>
        <div class="journey-item-card">
          <div class="journey-item-title">🏪 Dor do Restaurante</div>
          <div style="font-size: 0.85rem; color: var(--text-main);">${s.dorRestaurante}</div>
        </div>
        <div class="journey-item-card">
          <div class="journey-item-title">⚡ Solução iFood Salão</div>
          <div style="font-size: 0.85rem; color: var(--text-main);">${s.solucaoIFood}</div>
        </div>
        <div class="journey-item-card" style="border-left: 3px solid #10b981;">
          <div class="journey-item-title" style="color: #10b981;">🎯 Métrica / KPI Chave</div>
          <div style="font-size: 0.85rem; color: var(--text-main); font-weight: 600;">${s.metricaChave}</div>
        </div>
      </div>
    `;
  }

  if (stepper) {
    const stepBtns = stepper.querySelectorAll(".journey-step");
    stepBtns.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        stepBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderJourneyStep(idx);
      });
    });
    renderJourneyStep(0);
  }

  // --- Simulador de Impacto no Salão ---
  function updateIFoodSimulator() {
    const inputMesas = document.getElementById("inputMesas");
    if (!inputMesas) return;

    const mesas = parseInt(inputMesas.value || 30);
    const ticket = parseInt(document.getElementById("inputTicket")?.value || 130);
    const tempoAtual = parseInt(document.getElementById("inputTempoAtual")?.value || 75);
    const economia = parseInt(document.getElementById("inputEconomia")?.value || 15);

    const tempoNovo = Math.max(30, tempoAtual - economia);
    const picoMinutos = 180; // 3 horas de pico (ex: 19h30 às 22h30)
    const girosAtuais = picoMinutos / tempoAtual;
    const novosGiros = picoMinutos / tempoNovo;

    const totalMesasAtuais = Math.round(mesas * girosAtuais);
    const totalMesasNovas = Math.round(mesas * novosGiros);
    const mesasExtras = Math.max(0, totalMesasNovas - totalMesasAtuais);

    const receitaExtraNoite = mesasExtras * ticket;
    const receitaExtraFimDeSemana = receitaExtraNoite * 3;

    const setTxt = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    setTxt("valMesas", mesas);
    setTxt("valTicket", "R$ " + ticket);
    setTxt("valTempoAtual", tempoAtual + " min");
    setTxt("valEconomia", economia + " min");

    setTxt("resGirosAtuais", girosAtuais.toFixed(1) + " giros");
    setTxt("resNovosGiros", novosGiros.toFixed(1) + " giros");
    setTxt("resMesasExtras", "+" + mesasExtras + " mesas");
    setTxt("resReceitaExtra", "+R$ " + receitaExtraNoite.toLocaleString("pt-BR"));

    const concEl = document.getElementById("calcConclusion");
    if (concEl) {
      concEl.innerHTML = `💡 <strong>Argumento de Venda para o Dono:</strong> Em um fim de semana (Sex-Dom), o restaurante fatura cerca de <strong>+R$ ${receitaExtraFimDeSemana.toLocaleString("pt-BR")} adicionais</strong> sem contratar novos garçons nem ampliar o espaço físico!`;
    }
  }

  ["inputMesas", "inputTicket", "inputTempoAtual", "inputEconomia"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateIFoodSimulator);
  });
  updateIFoodSimulator();

  // --- Flashcards de Estudo Baseados no Deck Oficial de Cultura 2025 ---
  const FLASHCARDS_DATA = {
    cultura: [
      {
        titulo: "Propósito: Alimentar o Futuro do Mundo",
        preview: "A bandeira central que guia todas as decisões e negócios do iFood.",
        detalhe: "Não é apenas sobre entrega de comida, mas sobre criar tecnologia proprietária para revolucionar a forma como as pessoas vivem e fazem negócios. Conecte sua fala na dinâmica com o impacto positivo para restaurantes e entregadores."
      },
      {
        titulo: "J.i.T. • Conflitos Produtivos",
        preview: "'Seja brutal com os problemas, nunca com as pessoas.'",
        detalhe: "O iFood repudia o 'falso consenso'. Discorde com franqueza, respeito e escuta ativa. Traga opiniões opostas sem grosseria para encontrar a melhor solução para o negócio."
      },
      {
        titulo: "J.i.T. • Ambidestria (Transatlântico & Jet-skis)",
        preview: "Inovar sem perder a eficiência: manter o hoje rodando enquanto constrói o amanhã.",
        detalhe: "O delivery consolidado é o Transatlântico (eficiência e estabilidade). Novos negócios como o 'Comer Fora / iFood Salão' são Jet-skis: testes rápidos, ágeis e sem colocar o navio em risco."
      },
      {
        titulo: "J.i.T. • Priorize 80/20 e Entregue",
        preview: "Foque no essencial. Descomplique o caminho e transforme problemas em soluções.",
        detalhe: "Tenha a maturidade de desapegar de ideias legais que não são viáveis no tempo da dinâmica. Foque nas 2 ou 3 alavancas de maior impacto na receita e giro do restaurante."
      },
      {
        titulo: "J.i.T. • Mentalidade de Dono(a)",
        preview: "Coloque o iFood em primeiro lugar. Assuma responsabilidade sem terceirizar.",
        detalhe: "Assuma o front! Se ninguém puxar a contagem do tempo ou a divisão das falas no pitch, tome a iniciativa com postura agregadora e proativa."
      },
      {
        titulo: "J.i.T. • Ágil: Falhe Rápido e Aprenda",
        preview: "Aprenda fazendo: teste, erre, corrija rápido e ajuste a rota sem medo.",
        detalhe: "Na dinâmica, se o grupo perceber que uma proposta inicial é fraca ou tem falha operacional, elogie a descoberta do erro e mude a rota rapidamente sem apego ao ego."
      }
    ],
    simbolos: [
      {
        titulo: "Kung Fu • Alma Startupeira & Eficiência",
        preview: "Alta performance, agilidade, fail fast e drible à burocracia.",
        detalhe: "O Kung Fu não descansa até extrair o potencial máximo com austeridade e simplicidade. Representa o valor de RESULTADOS com agilidade de startup."
      },
      {
        titulo: "Elefante Johnny • Os Fatos Brutais na Sala",
        preview: "Encarar a verdade de frente com respeito e foco na solução.",
        detalhe: "Quando algo não está dando certo no grupo ou no case, o Elefante Johnny entra na sala para colocar a verdade às claras — sem ser agressivo e sem 'passar pano'."
      },
      {
        titulo: "Canarinho • Garra e Coragem sob Pressão",
        preview: "Foco para reinar no caos e força brasileira inabalável.",
        detalhe: "Representa a coragem de não abaixar a cabeça diante da incerteza, da pressão de tempo da dinâmica e dos desafios de um mercado complexo."
      },
      {
        titulo: "High Quality Agreement (HQA)",
        preview: "Discordar construtivamente no debate, mas remar 100% juntos após a decisão.",
        detalhe: "Debata com garra; mas, assim que o grupo escolher o caminho, apoie com energia máxima. Nunca critique a decisão coletiva durante o pitch final."
      },
      {
        titulo: "Evitar o 'Brilliant Jerk'",
        preview: "O iFood não tolera quem entrega resultado atropelando as pessoas.",
        detalhe: "Buscar o melhor resultado envolve O QUÊ você entrega e COMO você entrega. Tratar os colegas com desrespeito ou arrogância elimina qualquer candidato na hora."
      },
      {
        titulo: "#EatYourOwnDogFood",
        preview: "Testar as soluções internamente com a comunidade antes de lançar ao mercado.",
        detalhe: "Citar na dinâmica: 'Podemos testar o Pagar na Mesa primeiro nos restaurantes dos próprios polos e escritórios com os FoodLovers para coletar feedbacks rápidos antes do rollout nacional!'"
      }
    ],
    solucoes: [
      {
        titulo: "Garçom Parceiro & Gamificação no Salão",
        preview: "Superar a resistência dos garçons ao cardápio digital e ao pagamento pelo app.",
        detalhe: "Garantir a taxa de serviço (gorjeta de 10-13%) diretamente no app 'Pagar na Mesa' com repasse instantâneo e bonificação do iFood por check-ins realizados. (Fit com a experiência de Melissa em Gamificação)."
      },
      {
        titulo: "Clube Omnichannel (Cashback Cruzado)",
        preview: "Fazer o cliente de delivery frequentar o salão e vice-versa.",
        detalhe: "Quem pede delivery durante a semana ganha créditos/cashback para gastar no salão no sábado. Quem come no salão ganha cupom exclusivo para delivery em dias chuvosos. Eleva o LTV bilateral."
      },
      {
        titulo: "Cardápio Inteligente com Pré-Pedido no Trajeto",
        preview: "Atender quem tem tempo escasso no almoço corporativo (iFood Benefícios).",
        detalhe: "O cliente reserva a mesa e já adianta os pedidos de bebidas e pratos enquanto está a caminho. Ao sentar, a comida é servida em minutos. Giro de mesa ultrarrápido."
      },
      {
        titulo: "Migração do WhatsApp para CRM Integrado",
        preview: "Capturar os 60% que pedem fora de plataformas dedicadas.",
        detalhe: "Oferecer aos restaurantes uma ferramenta do iFood que automatiza respostas de WhatsApp e gera links diretos para reservas e cardápio digital com desconto na 1ª visita física."
      }
    ],
    frases: [
      {
        titulo: "Como Abrir a Discussão no Grupo",
        preview: "Estabelecer liderança facilitadora nos primeiros 60 segundos.",
        detalhe: "'Pessoal, muito prazer! Para aproveitarmos ao máximo nosso tempo, o que acham de gastarmos os primeiros 5 min alinhando dores, 10 min desenhando soluções e os 5 min finais fechando quem fala cada ponto no pitch?'"
      },
      {
        titulo: "Como Puxar os Dados do Pré-Work",
        preview: "Usar dados para embasar decisões sem soar pedante.",
        detalhe: "'Concordo com essa direção. Vale resgatarmos um número do pré-work: hoje só 24% dos restaurantes têm operação híbrida e 60% pedem pelo WhatsApp. Nossa solução tem que ser super amigável pro dono adotar no balcão.'"
      },
      {
        titulo: "Como Destravar um Impasse entre Colegas",
        preview: "Conciliar opiniões divergentes com visão de ecossistema.",
        detalhe: "'Temos duas ideias muito ricas aqui: a do [Colega A] focando no cliente e a do [Colega B] focando no restaurante. Como o iFood é uma plataforma de duas pontas, que tal conectarmos as duas na nossa jornada 360°?'"
      },
      {
        titulo: "Como Fechar o Pitch Final",
        preview: "Organizar o grupo para uma apresentação brilhante de 3 minutos.",
        detalhe: "'Faltam 5 minutos! Vamos organizar nossa fala em 4 blocos de 30 a 45 segundos: 1) O Problema e Dados ➔ 2) Nossa Solução ➔ 3) O Impacto no Ecossistema ➔ 4) Métricas e Próximos Passos.'"
      }
    ],
    perguntas: [
      {
        titulo: "E se o restaurante recusar por medo de taxas?",
        preview: "A objeção mais comum dos donos de estabelecimentos.",
        detalhe: "Argumento: O foco não é taxa, é giro de mesas. Se o restaurante economiza 15 minutos por mesa no pagamento, ele atende 18 mesas extras no pico (+R$ 2.300/noite). O ganho de eficiência cobre qualquer custo de plataforma."
      },
      {
        titulo: "Por que o cliente abriria o app dentro do salão?",
        preview: "Vencer a inércia do comportamento presencial tradicional.",
        detalhe: "Argumento: Conveniência e benefício financeiro. Ninguém gosta de esperar 15 minutos pelo garçom trazer a conta e a maquininha. Pagar na Mesa em 10 segundos com desconto e cashback resolve uma dor real e universal."
      },
      {
        titulo: "Isso canibaliza o Delivery do iFood?",
        preview: "Preocupação estratégica de canibalização de receita.",
        detalhe: "Argumento: Não! O mercado fora do lar movimenta R$ 495 bilhões. O cliente que sai para jantar com amigos ou família no sábado já não pediria delivery. Ao estar no salão, o iFood monetiza um momento de consumo onde antes era cego."
      },
      {
        titulo: "Como vocês aplicaram AI First no case?",
        preview: "Demonstrar alinhamento com a diretriz tecnológica do iFuture.",
        detalhe: "Argumento: IA na previsão preditiva de ocupação para gestão de compras no iFood Shop; IA na recomendação personalizada de pratos no cardápio digital; e IA no balanceamento dinâmico de filas de espera."
      }
    ]
  };

  const flashcardsGrid = document.getElementById("flashcardsGrid");
  const fcTabs = document.querySelectorAll(".fc-tab");

  function renderFlashcards(category) {
    if (!flashcardsGrid) return;
    const items = FLASHCARDS_DATA[category] || FLASHCARDS_DATA.cultura;
    flashcardsGrid.innerHTML = "";

    items.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "flashcard";
      card.innerHTML = `
        <div>
          <div class="fc-title"><span>📌</span> ${item.titulo}</div>
          <div class="fc-preview">${item.preview}</div>
          <div class="fc-answer" id="fcAns_${category}_${idx}" style="display: none;">
            ${item.detalhe}
          </div>
        </div>
        <button class="fc-toggle-btn" data-target="fcAns_${category}_${idx}">
          🔍 Ver Argumento / Detalhes ➔
        </button>
      `;
      flashcardsGrid.appendChild(card);
    });

    flashcardsGrid.querySelectorAll(".fc-toggle-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const ansEl = document.getElementById(targetId);
        if (ansEl) {
          const isHidden = ansEl.style.display === "none";
          ansEl.style.display = isHidden ? "block" : "none";
          btn.textContent = isHidden ? "▲ Ocultar Detalhes" : "🔍 Ver Argumento / Detalhes ➔";
        }
      });
    });
  }

  if (fcTabs.length > 0) {
    fcTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        fcTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const cat = tab.getAttribute("data-cat");
        renderFlashcards(cat);
      });
    });
    renderFlashcards("cultura");
  }
}

// ======================================================================
// FOOTER — Data de última atualização
// ======================================================================
function renderFooter() {
  const footerEl = document.getElementById("footerUpdate");
  if (!footerEl) return;

  const dataAtual = appData.perfil?.data_atualizacao;
  if (dataAtual) {
    // Formatar data brasileira
    const parts = dataAtual.split("-");
    if (parts.length === 3) {
      footerEl.textContent = `Última atualização: ${parts[2]}/${parts[1]}/${parts[0]}`;
    } else {
      footerEl.textContent = `Última atualização: ${dataAtual}`;
    }
  } else {
    footerEl.textContent = "Última atualização: dados offline";
  }
}

// ======================================================================
// INICIALIZAÇÃO
// ======================================================================
window.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupTheme();
  loadData();
});
