import { motion } from 'framer-motion'
import { classNames } from '../../utils/formatters'

export default function Card({ children, className, hover = true, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -3 } : {}}
      transition={{ duration: 0.25 }}
      className={classNames('card-base p-5', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
