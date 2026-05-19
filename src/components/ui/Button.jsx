import { Link } from 'react-router-dom'

export default function Button({ children, to, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center whitespace-nowrap shrink-0 px-8 py-3.5 text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer'

  const variants = {
    primary: 'border border-text text-text hover:bg-text hover:text-text-light',
    outline: 'border border-text/30 text-text hover:border-text hover:bg-text hover:text-text-light',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
  if (href) return <a href={href} className={classes} {...props}>{children}</a>
  return <button className={classes} {...props}>{children}</button>
}
