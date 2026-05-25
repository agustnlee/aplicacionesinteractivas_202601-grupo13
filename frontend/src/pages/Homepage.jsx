import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CheckCircle2, Wallet, Users, Tags } from "lucide-react"; 

export default function Homepage() {
  const user = useSelector((state) => state.auth?.user);
  const displayName = user?.nombre ?? user?.name ?? "Operador";
  const isAdmin = String(user?.rol ?? "").toUpperCase() === "ADMIN";

  return (
    <div className="max-w-[90rem] w-full mx-auto px-6 py-6 flex flex-col min-h-[calc(100vh-4rem)] bg-transparent items-center">
      
      <div className="w-full max-w-5xl flex flex-col items-center gap-6 mt-4">
        
        <section className="flex flex-col gap-6 w-full">
          {/* Banner Principal Flotante */}
          <div className="flex flex-col shadow-lg rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-white">
            
            {/* FRANJA AZUL: Solo contiene la etiqueta de Sistema Interno */}
            <div 
              className="bg-[var(--primary-600)] flex flex-col items-center justify-center text-center"
              style={{ padding: "1.5rem 2rem" }}
            >
              {/* Se fuerza el padding interno para asegurar espacio horizontal (1.5rem) y vertical (0.4rem) */}
              <div 
                className="inline-flex items-center gap-2 bg-[var(--primary-50)] text-[var(--primary-700)] rounded-full w-max shadow-sm text-xs font-bold uppercase tracking-wide"
                style={{ padding: "0.4rem 1.5rem" }}
              >
                <CheckCircle2 size={16} />
                <span>Sistema Interno</span>
              </div>
            </div>
            
            {/* FRANJA BLANCA: Ahora contiene el saludo y la descripción */}
            <div 
              className="text-[var(--text)] border-x border-b border-[var(--border-subtle)] rounded-b-3xl flex flex-col items-center text-center gap-4"
              style={{ padding: "2rem 2rem" }}
            >
              <h1 className="m-0 text-3xl md:text-4xl font-bold tracking-tight text-[var(--primary-800)]">
                ¡Bienvenido de vuelta, {displayName}!
              </h1>
              <p className="text-base md:text-lg leading-relaxed max-w-3xl m-0 text-[var(--text-alt)]">
                Panel central de operaciones. Gestioná la cartera de clientes, visualizá créditos otorgados y monitoreá el estado de mora para priorizar la gestión.
              </p>
            </div>
          </div>

          {/* Bloques en grid 2x2 - Tarjetas con Accent Border */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            {/* Créditos */}
            <article 
              className="bg-white rounded-3xl border border-[var(--border-subtle)] border-t-2 border-t-[var(--primary-600)] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center text-left"
              style={{ padding: "1.5rem 2rem" }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: "2rem" }}>
                <Wallet size={36} strokeWidth={2} className="text-[var(--primary-600)]" />
                <div className="flex flex-col">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--primary-600)] m-0">
                    Créditos
                  </h2>
                  <h3 className="text-lg md:text-xl font-bold leading-tight text-[var(--text)] m-0">
                    Gestión de Créditos
                  </h3>
                </div>
              </div>
              <p className="text-[var(--text-alt)] text-sm md:text-base leading-relaxed m-0">
                CrediGest automatiza la generación y seguimiento de cuotas al otorgar créditos.
              </p>
            </article>

            {/* Mora */}
            <article 
              className="bg-white rounded-3xl border border-[var(--border-subtle)] border-t-2 border-t-[var(--primary-600)] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center text-left"
              style={{ padding: "1.5rem 2rem" }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: "2rem" }}>
                <CheckCircle2 size={36} strokeWidth={2} className="text-[var(--warning)]" />
                <div className="flex flex-col">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--warning)] m-0">
                    Mora
                  </h2>
                  <h3 className="text-lg md:text-xl font-bold leading-tight text-[var(--text)] m-0">
                    Monitoreo Automático
                  </h3>
                </div>
              </div>
              <p className="text-[var(--text-alt)] text-sm md:text-base leading-relaxed m-0">
                El sistema detecta automáticamente cuotas vencidas y actualiza estados de mora.
              </p>
            </article>

            {/* Usuarios */}
            <article 
              className="bg-white rounded-3xl border border-[var(--border-subtle)] border-t-2 border-t-[var(--primary-600)] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center text-left"
              style={{ padding: "1.5rem 2rem" }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: "2rem" }}>
                <Users size={36} strokeWidth={2} className="text-[var(--primary-600)]" />
                <div className="flex flex-col">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--primary-600)] m-0">
                    Clientes
                  </h2>
                  <h3 className="text-lg md:text-xl font-bold leading-tight text-[var(--text)] m-0">
                    Gestión de Clientes
                  </h3>
                </div>
              </div>
              <p className="text-[var(--text-alt)] text-sm md:text-base leading-relaxed m-0">
              Consulta el estado detallado de créditos activos, historial de pagos y próximos vencimientos.
              </p>
            </article>

            {/* Etiquetas */}
            <article 
              className="bg-white rounded-3xl border border-[var(--border-subtle)] border-t-2 border-t-[var(--primary-600)] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center text-left"
              style={{ padding: "1.5rem 2rem" }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: "2rem" }}>
                <Tags size={36} strokeWidth={2} className="text-[var(--primary-600)]" />
                <div className="flex flex-col">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--primary-600)] m-0">
                    Etiquetas
                  </h2>
                  <h3 className="text-lg md:text-xl font-bold leading-tight text-[var(--text)] m-0">
                    Gestión de Etiquetas
                  </h3>
                </div>
              </div>
              <p className="text-[var(--text-alt)] text-sm md:text-base leading-relaxed m-0">
                Clasifica y segmenta clientes para facilitar campañas y reportes personalizados.
              </p>
            </article>

          </div>
        </section>
      </div>
    </div>
  );
}