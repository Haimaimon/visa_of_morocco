import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Shield, AlertCircle, Loader2 } from "lucide-react";
import { FormInput } from "@/components/FormInput";

export function TrackApplication() {
  const [applicationId, setApplicationId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSearching(true);

    if (!applicationId || !email) {
      setError("אנא מלא את כל השדות");
      setIsSearching(false);
      return;
    }

    // Navigate to status page - it will verify access there
    navigate(`/status/${applicationId}?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="card">
        <div className="text-center mb-8">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">עקוב אחרי הבקשה שלך</h1>
          <p className="text-gray-600">
            הכנס את מספר הבקשה והאימייל כדי לראות את סטטוס הבקשה שלך
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-right text-sm text-blue-800">
                <p className="font-semibold mb-1">אבטחה ופרטיות</p>
                <p>
                  המידע שלך מאובטח. אנחנו מאמתים את זהותך באמצעות האימייל
                  שסיפקת בעת ההגשה כדי להגן על הפרטיות שלך.
                </p>
              </div>
            </div>
          </div>

          <FormInput
            id="applicationId"
            label="מספר בקשה"
            value={applicationId}
            onChange={(e) => setApplicationId(e.target.value)}
            placeholder="הכנס את מספר הבקשה שקיבלת"
            required
            autoComplete="off"
          />

          <FormInput
            id="email"
            label="כתובת אימייל"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="הכנס את האימייל שסיפקת בהגשה"
            required
            autoComplete="email"
          />

          {error && (
            <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-lg text-right flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSearching}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>מחפש...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>חפש בקשה</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold mb-3 text-right">צריך עזרה?</h3>
          <div className="space-y-2 text-sm text-gray-600 text-right">
            <p>• מספר הבקשה נשלח לך באימייל לאחר ההגשה</p>
            <p>• ודא שהאימייל זהה לזה שבו השתמשת בעת ההגשה</p>
            <p>• אם שכחת את מספר הבקשה, אנא פנה לתמיכה</p>
          </div>
        </div>
      </div>
    </div>
  );
}