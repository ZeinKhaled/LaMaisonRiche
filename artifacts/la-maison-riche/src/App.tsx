import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import Home from "@/pages/home";
import Collections from "@/pages/collections";
import Category from "@/pages/category";
import ProductDetail from "@/pages/product";
import Contact from "@/pages/contact";
import BeforeAfter from "@/pages/before-after";
import NewCollection from "@/pages/new-collection";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Reviews from "@/pages/reviews";
import Clearance from "@/pages/clearance";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
import { CatalogProvider } from "@/data/catalog-store";
import { LanguageProvider } from "@/data/language-store";
import { MouseFollower } from "@/components/common/MouseFollower";
import { InitialLoader } from "@/components/common/InitialLoader";
import { ScrollProgressBar } from "@/components/common/ScrollProgressBar";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { ScrollToTop } from "@/components/common/ScrollToTop";

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();

  if (location === "/admin") {
    return <Admin />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <ScrollProgressBar />
      <InitialLoader />
      <MouseFollower />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Switch key={location}>
            <Route path="/" component={Home} />
            <Route path="/collections" component={Collections} />
            <Route path="/collections/:category" component={Category} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/new-collection" component={NewCollection} />
            <Route path="/clearance" component={Clearance} />
            <Route path="/before-after" component={BeforeAfter} />
            <Route path="/projects" component={Projects} />
            <Route path="/projects/:id" component={ProjectDetail} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function App() {
  return (
    <CatalogProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </CatalogProvider>
  );
}

export default App;
