import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { useSystemContext } from "@/contexts/SystemContext"
import { Moon, Sun, Sparkles, Zap, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

const About = () => {
  const { darkmode, setDarkmode } = useSystemContext()
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360)
    }, 50) // Smooth rotation

    return () => clearInterval(interval)
  }, [])

  const companyLogos = [
    { src: "/openai.svg", alt: "OpenAI", angle: 0 },
    { src: "/geminisvg.png", alt: "Google Gemini", angle: 90 },
    { src: "/claude.png", alt: "Anthropic Claude", angle: 180 },
    { src: "/meta svg.png", alt: "Meta AI", angle: 270 }
  ]

  // Calculate orbital positions
  const getOrbitalPosition = (angle: number, radius: number) => {
    const radian = ((angle + rotation) * Math.PI) / 180
    const x = Math.cos(radian) * radius
    const y = Math.sin(radian) * radius
    return { x, y }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo - Left */}
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

          {/* Auth & Theme - Right */}
          <div className="flex items-center space-x-3">
            <div className="cursor-pointer transition-all px-2" onClick={() => setDarkmode(prev => !prev)}>
              {darkmode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </div>
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

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
            About QueryNOX
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your AI-powered companion for intelligent conversations and seamless interactions
          </p>
        </div>

        {/* Central Logo with Revolving Company Logos */}
        <div className="flex justify-center items-center mb-20">
          <div className="relative w-96 h-96">
            {/* Central QueryNOX Logo */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30 shadow-2xl">
                <img 
                  src="/querynox.jpeg" 
                  alt="QueryNOX" 
                  className="w-20 h-20 rounded-lg"
                />
              </div>
            </div>

            {/* Orbital Ring */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-pulse"></div>

            {/* Revolving Company Logos */}
            {companyLogos.map((logo, index) => {
              const position = getOrbitalPosition(logo.angle, 120) // 120px radius
              return (
                <div
                  key={index}
                  className="absolute w-16 h-16 transition-transform duration-100 ease-linear"
                  style={{
                    left: `calc(50% + ${position.x}px - 32px)`,
                    top: `calc(50% + ${position.y}px - 32px)`,
                  }}
                >
                  <div className="w-full h-full bg-white rounded-full shadow-lg border-2 border-primary/20 flex items-center justify-center backdrop-blur-sm">
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Description Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Powered by Leading AI Models</h2>
          <p className="text-lg text-muted-foreground mb-8">
            QueryNOX integrates with the world's most advanced AI models to provide you with 
            intelligent, context-aware conversations. Our platform seamlessly connects you to 
            cutting-edge AI technology, making complex interactions feel natural and effortless.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-3">Multi-Model Integration</h3>
              <p className="text-muted-foreground">
                Access to OpenAI, Google Gemini, Anthropic Claude, and Meta AI models
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold mb-3">Seamless Experience</h3>
              <p className="text-muted-foreground">
                Unified interface that works across all major AI platforms
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Future of AI?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedIn>
              <Button asChild size="lg">
                <Link to="/chat">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Chatting
                </Link>
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Started Free
                </Button>
              </SignInButton>
            </SignedOut>
            <Button asChild variant="outline" size="lg">
              <Link to="/">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
