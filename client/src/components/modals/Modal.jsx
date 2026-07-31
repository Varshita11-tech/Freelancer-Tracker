import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { createPortal } from 'react-dom'

export default function Modal({ open, onClose, title, children, footer, maxWidth = 'max-w-lg' }) {
  if (typeof document === 'undefined') return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className={`card-base w-full ${maxWidth} max-h-[88vh] overflow-y-auto p-6`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="section-title">{title}</h3>
              <button onClick={onClose} className="btn-ghost h-8 w-8 !p-0">
                <FiX size={18} />
              </button>
            </div>
            <div>{children}</div>
            {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
