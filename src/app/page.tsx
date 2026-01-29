
import Link from "next/link"
import { ClipboardList, FileText } from "lucide-react"

export default function DirectionSection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f9ff] px-6">
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full">

        <Link id="todos_card" href="/todos" className="group">
          <div className="relative p-8 rounded-3xl bg-white shadow-md transition-all duration-300         hover:-translate-y-4 hover:shadow-2xl border border-blue-100 overflow-hidden">

            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-100 mb-6">
              <ClipboardList className="text-blue-600" size={32} />
            </div>

            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              Todo App
            </h2>

            <p className="text-gray-500 opacity-0 translate-y-4  group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            add your new task and complete it
            </p>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-all"></div>
          </div>
        </Link>

        {/* POST CARD */}
        <Link id="post_card"  href="/post" className="group">
          <div className="relative p-8 rounded-3xl bg-white shadow-md transition-all duration-300  hover:-translate-y-4 hover:shadow-2xl border border-blue-100 overflow-hidden">

            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-teal-100 mb-6">
              <FileText className="text-teal-600" size={32} />
            </div>

            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              Post App
            </h2>

            <p className="text-gray-500 opacity-0 translate-y-4   group-hover:opacity-100 group-hover:translate-y-0   transition-all duration-300">
            Take a look  people post list.
            </p>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-200 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-all"></div>
          </div>
        </Link>

      </div>
    </div>
  )
}
