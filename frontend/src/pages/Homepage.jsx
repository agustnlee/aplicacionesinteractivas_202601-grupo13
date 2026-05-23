import { Link } from "react-router-dom";
import { Landmark, Users, Wallet, AlertCircle, Tags, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";

export default function Homepage() {
  const user = useSelector((state) => state.auth?.user);

  const displayName = user?.nombre ?? user?.name ?? "Operador";
  const roleLabel = user?.rol ?? null;
  const isAdmin = String(user?.rol ?? "").toUpperCase() === "ADMIN";

  return (
    <div className="flex-1 w-full max-w-[90rem] mx-auto py-[var(--space-8)] px-[var(--space-6)] md:py-[var(--space-10)] md:px-[var(--space-8)]">
      
      {/* Banner Principal */}
      <div className="bg-[var(--primary-600)] rounded-[var(--radius-xl)] p-[var(--space-6)] md:p-[var(--space-10)] text-white shadow-lg mb-[var(--space-stack-xl)] relative overflow-hidden flex flex-col justify-between">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-[var(--gap-sm)] bg-white/10 px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-full)] backdrop-blur-md border border-white/20 mb-[var(--space-stack-md)]">
            <ShieldCheck size={18} className="text-blue-100" />
            <span className="text-[length:var(--text-xs)] font-[number:var(--font-semibold)] uppercase tracking-widest text-blue-50">
              Sistema Interno
            </span>
          </div>
          <h1 className="text-[length:var(--text-3xl)] md:text-[length:var(--text-3xl)] font-[number:var(--font-bold)] mb-[var(--space-stack-sm)] tracking-tight">
            ¡Bienvenido de vuelta, {displayName}!
          </h1>
          <p className="text-blue-100 max-w-2xl text-[length:var(--text-base)] leading-[var(--leading-relaxed)] mb-[var(--space-stack-md)]">
            Panel central de operaciones. Gestioná la cartera de clientes, visualizá créditos otorgados y monitoreá el estado de mora para priorizar la gestión de cobro.
          </p>
          {roleLabel && (
            <div className="inline-flex items-center gap-[var(--gap-sm)] bg-[var(--primary-800)]/50 px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius)] border border-white/10">
              <span className="text-blue-200 text-[length:var(--text-xs)] uppercase tracking-wider">Rol Activo:</span>
              <span className="font-[number:var(--font-bold)] text-white">{roleLabel}</span>
            </div>
          )}
        </div>
        
        {/* Decoración de fondo corregida (Sin romper el Flexbox) */}
        <Landmark 
          size={300} 
          className="absolute -right-12 -bottom-12 text-white/10 pointer-events-none" 
          strokeWidth={1} 
        />
      </div>

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--gap-lg)] mb-[var(--space-stack-xl)]">
        {/* Metrica 1 */}
        <div className="bg-white p-[var(--space-6)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition-shadow flex items-start gap-[var(--gap-md)]">
          <div className="p-[var(--space-3)] bg-blue-50 text-[var(--primary-600)] rounded-[var(--radius)]">
            <Users size={28} />
          </div>
          <div>
            <p className="text-[length:var(--text-xs)] text-[var(--text-muted)] font-[number:var(--font-semibold)] uppercase tracking-wider mb-1">Clientes Activos</p>
            <div className="flex items-baseline gap-[var(--gap-sm)] mb-1">
                <p className="text-[length:var(--text-2xl)] font-[number:var(--font-bold)] text-[var(--text)]">1,248</p>
                <span className="text-[length:var(--text-xs)] font-[number:var(--font-medium)] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+4.2%</span>
            </div>
            <p className="text-[length:var(--text-xs)] text-[var(--text-alt)]">Total registrados en base</p>
          </div>
        </div>
        
        {/* Metrica 2 */}
        <div className="bg-white p-[var(--space-6)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition-shadow flex items-start gap-[var(--gap-md)]">
          <div className="p-[var(--space-3)] bg-emerald-50 text-emerald-600 rounded-[var(--radius)]">
            <Wallet size={28} />
          </div>
          <div>
            <p className="text-[length:var(--text-xs)] text-[var(--text-muted)] font-[number:var(--font-semibold)] uppercase tracking-wider mb-1">Créditos Otorgados</p>
            <div className="flex items-baseline gap-[var(--gap-sm)] mb-1">
                <p className="text-[length:var(--text-2xl)] font-[number:var(--font-bold)] text-[var(--text)]">384</p>
                <span className="text-[length:var(--text-xs)] font-[number:var(--font-medium)] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+12.8%</span>
            </div>
            <p className="text-[length:var(--text-xs)] text-[var(--text-alt)]">En amortización corriente</p>
          </div>
        </div>
        
        {/* Metrica 3 */}
        <div className="bg-white p-[var(--space-6)] rounded-[var(--radius-lg)] border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition-shadow flex items-start gap-[var(--gap-md)]">
          <div className="p-[var(--space-3)] bg-amber-50 text-[var(--warning)] rounded-[var(--radius)]">
            <AlertCircle size={28} />
          </div>
          <div>
            <p className="text-[length:var(--text-xs)] text-[var(--text-muted)] font-[number:var(--font-semibold)] uppercase tracking-wider mb-1">Alertas de Mora</p>
            <div className="flex items-baseline gap-[var(--gap-sm)] mb-1">
                <p className="text-[length:var(--text-2xl)] font-[number:var(--font-bold)] text-[var(--text)]">24</p>
                <span className="text-[length:var(--text-xs)] font-[number:var(--font-medium)] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">Acción Req.</span>
            </div>
            <p className="text-[length:var(--text-xs)] text-[var(--text-alt)]">Cuotas vencidas sin conciliar</p>
          </div>
        </div>
      </div>

      {/* Tarjetas de Información */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--gap-lg)]">
        <article className="bg-white rounded-[var(--radius-xl)] p-[var(--space-8)] border border-[var(--border-subtle)] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-[var(--gap-md)] mb-[var(--space-stack-md)]">
              <div className="p-[var(--space-3)] bg-blue-50 text-[var(--primary-600)] rounded-[var(--radius)]">
                <Landmark size={24} />
              </div>
              <div>
                  <p className="text-[length:var(--text-xs)] font-[number:var(--font-bold)] uppercase tracking-widest text-[var(--primary-600)] mb-1">Módulo Financiero</p>
                  <h2 className="text-[length:var(--text-xl)] font-[number:var(--font-semibold)] text-[var(--text)]">Control de Créditos y Cuotas</h2>
              </div>
            </div>
            <p className="text-[length:var(--text-base)] leading-[var(--leading-relaxed)] text-[var(--text-alt)]">
              CrediGest automatiza la generación de calendarios de cuotas al otorgar un crédito y registra cada pago contra el saldo pendiente. Cuando una cuota vence sin cancelarse, el sistema la marca en mora y la expone en los listados de créditos para priorizar la gestión de cobro.
            </p>
          </div>
        </article>

        {isAdmin && (
          <article className="bg-white rounded-[var(--radius-xl)] p-[var(--space-8)] border border-[var(--border-subtle)] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-[var(--gap-md)] mb-[var(--space-stack-md)]">
                <div className="p-[var(--space-3)] bg-purple-50 text-purple-600 rounded-[var(--radius)]">
                  <Tags size={24} />
                </div>
                <div>
                    <p className="text-[length:var(--text-xs)] font-[number:var(--font-bold)] uppercase tracking-widest text-purple-600 mb-1">Panel Avanzado</p>
                    <h2 className="text-[length:var(--text-xl)] font-[number:var(--font-semibold)] text-[var(--text)]">Segmentación con Etiquetas</h2>
                </div>
              </div>
              <p className="text-[length:var(--text-base)] leading-[var(--leading-relaxed)] text-[var(--text-alt)] mb-[var(--space-stack-lg)]">
                Herramienta exclusiva de administradores. Creá etiquetas personalizadas (ej. zona, nivel de riesgo, producto) y asignalas a tus clientes para filtrar la cartera en campañas y reportes sin perder el contexto de cada relación comercial.
              </p>
            </div>
            <div>
              <Link to="/etiquetas" className="btn btn-primary px-[var(--space-6)] py-[var(--space-3)] rounded-[var(--radius)] shadow-sm hover:shadow-md transition-all">
                Gestionar Etiquetas
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}