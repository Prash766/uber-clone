import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <footer className="hidden md:block w-full md:bg-black md:text-white md:py-16 md:mt-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-16">
          <h2 className="text-[22px] font-medium mb-6">Uber</h2>
          <Link to="#" className="text-[18px] hover:opacity-70 transition-opacity py-10 hover:border-b-2 hover:border-white">
            Visit Help Center
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-[16px] font-medium mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Our offerings
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Investors
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[16px] font-medium mb-6">Products</h3>
            <ul className="space-y-4">
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Ride
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Drive
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Deliver
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Eat
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Uber for Business
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Uber Freight
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Gift cards
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[16px] font-medium mb-6">Global citizenship</h3>
            <ul className="space-y-4">
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Safety
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Diversity and Inclusion
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[16px] font-medium mb-6">Travel</h3>
            <ul className="space-y-4">
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Reserve
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Airports
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  Cities
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex gap-6">
            <Link to="#" className="hover:opacity-70 transition-opacity">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link to="#" className="hover:opacity-70 transition-opacity">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link to="#" className="hover:opacity-70 transition-opacity">
              <Youtube className="w-6 h-6" />
            </Link>
            <Link to="#" className="hover:opacity-70 transition-opacity">
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link to="#" className="hover:opacity-70 transition-opacity">
              <Instagram className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

