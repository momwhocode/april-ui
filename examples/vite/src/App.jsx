import { useState } from 'react'
import { Alert, Button, TextInput } from 'april-ui'

export function App() {
  const [email, setEmail] = useState('ada@april.dev')
  const [sent, setSent] = useState(false)

  return (
    <main style={{ maxWidth: 420, margin: '64px auto', padding: 24 }}>
      <h1 className="april-text-style april-text-style--display-xs-semibold" style={{ margin: '0 0 8px' }}>
        April in your app
      </h1>
      <p className="april-text-style april-text-style--text-sm-regular" style={{ margin: '0 0 24px' }}>
        This example uses the built package and the Vite plugin.
      </p>
      {sent ? (
        <Alert color="green" title="Welcome to April" description={email} showButtons={false} />
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault()
            setSent(true)
          }}
          style={{ display: 'grid', gap: 16 }}
        >
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ada@april.dev"
            leadingIcon
            leadingIconName="mail"
          />
          <Button label="Continue" type="submit" leadingIcon={false} trailingIcon={false} />
        </form>
      )}
    </main>
  )
}
