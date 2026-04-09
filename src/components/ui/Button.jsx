import { Link } from 'react-router-dom'

export default function Button({ children, to, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center px-8 py-3.5 text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer'

  const variants = {
    primary: 'border border-text text-text hover:bg-text hover:text-text-light',
    outline: 'border border-border text-text-secondary hover:border-text hover:text-text',
    dark: 'border border-white/25 text-white hover:bg-white hover:text-bg-dark',
    ghost: 'text-text-secondary hover:text-text',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
  if (href) return <a href={href} className={classes} {...props}>{children}</a>
  return <button className={classes} {...props}>{children}</button>
}
