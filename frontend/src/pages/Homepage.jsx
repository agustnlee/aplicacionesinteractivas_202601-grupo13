import { useSelector } from "react-redux";

export default function Homepage() {
  const user = useSelector((state) => state.auth.user);

  const displayName = user?.nombre ?? user?.name ?? null;
  const roleLabel = user?.rol ?? null;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-2 py-6 sm:px-4">
      <section className="flex flex-1 flex-col justify-center rounded-2xl border border-slate-200/80 bg-white/90 p-8 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 backdrop-blur-sm sm:p-12">
        <p className="text-sm font-medium uppercase tracking-wider text-blue-600">
          Sistema interno
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {displayName
            ? `Hola, ${displayName}`
            : "Bienvenido a CrediGest"}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
          Panel principal para la gestión de clientes, créditos y operaciones
          del sistema. Usá la barra superior para navegar según tu rol.
        </p>
        {roleLabel && (
          <p className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm text-slate-700">
            <span className="font-medium text-slate-500">Rol</span>
            <span className="rounded-md bg-white px-2 py-0.5 font-semibold text-slate-800 ring-1 ring-slate-200">
              {roleLabel}
            </span>
          </p>
        )}
      </section>
    </div>
  );
}
