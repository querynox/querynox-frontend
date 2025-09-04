import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { useSystemContext } from "@/contexts/SystemContext"
import { Moon, Sun, Sparkles, Zap, ArrowLeft, Heart, Users, Globe } from "lucide-react"
import { Hackice20GithubLink, SohamJoshiGithubLink } from "@/data/constants"
import { useEffect, useState } from "react"
import ClerkUserButton from "@/components/clerk/ClerkUserButton"

const About = () => {
  const { darkmode, setDarkmode } = useSystemContext()
  const [sohamAvatar, setSohamAvatar] = useState<string>("")
  const [hackiceAvatar, setHackiceAvatar] = useState<string>("")
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    // Fetch GitHub avatars
    const fetchGitHubAvatars = async () => {
      try {
        // Extract username from GitHub URLs
        const sohamUsername = SohamJoshiGithubLink.split('/').pop()
        const hackiceUsername = Hackice20GithubLink.split('/').pop()
        
        if (sohamUsername) {
          const sohamResponse = await fetch(`https://api.github.com/users/${sohamUsername}`)
          const sohamData = await sohamResponse.json()
          setSohamAvatar(sohamData.avatar_url)
        }
        
        if (hackiceUsername) {
          const hackiceResponse = await fetch(`https://api.github.com/users/${hackiceUsername}`)
          const hackiceData = await hackiceResponse.json()
          setHackiceAvatar(hackiceData.avatar_url)
        }
      } catch (error) {
        console.error('Error fetching GitHub avatars:', error)
      }
    }

    fetchGitHubAvatars()
  }, [])

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
                <ClerkUserButton/>
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



        {/* What We Do Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">What We Do</h2>
              <p className="text-lg text-muted-foreground mb-6">
                QueryNOX is more than just another AI chat platform. We're your digital companion, 
                designed to make conversations meaningful, productive, and downright enjoyable. 
                Whether you're brainstorming ideas, seeking answers, or just want to chat with 
                an intelligent friend, we've got you covered.
              </p>
              <p className="text-lg text-muted-foreground">
                Our platform brings together cutting-edge AI technology with a user experience 
                that feels natural and intuitive. No complicated interfaces, no steep learning curves 
                – just pure, intelligent conversation at your fingertips.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                                 {/* Central QueryNOX Logo */}
                 <div className="absolute inset-0 flex items-center justify-center z-10">
                   <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30 shadow-2xl">
                     <img 
                       src="/querynox.jpeg" 
                       alt="QueryNOX" 
                       className="w-16 h-16 rounded-lg"
                     />
                   </div>
                 </div>

                {/* Orbital Ring */}
                <div className="absolute inset-0 border border-gray-300 rounded-full"></div>

                {/* Rotating AI Company Logos */}
                {companyLogos.map((logo, index) => {
                  const { x, y } = getOrbitalPosition(logo.angle, 80) // Smaller radius for this section
                  return (
                    <div
                      key={index}
                      className="absolute w-12 h-12 bg-white rounded-full border border-gray-300 flex items-center justify-center shadow-lg"
                      style={{
                        left: `calc(50% + ${x}px - 24px)`,
                        top: `calc(50% + ${y}px - 24px)`,
                      }}
                    >
                      <img src={logo.src} alt={logo.alt} className="w-8 h-8 object-contain" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose QueryNOX?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border bg-card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Conversations</h3>
              <p className="text-muted-foreground">
                Engage in intelligent discussions that adapt to your style and preferences
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Always Available</h3>
              <p className="text-muted-foreground">
                Your AI companion is ready to chat 24/7, whenever inspiration strikes
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">User-Friendly</h3>
              <p className="text-muted-foreground">
                Clean, intuitive interface that makes AI conversations feel natural
              </p>
            </div>
          </div>
        </div>

        {/* Humorous Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">We Wish to Do So Much More</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Our team has big dreams and even bigger plans for QueryNOX. 
              We're constantly working on new features, improvements, and exciting capabilities.
            </p>
            <p className="text-xl font-semibold text-primary">
              If you buy the PRO version, we promise to do so much more!
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg border bg-card">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/20">
                {sohamAvatar ? (
                  <img 
                    src={sohamAvatar} 
                    alt="Soham Joshi" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">SJ</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-4">Soham Joshi</h3>
              <Button asChild variant="outline" size="sm">
                <a href={SohamJoshiGithubLink} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
            </div>
            <div className="text-center p-6 rounded-lg border bg-card">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/20">
                {hackiceAvatar ? (
                  <img 
                    src={hackiceAvatar} 
                    alt="Hackice20" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">HK</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-4">Hackice20</h3>
              <Button asChild variant="outline" size="sm">
                <a href={Hackice20GithubLink} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
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
                  <Sparkles className="mr-2 h-5 w-5" />
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
