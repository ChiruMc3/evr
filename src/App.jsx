import { lazy, Suspense, Component, createContext, useState, useCallback, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import './styles/global.css';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Global app context for shared state (form submission, modals, etc.)
export const AppContext = createContext();

const IS_DEV = import.meta.env.DEV;

class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (IS_DEV) {
      console.error('Route render error:', error);
      console.error('Error info:', errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-[60vh] flex items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
            <p className="opacity-70 mb-4">Please refresh the page or return home.</p>
            {IS_DEV && this.state.error && (
              <details className="text-left mb-4 p-4 bg-red-500/10 rounded text-sm max-w-md mx-auto">
                <summary className="cursor-pointer font-semibold mb-2">Error Details</summary>
                <pre className="text-xs overflow-auto whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="btn-primary" onClick={() => window.location.reload()}>
                Refresh
              </button>
              <button className="btn-secondary" onClick={() => window.location.href = '/'}>
                Go Home
              </button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

function ImageLoadGate({ children }) {
  const containerRef = useRef(null);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) {
      setIsLoadingImages(false);
      return;
    }

    const MIN_LOADER_MS = 300;
    const startedAt = performance.now();
    let timeoutId;
    let settled = false;

    const completeGate = () => {
      if (settled) return;
      settled = true;
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, MIN_LOADER_MS - elapsed);

      if (wait > 0) {
        timeoutId = window.setTimeout(() => setIsLoadingImages(false), wait);
      } else {
        setIsLoadingImages(false);
      }
    };

    const images = Array.from(root.querySelectorAll('img'));
    if (images.length === 0) {
      completeGate();
      return () => {
        if (timeoutId) window.clearTimeout(timeoutId);
      };
    }

    let remaining = 0;
    const onDone = () => {
      remaining -= 1;
      if (remaining <= 0) completeGate();
    };

    images.forEach((img) => {
      if (img.complete) return; // already resolved (loaded or errored)
      remaining += 1;
      img.addEventListener('load', onDone, { once: true });
      img.addEventListener('error', onDone, { once: true });
    });

    if (remaining === 0) completeGate();

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', onDone);
        img.removeEventListener('error', onDone);
      });
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {children}
      {isLoadingImages && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
          <Loader />
        </div>
      )}
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <RouteErrorBoundary key={location.pathname}>
        <Suspense fallback={<Loader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<ImageLoadGate><Portfolio /></ImageLoadGate>} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
    </AnimatePresence>
  );
}

// App-level state provider for form/modal management
function AppProvider({ children }) {
  const [formState, setFormState] = useState({
    isSubmitting: false,
    submitSuccess: false,
    submitError: null,
  });

  const [modalState, setModalState] = useState({
    activeGalleryImage: null,
    activeModal: null,
  });

  const updateFormState = useCallback((updates) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFormState = useCallback(() => {
    setFormState({
      isSubmitting: false,
      submitSuccess: false,
      submitError: null,
    });
  }, []);

  const updateModalState = useCallback((updates) => {
    setModalState((prev) => ({ ...prev, ...updates }));
  }, []);

  const value = {
    formState,
    updateFormState,
    resetFormState,
    modalState,
    updateModalState,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Dynamic Favicon Component
 * Creates a camera icon favicon using canvas
 */
function DynamicFavicon() {
  useEffect(() => {
    // Create a canvas to render the camera icon as a favicon
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      if (IS_DEV) {
        console.warn('Canvas context not available for favicon generation');
      }
      return;
    }

    // Set background to golden color
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(0, 0, 64, 64);

    // Draw a simple camera icon
    ctx.strokeStyle = '#001F3F'; // Navy color
    ctx.lineWidth = 2;
    ctx.fillStyle = '#001F3F';

    // Camera body (rounded rectangle)
    const x = 12;
    const y = 18;
    const width = 40;
    const height = 28;
    const radius = 4;

    // Draw rounded rectangle for camera body
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.stroke();

    // Camera lens (circle)
    ctx.beginPath();
    ctx.arc(32, 32, 10, 0, Math.PI * 2);
    ctx.stroke();

    // Camera lens center dot
    ctx.beginPath();
    ctx.arc(32, 32, 3, 0, Math.PI * 2);
    ctx.fill();

    // Camera viewfinder (small rectangle on top)
    ctx.fillRect(20, 12, 8, 4);

    // Convert canvas to data URL and set as favicon
    const dataUrl = canvas.toDataURL('image/png');

    // Find existing favicon link or create new one
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    // Set favicon properties
    link.type = 'image/png';
    link.href = dataUrl;
  }, []);

  return null;
}

function App() {
  return (
    <AppProvider>
      <DynamicFavicon />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTop />
        <Navbar />
        <div className="min-h-screen pt-16 md:pt-20">
          <AnimatedRoutes />
        </div>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
