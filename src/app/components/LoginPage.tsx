import { useState } from "react";
import { Car, Eye, EyeOff, ArrowLeft, Shield, Lock, AlertCircle, CheckCircle } from "lucide-react";

interface LoginPageProps {
  onNavigate: (page: "landing" | "dashboard" | "register") => void;
  mode?: "login" | "register";
}

export function LoginPage({ onNavigate, mode = "login" }: LoginPageProps) {
  const [currentMode, setCurrentMode] = useState<"login" | "register" | "forgot">(mode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    emailOrCpf: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    cpf: "",
    terms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateLogin = () => {
    const e: Record<string, string> = {};
    if (!form.emailOrCpf) e.emailOrCpf = "Informe seu e-mail ou CPF.";
    if (!form.password) e.password = "Informe sua senha.";
    else if (form.password.length < 6) e.password = "A senha deve ter pelo menos 6 caracteres.";
    return e;
  };

  const validateRegister = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = "Informe seu nome completo.";
    if (!form.cpf) e.cpf = "Informe seu CPF.";
    else if (form.cpf.replace(/\D/g, "").length !== 11) e.cpf = "CPF inválido. Verifique os 11 dígitos.";
    if (!form.emailOrCpf) e.emailOrCpf = "Informe seu e-mail.";
    else if (!form.emailOrCpf.includes("@")) e.emailOrCpf = "E-mail inválido.";
    if (!form.password) e.password = "Crie uma senha.";
    else if (form.password.length < 8) e.password = "A senha deve ter pelo menos 8 caracteres.";
    if (form.password !== form.confirmPassword) e.confirmPassword = "As senhas não coincidem.";
    if (!form.terms) e.terms = "Você precisa aceitar os termos para continuar.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = currentMode === "login" ? validateLogin() : validateRegister();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (currentMode === "register") {
        setSuccess(true);
        setTimeout(() => onNavigate("dashboard"), 1800);
      } else {
        onNavigate("dashboard");
      }
    }, 1200);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.emailOrCpf) {
      setErrors({ emailOrCpf: "Informe o e-mail cadastrado." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  const formatCpf = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const InputField = ({
    label,
    field,
    type = "text",
    placeholder,
    hint,
    rightEl,
    onChange,
  }: {
    label: string;
    field: string;
    type?: string;
    placeholder?: string;
    hint?: string;
    rightEl?: React.ReactNode;
    onChange?: (v: string) => void;
  }) => (
    <div>
      <label className="block text-sm text-[#0c2d6b] mb-1.5" style={{ fontWeight: 600 }}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={(form as any)[field]}
          onChange={(e) => {
            const v = onChange ? (onChange(e.target.value), e.target.value) : e.target.value;
            setForm((f) => ({ ...f, [field]: v }));
            if (errors[field]) setErrors((er) => ({ ...er, [field]: "" }));
          }}
          placeholder={placeholder}
          className={`w-full bg-[#f0f2f8] border rounded-xl px-4 py-3.5 text-[#0c2d6b] placeholder-gray-400 outline-none transition-all ${
            errors[field]
              ? "border-red-400 focus:border-red-500 bg-red-50"
              : "border-transparent focus:border-[#0c2d6b] focus:bg-white"
          } ${rightEl ? "pr-12" : ""}`}
        />
        {rightEl && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightEl}</div>
        )}
      </div>
      {errors[field] && (
        <div className="flex items-center gap-1.5 mt-1.5">
          <AlertCircle size={13} className="text-red-500 flex-shrink-0" />
          <span className="text-red-500 text-xs">{errors[field]}</span>
        </div>
      )}
      {hint && !errors[field] && (
        <p className="text-gray-400 text-xs mt-1">{hint}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "var(--font-body)" }}>
      {/* Painel esquerdo */}
      <div
        className="hidden lg:flex flex-col justify-between w-[45%] p-12"
        style={{ background: "linear-gradient(160deg, #0c2d6b 0%, #1a3f7f 60%, #0f3580 100%)" }}
      >
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Voltar ao início
        </button>
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-[#f47920] flex items-center justify-center">
              <Car size={20} className="text-white" />
            </div>
            <span className="text-white text-2xl" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
              Mobix
            </span>
          </div>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2.25rem", lineHeight: 1.2 }}
          >
            Sua conquista está aqui.
          </h2>
          <p className="text-blue-200 mb-8" style={{ lineHeight: 1.8 }}>
            Acompanhe seu progresso, faça aportes e visualize quando seu veículo será entregue — tudo no seu painel de conquista.
          </p>
          <div className="space-y-4">
            {[
              "Sem banco. Sem juros abusivos.",
              "Score baixo? Não importa.",
              "Nome sujo? Você merece uma chance.",
              "Parcelas que cabem no seu bolso.",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-[#f47920] flex-shrink-0" />
                <span className="text-blue-100 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/10 rounded-2xl p-5">
          <div className="text-blue-200 text-xs mb-1">Atualizado agora mesmo</div>
          <div className="text-white text-sm" style={{ fontWeight: 600 }}>
            "Recebi meu carro em 48 meses sem precisar de fiador ou entrada." — Juliana R., BH
          </div>
        </div>
      </div>

      {/* Painel direito */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-[#f8f9fc]">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <button onClick={() => onNavigate("landing")} className="mr-2 text-gray-400 hover:text-[#0c2d6b]">
              <ArrowLeft size={20} />
            </button>
            <div className="w-8 h-8 rounded-lg bg-[#f47920] flex items-center justify-center">
              <Car size={16} className="text-white" />
            </div>
            <span className="text-[#0c2d6b] text-xl" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
              Mobix
            </span>
          </div>

          {/* LOGIN */}
          {currentMode === "login" && (
            <>
              <div className="mb-8">
                <h1 className="text-[#0c2d6b] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.875rem" }}>
                  Acesse seu painel de conquista
                </h1>
                <p className="text-gray-400 text-sm">
                  Não tem conta?{" "}
                  <button
                    onClick={() => { setCurrentMode("register"); setErrors({}); }}
                    className="text-[#f47920] hover:underline"
                    style={{ fontWeight: 600 }}
                  >
                    Criar conta grátis
                  </button>
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                  label="E-mail ou CPF"
                  field="emailOrCpf"
                  placeholder="seuemail@exemplo.com ou 000.000.000-00"
                />
                <InputField
                  label="Senha"
                  field="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  rightEl={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-[#0c2d6b]">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => { setCurrentMode("forgot"); setErrors({}); }}
                    className="text-sm text-[#0c2d6b] hover:text-[#f47920] transition-colors"
                  >
                    Esqueci minha senha
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0c2d6b] hover:bg-[#1a3f7f] disabled:opacity-60 text-white py-4 rounded-xl transition-all"
                  style={{ fontWeight: 700, fontSize: "1rem" }}
                >
                  {loading ? "Entrando..." : "Entrar no meu painel"}
                </button>
              </form>
              <div className="mt-8 flex items-center gap-3 bg-white border border-border rounded-xl p-4">
                <Lock size={18} className="text-[#0c2d6b] flex-shrink-0" />
                <p className="text-gray-400 text-xs" style={{ lineHeight: 1.6 }}>
                  Seus dados estão protegidos com criptografia de ponta a ponta. A Mobix nunca compartilha suas informações.
                </p>
              </div>
            </>
          )}

          {/* CADASTRO */}
          {currentMode === "register" && !success && (
            <>
              <div className="mb-8">
                <h1 className="text-[#0c2d6b] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.875rem" }}>
                  Crie sua conta grátis
                </h1>
                <p className="text-gray-400 text-sm">
                  Já tem conta?{" "}
                  <button
                    onClick={() => { setCurrentMode("login"); setErrors({}); }}
                    className="text-[#f47920] hover:underline"
                    style={{ fontWeight: 600 }}
                  >
                    Entrar
                  </button>
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField label="Nome completo" field="name" placeholder="Como você se chama?" />
                <InputField
                  label="CPF"
                  field="cpf"
                  placeholder="000.000.000-00"
                  hint="Usado apenas para identificação. Não consultamos SPC/Serasa."
                  onChange={(v) => {
                    const formatted = formatCpf(v);
                    setForm((f) => ({ ...f, cpf: formatted }));
                  }}
                />
                <InputField
                  label="E-mail"
                  field="emailOrCpf"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                />
                <InputField
                  label="Senha"
                  field="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  hint="Use letras e números para uma senha segura."
                  rightEl={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-[#0c2d6b]">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
                <InputField
                  label="Confirmar senha"
                  field="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Digite a senha novamente"
                  rightEl={
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-[#0c2d6b]">
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.terms}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, terms: e.target.checked }));
                        if (errors.terms) setErrors((er) => ({ ...er, terms: "" }));
                      }}
                      className="mt-0.5 w-4 h-4 accent-[#0c2d6b]"
                    />
                    <span className="text-gray-500 text-xs" style={{ lineHeight: 1.6 }}>
                      Concordo com os{" "}
                      <a href="#" className="text-[#0c2d6b] underline">Termos de Uso</a>{" "}
                      e a{" "}
                      <a href="#" className="text-[#0c2d6b] underline">Política de Privacidade</a>{" "}
                      da Mobix. Este é um Programa Privado de Aquisição Programada, não um consórcio ou investimento.
                    </span>
                  </label>
                  {errors.terms && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <AlertCircle size={13} className="text-red-500" />
                      <span className="text-red-500 text-xs">{errors.terms}</span>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#f47920] hover:bg-[#d96a15] disabled:opacity-60 text-white py-4 rounded-xl transition-all"
                  style={{ fontWeight: 700, fontSize: "1rem" }}
                >
                  {loading ? "Criando sua conta..." : "Criar minha conta"}
                </button>
              </form>
              <div className="mt-6 flex items-center gap-3 bg-white border border-border rounded-xl p-4">
                <Shield size={18} className="text-[#0c2d6b] flex-shrink-0" />
                <p className="text-gray-400 text-xs" style={{ lineHeight: 1.6 }}>
                  Não consultamos SPC, Serasa nem score de crédito. Seus dados estão seguros.
                </p>
              </div>
            </>
          )}

          {/* ESQUECI SENHA */}
          {currentMode === "forgot" && !success && (
            <>
              <div className="mb-8">
                <button
                  onClick={() => { setCurrentMode("login"); setErrors({}); }}
                  className="flex items-center gap-2 text-gray-400 hover:text-[#0c2d6b] text-sm mb-4 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Voltar ao login
                </button>
                <h1 className="text-[#0c2d6b] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.875rem" }}>
                  Redefinir senha
                </h1>
                <p className="text-gray-400 text-sm" style={{ lineHeight: 1.6 }}>
                  Informe o e-mail cadastrado e enviaremos um link seguro para você criar uma nova senha.
                </p>
              </div>
              <form onSubmit={handleForgot} className="space-y-4">
                <InputField
                  label="E-mail cadastrado"
                  field="emailOrCpf"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0c2d6b] hover:bg-[#1a3f7f] disabled:opacity-60 text-white py-4 rounded-xl transition-all"
                  style={{ fontWeight: 700 }}
                >
                  {loading ? "Enviando..." : "Enviar link de redefinição"}
                </button>
              </form>
            </>
          )}

          {/* SUCESSO */}
          {success && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              {currentMode === "forgot" ? (
                <>
                  <h2 className="text-[#0c2d6b] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem" }}>
                    E-mail enviado!
                  </h2>
                  <p className="text-gray-500 mb-6" style={{ lineHeight: 1.7 }}>
                    Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                  </p>
                  <button
                    onClick={() => { setCurrentMode("login"); setSuccess(false); }}
                    className="text-[#0c2d6b] hover:text-[#f47920] text-sm"
                    style={{ fontWeight: 600 }}
                  >
                    Voltar ao login
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-[#0c2d6b] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem" }}>
                    Conta criada com sucesso!
                  </h2>
                  <p className="text-gray-500 mb-2" style={{ lineHeight: 1.7 }}>
                    Bem-vindo à Mobix. Abrindo seu painel de conquista...
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
