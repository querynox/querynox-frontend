import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
const Error = () => {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background px-6 text-center">
      {/* Icon */}
      <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-full mb-6">
        <AlertTriangle className="h-12 w-12 text-red-600" />
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
        Oops! Something Went Wrong
      </h1>

      {/* Subtext */}
      <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8">
        We hit a snag while loading this page. It might be a temporary glitch — you can try again or head back home.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" variant="default" className="px-6">
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="px-6"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Retry
        </Button>
      </div>

      {/* Footer note */}
      <p className="mt-12 text-sm text-muted-foreground">
        © 2025 QueryNox. All rights reserved.
      </p>
    </div>
  )
}

export default Error
