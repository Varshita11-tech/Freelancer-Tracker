export default function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200/70 px-6 py-5 text-center text-xs text-slate-400 dark:border-slate-800">
      © {new Date().getFullYear()} Freelancer Tracker. Built for independent professionals, everywhere.
    </footer>
  )
}
