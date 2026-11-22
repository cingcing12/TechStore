import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    tag: 'Flagship Performance',
    title: 'Ultrabook Pro 15.6"',
    subtitle: 'Engineered for power users with 16GB DDR5 memory and 512GB NVMe SSD.',
    price: '$650.00',
    originalPrice: '$799.00',
    productId: 'prod-1',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
    highlight: '11h Battery Life'
  },
  {
    id: 2,
    tag: 'Ultra-Sharp Visuals',
    title: '4K IPS Display 27"',
    subtitle: 'Frameless 3840×2160 IPS panel with 99% sRGB color calibration.',
    price: '$120.00',
    originalPrice: '$169.00',
    productId: 'prod-4',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    highlight: 'AMD FreeSync'
  },
  {
    id: 3,
    tag: 'Tactile Precision',
    title: 'RGB Mechanical Keyboard',
    subtitle: 'Compact tactile switches, per-key RGB backlighting, and USB Type-C.',
    price: '$25.00',
    originalPrice: '$40.00',
    productId: 'prod-3',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
    highlight: 'Clicky Tactile'
  },
  {
    id: 4,
    tag: 'Ergonomic Workflow',
    title: 'Dual Wireless Mouse',
    subtitle: 'Whisper-quiet switches, 2.4GHz + Bluetooth, and 1600 DPI precision.',
    price: '$15.00',
    originalPrice: '$25.00',
    productId: 'prod-2',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80',
    highlight: 'Silent Clicks'
  }
];

export default function HeroSlider({ onSelectProduct }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const slide = SLIDES[currentSlide];

  return (
    <div
      className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Container with Crossfade */}
      <div className="relative h-[340px] sm:h-[400px] lg:h-[440px] w-full overflow-hidden">
        {SLIDES.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background image */}
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/70 to-neutral-950/20" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="relative z-20 h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 max-w-2xl text-white">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {slide.title}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-lg leading-relaxed line-clamp-2">
              {slide.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-black text-white">
                {slide.price}
              </span>
              <span className="text-xs sm:text-sm text-neutral-400 line-through">
                {slide.originalPrice}
              </span>
            </div>

            <button
              onClick={() => onSelectProduct(slide.productId)}
              className="px-5 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 font-bold text-xs flex items-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>View Product</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] font-medium text-neutral-400 hidden sm:inline">
              • {slide.highlight}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-900/90 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-900/90 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-4 right-6 z-30 flex items-center space-x-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentSlide
                ? 'w-7 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

