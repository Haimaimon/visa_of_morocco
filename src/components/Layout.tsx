import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Shield, Search } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              <Shield className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold text-primary-700">
                ויזה למרוקו
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className={`flex items-center gap-2 transition-colors ${
                  location.pathname === "/"
                    ? "text-primary-600 font-semibold"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                <Home className="w-5 h-5" />
                <span>דף הבית</span>
              </Link>
              <Link
                to="/track"
                className={`flex items-center gap-2 transition-colors ${
                  location.pathname === "/track" || location.pathname.startsWith("/status")
                    ? "text-primary-600 font-semibold"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                <Search className="w-5 h-5" />
                <span>עקוב אחרי בקשה</span>
              </Link>
              <Link
                to="/apply"
                className={`flex items-center gap-2 transition-colors ${
                  location.pathname === "/apply"
                    ? "text-primary-600 font-semibold"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>הגשת בקשה</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2026 ויזה למרוקו - כל הזכויות שמורות</p>
          <p className="text-gray-400 text-sm">
            תהליך פשוט ומאובטח לקבלת ויזה למרוקו
          </p>
        </div>
      </footer>
    </div>
  );
}