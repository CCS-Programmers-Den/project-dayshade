import Image from "next/image"
import Link from "next/link"
import { Facebook, Mail, Youtube } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="relative bg-[#363636] text-white px-4 md:px-8 lg:px-16 ">

      <div className="max-w-7xl mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16 lg:gap-24">
          {/* Left Section: Logo, Description, Socials */}
          <div className="flex flex-col gap-4 md:w-1/2 lg:w-2/5">
            <div className="flex items-center">
              <Image src="/assets/pd-logo-sm.png" alt="Programmers Den Logo" width={40} height={40} className="h-10 w-10" />
              <Image
                src="/assets/pd-banner.png"
                alt="Programmers Den Banner"
                width={200}
                height={30}
                className="h-auto w-48"
              />
            </div>
            <p className="text-sm md:text-lg text-gray-300 max-w-md">
              The computer technology-focused college organization preparing students for industry practices in Design and Development
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="https://www.facebook.com/ccsprogrammersden" target="_blank" className="text-gray-300 hover:text-pd-purple transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="mailto:progdenofficial@gmail.com" className="text-gray-300 hover:text-pd-purple transition-colors">
                <Mail className="h-6 w-6" />
              </Link>
              <Link href="https://www.youtube.com/@ccsprogrammersden3712" target="_blank" className="text-gray-300 hover:text-pd-purple transition-colors">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Browse and Apply */}
          <div className="grid grid-cols-2 gap-8 md:gap-16 lg:gap-24 md:w-1/2 lg:w-3/5">
            {/* Browse Section */}
            <div>
              <h3 className="text-lg md:text-3xl font-bold mb-4">Browse</h3>
              <ul className="space-y-2 text-sm md:text-lg text-gray-300">
                <li>
                  <Link href="/" className="hover:text-pd-purple transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-pd-purple transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-pd-purple transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-pd-purple transition-colors">
                    Projects
                  </Link>
                </li>
              </ul>
            </div>

            {/* Apply Section */}
            <div>
              <h3 className="text-lg md:text-3xl font-bold mb-4">Apply</h3>
              <ul className="space-y-2 text-sm md:text-lg text-gray-300">
                <li>
                  <Link href="/perks" className="hover:text-pd-purple transition-colors">
                    Perks
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="hover:text-pd-purple transition-colors">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Bottom Section: University and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm md:text-lg text-gray-400 gap-2">
          <span>Tarlac State University | College of Computer Studies</span>
          <span>Programmers&apos; Den &copy; 2025</span>
        </div>
      </div>
    </footer>
  )
}
