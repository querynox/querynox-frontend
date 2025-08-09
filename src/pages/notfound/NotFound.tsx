import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { useSystemContext } from "@/contexts/SystemContext"
import { Moon, Sun } from "lucide-react"

const NotFound = () => {
  const { darkmode, setDarkmode } = useSystemContext()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/querynox.jpeg" 
              alt="QueryNox" 
              className="h-8 w-8 rounded-lg"
            />
            <span className="text-xl font-bold">
              <span className="text-foreground">Query</span>
              <span className="text-muted-foreground">Nox</span>
            </span>
          </div>

          {/* Theme Toggle */}
          <div 
            className="cursor-pointer transition-all px-2" 
            onClick={() => setDarkmode(prev => !prev)}
          >
            {darkmode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-7xl font-extrabold text-foreground mb-4 animate-fade-in-up">
          404
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md animate-fade-in-up animation-delay-200">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Button asChild size="lg" className="px-8 py-6">
          <Link to="/">
            Go Home
          </Link>
        </Button>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="px-6 py-8 text-center text-muted-foreground text-sm">
          © 2025 QueryNox. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default NotFound