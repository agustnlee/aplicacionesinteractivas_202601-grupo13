import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Tags, Users, Wallet } from "lucide-react";
import { getMetricas } from "../api/metricasApi";

const INITIAL_METRICAS = {
  usuariosActivos: 0,
  creditosOtorgados: 0,
  creditosFinalizados: 0,
  creditosEnMora: 0,
  cantidadEtiquetas: 0,
};

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") ?? "null");
  } catch {
    return null;
  }
};

const getAuthSnapshot = () => {
  const user = getStoredUser();
  const token = localStorage.getItem("token");

  return {
    user,
    token,
    isLoggedIn: Boolean(token && user),
  };
};

export default function Homepage() {
  const [authSnapshot, setAuthSnapshot] = useState(getAuthSnapshot);

  const { user, token, isLoggedIn } = authSnapshot;
  const displayName = user?.nombre ?? user?.name ?? "Operador";

  const [metricas, setMetricas] = useState(INITIAL_METRICAS);
  const [metricasLoading, setMetricasLoading] = useState(false);
  const [metricasError, setMetricasError] = useState(null);

  useEffect(() => {
    const syncAuthState = () => {
      setAuthSnapshot((previousAuth) => {
        const nextAuth = getAuthSnapshot();

        const previousUser = JSON.stringify(previousAuth.user);
        const nextUser = JSON.stringify(nextAuth.user);

        if (
          previousAuth.token === nextAuth.token &&
          previousUser === nextUser &&
          previousAuth.isLoggedIn === nextAuth.isLoggedIn
        ) {
          return previousAuth;
        }

        return nextAuth;
      });
    };

    window.addEventListener("storage", syncAuthState);
    window.addEventListener("focus", syncAuthState);
    document.addEventListener("visibilitychange", syncAuthState);

    const authInterval = setInterval(syncAuthState, 300);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("focus", syncAuthState);
      document.removeEventListener("visibilitychange", syncAuthState);
      clearInterval(authInterval);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setMetricas(INITIAL_METRICAS);
      setMetricasLoading(false);
      setMetricasError(null);
      return;
    }

    let isMounted = true;

    const fetchMetricas = async () => {
      setMetricasLoading(true);
      setMetricasError(null);

      try {
        const data = await getMetricas();
        if (!isMounted) return;

        setMetricas({
          usuariosActivos: data?.usuariosActivos ?? 0,
          creditosOtorgados: data?.creditosOtorgados ?? 0,
          creditosFinalizados: data?.creditosFinalizados ?? 0,
          creditosEnMora: data?.creditosEnMora ?? 0,
          cantidadEtiquetas: data?.cantidadEtiquetas ?? 0,
        });
      } catch (error) {
        if (!isMounted) return;
        setMetricasError("No se pudieron cargar las métricas.");
      } finally {
        if (isMounted) setMetricasLoading(false);
      }
    };

    fetchMetricas();
    const intervalId = setInterval(fetchMetricas, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [isLoggedIn, token]);

  const metricCards = [
    {
      label: "Usuarios activos",
      value: metricas.usuariosActivos,
      icon: Users,
      color: "var(--primary-600)",
      background: "var(--primary-50)",
      border: "var(--primary-100)",
    },
    {
      label: "Créditos otorgados",
      value: metricas.creditosOtorgados,
      icon: Wallet,
      color: "var(--success)",
      background: "var(--success-bg)",
      border: "var(--success-border)",
    },
    {
      label: "Créditos finalizados",
      value: metricas.creditosFinalizados,
      icon: CheckCircle2,
      color: "var(--neutral)",
      background: "var(--neutral-bg)",
      border: "var(--neutral-border)",
    },
    {
      label: "Moras",
      value: metricas.creditosEnMora,
      icon: AlertTriangle,
      color: "var(--warning)",
      background: "var(--warning-bg)",
      border: "var(--warning-border)",
    },
    {
      label: "Etiquetas",
      value: metricas.cantidadEtiquetas,
      icon: Tags,
      color: "var(--primary-600)",
      background: "var(--primary-50)",
      border: "var(--primary-100)",
    },
  ];

  return (
    <div
  className="w-full max-w-none px-8 flex bg-transparent"
  style={{
    paddingTop: "4.5rem",
    paddingBottom: "1.5rem",
    marginBottom: "6rem",
  }}
>
      <div className="w-full grid gap-8 items-stretch xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.9fr)]">
        <div className="flex flex-col gap-6 w-full h-full">
          {/* Banner principal */}
          <div className="flex flex-col shadow-lg rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-white">
            <div
              className="bg-[var(--primary-600)] flex flex-col items-center justify-center text-center"
              style={{ padding: "1.25rem 2rem" }}
            >
              <div
                className="inline-flex items-center gap-2 bg-[var(--primary-50)] text-[var(--primary-700)] rounded-full w-max shadow-sm text-xs font-bold uppercase tracking-wide"
                style={{ padding: "0.45rem 1.5rem" }}
              >
                <CheckCircle2 size={16} />
                <span>Sistema Interno</span>
              </div>
            </div>

            <div
              className="text-[var(--text)] border-x border-b border-[var(--border-subtle)] rounded-b-3xl flex flex-col items-center text-center gap-4"
              style={{ padding: "1.75rem 2rem" }}
            >
              <h1 className="m-0 text-3xl md:text-4xl font-bold tracking-tight text-[var(--primary-800)]">
                ¡Bienvenido de vuelta, {displayName}!
              </h1>
              <p className="text-base md:text-lg leading-relaxed max-w-3xl m-0 text-[var(--text-alt)]">
                Panel central de operaciones. Gestioná la cartera de clientes, visualizá créditos otorgados y monitoreá el estado de mora para priorizar la gestión.
              </p>
            </div>
          </div>

          {/* Tarjetas inferiores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <article
              className="bg-white rounded-3xl border border-[var(--border-subtle)] border-t-2 border-t-[var(--primary-600)] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left min-h-[190px]"
              style={{ padding: "1.5rem 2rem" }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: "1.5rem" }}>
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

            <article
              className="bg-white rounded-3xl border border-[var(--border-subtle)] border-t-2 border-t-[var(--primary-600)] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left min-h-[190px]"
              style={{ padding: "1.5rem 2rem" }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: "1.5rem" }}>
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

            <article
              className="bg-white rounded-3xl border border-[var(--border-subtle)] border-t-2 border-t-[var(--primary-600)] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left min-h-[190px]"
              style={{ padding: "1.5rem 2rem" }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: "1.5rem" }}>
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

            <article
              className="bg-white rounded-3xl border border-[var(--border-subtle)] border-t-2 border-t-[var(--primary-600)] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left min-h-[190px]"
              style={{ padding: "1.5rem 2rem" }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: "1.5rem" }}>
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
        </div>

        <aside
  className="bg-white rounded-3xl border border-[var(--border-subtle)] shadow-lg w-full h-full flex flex-col"
  style={{ padding: "2rem", paddingBottom: isLoggedIn ? "1.1rem" : "2rem" }}
>
          {isLoggedIn ? (
            <>
              <div className="flex items-start justify-between gap-4" style={{ marginBottom: "1.75rem" }}>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary-900)] m-0">
                    Métricas en tiempo real
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] m-0">
                    Actualización automática del sistema
                  </p>
                </div>
                {metricasLoading && <span className="badge badge-info">Actualizando</span>}
              </div>

              {metricasError && (
                <div
                  className="rounded-2xl border text-sm font-semibold text-[var(--danger)] bg-[var(--danger-bg)] border-[var(--danger-border)]"
                  style={{ padding: "1rem", marginBottom: "1rem" }}
                >
                  {metricasError}
                </div>
              )}

              <div className="flex flex-col gap-4 flex-1">
                {metricCards.map(({ label, value, icon: Icon, color, background, border }) => (
                  <article
                    key={label}
                    className="rounded-2xl border shadow-sm flex items-center gap-5 transition-all duration-300 hover:shadow-md min-h-[88px]"
                    style={{ background, borderColor: border, padding: "1.25rem 1.5rem" }}
                  >
                    <div
                      className="flex items-center justify-center rounded-2xl shrink-0"
                      style={{ width: "3rem", height: "3rem", color }}
                    >
                      <Icon size={34} strokeWidth={2} />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-wide text-[var(--text-muted)]">
                        {label}
                      </span>
                      <strong className="text-3xl font-bold leading-tight text-[var(--text)]">
                        {value}
                      </strong>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center gap-5">
              <div
                className="flex items-center justify-center rounded-full bg-[var(--primary-50)] text-[var(--primary-600)]"
                style={{ width: "4rem", height: "4rem" }}
              >
                <Users size={34} strokeWidth={2} />
              </div>

              <div className="flex flex-col gap-2 max-w-sm">
                <h2 className="text-sm text-[var(--text-muted)] m-0">
                  Inicia sesión para consultar usuarios activos, créditos, moras y etiquetas del sistema.
                </h2>
              </div>

              <a href="/login" className="btn btn-primary">
                Iniciar sesión
              </a>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}