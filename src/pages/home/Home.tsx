import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { useSystemContext } from "@/contexts/SystemContext"
import { Moon, Sun, Sparkles, Zap, Globe, FileText, Image, Brain, Search, Upload, MessageSquare } from "lucide-react"
import { useEffect, useRef } from "react"

const Home = () => {
  const { darkmode, setDarkmode } = useSystemContext()
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    scrollRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => observer.disconnect()
  }, [])

  const addScrollRef = (el: HTMLDivElement | null) => {
    if (el && !scrollRefs.current.includes(el)) {
      scrollRefs.current.push(el)
    }
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

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent animate-fade-in-up">
            Multi-Model AI Chat Platform
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Experience the future of AI conversation with multiple models, web search integration, and document analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedIn>
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/chat">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start Chatting
                </Link>
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">Powerful AI Models</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-xl border shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform">
              <img src="/openai.svg" alt="OpenAI" className="h-12 w-16 mb-4 dark:invert" />
              <h3 className="text-xl font-semibold mb-3">OpenAI GPT-3.5</h3>
              <p className="text-muted-foreground">Fast and reliable conversational AI for everyday tasks.</p>
            </div>
            <div className="bg-background p-8 rounded-xl border shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform">
              <img src="/claude.png" alt="Claude" className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Claude Haiku 3.5</h3>
              <p className="text-muted-foreground">Anthropic's latest model for nuanced conversations.</p>
            </div>
            <div className="bg-background p-8 rounded-xl border shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform">
              <img src="/meta svg.png" alt="Llama" className="h-12 w-20 mb-4 dark:brightness-0 dark:invert" />
              <h3 className="text-xl font-semibold mb-3">Llama 3.3 70B</h3>
              <p className="text-muted-foreground">High-performance model via Groq for complex reasoning.</p>
            </div>
            <div className="bg-background p-8 rounded-xl border shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform">
              <img src="/geminisvg.png" alt="Gemini" className="h-12 w-20 mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold mb-3">Gemini Pro</h3>
              <p className="text-muted-foreground">Google's advanced model for comprehensive understanding.</p>
            </div>
            <div className="bg-background p-8 rounded-xl border shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform">
              <img src="/openai.svg" alt="OpenAI" className="h-12 w-16 mb-4 dark:invert" />
              <h3 className="text-xl font-semibold mb-3">DALL-E 3 / GPT-Image-1</h3>
              <p className="text-muted-foreground">Create stunning images from text descriptions.</p>
            </div>
            <div className="bg-background p-8 rounded-xl border shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform">
              <Search className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Web Search Integration</h3>
              <p className="text-muted-foreground">Real-time information from the web for up-to-date responses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in-up">Advanced Context Enhancement</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div ref={addScrollRef} className="flex items-start space-x-4 animate-on-scroll">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Web Search Integration</h3>
                  <p className="text-muted-foreground">Get real-time information from the web to enhance your conversations with current data and facts.</p>
                </div>
              </div>
              <div ref={addScrollRef} className="flex items-start space-x-4 animate-on-scroll">
                <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">PDF Document Analysis (RAG)</h3>
                  <p className="text-muted-foreground">Upload PDF documents and let AI analyze and reference them in your conversations for deeper insights.</p>
                </div>
              </div>
              <div ref={addScrollRef} className="flex items-start space-x-4 animate-on-scroll">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
                  <Image className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Image OCR Text Extraction (RAG)</h3>
                  <p className="text-muted-foreground">Extract text from images and use it as context for more comprehensive AI responses.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div ref={addScrollRef} className="flex items-start space-x-4 animate-on-scroll">
                <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                  <Upload className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Multi-file Upload Support</h3>
                  <p className="text-muted-foreground">Upload multiple files simultaneously and let AI process them together for comprehensive analysis.</p>
                </div>
              </div>
              <div ref={addScrollRef} className="flex items-start space-x-4 animate-on-scroll">
                <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Conversation Memory</h3>
                  <p className="text-muted-foreground">AI remembers your conversation history for contextual and personalized responses.</p>
                </div>
              </div>
              <div ref={addScrollRef} className="flex items-start space-x-4 animate-on-scroll">
                <div className="bg-pink-100 dark:bg-pink-900/20 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground">Optimized for speed with instant responses and seamless real-time interactions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">Ready to Experience the Future?</h2>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up animation-delay-200">
            Join thousands of users who are already leveraging the power of multiple AI models.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedIn>
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/chat">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start Chatting Now
                </Link>
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="px-6 py-12">
                     <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center">
             <div className="flex flex-col items-start mb-4 md:mb-0">
               <div className="flex items-center space-x-3 mb-2">
                 <img 
                   src="/querynox.jpeg" 
                   alt="QueryNox" 
                   className="h-8 w-8 rounded-lg"
                 />
                 <span className="text-lg font-semibold">
                   <span className="text-foreground">Query</span>
                   <span className="text-muted-foreground">Nox</span>
                 </span>
               </div>
               <p className="text-muted-foreground text-sm">
                 © 2025 QueryNox. All rights reserved.
               </p>
             </div>
             <div className="text-center md:text-right">
               <p className="text-muted-foreground">
                 Made with love by{" "}
                 <a 
                   href="https://github.com/sohamjoshi25" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-foreground hover:underline font-medium"
                 >
                   sohamjoshi25
                 </a>
                 {" "}and stirred with chaos by{" "}
                 <a 
                   href="https://github.com/hackice20" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-foreground hover:underline font-medium"
                 >
                   hackice20
                 </a>
               </p>
             </div>
           </div>
        </div>
      </footer>
    </div>
  )
}

export default Home