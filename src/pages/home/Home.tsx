import { SignedIn, SignedOut, SignInButton  } from "@clerk/clerk-react"
import { Link } from "@tanstack/react-router"

const Home = () => {
  return (
    <div>
      <div className="block">Home</div>
      <SignedIn>
        <div className="block"><Link to="/chat">Go to Chat</Link></div>
      </SignedIn>
      <SignedOut>
        <div className="block"><SignInButton /></div>
      </SignedOut>

    </div>

  )
}

export default Home