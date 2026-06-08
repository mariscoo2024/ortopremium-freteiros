import { useState } from 'react'
import { DB, INFO, CORES } from './data'

function norm(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

const s = {
  wrap: { maxWidth: 680, margin: '0 auto', paddingBottom: 48 },
  header: { background: '#0f172a', color: '#fff', padding: '18px 24px', marginBottom: 24 },
  logo: { fontSize: 20, fontWeight: 700, letterSpacing: 1 },
  sub: { fontSize: 12, opacity: 0.5, marginTop: 2 },
  tabs: { display: 'flex', gap: 4, marginBottom: 20, padding: '0 4px' },
  card: { background: '#fff', borderRadius: 12, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: 12 },
  input: { width: '100%', padding: '13px 16px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 16, outline: 'none', fontFamily: 'inherit' },
  badge: (ok) => ({ display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, marginBottom: 8, background: ok ? '#dcfce7' : '#f1f5f9', color: ok ? '#166534' : '#64748b' }),
  cityName: { fontSize: 18, fontWeight: 700, color: '#0f172a' },
  frName: (cor) => ({ fontSize: 24, fontWeight: 800, color: cor, margin: '4px 0 6px' }),
  infoLine: { fontSize: 13, color: '#64748b', lineHeight: 1.8 },
  divider: { border: 'none', borderTop: '1px solid #f1f5f9', margin: '8px 0' },
  pill: { fontSize: 11, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: '2px 8px', color: '#334155', display: 'inline-block', margin: '2px 3px' },
  frCard: (cor) => ({ background: '#fff', borderRadius: 12, padding: '18px 22px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', borderLeft: `4px solid ${cor}`, marginBottom: 14 }),
  badge2: (cor) => ({ background: cor + '18', color: cor, fontWeight: 700, fontSize: 13, padding: '4px 14px', borderRadius: 99, whiteSpace: 'nowrap' }),
}

export default function App() {
  const [query, setQuery] = useState('')
  const [aba, setAba] = useState('busca')

  const matches = query.length >= 2
    ? DB.filter(([c]) => norm(c).includes(norm(query)))
    : []

  const freteiros = Object.keys(INFO)
  const porFreteiro = Object.fromEntries(
    freteiros.map(f => [f, DB.filter(([, fr]) => fr === f).map(([c]) => c).sort()])
  )

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <div style={s.logo}>ORTOPREMIUM</div>
        <div style={s.sub}>Sistema de consulta · 665 cidades · 7 freteiros</div>
      </div>

      {/* Abas */}
      <div style={s.tabs}>
        {[['busca', '🔍 Buscar cidade'], ['freteiros', '📋 Ver por freteiro']].map(([id, label]) => (
          <button key={id} onClick={() => setAba(id)} style={{
            flex: 1, padding: '11px 0', border: 'none', borderRadius: 8,
            cursor: 'pointer', fontSize: 14, fontWeight: 600,
            background: aba === id ? '#0f172a' : '#e8ecf0',
            color: aba === id ? '#fff' : '#64748b',
            transition: 'all 0.15s',
          }}>{label}</button>
        ))}
      </div>

      {/* ABA BUSCA */}
      {aba === 'busca' && (
        <div style={{ padding: '0 4px' }}>
          <div style={s.card}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
              Pesquisar cidade
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ex: Curitiba, Chapecó, Santos..."
                style={s.input}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '0 16px', cursor: 'pointer', fontSize: 18, color: '#94a3b8' }}>✕</button>
              )}
            </div>
            {query.length === 1 && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>Digite mais 1 letra...</div>}
          </div>

          {query.length >= 2 && matches.length === 0 && (
            <div style={{ ...s.card, borderLeft: '4px solid #e2e8f0' }}>
              <span style={s.badge(false)}>✗ Não atendemos</span>
              <div style={s.cityName}>Nenhuma cidade encontrada</div>
              <hr style={s.divider} />
              <div style={s.infoLine}>Verifique o nome digitado ou entre em contato com o setor comercial.</div>
            </div>
          )}

          {matches.slice(0, 15).map(([cidade, fr], i) => {
            const info = INFO[fr]
            const cor = CORES[fr] || '#1e293b'
            return (
              <div key={i} style={{ ...s.card, borderLeft: `4px solid ${cor}` }}>
                <span style={s.badge(true)}>✓ Atendemos</span>
                <div style={s.cityName}>{cidade}</div>
                <div style={s.frName(cor)}>{fr}</div>
                <hr style={s.divider} />
                <div style={s.infoLine}>
                  📍 {info.regioes}<br />
                  📦 {info.carga}
                </div>
              </div>
            )
          })}

          {matches.length > 15 && (
            <div style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8', padding: 8 }}>
              ...e mais {matches.length - 15} resultado(s). Refine a busca.
            </div>
          )}
        </div>
      )}

      {/* ABA FRETEIROS */}
      {aba === 'freteiros' && (
        <div style={{ padding: '0 4px' }}>
          {freteiros.map(fr => {
            const info = INFO[fr]
            const cor = CORES[fr]
            const cidades = porFreteiro[fr]
            return (
              <div key={fr} style={s.frCard(cor)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: cor }}>{fr}</div>
                    <div style={{ fontSize: 13, color: '#475569', marginTop: 2 }}>📍 {info.regioes}</div>
                    <div style={{ fontSize: 13, color: '#475569' }}>📦 {info.carga}</div>
                  </div>
                  <div style={s.badge2(cor)}>{cidades.length} cidades</div>
                </div>
                <hr style={s.divider} />
                <div>
                  {cidades.map(c => <span key={c} style={s.pill}>{c}</span>)}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
