import { useState } from "react";
import { Alert, AprilProvider, Button, IconButton, Tag, TextInput, version } from "april-ui";

const componentsHref = import.meta.env.DEV ? "http://localhost:6006" : "/components/";

const pieces = ["Button", "Input", "Menu", "Dialog", "Table"];

function ActionLink({ href, label, variant = "primary", trailing = false, onClick }) {
  return (
    <a className={`april-btn april-btn--${variant} april-btn--md`} href={href} onClick={onClick}>
      <span className="april-btn__label">{label}</span>
      {trailing ? (
        <span className="april-btn__icon material-symbols-outlined" aria-hidden="true">
          arrow_forward
        </span>
      ) : null}
    </a>
  );
}

function scrollToInstall(event) {
  if (window.location.hash !== "#install") return;
  event.preventDefault();
  document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
}

export function App() {
  const [theme, setTheme] = useState("light");
  const [email, setEmail] = useState("ada@april.dev");
  const [sent, setSent] = useState(false);
  const dark = theme === "dark";

  return (
    <AprilProvider theme={theme}>
      <div className="landing">
        <header className="landing__header">
          <p className="landing__wordmark april-text-style april-text-style--text-md-semibold">April</p>
          <Tag type="outlined" label={version} leadingIcon={false} trailingIcon={false} />
          <nav className="landing__nav" aria-label="Page">
            <ActionLink href="#install" label="Install" variant="ghost" onClick={scrollToInstall} />
            <ActionLink href={componentsHref} label="Components" variant="outlined" trailing />
            <IconButton
              variant="ghost"
              icon={dark ? "light_mode" : "dark_mode"}
              ariaLabel={dark ? "Use light theme" : "Use dark theme"}
              onClick={() => setTheme(dark ? "light" : "dark")}
            />
          </nav>
        </header>

        <main className="landing__main">
          <section className="landing__hero">
            <div>
              <h1 className="landing__title april-text-style april-text-style--display-xs-semibold">
                A React design system you can install
              </h1>
              <p className="landing__lede april-text-style april-text-style--text-md-regular">
                Add the Vite plugin, wrap your app, and use the same buttons, inputs, and menus.
              </p>
              <div className="landing__actions">
                <ActionLink href={componentsHref} label="Open components" trailing />
                <ActionLink href="#install" label="See the install" variant="secondary" onClick={scrollToInstall} />
              </div>
            </div>

            <form
              className="landing__panel"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <div className="landing__tags" aria-hidden="true">
                {pieces.map((label) => (
                  <Tag key={label} type="ghost" label={label} leadingIcon={false} trailingIcon={false} />
                ))}
              </div>
              {sent ? (
                <Alert
                  color="green"
                  title="Welcome to April"
                  description={email}
                  showButtons={false}
                  onDismiss={() => setSent(false)}
                />
              ) : (
                <>
                  <TextInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="ada@april.dev"
                    leadingIcon
                    leadingIconName="mail"
                    fullWidth
                  />
                  <Button label="Continue" type="submit" fullWidth leadingIcon={false} trailingIcon={false} />
                </>
              )}
            </form>
          </section>

          <section id="install" className="landing__steps" aria-label="Install">
            <article className="landing__step">
              <h2 className="april-text-style april-text-style--text-sm-semibold">1. Install</h2>
              <p className="april-text-style april-text-style--text-sm-regular">React 19 and React Router 7 are peer dependencies.</p>
              <pre className="landing__code"><code>{`npm install april-ui\n  react react-dom\n  react-router-dom`}</code></pre>
            </article>
            <article className="landing__step">
              <h2 className="april-text-style april-text-style--text-sm-semibold">2. Add the plugin</h2>
              <p className="april-text-style april-text-style--text-sm-regular">It injects the stylesheet, Inter, and Material Symbols.</p>
              <pre className="landing__code"><code>{"plugins: [react(), aprilUi()]"}</code></pre>
            </article>
            <article className="landing__step">
              <h2 className="april-text-style april-text-style--text-sm-semibold">3. Wrap the app</h2>
              <p className="april-text-style april-text-style--text-sm-regular">AprilProvider sets the light or dark theme.</p>
              <pre className="landing__code"><code>{`<AprilProvider theme="light">`}</code></pre>
            </article>
          </section>
        </main>

        <footer className="landing__footer">
          <p className="april-text-style april-text-style--text-sm-regular">April {version}</p>
          <p className="april-text-style april-text-style--text-sm-regular">MIT</p>
        </footer>
      </div>
    </AprilProvider>
  );
}
