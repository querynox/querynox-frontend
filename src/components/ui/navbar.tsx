import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { Link } from "@tanstack/react-router"
import { Button } from "./button"
import { Sparkles, Zap } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        {/* Logo and Brand - Left Side */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/querynox.jpeg" 
              alt="QueryNox" 
              className="h-7 w-7 rounded-lg"
            />
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">
                <span className="text-foreground">Query</span>
                <span className="text-muted-foreground">Nox</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Auth Buttons - Right Side */}
        <div className="ml-auto flex items-center space-x-3">
          <SignedIn>
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/chat">
                  <Zap className="mr-2 h-4 w-4" />
                  Start Chat
                </Link>
              </Button>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="sm">
                <Sparkles className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 