import styles from "./Footer.module.css";
import { ICONS } from "../../utils/icontypes";

export default function Footer() {
  const GithubIcon = ICONS.github;
  const GithubBranchIcon = ICONS.gitBranch;

  const collaborators = [
    { name: "agustnlee", url: "https://github.com/agustnlee" },
    { name: "AlejandroOre", url: "https://github.com/AlejandroOre" },
    { name: "Ezequiel-Souza-Arraigada", url: "https://github.com/Ezequiel-Souza-Arraigada" },
    { name: "NicolasOps", url: "https://github.com/NicolasOps" },
    { name: "SofMoralPe", url: "https://github.com/SofMoralPe" },
    { name: "sumi076", url: "https://github.com/sumi076" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* LEFT */}
        <div className={styles.left}>
          App
        </div>

        {/* MIDDLE */}
        <div className={styles.middle}>
          <p>UADE 2026 Aplicaciones Interactivas</p>
          <p>Virtual TM Miércoles</p>

          <a
            href="https://github.com/agustnlee/aplicacionesinteractivas_202601-grupo13"
            target="_blank"
            className={styles.repo}
          >
            <GithubBranchIcon size={16} />
            Repo del Proyecto
          </a>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>

          <div className={styles.users}>
            {collaborators.map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon size={18} /> {c.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}