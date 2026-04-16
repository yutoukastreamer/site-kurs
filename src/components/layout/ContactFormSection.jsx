import { useEffect } from 'react'

export default function ContactFormSection() {
  useEffect(() => {
    const script = document.createElement('script')
    script.text = `
      (function(w,d,u){
        var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
        var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
      })(window,document,'https://crm.gsi.ru/upload/crm/site_button/loader_3_4b8pmj.js');
    `
    document.body.appendChild(script)

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
