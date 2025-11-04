import { useState } from 'react'

export default function DequeViz() {
  const [items, setItems] = useState<number[]>([])
  const [input, setInput] = useState('')
  const value = Number(input)

  const pushFront = () => {
    if (!Number.isFinite(value)) return
    setItems(prev => [value, ...prev])
    setInput('')
  }
  const pushBack = () => {
    if (!Number.isFinite(value)) return
    setItems(prev => [...prev, value])
    setInput('')
  }
  const popFront = () => setItems(prev => prev.slice(1))
  const popBack = () => setItems(prev => prev.slice(0, -1))
  const reset = () => setItems([])

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="number" style={{ padding: 6 }} />
        <button onClick={pushFront}>pushFront</button>
        <button onClick={pushBack}>pushBack</button>
        <button onClick={popFront} disabled={!items.length}>popFront</button>
        <button onClick={popBack} disabled={!items.length}>popBack</button>
        <button onClick={reset} disabled={!items.length}>reset</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: '#888' }}>front</span>
        {items.map((n, i) => (
          <div key={i} style={{ width: 48, height: 48, border: '2px solid #555', display: 'grid', placeItems: 'center', borderRadius: 6, transition: 'all .2s' }}>{n}</div>
        ))}
        <span style={{ color: '#888' }}>back</span>
      </div>
    </div>
  )
}



