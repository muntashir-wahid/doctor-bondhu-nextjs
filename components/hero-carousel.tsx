"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    title: "Transform Your Clinic Management",
    description:
      "Streamline operations, enhance patient care, and grow your practice with our comprehensive clinic management solution.",
    cta: "Get Started Free",
    image: "/modern-clinic-reception-with-digital-displays.jpg",
  },
  {
    title: "Seamless Patient Experience",
    description:
      "From appointment booking to follow-ups, deliver exceptional care at every touchpoint with our intuitive platform.",
    cta: "Explore Features",
    image: "/doctor-using-tablet-with-patient-smiling.jpg",
  },
  {
    title: "Data-Driven Healthcare Insights",
    description:
      "Make informed decisions with powerful analytics and reporting tools designed for modern healthcare providers.",
    cta: "View Demo",
    image: "/healthcare-analytics-dashboard-on-computer-screen.jpg",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container mx-auto flex h-full items-center px-4">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="text-pretty text-lg text-muted-foreground lg:text-xl">{slide.description}</p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/clinic-login">{slide.cta}</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/clinics">Browse Clinics</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="h-full w-full rounded-2xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur transition-colors hover:bg-background"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur transition-colors hover:bg-background"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-primary/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
