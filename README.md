# April

April is a React design system. Install the package, add the Vite plugin, and use the components.

**Current version: 0.1.0**

Storybook is the catalog: [april-ui.vercel.app](https://april-ui.vercel.app/). Run `npm run dev` for a local copy on port 6006. Previews of each component are below.

## Versioning

April follows [semantic versioning](https://semver.org/).

| Bump | When it happens | What you do |
| --- | --- | --- |
| Patch `0.1.x` | Bug fixes. Props and markup stay the same. | `npm update april-ui` |
| Minor `0.x.0` | New components or optional props. Existing usage keeps working. | `npm update april-ui` |
| Major `x.0.0` | A prop, component name, or plugin option changes in a way that breaks existing apps. | Read the release notes, then install that major on purpose. |

`0.x` releases can still change between minors. Pin the version when you need a fixed look:

```bash
npm install april-ui@0.1.0
```

Check what an app is running:

```bash
npm ls april-ui
```

```tsx
import { version } from 'april-ui'

console.log(version) // "0.1.0"
```

The Vite plugin also writes the release into the page:

```html
<meta name="april-ui-version" content="0.1.0" />
```

## Integrate

Peer dependencies: `react` and `react-dom` 19, and `react-router-dom` 7 (sidebar and menu options use `Link` and `NavLink`). Vite is only needed for the plugin.

### 1. Install

```bash
npm install april-ui react react-dom react-router-dom
```

### 2. Add the plugin

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { aprilUi } from 'april-ui/vite'

export default defineConfig({
  plugins: [react(), aprilUi()],
})
```

`aprilUi()` injects `april-ui/styles.css`, Inter, and Material Symbols. Icons are symbol names (`"add"`, `"mail"`, `"close"`), passed as strings.

| Option | Default | Effect |
| --- | --- | --- |
| `injectStyles` | `true` | Adds the April stylesheet |
| `injectFonts` | `true` | Adds Inter and Material Symbols |

```ts
aprilUi({ injectFonts: false })
```

### 3. Wrap the app

`AprilProvider` sets `data-theme` on `<html>` (`"light"` or `"dark"`).

```tsx
import { AprilProvider } from 'april-ui'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AprilProvider theme="light">
      <App />
    </AprilProvider>
  </BrowserRouter>,
)
```

### 4. Use a component

```tsx
import { Button, TextInput } from 'april-ui'

export function App() {
  return (
    <>
      <TextInput label="Email" placeholder="ada@april.dev" leadingIcon leadingIconName="mail" />
      <Button label="Continue" leadingIcon={false} trailingIcon={false} />
    </>
  )
}
```

### Without Vite

Import the stylesheet once, and load Inter plus Material Symbols yourself:

```tsx
import 'april-ui/styles.css'
```

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0..1,0&display=swap" />
```

## Components

Each image links to that story on [april-ui.vercel.app](https://april-ui.vercel.app/).

<table>
<tr>
<td align="center" width="50%">
<a href="https://april-ui.vercel.app/?path=/story/april-system-button--playground"><img src="docs/components/button.png" alt="Button" width="240"><br><strong>Button</strong></a>
</td>
<td align="center" width="50%">
<a href="https://april-ui.vercel.app/?path=/story/april-system-icon-button--playground"><img src="docs/components/icon-button.png" alt="Icon button" width="80"><br><strong>Icon button</strong></a>
</td>
</tr>
<tr>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-text-input--playground"><img src="docs/components/text-input.png" alt="Text input" width="320"><br><strong>Text input</strong></a>
</td>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-textarea-input--playground"><img src="docs/components/textarea.png" alt="Textarea" width="320"><br><strong>Textarea</strong></a>
</td>
</tr>
<tr>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-select-input--playground"><img src="docs/components/select.png" alt="Select" width="320"><br><strong>Select</strong></a>
</td>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-otp-input--playground"><img src="docs/components/otp.png" alt="OTP input" width="260"><br><strong>OTP input</strong></a>
</td>
</tr>
<tr>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-date-picker-input--playground"><img src="docs/components/date-picker.png" alt="Date picker" width="280"><br><strong>Date picker</strong></a>
</td>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-selector--playground"><img src="docs/components/selector.png" alt="Selector" width="200"><br><strong>Selector</strong></a>
</td>
</tr>
<tr>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-badge--playground"><img src="docs/components/badge.png" alt="Badge" width="64"><br><strong>Badge</strong></a>
</td>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-tag--playground"><img src="docs/components/tag.png" alt="Tag" width="140"><br><strong>Tag</strong></a>
</td>
</tr>
<tr>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-alert--playground"><img src="docs/components/alert.png" alt="Alert" width="420"><br><strong>Alert</strong></a>
</td>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-avatar--gallery"><img src="docs/components/avatar.png" alt="Avatar" width="420"><br><strong>Avatar</strong></a>
</td>
</tr>
<tr>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-tabs--playground"><img src="docs/components/tabs.png" alt="Tabs" width="420"><br><strong>Tabs</strong></a>
</td>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-progress-bar--gallery"><img src="docs/components/progress.png" alt="Progress bar" width="320"><br><strong>Progress bar</strong></a>
</td>
</tr>
<tr>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-spinner--playground"><img src="docs/components/spinner.png" alt="Spinner" width="48"><br><strong>Spinner</strong></a>
</td>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-menu-dropdown--menu-dropdown-story"><img src="docs/components/menu.png" alt="Menu" width="320"><br><strong>Menu</strong></a>
</td>
</tr>
<tr>
<td align="center" colspan="2">
<a href="https://april-ui.vercel.app/?path=/story/april-system-breadcrumb--breadcrumb-header-story"><img src="docs/components/breadcrumb.png" alt="Breadcrumb" width="640"><br><strong>Breadcrumb</strong></a>
</td>
</tr>
<tr>
<td align="center" colspan="2">
<a href="https://april-ui.vercel.app/?path=/story/april-system-filter-chips-header--playground"><img src="docs/components/filter-chips.png" alt="Filter chips" width="640"><br><strong>Filter chips</strong></a>
</td>
</tr>
<tr>
<td align="center" colspan="2">
<a href="https://april-ui.vercel.app/?path=/story/april-system-plan-card-picker--playground"><img src="docs/components/plan-cards.png" alt="Plan cards" width="560"><br><strong>Plan cards</strong></a>
</td>
</tr>
<tr>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/ui-patterns-modal--playground"><img src="docs/components/modal.png" alt="Modal" width="360"><br><strong>Modal</strong></a>
</td>
<td align="center">
<a href="https://april-ui.vercel.app/?path=/story/april-system-sidebar--playground"><img src="docs/components/sidebar.png" alt="Sidebar" width="180"><br><strong>Sidebar</strong></a>
</td>
</tr>
<tr>
<td align="center" colspan="2">
<a href="https://april-ui.vercel.app/?path=/story/april-system-table--playground"><img src="docs/components/table.png" alt="Table" width="720"><br><strong>Table</strong></a>
</td>
</tr>
</table>

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Storybook on port 6006 |
| `npm run build` | Library build in `dist/` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build-storybook` | Static Storybook in `storybook-static/` |

The example in `examples/vite` consumes the built package the same way an app would. The `file:` link sits beside this repo's own React, so the example Vite config dedupes `react` and `react-router-dom`.

## Publish surface

| Import | Use |
| --- | --- |
| `april-ui` | Components, `AprilProvider`, and `version` |
| `april-ui/vite` | `aprilUi()` Vite plugin |
| `april-ui/styles.css` | Stylesheet, if you are not using the plugin |
