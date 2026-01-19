import { useState } from 'react'
import './App.css'

const VALID_CHARS_REGEX = /^[a-zA-Z\s!?#@]*$/

const SPECIAL_CHARS: Record<string, string> = {
  '!': 'exclamation',
  '?': 'question',
  '#': 'hash',
  '@': 'at',
}

function convertToSlackGlyphs(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map((char) => {
      if (char === ' ') {
        return '  '
      }
      if (char >= 'a' && char <= 'z') {
        return `:alphabet-white-${char}:`
      }
      if (SPECIAL_CHARS[char]) {
        return `:alphabet-white-${SPECIAL_CHARS[char]}:`
      }
      return ''
    })
    .join('')
}

function App() {
  const [inputText, setInputText] = useState('')
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (VALID_CHARS_REGEX.test(value)) {
      setInputText(value)
      setCopied(false)
    }
  }

  const slackOutput = convertToSlackGlyphs(inputText)

  const handleCopy = async () => {
    if (slackOutput) {
      await navigator.clipboard.writeText(slackOutput)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>SLACK BOSS LEVEL TEXT</h1>
        <p>Transform your text into bold Slack letter glyphs</p>
      </header>

      <main className="main">
        <div className="input-section">
          <label htmlFor="text-input">ENTER YOUR TEXT</label>
          <input
            id="text-input"
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type here (A-Z, !?#@)"
            autoComplete="off"
          />
          <span className="hint">Letters A-Z, spaces, and !?#@ allowed</span>
        </div>

        <div className="output-section">
          <label>SLACK OUTPUT</label>
          <div className="output-box">
            {slackOutput || 'Your converted text will appear here...'}
          </div>
          <button
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            disabled={!slackOutput}
          >
            {copied ? 'COPIED!' : 'COPY TO CLIPBOARD'}
          </button>
        </div>

        <div className="preview-section">
          <label>PREVIEW</label>
          <div className="preview-box">
            {inputText
              ? inputText
                  .toUpperCase()
                  .split('')
                  .map((char, i) => (
                    <span key={i} className={char === ' ' ? 'space' : 'letter'}>
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))
              : 'Preview will appear here...'}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Paste the output in Slack to see the magic</p>
      </footer>
    </div>
  )
}

export default App
