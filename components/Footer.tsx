
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-neutral-100 justify-center text-neutral-700 py-6 flex flex-col sm:flex-row justify-between items-center px-6 gap-4">
      <p className="text-sm text-center sm:text-left">
        &copy; {year} Richie. All rights reserved.
      </p>

   </footer>
  )
}

