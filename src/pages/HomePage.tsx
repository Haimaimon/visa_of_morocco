import { Link } from "react-router-dom";
import {
  Clock,
  Shield,
  Globe,
  ArrowLeft,
  FileCheck,
  Search,
} from "lucide-react";

export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-100 p-6 rounded-full">
            <Globe className="w-16 h-16 text-primary-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          ויזה למרוקו
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          תהליך פשוט ומהיר לקבלת ויזה למרוקו. ממלאים פרטים, משלמים, ומקבלים את
          הויזה תוך כמה ימי עסקים.
        </p>
        <Link to="/apply" className="btn-primary inline-flex items-center gap-2">
          <FileCheck className="w-5 h-5" />
          <span>התחל עכשיו</span>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="card text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">תהליך פשוט</h3>
          <p className="text-gray-600">
            ממלאים טופס קצר עם כל הפרטים הנדרשים
          </p>
        </div>

        <div className="card text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">בטוח ומאובטח</h3>
          <p className="text-gray-600">
            כל המידע מוצפן ונשמר בצורה מאובטחת
          </p>
        </div>

        <div className="card text-center">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">מהיר ויעיל</h3>
          <p className="text-gray-600">
            תהליך מקוון ללא צורך לצאת מהבית
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white rounded-xl shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">איך זה עובד?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h4 className="font-semibold mb-2">מלא פרטים</h4>
            <p className="text-sm text-gray-600">
              שם מלא, תעודת זהות, דרכון ופרטי התקשרות
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h4 className="font-semibold mb-2">העלה תמונות</h4>
            <p className="text-sm text-gray-600">
              תמונת דרכון ותמונת פנים
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h4 className="font-semibold mb-2">בצע תשלום</h4>
            <p className="text-sm text-gray-600">
              תשלום מאובטח דרך המערכת
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              4
            </div>
            <h4 className="font-semibold mb-2">קבל ויזה</h4>
            <p className="text-sm text-gray-600">
              תוך כמה ימי עסקים תקבל את הויזה מוכנה
            </p>
          </div>
        </div>
      </section>

      {/* Track Application Section */}
      <section className="bg-white rounded-xl shadow-lg p-8 mb-16">
        <div className="text-center mb-8">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold mb-2">עקוב אחרי הבקשה שלך</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            כבר הגשת בקשה? הכנס את מספר הבקשה והאימייל כדי לראות את הסטטוס
            העדכני של הבקשה שלך
          </p>
        </div>
        <div className="text-center">
          <Link
            to="/track"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>עקוב אחרי בקשה</span>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl p-12">
        <h2 className="text-3xl font-bold mb-4">מוכן להתחיל?</h2>
        <p className="text-xl mb-6 opacity-90">
          התחל את התהליך עכשיו וקבל את הויזה שלך תוך כמה ימים
        </p>
        <Link
          to="/apply"
          className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>הגש בקשה עכשיו</span>
        </Link>
      </section>
    </div>
  );
}