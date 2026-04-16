import { useEffect, useRef } from 'react'

/**
 * Блок обратной связи — форма подгружается из Битрикс24.
 * Форма инициализируется через loader-скрипт Битрикс24,
 * который автоматически встраивает форму в DOM.
 */

export default function ContactFormSection() {
  const formContainerRef = useRef(null)

  useEffect(() => {
    const container = formContainerRef.current
    if (!container) return

    const script = document.createElement('script')
    script.setAttribute('data-b24-form', 'inline/13/rr4ag5')
    script.setAttribute('data-skip-moving', 'true')
    script.text = `
      (function(w,d,u){
        var s=d.createElement('script');
        s.async=true;
        s.src=u+'?'+(Date.now()/180000|0);
        var h=d.getElementsByTagName('script')[0];
        h.parentNode.insertBefore(s,h);
      })(window,document,'https://crm.gsi.ru/upload/crm/form/loader_13_rr4ag5.js');
    `
    container.appendChild(script)

    return () => {
      try { script.remove() } catch (e) { /* ignore */ }
    }
  }, [])

  return (
    <section id="contact">
      <style>{`@media(max-width: 950px) { .nkm-1 { width: 100% !important; } }`}</style>
      <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '100vh', height: '100%' }}>
        <div
          className="nkm-1"
          style={{ width: '58%', padding: '7%', boxSizing: 'border-box' }}
        >
          <div
            style={{
              fontSize: '22px',
              textAlign: 'center',
              fontFamily: "'Montserrat', Arial, sans-serif",
            }}
          >
            Пожалуйста заполните форму и мы отправим Вам электронный каталог или коммерческое предложение
          </div>
          <div ref={formContainerRef} />
        </div>
        <div className="nkm-1" style={{ height: '100vh', width: '42%' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundImage:
                "url('https://optim.tildacdn.com/tild3433-6436-4436-a430-346564323665/-/resize/800x1000/-/format/webp/WhatsApp_Image_2025-.jpeg.webp')",
            }}
          />
        </div>
      </div>
    </section>
  )
}
