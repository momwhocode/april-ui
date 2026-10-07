import { useEffect, useState } from "react";
import { AprilProvider, IconButton, Tag, bindAprilInteractions, version } from "april-ui";
import { ComponentStage, isWidePiece, pieces } from "./previews.jsx";

const componentsHref = import.meta.env.DEV ? "http://localhost:6006" : "/components/";

const installCommand = "npm install april-ui react react-dom react-router-dom";
const pluginSnippet = `import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { aprilUi } from "april-ui/vite"

export default defineConfig({
  plugins: [react(), aprilUi()],
})`;
const providerSnippet = `import { AprilProvider } from "april-ui"
import { BrowserRouter } from "react-router-dom"

<BrowserRouter>
  <AprilProvider theme="light">
    <App />
  </AprilProvider>
</BrowserRouter>`;

function CodeBlock({ value }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const parts = value.split(/(\s+)/);

  return (
    <div className="landing__code">
      <pre>
        <code>
          {parts.map((part, index) =>
            /\s/.test(part) ? part : (
              <span key={index} className="landing__token">
                {part}
              </span>
            ),
          )}
        </code>
      </pre>
      <IconButton
        variant="ghost"
        size="sm"
        icon={copied ? "check" : "content_copy"}
        ariaLabel={copied ? "Copied" : "Copy"}
        onClick={copy}
      />
    </div>
  );
}

function ActionLink({ href, label, variant = "primary", trailing = false, onClick, className = "", newTab = false }) {
  return (
    <a
      className={`april-btn april-btn--${variant} april-btn--md ${className}`.trim()}
      href={href}
      onClick={onClick}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noreferrer" : undefined}
    >
      <span className="april-btn__label">{label}</span>
      {trailing ? (
        <span className="april-btn__icon material-symbols-outlined april-icon" aria-hidden="true">
          arrow_forward
        </span>
      ) : null}
    </a>
  );
}

function scrollToInstall(event) {
  event.preventDefault();
  const target = document.getElementById("install");
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const spacer = document.getElementById("install-spacer");
  if (spacer) spacer.style.height = "0px";
  const destination = target.getBoundingClientRect().top + window.scrollY - 24;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (spacer && destination > maxScroll) {
    spacer.style.height = `${Math.ceil(destination - maxScroll)}px`;
    void document.documentElement.offsetHeight;
  }
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  target.classList.remove("landing__steps--active");
  void target.offsetWidth;
  target.classList.add("landing__steps--active");
  if (window.location.hash !== "#install") {
    window.history.pushState(null, "", "#install");
  }
}

export function App() {
  const [theme, setTheme] = useState("light");
  const [piece, setPiece] = useState("Table");
  const dark = theme === "dark";

  useEffect(() => bindAprilInteractions(document), []);

  return (
    <AprilProvider theme={theme}>
      <div className="landing">
        <header className="landing__header">
          <div className="landing__bar">
            <p className="landing__wordmark april-text-style april-text-style--text-md-semibold">April</p>
            <nav className="landing__nav" aria-label="Page">
              <a className="landing__nav-link" href="#components">Components</a>
              <a className="landing__nav-link" href="#install" onClick={scrollToInstall}>Install</a>
              <a className="landing__nav-link" href={componentsHref} target="_blank" rel="noreferrer">Storybook</a>
            </nav>
            <div className="landing__header-actions">
              <Tag type="outlined" label={version} leadingIcon={false} trailingIcon={false} />
              <IconButton
                variant="ghost"
                icon={dark ? "light_mode" : "dark_mode"}
                ariaLabel={dark ? "Use light theme" : "Use dark theme"}
                onClick={() => setTheme(dark ? "light" : "dark")}
              />
              <ActionLink className="landing__pill" href={componentsHref} label="Open components" trailing newTab />
            </div>
          </div>
        </header>

        <main>
          <section className="landing__hero">
            <div className="landing__wrap">
              <h1 className="landing__title april-text-style april-text-style--display-xl-semibold">
                A React design system you can install
              </h1>
              <div className="landing__hero-row">
                <div className="landing__actions">
                  <ActionLink className="landing__pill" href={componentsHref} label="Open components" trailing newTab />
                  <ActionLink className="landing__pill" href="#install" label="See the install" variant="secondary" onClick={scrollToInstall} />
                </div>
                <p className="landing__lede april-text-style april-text-style--text-md-regular">
                  Add the Vite plugin, wrap your app, and use the same buttons, inputs, and menus.
                </p>
              </div>
            </div>
          </section>

          <section id="components" className="landing__catalog" aria-label="Components">
            <div className="landing__wrap">
              <p className="landing__kicker april-text-style april-text-style--text-xs-semibold">Components</p>
              <div className="landing__tabs" role="tablist" aria-label="Component">
                {pieces.map((label) => {
                  const selected = piece === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      className={selected ? "landing__tab landing__tab--selected" : "landing__tab"}
                      onClick={() => setPiece(label)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <div className={isWidePiece(piece) ? "landing__canvas landing__canvas--wide" : "landing__canvas"}>
                <ComponentStage key={piece} piece={piece} />
              </div>
            </div>
          </section>

          <section id="install" className="landing__install" aria-label="Install">
            <div className="landing__wrap">
              <h2 className="landing__section-title april-text-style april-text-style--display-md-semibold">
                Install it in three steps
              </h2>
              <div className="landing__steps">
                <article className="landing__step">
                  <h3 className="april-text-style april-text-style--text-sm-semibold">1. Install</h3>
                  <p className="april-text-style april-text-style--text-sm-regular">React 19 and React Router 7 are peer dependencies.</p>
                  <CodeBlock value={installCommand} />
                </article>
                <article className="landing__step">
                  <h3 className="april-text-style april-text-style--text-sm-semibold">2. Add the plugin</h3>
                  <p className="april-text-style april-text-style--text-sm-regular">It injects the stylesheet, Inter, and Material Symbols.</p>
                  <CodeBlock value={pluginSnippet} />
                </article>
                <article className="landing__step">
                  <h3 className="april-text-style april-text-style--text-sm-semibold">3. Wrap the app</h3>
                  <p className="april-text-style april-text-style--text-sm-regular">AprilProvider sets the light or dark theme.</p>
                  <CodeBlock value={providerSnippet} />
                </article>
              </div>
            </div>
          </section>
        </main>

        <footer className="landing__footer">
          <div className="landing__wrap landing__footer-row">
            <p className="april-text-style april-text-style--text-sm-semibold">April</p>
            <nav className="landing__footer-nav" aria-label="Footer">
              <a className="landing__nav-link" href="#components">Components</a>
              <a className="landing__nav-link" href="#install" onClick={scrollToInstall}>Install</a>
              <a className="landing__nav-link" href={componentsHref} target="_blank" rel="noreferrer">Storybook</a>
            </nav>
            <div className="landing__footer-meta">
              <p className="april-text-style april-text-style--text-sm-regular">April {version} · © elescript</p>
              <p className="april-text-style april-text-style--text-sm-regular">Designed by elescript</p>
            </div>
          </div>
        </footer>
      </div>
      <div id="install-spacer" className="landing__spacer" />
    </AprilProvider>
  );
}
