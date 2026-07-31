import { motion } from 'framer-motion'
import { classNames } from '../../utils/formatters'

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'inline-flex items-center justify-center gap-2 rounded-xl bg-danger px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:brightness-110 active:scale-[0.98] transition-all duration-200',
}

export default function Button({ children, variant = 'primary', icon: Icon, className, type = 'button', ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      className={classNames(VARIANTS[variant], className)}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.button>
  )
}
