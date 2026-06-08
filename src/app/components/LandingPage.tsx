import { useState } from "react";
import {
  Car,
  Shield,
  TrendingUp,
  Users,
  Star,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Gift,
  Award,
  Zap,
  Menu,
  X,
} from "lucide-react";

interface LandingPageProps {
  onNavigate: (page: "login" | "register") => void;
}

const CATEGORIES = [
  {
    id: "moto-start",
    name: "MOTO START",
    icon: "🛵",
    description: "Sua primeira moto. Mobilidade imediata com parcelas que cabem no bolso.",
    faixaValor: "R$ 8.000 – R$ 12.000",
    parcelas: [
      { prazo: "24x", valor: "R$ 389" },
      { prazo: "36x", valor: "R$ 279" },
      { prazo: "48x", valor: "R$ 219" },
      { prazo: "60x", valor: "R$ 179" },
    ],
  },
  {
    id: "moto-pro",
    name: "MOTO PRO",
    icon: "🏍️",
    description: "Para quem quer mais potência e conforto no dia a dia.",
    faixaValor: "R$ 12.000 – R$ 18.000",
    parcelas: [
      { prazo: "24x", valor: "R$ 579" },
      { prazo: "36x", valor: "R$ 409" },
      { prazo: "48x", valor: "R$ 319" },
      { prazo: "60x", valor: "R$ 269" },
    ],
  },
  {
    id: "start",
    name: "START",
    icon: "🚗",
    description: "Carro de entrada. Independência no trânsito, segurança para a família.",
    faixaValor: "R$ 35.000 – R$ 50.000",
    parcelas: [
      { prazo: "36x", valor: "R$ 969" },
      { prazo: "48x", valor: "R$ 759" },
      { prazo: "60x", valor: "R$ 629" },
    ],
  },
  {
    id: "urban",
    name: "URBAN",
    icon: "🚙",
    description: "Conforto urbano. Mais espaço, mais recursos, mais qualidade de vida.",
    faixaValor: "R$ 55.000 – R$ 80.000",
    parcelas: [
      { prazo: "36x", valor: "R$ 1.549" },
      { prazo: "48x", valor: "R$ 1.219" },
      { prazo: "60x", valor: "R$ 1.009" },
    ],
  },
  {
    id: "family-suv",
    name: "FAMILY SUV",
    icon: "🛻",
    description: "Para a família crescer com segurança. SUV espaçoso e completo.",
    faixaValor: "R$ 90.000 – R$ 130.000",
    parcelas: [
      { prazo: "48x", valor: "R$ 1.989" },
      { prazo: "60x", valor: "R$ 1.649" },
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    icon: "🏆",
    description: "O topo da linha. Para quem constrói o seu patrimônio sem pressa.",
    faixaValor: "R$ 140.000 – R$ 200.000",
    parcelas: [
      { prazo: "48x", valor: "R$ 2.879" },
      { prazo: "60x", valor: "R$ 2.389" },
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Carlos Eduardo S.",
    city: "São Paulo – SP",
    category: "MOTO START",
    text: "Meu nome estava sujo há 3 anos. Tentei financiamento em 4 lugares diferentes e me rejeitaram. Na Mobix não precisei de nada disso. Hoje tenho minha moto e trabalho de motoboy. Mudou minha vida.",
    stars: 5,
    avatar: "CE",
  },
  {
    name: "Juliana Aparecida R.",
    city: "Belo Horizonte – MG",
    category: "START",
    text: "Sou MEI e os bancos nunca me aprovaram por falta de comprovação de renda. A Compra Programada foi diferente. Paguei as parcelas todo mês e no tempo certo recebi meu carro. Simples assim.",
    stars: 5,
    avatar: "JR",
  },
  {
    name: "Marcos Vinícius T.",
    city: "Fortaleza – CE",
    category: "URBAN",
    text: "Eu precisava de um carro maior para minha família. Sem entrada, sem fiador, parcelas que eu consigo pagar. Isso era tudo que eu precisava. A Mobix entregou exatamente o que prometeu.",
    stars: 5,
    avatar: "MV",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Escolha sua categoria",
    desc: "Selecione a moto ou carro que faz sentido para você agora. Pode mudar depois se quiser mais.",
  },
  {
    num: "02",
    title: "Defina o valor e o prazo",
    desc: "Escolha a parcela que cabe no seu bolso. De 24 a 60 meses. Sem burocracia.",
  },
  {
    num: "03",
    title: "Pague mensalmente",
    desc: "Cada pagamento acumula seu direito contratual. O sistema calcula e mostra tudo em tempo real.",
  },
  {
    num: "04",
    title: "Conquiste seu veículo",
    desc: "Ao final da quitação, receba seu veículo. Possibilidade de retirada antecipada com 50% quitado.",
  },
];

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [activeCategory, setActiveCategory] = useState("start");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currentCat = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[2];

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "var(--font-body)" }}>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c2d6b] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#f47920] flex items-center justify-center">
                <Car size={18} className="text-white" />
              </div>
              <span className="text-white text-xl" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
                Mobix
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {["Como funciona", "Categorias", "App", "Indicação"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-blue-200 hover:text-white text-sm transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate("login")}
                className="hidden md:block text-blue-200 hover:text-white text-sm transition-colors"
              >
                Entrar
              </button>
              <button
                onClick={() => onNavigate("register")}
                className="bg-[#f47920] hover:bg-[#d96a15] text-white px-5 py-2 rounded-lg text-sm transition-colors"
              >
                Criar conta grátis
              </button>
              <button
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a2560] px-4 py-4 space-y-3 border-t border-white/10">
            {["Como funciona", "Categorias", "App", "Indicação"].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-blue-200 hover:text-white text-sm py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => onNavigate("login")}
              className="block text-blue-200 hover:text-white text-sm py-1"
            >
              Entrar
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0c2d6b 0%, #1a3f7f 40%, #0f3580 70%, #0c2d6b 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, #f47920 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3a6fd8 0%, transparent 50%)`,
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
              <Shield size={14} className="text-[#f47920]" />
              <span className="text-blue-100 text-xs">Programa Privado de Aquisição Programada de Veículos</span>
            </div>
            <h1
              className="text-white mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            >
              Seu veículo próprio começa com o valor que{" "}
              <span className="text-[#f47920]">cabe no seu bolso.</span>
            </h1>
            <p className="text-blue-200 mb-8" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
              Quem não consegue financiar, agora consegue conquistar. A Compra Programada da Mobix é para quem
              foi rejeitado pelo banco — e merece uma chance real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => onNavigate("register")}
                className="flex items-center justify-center gap-2 bg-[#f47920] hover:bg-[#d96a15] text-white px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
                style={{ fontWeight: 700 }}
              >
                Criar minha conta
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => onNavigate("login")}
                className="flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg transition-all"
              >
                Já tenho conta
              </button>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                "Sem banco",
                "Sem juros abusivos",
                "Score não importa",
                "Nome sujo aceito",
              ].map((selo) => (
                <div key={selo} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#f47920]" />
                  <span className="text-blue-100 text-sm">{selo}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl bg-white/10 backdrop-blur border border-white/20 p-8 flex flex-col justify-center items-center text-center">
                <div className="text-6xl mb-4">🚗</div>
                <div className="text-white mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem" }}>
                  Compra Programada
                </div>
                <div className="text-blue-200 text-sm mb-6">Mobilidade que você conquista</div>
                <div className="w-full bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between text-xs text-blue-200 mb-2">
                    <span>Progresso</span>
                    <span>47%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-[#f47920] h-2 rounded-full" style={{ width: "47%" }} />
                  </div>
                  <div className="mt-3 text-white text-sm font-semibold">R$ 18.800 acumulados</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#f47920] text-white rounded-2xl px-4 py-2 text-sm" style={{ fontWeight: 700 }}>
                Sem juros abusivos!
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-2 shadow-xl">
                <div className="text-xs text-gray-500">Parcelas a partir de</div>
                <div className="text-[#0c2d6b]" style={{ fontWeight: 800, fontSize: "1.25rem" }}>R$ 179/mês</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POR QUE A MOBIX EXISTE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[#f47920] text-sm mb-3" style={{ fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Nossa história
              </div>
              <h2
                className="mb-6 text-[#0c2d6b]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Por que a Mobix existe?
              </h2>
              <p className="text-gray-600 mb-6" style={{ lineHeight: 1.8 }}>
                Milhões de brasileiros acordam todos os dias sem transporte próprio — não porque não querem, mas porque o sistema financeiro os excluiu. Score baixo. Nome sujo. Sem comprovação de renda formal. Sem entrada. O banco fecha a porta antes mesmo de escutar a história.
              </p>
              <p className="text-gray-600 mb-8" style={{ lineHeight: 1.8 }}>
                A Mobix nasceu para mudar isso. Criamos um programa de aquisição programada onde você não precisa pedir permissão para banco nenhum. Você paga parcelas acessíveis, acumula seu direito contratual e, no tempo certo, recebe seu veículo. Simples, transparente e humano.
              </p>
              <blockquote className="border-l-4 border-[#f47920] pl-6 italic text-gray-700" style={{ lineHeight: 1.8 }}>
                "Enquanto bancos rejeitam pessoas, nós ajudamos pessoas a conquistarem seus sonhos."
              </blockquote>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Users size={28} />, num: "48.000+", label: "Pessoas atendidas" },
                { icon: <Car size={28} />, num: "31.200+", label: "Veículos entregues" },
                { icon: <Shield size={28} />, num: "100%", label: "dos contratos honrados" },
                { icon: <TrendingUp size={28} />, num: "9,4/10", label: "Satisfação dos clientes" },
              ].map(({ icon, num, label }) => (
                <div
                  key={label}
                  className="bg-[#f8f9fc] rounded-2xl p-6 flex flex-col gap-3"
                >
                  <div className="text-[#f47920]">{icon}</div>
                  <div className="text-[#0c2d6b]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem" }}>
                    {num}
                  </div>
                  <div className="text-gray-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-24 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-[#f47920] text-sm mb-3" style={{ fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Simples assim
            </div>
            <h2
              className="text-[#0c2d6b] mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Como funciona a Compra Programada
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto" style={{ lineHeight: 1.7 }}>
              Sem burocracia, sem letras miúdas que enganam. O processo é direto ao ponto.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-6 shadow-sm border border-border relative overflow-hidden">
                <div
                  className="text-[#0c2d6b]/5 absolute -top-2 -right-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "5rem", lineHeight: 1 }}
                >
                  {step.num}
                </div>
                <div
                  className="text-[#f47920] mb-4"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem" }}
                >
                  {step.num}
                </div>
                <h3 className="text-[#0c2d6b] mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm" style={{ lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section id="categorias" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-[#f47920] text-sm mb-3" style={{ fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Escolha o seu
            </div>
            <h2
              className="text-[#0c2d6b] mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Categorias disponíveis
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#0c2d6b] text-white shadow-md"
                    : "bg-[#f8f9fc] text-gray-600 hover:bg-[#e8edf7] border border-border"
                }`}
                style={{ fontWeight: 600 }}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
          <div className="bg-[#f8f9fc] rounded-3xl p-8 border border-border">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-5xl mb-4">{currentCat.icon}</div>
                <h3
                  className="text-[#0c2d6b] mb-2"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem" }}
                >
                  {currentCat.name}
                </h3>
                <p className="text-gray-600 mb-4">{currentCat.description}</p>
                <div className="bg-white rounded-xl p-4 border border-border mb-6">
                  <div className="text-xs text-gray-400 mb-1">Faixa de valor do veículo</div>
                  <div className="text-[#0c2d6b]" style={{ fontWeight: 700, fontSize: "1.25rem" }}>
                    {currentCat.faixaValor}
                  </div>
                </div>
                <button
                  onClick={() => onNavigate("register")}
                  className="flex items-center gap-2 bg-[#f47920] hover:bg-[#d96a15] text-white px-6 py-3 rounded-xl transition-all hover:scale-105"
                  style={{ fontWeight: 700 }}
                >
                  Começar nessa categoria
                  <ArrowRight size={18} />
                </button>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-4" style={{ fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Parcelas estimadas por prazo
                </div>
                <div className="space-y-3">
                  {currentCat.parcelas.map((p) => (
                    <div
                      key={p.prazo}
                      className="flex items-center justify-between bg-white rounded-xl px-5 py-4 border border-border"
                    >
                      <div className="text-gray-500 text-sm">{p.prazo} meses</div>
                      <div className="text-[#0c2d6b]" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem" }}>
                        {p.valor}<span className="text-gray-400 text-sm">/mês</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 text-xs mt-4">
                  * Valores estimados. O cálculo exato é apresentado após o cadastro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLEXIBILIDADE */}
      <section className="py-24 bg-[#0c2d6b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-[#f47920] text-sm mb-3" style={{ fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Você no controle
            </div>
            <h2
              className="text-white mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Flexibilidade que faz sentido
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto" style={{ lineHeight: 1.7 }}>
              Sua vida muda. Seu plano pode mudar junto. Sem burocracia, sem punição.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <TrendingUp size={28} />,
                title: "Aumentar a parcela",
                desc: "Ganhou mais? Aumente a parcela e acelere sua conquista. A qualquer momento.",
              },
              {
                icon: <Zap size={28} />,
                title: "Aporte extra",
                desc: "Recebeu o 13º, uma herança, um bônus? Coloque direto no seu programa e avance mais rápido.",
              },
              {
                icon: <Award size={28} />,
                title: "Upgrade de categoria",
                desc: "Quer um veículo melhor? Faça upgrade e continue de onde parou. Seu histórico é preservado.",
              },
              {
                icon: <Car size={28} />,
                title: "Moto → Carro",
                desc: "Começou de moto e agora quer um carro? Migre sua reserva programada sem perder nada.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="text-[#f47920] mb-4">{icon}</div>
                <h3 className="text-white mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                  {title}
                </h3>
                <p className="text-blue-200 text-sm" style={{ lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTREGA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[#f47920] text-sm mb-3" style={{ fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                A entrega
              </div>
              <h2
                className="text-[#0c2d6b] mb-6"
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                O programa entrega sempre o veículo. Nunca dinheiro.
              </h2>
              <p className="text-gray-600 mb-6" style={{ lineHeight: 1.8 }}>
                Essa é a essência da Compra Programada: você acumula direito contratual e recebe um veículo real, escolhido no catálogo Mobix. Não é investimento. Não é rendimento. É mobilidade programada.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Retirada ao final do programa",
                    desc: "Quitou tudo? Escolha seu veículo no catálogo e agende a entrega.",
                  },
                  {
                    title: "Retirada antecipada (a partir de 50%)",
                    desc: "Com 50% quitado e 45 dias de aviso prévio, você pode retirar seu veículo antes do prazo.",
                  },
                  {
                    title: "Catálogo sempre atualizado",
                    desc: "Veículos zero km ou seminovos certificados. Você escolhe dentro da sua categoria.",
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle size={20} className="text-[#f47920]" />
                    </div>
                    <div>
                      <div className="text-[#0c2d6b] mb-1" style={{ fontWeight: 700 }}>{title}</div>
                      <div className="text-gray-500 text-sm" style={{ lineHeight: 1.7 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#f8f9fc] rounded-3xl p-8">
              <h3 className="text-[#0c2d6b] mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem" }}>
                Cancelamento transparente
              </h3>
              <div className="space-y-4">
                {[
                  {
                    phase: "Até 12 meses",
                    desc: "Crédito interno. Os valores pagos ficam disponíveis como crédito para uso em novo programa.",
                    color: "bg-blue-100 text-[#0c2d6b]",
                  },
                  {
                    phase: "Após 12 meses",
                    desc: "Possibilidade de migração ou transferência do contrato para outro participante.",
                    color: "bg-orange-100 text-[#d96a15]",
                  },
                ].map(({ phase, desc, color }) => (
                  <div key={phase} className="bg-white rounded-xl p-5 border border-border">
                    <span className={`text-xs px-3 py-1 rounded-full ${color} mb-3 inline-block`} style={{ fontWeight: 600 }}>
                      {phase}
                    </span>
                    <p className="text-gray-500 text-sm" style={{ lineHeight: 1.7 }}>{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-4" style={{ lineHeight: 1.6 }}>
                A Mobix não é consórcio. Todos os direitos do consumidor são respeitados conforme o Código de Defesa do Consumidor (CDC).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APP MOBIX */}
      <section id="app" className="py-24 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-[#0c2d6b] rounded-3xl p-6 shadow-2xl max-w-sm mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-[#f47920] flex items-center justify-center">
                    <Car size={16} className="text-white" />
                  </div>
                  <span className="text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>App Mobix</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Saldo acumulado", value: "R$ 18.800", sub: "URBAN" },
                    { label: "Progresso", value: "47%", sub: "23 meses" },
                    { label: "Próx. parcela", value: "R$ 1.219", sub: "em 8 dias" },
                    { label: "Projeção entrega", value: "mar/2027", sub: "25 meses" },
                  ].map(({ label, value, sub }) => (
                    <div key={label} className="bg-white/10 rounded-xl p-3">
                      <div className="text-blue-300 text-xs mb-1">{label}</div>
                      <div className="text-white text-base" style={{ fontWeight: 700 }}>{value}</div>
                      <div className="text-blue-400 text-xs">{sub}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white/10 rounded-xl p-4 mb-4">
                  <div className="flex justify-between text-xs text-blue-300 mb-2">
                    <span>Sua jornada</span>
                    <span>47% concluído</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div className="bg-[#f47920] h-3 rounded-full" style={{ width: "47%" }} />
                    </div>
                    <div className="flex justify-between text-xs text-blue-400 mt-1">
                      <span>Início</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["Aporte extra", "Upgrade", "Catálogo", "Indicar"].map((btn) => (
                    <button key={btn} className="bg-[#f47920] text-white rounded-lg py-2 text-xs" style={{ fontWeight: 600 }}>
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-[#f47920] text-sm mb-3" style={{ fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Transparência total
              </div>
              <h2
                className="text-[#0c2d6b] mb-6"
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                O App Mobix: sua conquista na palma da mão
              </h2>
              <p className="text-gray-600 mb-6" style={{ lineHeight: 1.8 }}>
                Acompanhe cada real que você investe na sua mobilidade. O app mostra em tempo real quanto você já acumulou, quando vai conquistar seu veículo e o que você pode fazer para chegar mais rápido.
              </p>
              <div className="space-y-3">
                {[
                  "Saldo acumulado em tempo real",
                  "Projeção de entrega atualizada",
                  "Solicitação de aportes extras",
                  "Upgrade de categoria direto pelo app",
                  "Catálogo de veículos disponíveis",
                  "Histórico completo de pagamentos",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#f47920] flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GAMIFICAÇÃO / INDICAÇÃO */}
      <section id="indicação" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-[#f47920] text-sm mb-3" style={{ fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Programa de fidelidade
            </div>
            <h2
              className="text-[#0c2d6b] mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Conquiste mais do que um veículo
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#f8f9fc] rounded-3xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#f47920]/10 flex items-center justify-center">
                  <Award size={24} className="text-[#f47920]" />
                </div>
                <h3 className="text-[#0c2d6b]" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem" }}>
                  Níveis e medalhas
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  { nivel: "🥉 Iniciante", desc: "Primeiros 3 meses sem atraso", bonus: "Badge no app" },
                  { nivel: "🥈 Conquistador", desc: "12 meses em dia", bonus: "Desconto em aporte" },
                  { nivel: "🥇 Embaixador", desc: "36 meses de fidelidade", bonus: "Vantagens contratuais exclusivas" },
                  { nivel: "💎 Elite Mobix", desc: "60 meses ou 2 contratos", bonus: "Benefícios premium" },
                ].map(({ nivel, desc, bonus }) => (
                  <div key={nivel} className="flex items-center justify-between bg-white rounded-xl p-4 border border-border">
                    <div>
                      <div className="text-[#0c2d6b] text-sm mb-0.5" style={{ fontWeight: 600 }}>{nivel}</div>
                      <div className="text-gray-400 text-xs">{desc}</div>
                    </div>
                    <div className="text-[#f47920] text-xs text-right" style={{ fontWeight: 600 }}>{bonus}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0c2d6b] rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Gift size={24} className="text-[#f47920]" />
                </div>
                <h3 className="text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem" }}>
                  Indique e ganhe
                </h3>
              </div>
              <p className="text-blue-200 mb-6 text-sm" style={{ lineHeight: 1.7 }}>
                Indique amigos e familiares que também merecem uma chance. Cada indicação que inicia um programa gera benefícios contratuais reais para você — não é dinheiro, mas é algo melhor.
              </p>
              <div className="space-y-3">
                {[
                  "Redução de prazo no seu contrato",
                  "Aportes extras sem custo adicional",
                  "Prioridade no catálogo de veículos",
                  "Acesso antecipado a novas categorias",
                ].map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-[#f47920] flex-shrink-0" />
                    <span className="text-blue-200 text-sm">{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-white/10 rounded-xl p-4">
                <div className="text-blue-300 text-xs mb-2">Seu código de indicação</div>
                <div className="text-white" style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "0.1em" }}>
                  MOBIX-XXXX
                </div>
                <div className="text-blue-400 text-xs mt-1">Disponível após o cadastro</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-[#f47920] text-sm mb-3" style={{ fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Histórias reais
            </div>
            <h2
              className="text-[#0c2d6b]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Quem já conquistou fala por nós
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, city, category, text, stars, avatar }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#f47920] text-[#f47920]" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 text-sm" style={{ lineHeight: 1.8 }}>"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0c2d6b] flex items-center justify-center text-white text-xs" style={{ fontWeight: 700 }}>
                    {avatar}
                  </div>
                  <div>
                    <div className="text-[#0c2d6b] text-sm" style={{ fontWeight: 700 }}>{name}</div>
                    <div className="text-gray-400 text-xs">{city} · {category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(135deg, #0c2d6b 0%, #1a3f7f 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
          >
            Sem banco. Sem juros abusivos. Sem impossíveis.
          </h2>
          <p className="text-blue-200 mb-8 text-lg" style={{ lineHeight: 1.7 }}>
            Crie sua conta agora e veja qual categoria faz sentido para você. É gratuito e leva menos de 2 minutos.
          </p>
          <button
            onClick={() => onNavigate("register")}
            className="inline-flex items-center gap-2 bg-[#f47920] hover:bg-[#d96a15] text-white px-10 py-5 rounded-xl text-lg transition-all hover:scale-105"
            style={{ fontWeight: 700 }}
          >
            Criar minha conta agora
            <ArrowRight size={22} />
          </button>
          <p className="text-blue-300 text-sm mt-4">
            Grátis · Sem compromisso · Sem consulta ao SPC/Serasa
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080e1a] text-blue-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#f47920] flex items-center justify-center">
                  <Car size={14} className="text-white" />
                </div>
                <span className="text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>Mobix</span>
              </div>
              <p className="text-sm" style={{ lineHeight: 1.7 }}>
                Programa Privado de Aquisição Programada de Veículos. Mobilidade para quem merece.
              </p>
            </div>
            {[
              { title: "Programa", links: ["Como funciona", "Categorias", "Flexibilidade", "Entrega"] },
              { title: "Conta", links: ["Criar conta", "Entrar", "App Mobix", "Indicar amigo"] },
              { title: "Suporte", links: ["FAQ", "Contato", "Regulamento", "CDC"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div className="text-white text-sm mb-4" style={{ fontWeight: 600 }}>{title}</div>
                <div className="space-y-2">
                  {links.map((l) => (
                    <div key={l}>
                      <a href="#" className="text-sm hover:text-white transition-colors">{l}</a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-blue-400">
            <span>© 2025 Mobix. Programa Privado de Aquisição Programada. Não é consórcio, financiamento ou investimento.</span>
            <span>CNPJ: 00.000.000/0001-00 · Respeitamos o CDC</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
