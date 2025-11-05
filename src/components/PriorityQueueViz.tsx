import { useState } from 'react'

function bubbleUp(heap: number[], idx: number) {
  while (idx > 0) {
    const parent = Math.floor((idx - 1) / 2)
    if (heap[parent] <= heap[idx]) break
    ;[heap[parent], heap[idx]] = [heap[idx], heap[parent]]
    idx = parent
  }
}

function bubbleDown(heap: number[], idx: number) {
  const n = heap.length
  while (true) {
    const l = 2 * idx + 1
    const r = 2 * idx + 2
    let smallest = idx
    if (l < n && heap[l] < heap[smallest]) smallest = l
    if (r < n && heap[r] < heap[smallest]) smallest = r
    if (smallest === idx) break
    ;[heap[idx], heap[smallest]] = [heap[smallest], heap[idx]]
    idx = smallest
  }
}

export default function PriorityQueueViz() {
  const [heap, setHeap] = useState<number[]>([])
  const [input, setInput] = useState('')
  const value = Number(input)

  const insert = () => {
    if (!Number.isFinite(value)) return
    const h = heap.slice()
    h.push(value)
    bubbleUp(h, h.length - 1)
    setHeap(h)
    setInput('')
  }
  const extractMin = () => {
    if (!heap.length) return
    const h = heap.slice()
    const last = h.pop()!
    if (h.length) {
      h[0] = last
      bubbleDown(h, 0)
    }
    setHeap(h)
  }
  const heapifyRandom = () => {
    const arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100))
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      bubbleDown(arr, i)
    }
    setHeap(arr)
  }
  const reset = () => setHeap([])

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="number" style={{ padding: 6 }} />
        <button onClick={insert}>insert</button>
        <button onClick={extractMin} disabled={!heap.length}>extractMin</button>
        <button onClick={heapifyRandom}>heapify random</button>
        <button onClick={reset} disabled={!heap.length}>reset</button>
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong>Array view:</strong>
        <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
          {heap.map((n, i) => (
            <div key={i} style={{ width: 48, height: 48, border: '2px solid #555', display: 'grid', placeItems: 'center', borderRadius: 6 }}>{n}</div>
          ))}
        </div>
      </div>
      <div>
        <strong>Tree view (indices):</strong>
        <div style={{ display: 'grid', gap: 8, marginTop: 6 }}>
          {[0].map(levelStart => (
            <div key={levelStart} style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              {heap[0] !== undefined && <Node value={heap[0]} index={0} />}
            </div>
          ))}
          {[1, 2].some(i => heap[i] !== undefined) && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              {[1, 2].map(i => heap[i] !== undefined ? <Node key={i} value={heap[i]} index={i} /> : <span key={i} style={{ width: 48 }} />)}
            </div>
          )}
          {[3,4,5,6].some(i => heap[i] !== undefined) && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
              {[3,4,5,6].map(i => heap[i] !== undefined ? <Node key={i} value={heap[i]} index={i} /> : <span key={i} style={{ width: 48 }} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Node({ value, index }: { value: number; index: number }) {
  return (
    <div title={`i=${index}`} style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid #2b6cb0', display: 'grid', placeItems: 'center' }}>{value}</div>
  )
}






