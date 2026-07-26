import styles from "./header.module.css";

type Props = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export default function Header({ isSidebarOpen, onToggleSidebar }: Props) {
  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={onToggleSidebar}
        aria-label="操作パネルの表示切り替え"
        aria-pressed={isSidebarOpen}
      >
        ☰
      </button>

      <img
        src="/app-icon.svg"
        className={styles.logo}
        alt="UFDB GUI APPのロゴ"
      />

      <h1 className={styles.title}>UFDB GUI APP</h1>
    </header>
  )
}
