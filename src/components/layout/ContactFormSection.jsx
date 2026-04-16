import { useEffect, useRef } from 'react'

export default function ContactFormSection() {
  const formRef = useRef(null)

  useEffect(() => {
    const container = formRef.current
    if (!container) return

    const script = document.createElement('script')
    script.setAttribute('data-b24-form', 'inline/13/rr4ag5')
    script.setAttribute('data-skip-moving', 'true')
    script.text = `
      (function(w,d,u){
        var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);
        var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
      })(window,document,'https://crm.gsi.ru/upload/crm/form/loader_13_rr4ag5.js');
    `
    container.appendChild(script)

    return () => {
      try { script.remove() } catch (e) { /* ignore */ }
    }
  }, [])

  return (
    <section id="contact" className="py-16 lg:py-24 bg-bg">
      <div className="container-luxury">
        <style>{`
          @media(max-width: 600px) {
            .b24-form-col { border-left: none !important; border-top: 0.5px solid #2a2d34 !important; }
          }
        `}</style>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          minHeight: '400px',
          backgroundColor: '#1A1D23',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          {/* Left — text */}
          <div style={{
            flex: '1 1 240px',
            padding: '40px 32px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
            <p style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', system-ui, sans-serif",
              color: '#9a9da3',
              margin: '0 0 16px',
            }}>
              Обратная связь
            </p>
            <h2 style={{
              fontSize: 'clamp(1.875rem, 3.5vw, 3rem)',
              fontWeight: 300,
              fontFamily: "'Inter', system-ui, sans-serif",
              color: '#F7F8FA',
              margin: '0 0 24px',
              lineHeight: 1.2,
            }}>
              Свяжитесь с&nbsp;нами
            </h2>
            <p style={{
              fontSize: '14px',
              fontFamily: "'Inter', system-ui, sans-serif",
              color: '#9a9da3',
              lineHeight: 1.7,
              margin: 0,
            }}>
              Оставьте контактные данные и&nbsp;мы&nbsp;подберём оптимальное решение для&nbsp;ваших задач. Ответим на&nbsp;любые вопросы
            </p>
          </div>

          {/* Right — Bitrix form */}
          <div
            className="b24-form-col"
            ref={formRef}
            style={{
              flex: '1 1 280px',
              padding: '32px 28px',
              borderLeft: '0.5px solid #2a2d34',
            }}
          />
        </div>
      </div>
    </section>
  )
}
