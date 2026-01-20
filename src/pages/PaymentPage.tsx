import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PaymentForm } from "@/components/PaymentForm";
import { Loader2, XCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

const PAYMENT_AMOUNT = 299; // Price in ILS

export function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const application = useQuery(
    api.queries.getApplication,
    id ? { applicationId: id as any } : "skip"
  );
  const updatePaymentStatus = useMutation(api.mutations.updatePaymentStatus);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <p className="text-xl text-gray-600">מספר בקשה לא תקין</p>
      </div>
    );
  }

  if (application === undefined) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary-600" />
        <p className="mt-4 text-gray-600">טוען...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
        <p className="text-xl text-gray-600">הבקשה לא נמצאה</p>
      </div>
    );
  }

  if (application.paymentStatus === "paid") {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="card text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">התשלום הושלם בהצלחה!</h1>
          <p className="text-gray-600 mb-6">
            התשלום שלך התקבל. הבקשה שלך נמצאת כעת בעיבוד.
          </p>
          <button
            onClick={() => navigate(`/status/${id}`)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <span>צפה בסטטוס הבקשה</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const handlePaymentSuccess = async (paymentId: string) => {
    try {
      await updatePaymentStatus({
        applicationId: id as any,
        paymentStatus: "paid",
        paymentId,
      });
      // Navigate to status page after successful payment
      navigate(`/status/${id}`);
    } catch (error) {
      console.error("Error updating payment status:", error);
      setPaymentError("אירעה שגיאה בעדכון סטטוס התשלום.");
    }
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">תשלום עבור בקשה #{id.slice(-8)}</h1>
        <p className="text-gray-600">
          השלם את התשלום כדי להמשיך בעיבוד הבקשה שלך
        </p>
      </div>

      {paymentError && (
        <div className="mb-6 bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded-lg text-right">
          {paymentError}
        </div>
      )}

      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">פרטי הבקשה</h2>
        <div className="space-y-2 text-right">
          <div className="flex justify-between">
            <span className="text-gray-600">שם מלא:</span>
            <span className="font-semibold">{application.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">מספר דרכון:</span>
            <span className="font-semibold">{application.passportNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">תאריך הגשה:</span>
            <span className="font-semibold">
              {new Date(application.submittedAt).toLocaleDateString("he-IL")}
            </span>
          </div>
        </div>
      </div>

      <PaymentForm
        amount={PAYMENT_AMOUNT}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        applicationId={id}
      />
    </div>
  );
}