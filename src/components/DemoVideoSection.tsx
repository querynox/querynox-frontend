import { useState } from "react"
import { cn } from "@/lib/utils"

const DemoVideoSection = () => {
  const [selectedFeature, setSelectedFeature] = useState("multimodal")

  const videos: Record<string, { label: string; file: string }> = {
    multimodal: { label: "Multi-Modal", file: "/videos/multimodal.mp4" },
    websearch: { label: "Web Search", file: "/videos/webSearch.mp4" },
    imagerag: { label: "Image RAG", file: "/videos/image-rag.mp4" },
    pdfrag: { label: "PDF RAG", file: "/videos/pdf-rag.mp4" },
    imagegen: { label: "Image Generation", file: "/videos/image-gen.mp4" },
  }

  return (
    <section className="px-6 py-20 bg-muted/20 border-b">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold mb-8">See It in Action</h2>

        {/* Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.entries(videos).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setSelectedFeature(key)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full border transition-all",
                selectedFeature === key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground hover:bg-muted"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Video Player */}
        <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden shadow-lg border">
          <video
            key={selectedFeature} // forces reload when changed
            src={videos[selectedFeature].file}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default DemoVideoSection
