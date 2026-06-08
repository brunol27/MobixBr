import { useState } from "react";
import {
  Car,
  TrendingUp,
  Calendar,
  CreditCard,
  Award,
  Gift,
  FileText,
  HelpCircle,
  Bell,
  ChevronRight,
  Plus,
  ArrowUpRight,
  Star,
  CheckCircle,
  Copy,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Zap,
  Shield,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardProps {
  onNavigate: (page: "landing" | "login") => void;
}

const CHART_DATA = [
  { mes: "Jan", acumulado: 1219 },
  { mes: "Fev", acumulado: 2438 },
  { mes: "Mar", acumulado: 3657 },
  { mes: "Abr", acumulado: 4876 },
  { mes: "Mai", acumulado: 6095 },
  { mes: "Jun", acumulado: 7560 },
  { mes: "Jul", acumulado: 8779 },
  { mes: "Ago", acumulado: 9998 },
  { mes: "Set", acumulado: 11217 },
  { mes: "Out", acumulado: 12980 },
  { mes: "Nov", acumulado: 14199 },
  { mes: "Dez", acumulado: 15418 },
  { mes: "Jan", acumulado: 16637 },
  { mes: "Fev", acumulado: 17856 },
  { mes: "Mar", acumulado: 18800 },
];

const TIMELINE = [
  { pct: 25, label: "25% — Pioneiro", desc: "Você chegou aqui! Medalha desbloqueada.", done: true, icon: "🥉" },
  { pct: 50, label: "50% — Pode retirar antecipado", desc: "Com aviso de 45 dias, você pode receber o veículo.", done: false, icon: "⭐" },
  { pct: 75, label: "75% — Conquistador", desc: "Mais perto do que nunca. Continue!", done: false, icon: "🥇" },
  { pct: 100, label: "100% — Veículo em mãos!", desc: "Programa concluído. Escolha seu veículo no catálogo.", done: false, icon: "🚗" },
];

const HISTORY = [
  { data: "02/06/2026", desc: "Parcela #15 paga", valor: "R$ 1.219", status: "Confirmado" },
  { data: "02/05/2026", desc: "Parcela #14 paga", valor: "R$ 1.219", status: "Confirmado" },
  { data: "10/04/2026", desc: "Aporte extra realizado", valor: "R$ 2.000", status: "Confirmado" },
  { data: "02/04/2026", desc: "Parcela #13 paga", valor: "R$ 1.219", status: "Confirmado" },
  { data: "02/03/2026", desc: "Parcela #12 paga", valor: "R$ 1.219", status: "Confirmado" },
];

const DOCS = [
  { icon: <FileText size={18} />, label: "Meu Contrato", sub: "Assinado em 02/04/2025" },
  { icon: <Shield size={18} />, label: "Regulamento do Programa", sub: "Versão 3.1" },
  { icon: <HelpCircle size={18} />, label: "FAQ — Perguntas frequentes", sub: "32 perguntas respondidas" },
  { icon: <MessageSquare size={18} />, label: "Falar com suporte", sub: "Tempo médio: 4 horas" },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "historico" | "indicar" | "documentos">("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAporteModal, setShowAporteModal] = useState(false);
  const [aporteValue, setAporteValue] = useState("");

  const progressPct = 47;
  const saldoAcumulado = 18800;
  const valorTotal = 40000;

  const copyCode = () => {
    navigator.clipboard.writeText("MOBIX-JR2847");
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f8]" style={{ fontFamily: "var(--font-body)" }}>
      {/* SIDEBAR DESKTOP */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0c2d6b] hidden lg:flex flex-col z-40">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#f47920] flex items-center justify-center">
              <Car size={18} className="text-white" />
            </div>
            <span className="text-white text-xl" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
              Mobix
            </span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: "overview", icon: <TrendingUp size={18} />, label: "Minha conquista" },
            { id: "historico", icon: <CreditCard size={18} />, label: "Histórico" },
            { id: "indicar", icon: <Gift size={18} />, label: "Indicar amigo" },
            { id: "documentos", icon: <FileText size={18} />, label: "Documentos" },
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                activeTab === id
                  ? "bg-[#f47920] text-white"
                  : "text-blue-200 hover:bg-white/10 hover:text-white"
              }`}
              style={{ fontWeight: activeTab === id ? 700 : 400 }}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/10 rounded-xl p-4 mb-4">
            <div className="text-blue-300 text-xs mb-1">Nível atual</div>
            <div className="text-white text-sm" style={{ fontWeight: 700 }}>🥉 Pioneiro</div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
              <div className="bg-[#f47920] h-1.5 rounded-full" style={{ width: "47%" }} />
            </div>
          </div>
          <button
            onClick={() => onNavigate("landing")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-300 hover:text-white hover:bg-white/10 text-sm transition-all"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* HEADER MOBILE */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0c2d6b] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#f47920] flex items-center justify-center">
            <Car size={16} className="text-white" />
          </div>
          <span className="text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>Mobix</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-[#0c2d6b] pt-16 px-4 py-4">
          <nav className="space-y-2">
            {[
              { id: "overview", icon: <TrendingUp size={18} />, label: "Minha conquista" },
              { id: "historico", icon: <CreditCard size={18} />, label: "Histórico" },
              { id: "indicar", icon: <Gift size={18} />, label: "Indicar amigo" },
              { id: "documentos", icon: <FileText size={18} />, label: "Documentos" },
            ].map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id as any); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left text-blue-200 hover:bg-white/10 hover:text-white transition-all"
              >
                {icon}
                <span className="text-sm">{label}</span>
              </button>
            ))}
            <button
              onClick={() => onNavigate("landing")}
              className="w-full flex items-center gap-3 px-4 py-4 text-blue-400 text-sm"
            >
              <LogOut size={18} />
              Sair
            </button>
          </nav>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <>
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h1 className="text-[#0c2d6b] mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem" }}>
                    Olá, Juliana! 👋
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Você está a{" "}
                    <span className="text-[#f47920]" style={{ fontWeight: 700 }}>53% do seu veículo</span>.
                    Continue assim!
                  </p>
                </div>
                <button className="hidden lg:flex items-center gap-2 bg-white border border-border rounded-xl px-4 py-2.5 text-sm text-gray-500 hover:border-[#0c2d6b] transition-all">
                  <Bell size={16} />
                  <span className="text-xs font-medium">0 novas notificações</span>
                </button>
              </div>

              {/* Gamification banner */}
              <div className="bg-gradient-to-r from-[#0c2d6b] to-[#1a3f7f] rounded-2xl p-5 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">🥉</div>
                  <div>
                    <div className="text-white text-sm" style={{ fontWeight: 700 }}>Nível Pioneiro conquistado!</div>
                    <div className="text-blue-200 text-xs">Parabéns por 15 meses consecutivos em dia. Continue para chegar ao nível Conquistador!</div>
                  </div>
                </div>
                <Star size={24} className="text-[#f47920] hidden sm:block" />
              </div>

              {/* Cards de métricas */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                {[
                  {
                    icon: <TrendingUp size={20} />,
                    label: "Saldo acumulado",
                    value: "R$ 18.800",
                    sub: "de R$ 40.000 total",
                    color: "text-green-600",
                    bg: "bg-green-50",
                  },
                  {
                    icon: <Car size={20} />,
                    label: "Categoria",
                    value: "URBAN",
                    sub: "R$ 55k – R$ 80k",
                    color: "text-[#0c2d6b]",
                    bg: "bg-blue-50",
                  },
                  {
                    icon: <Calendar size={20} />,
                    label: "Projeção de entrega",
                    value: "Mar/2027",
                    sub: "25 meses restantes",
                    color: "text-[#f47920]",
                    bg: "bg-orange-50",
                  },
                  {
                    icon: <CreditCard size={20} />,
                    label: "Próxima parcela",
                    value: "R$ 1.219",
                    sub: "Vence em 8 dias",
                    color: "text-purple-600",
                    bg: "bg-purple-50",
                  },
                ].map(({ icon, label, value, sub, color, bg }) => (
                  <div key={label} className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center ${color} mb-4`}>
                      {icon}
                    </div>
                    <div className="text-gray-400 text-xs mb-1">{label}</div>
                    <div className="text-[#0c2d6b] mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.375rem" }}>
                      {value}
                    </div>
                    <div className="text-gray-400 text-xs">{sub}</div>
                  </div>
                ))}
              </div>

              {/* Progresso + Gráfico */}
              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Progresso */}
                <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[#0c2d6b]" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>
                      Sua jornada
                    </h3>
                    <span className="text-[#f47920] text-sm" style={{ fontWeight: 700 }}>
                      {progressPct}%
                    </span>
                  </div>
                  {/* Barra de progresso */}
                  <div className="relative mb-8">
                    <div className="w-full bg-[#f0f2f8] rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-[#0c2d6b] to-[#f47920] h-4 rounded-full transition-all"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                  {/* Timeline */}
                  <div className="space-y-3">
                    {TIMELINE.map(({ pct, label, desc, done, icon }) => (
                      <div key={pct} className={`flex items-start gap-3 p-3 rounded-xl ${done ? "bg-[#f0f2f8]" : pct === 50 ? "bg-orange-50 border border-orange-200" : "opacity-50"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${done ? "bg-[#0c2d6b] text-white" : pct === 50 ? "bg-orange-100" : "bg-gray-200"}`}>
                          {done ? <CheckCircle size={16} /> : <span>{icon}</span>}
                        </div>
                        <div>
                          <div className={`text-sm mb-0.5 ${done ? "text-[#0c2d6b]" : pct === 50 ? "text-[#f47920]" : "text-gray-400"}`} style={{ fontWeight: 600 }}>
                            {label}
                          </div>
                          <div className="text-xs text-gray-400">{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gráfico de evolução */}
                <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                  <h3 className="text-[#0c2d6b] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>
                    Evolução do saldo
                  </h3>
                  <p className="text-gray-400 text-xs mb-6">Valor acumulado mês a mês</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={CHART_DATA}>
                      <defs>
                        <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0c2d6b" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#0c2d6b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, "Acumulado"]}
                        contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="acumulado"
                        stroke="#0c2d6b"
                        strokeWidth={2.5}
                        fill="url(#gradBlue)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Ações */}
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm mb-6">
                <h3 className="text-[#0c2d6b] mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>
                  O que você pode fazer agora
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      icon: <TrendingUp size={20} />,
                      label: "Aumentar parcela",
                      sub: "Chegue mais rápido ao seu veículo",
                      color: "bg-blue-50 text-[#0c2d6b]",
                      action: () => {},
                    },
                    {
                      icon: <Zap size={20} />,
                      label: "Aporte extra",
                      sub: "Coloque mais dinheiro agora",
                      color: "bg-green-50 text-green-600",
                      action: () => setShowAporteModal(true),
                    },
                    {
                      icon: <ArrowUpRight size={20} />,
                      label: "Upgrade de categoria",
                      sub: "Mire em um veículo maior",
                      color: "bg-orange-50 text-[#f47920]",
                      action: () => setShowUpgradeModal(true),
                    },
                    {
                      icon: <Car size={20} />,
                      label: "Ver catálogo",
                      sub: "Conheça os veículos disponíveis",
                      color: "bg-purple-50 text-purple-600",
                      action: () => {},
                    },
                  ].map(({ icon, label, sub, color, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="flex flex-col gap-3 p-4 rounded-xl border border-border hover:border-[#0c2d6b] hover:shadow-md transition-all text-left group"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                        {icon}
                      </div>
                      <div>
                        <div className="text-[#0c2d6b] text-sm mb-1" style={{ fontWeight: 700 }}>{label}</div>
                        <div className="text-gray-400 text-xs">{sub}</div>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-[#f47920] transition-colors ml-auto" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* HISTÓRICO TAB */}
          {activeTab === "historico" && (
            <>
              <div className="mb-8">
                <h1 className="text-[#0c2d6b] mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem" }}>
                  Histórico de pagamentos
                </h1>
                <p className="text-gray-500 text-sm">Todos os seus pagamentos registrados e confirmados.</p>
              </div>
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="grid grid-cols-4 px-6 py-3 bg-[#f8f9fc] border-b border-border text-xs text-gray-400" style={{ fontWeight: 600 }}>
                  <span>Data</span>
                  <span className="col-span-2">Descrição</span>
                  <span className="text-right">Valor</span>
                </div>
                {HISTORY.map(({ data, desc, valor, status }) => (
                  <div
                    key={`${data}-${desc}`}
                    className="grid grid-cols-4 px-6 py-4 border-b border-border last:border-0 hover:bg-[#f8f9fc] transition-colors items-center"
                  >
                    <span className="text-gray-400 text-sm">{data}</span>
                    <div className="col-span-2">
                      <div className="text-[#0c2d6b] text-sm" style={{ fontWeight: 600 }}>{desc}</div>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
                        {status}
                      </span>
                    </div>
                    <span className="text-[#0c2d6b] text-sm text-right" style={{ fontWeight: 700 }}>{valor}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* INDICAR TAB */}
          {activeTab === "indicar" && (
            <>
              <div className="mb-8">
                <h1 className="text-[#0c2d6b] mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem" }}>
                  Indicar amigo
                </h1>
                <p className="text-gray-500 text-sm">Cada indicação que inicia um programa traz benefícios reais para você.</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                  <h3 className="text-[#0c2d6b] mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>
                    Seu código de indicação
                  </h3>
                  <div className="bg-[#f0f2f8] rounded-xl p-4 flex items-center justify-between mb-4">
                    <span className="text-[#0c2d6b]" style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "1.375rem", letterSpacing: "0.1em" }}>
                      MOBIX-JR2847
                    </span>
                    <button
                      onClick={copyCode}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                        copySuccess ? "bg-green-500 text-white" : "bg-[#0c2d6b] text-white hover:bg-[#1a3f7f]"
                      }`}
                      style={{ fontWeight: 600 }}
                    >
                      {copySuccess ? <CheckCircle size={16} /> : <Copy size={16} />}
                      {copySuccess ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-6" style={{ lineHeight: 1.7 }}>
                    Compartilhe esse código com amigos e familiares. Quando eles criarem uma conta e iniciarem o programa, você recebe benefícios contratuais.
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
                        <span className="text-gray-600 text-sm">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#0c2d6b] rounded-2xl p-6">
                  <h3 className="text-white mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>
                    Suas indicações
                  </h3>
                  {[
                    { nome: "Carlos S.", status: "Ativo — Moto Start", data: "Entrou em mar/2026" },
                    { nome: "Ana P.", status: "Ativo — Start", data: "Entrou em mai/2026" },
                  ].map(({ nome, status, data }) => (
                    <div key={nome} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#f47920] flex items-center justify-center text-white text-xs" style={{ fontWeight: 700 }}>
                          {nome[0]}
                        </div>
                        <div>
                          <div className="text-white text-sm" style={{ fontWeight: 600 }}>{nome}</div>
                          <div className="text-blue-300 text-xs">{data}</div>
                        </div>
                      </div>
                      <span className="text-green-400 text-xs px-2 py-1 bg-green-400/10 rounded-full" style={{ fontWeight: 600 }}>
                        {status}
                      </span>
                    </div>
                  ))}
                  <div className="mt-6 text-center">
                    <div className="text-blue-200 text-xs">Total de indicações ativas</div>
                    <div className="text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem" }}>2</div>
                    <div className="text-[#f47920] text-sm mt-1" style={{ fontWeight: 600 }}>+2 bônus contratuais ativos</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* DOCUMENTOS TAB */}
          {activeTab === "documentos" && (
            <>
              <div className="mb-8">
                <h1 className="text-[#0c2d6b] mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem" }}>
                  Documentos e suporte
                </h1>
                <p className="text-gray-500 text-sm">Tudo o que você precisa sobre o seu programa.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {DOCS.map(({ icon, label, sub }) => (
                  <button
                    key={label}
                    className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-border shadow-sm hover:border-[#0c2d6b] hover:shadow-md transition-all text-left group"
                  >
                    <div className="w-12 h-12 bg-[#f0f2f8] rounded-xl flex items-center justify-center text-[#0c2d6b] group-hover:bg-[#0c2d6b] group-hover:text-white transition-all">
                      {icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-[#0c2d6b] text-sm mb-0.5" style={{ fontWeight: 700 }}>{label}</div>
                      <div className="text-gray-400 text-xs">{sub}</div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-[#f47920] transition-colors" />
                  </button>
                ))}
              </div>
              <div className="mt-6 bg-[#f8f9fc] rounded-2xl p-6 border border-border">
                <h3 className="text-[#0c2d6b] mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                  Perguntas frequentes
                </h3>
                {[
                  { q: "Posso retirar meu veículo antes do prazo?", a: "Sim. Com 50% do valor quitado e 45 dias de aviso prévio, você pode receber seu veículo antecipadamente." },
                  { q: "O que acontece se eu atrasar um pagamento?", a: "Você tem até 30 dias para regularizar sem prejuízo ao contrato. Após isso, incide multa contratual conforme o CDC." },
                  { q: "Posso mudar de categoria depois?", a: "Sim. Você pode fazer upgrade a qualquer momento pelo app. O saldo acumulado é preservado integralmente." },
                  { q: "Isso é consórcio?", a: "Não. A Compra Programada é um Programa Privado de Aquisição Programada, regido pelo CDC, não pela lei de consórcios." },
                ].map(({ q, a }) => (
                  <div key={q} className="border-b border-border last:border-0 py-4">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={16} className="text-[#f47920] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-[#0c2d6b] text-sm mb-1" style={{ fontWeight: 600 }}>{q}</div>
                        <div className="text-gray-500 text-sm" style={{ lineHeight: 1.7 }}>{a}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* MODAL APORTE EXTRA */}
      {showAporteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#0c2d6b]" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem" }}>
                Aporte extra
              </h3>
              <button onClick={() => setShowAporteModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-4" style={{ lineHeight: 1.7 }}>
              Coloque qualquer valor adicional no seu programa e acelere a conquista do seu veículo.
            </p>
            <label className="block text-sm text-[#0c2d6b] mb-1.5" style={{ fontWeight: 600 }}>
              Valor do aporte
            </label>
            <input
              type="text"
              value={aporteValue}
              onChange={(e) => setAporteValue(e.target.value)}
              placeholder="R$ 0,00"
              className="w-full bg-[#f0f2f8] border border-transparent focus:border-[#0c2d6b] rounded-xl px-4 py-3.5 text-[#0c2d6b] outline-none mb-6"
              style={{ fontSize: "1.25rem", fontWeight: 700 }}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAporteModal(false)}
                className="flex-1 border border-border text-gray-500 py-3 rounded-xl text-sm transition-all hover:bg-gray-50"
                style={{ fontWeight: 600 }}
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowAporteModal(false)}
                className="flex-1 bg-[#f47920] hover:bg-[#d96a15] text-white py-3 rounded-xl text-sm transition-all"
                style={{ fontWeight: 700 }}
              >
                Confirmar aporte
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL UPGRADE */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#0c2d6b]" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem" }}>
                Upgrade de categoria
              </h3>
              <button onClick={() => setShowUpgradeModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="bg-[#f0f2f8] rounded-xl p-4 mb-4">
              <div className="text-gray-400 text-xs mb-1">Categoria atual</div>
              <div className="text-[#0c2d6b]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>🚙 URBAN — R$ 55k–R$ 80k</div>
            </div>
            <div className="space-y-3 mb-6">
              {[
                { name: "FAMILY SUV", range: "R$ 90k–R$ 130k", extra: "+ R$ 770/mês", icon: "🛻" },
                { name: "ELITE", range: "R$ 140k–R$ 200k", extra: "+ R$ 1.660/mês", icon: "🏆" },
              ].map(({ name, range, extra, icon }) => (
                <div key={name} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-[#f47920] cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="text-[#0c2d6b] text-sm" style={{ fontWeight: 700 }}>{name}</div>
                      <div className="text-gray-400 text-xs">{range}</div>
                    </div>
                  </div>
                  <div className="text-[#f47920] text-xs" style={{ fontWeight: 600 }}>{extra}</div>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-xs mb-4" style={{ lineHeight: 1.6 }}>
              Seu saldo acumulado de R$ 18.800 é preservado integralmente no upgrade.
            </p>
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="w-full border border-border text-gray-500 py-3 rounded-xl text-sm"
              style={{ fontWeight: 600 }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
