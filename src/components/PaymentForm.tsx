import { useState } from "react";
import { CreditCard, Lock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
  applicationId: string;
}

export function PaymentForm({
  amount,
  onSuccess,
  onError,
  applicationId,
}: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // TODO: Integrate with payment provider (Stripe/PayPal/etc.)
      // For now, simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock payment ID
      const paymentId = `pay_${Date.now()}_${applicationId}`;
      onSuccess(paymentId);
    } catch (error) {
      onError("אירעה שגיאה בעת עיבוד התשלום. נסה שוב.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold">תשלום מאובטח</h2>
      </div>

      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">סכום לתשלום:</span>
          <span className="text-2xl font-bold text-primary-600">{amount} ₪</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 text-right mb-2">
            שם בעל הכרטיס
          </label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="input-field"
            placeholder="שם מלא"
            required
            autoComplete="cc-name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 text-right mb-2">
            מספר כרטיס אשראי
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              className="input-field"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
              autoComplete="cc-number"
            />
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-2">
              תוקף
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              className="input-field"
              placeholder="MM/YY"
              maxLength={5}
              required
              autoComplete="cc-exp"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-right mb-2">
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              className="input-field"
              placeholder="123"
              maxLength={4}
              required
              autoComplete="cc-csc"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Lock className="w-4 h-4" />
          <span>התשלום מאובטח ומוצפן</span>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={cn(
            "btn-primary w-full flex items-center justify-center gap-2",
            isProcessing && "opacity-50 cursor-not-allowed"
          )}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>מעבד תשלום...</span>
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              <span>שלם עכשיו</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}