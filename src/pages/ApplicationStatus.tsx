import { useParams, Link, useSearchParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  CheckCircle,
  Clock,
  XCircle,
  FileCheck,
  Loader2,
  CreditCard,
  AlertCircle,
  Mail,
  Phone,
} from "lucide-react";

export function ApplicationStatus() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  // Use secure query if email provided, otherwise regular query
  const application = useQuery(
    email && id
      ? api.queries.getApplicationByEmail
      : api.queries.getApplication,
    email && id
      ? { applicationId: id as any, email }
      : id
      ? { applicationId: id as any }
      : "skip"
  );

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-500">מספר בקשה לא תקין</p>
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
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="card text-center">
          <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">הבקשה לא נמצאה</h2>
          <p className="text-gray-600 mb-4">
            {email
              ? "מספר הבקשה או האימייל אינם נכונים. אנא בדוק את הפרטים שהוזנו."
              : "הבקשה לא נמצאה או שאין לך הרשאה לצפות בה."}
          </p>
          <Link
            to="/track"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span>חזור לעמוד עקיבה</span>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusInfo = () => {
    switch (application.status) {
      case "pending":
        return {
          icon: Clock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          title: "ממתין לעיבוד",
          message: "הבקשה שלך התקבלה וממתינה לעיבוד",
        };
      case "processing":
        return {
          icon: Loader2,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          title: "בעיבוד",
          message: "הבקשה שלך נמצאת כעת בעיבוד",
        };
      case "approved":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-100",
          title: "אושר",
          message: "הבקשה שלך אושרה והויזה מוכנה",
        };
      case "completed":
        return {
          icon: FileCheck,
          color: "text-green-600",
          bgColor: "bg-green-100",
          title: "הושלם",
          message: "הויזה שלך מוכנה וניתן להוריד אותה",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-100",
          title: "נדחה",
          message: "הבקשה שלך נדחתה",
        };
      default:
        return {
          icon: Clock,
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          title: "לא ידוע",
          message: "סטטוס לא ידוע",
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="card">
        <div className="text-center mb-8">
          <div className={`${statusInfo.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <StatusIcon className={`w-10 h-10 ${statusInfo.color} ${application.status === "processing" ? "animate-spin" : ""}`} />
          </div>
          <h1 className="text-3xl font-bold mb-2">{statusInfo.title}</h1>
          <p className="text-gray-600">{statusInfo.message}</p>
        </div>

        <div className="space-y-4 bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold">מספר בקשה:</span>
            <span className="text-gray-700 font-mono text-sm">{id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">שם:</span>
            <span className="text-gray-700">{application.fullName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">מספר דרכון:</span>
            <span className="text-gray-700">{application.passportNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4" />
              אימייל:
            </span>
            <span className="text-gray-700">{application.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4" />
              טלפון:
            </span>
            <span className="text-gray-700">{application.phone}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">תאריך הגשה:</span>
            <span className="text-gray-700">
              {new Date(application.submittedAt).toLocaleDateString("he-IL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          {application.processedAt && (
            <div className="flex justify-between items-center">
              <span className="font-semibold">תאריך עיבוד:</span>
              <span className="text-gray-700">
                {new Date(application.processedAt).toLocaleDateString("he-IL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
          {application.completedAt && (
            <div className="flex justify-between items-center">
              <span className="font-semibold">תאריך השלמה:</span>
              <span className="text-gray-700">
                {new Date(application.completedAt).toLocaleDateString("he-IL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-gray-300">
            <span className="font-semibold">סטטוס תשלום:</span>
            <span className={`font-semibold ${
              application.paymentStatus === "paid" ? "text-green-600" : 
              application.paymentStatus === "pending" ? "text-yellow-600" : 
              "text-red-600"
            }`}>
              {application.paymentStatus === "paid" ? "שולם" :
               application.paymentStatus === "pending" ? "ממתין" : "נכשל"}
            </span>
          </div>
        </div>

        {application.paymentStatus === "pending" && (
          <div className="mt-6">
            <Link
              to={`/payment/${id}`}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>בצע תשלום</span>
            </Link>
          </div>
        )}

        {application.status === "completed" && application.visaDocumentUrl && (
          <div className="mt-6">
            <a
              href={application.visaDocumentUrl}
              download
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <FileCheck className="w-5 h-5" />
              <span>הורד ויזה</span>
            </a>
          </div>
        )}

        {application.notes && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <h3 className="font-semibold">הערות חשובות:</h3>
            </div>
            <p className="text-gray-700 text-right">{application.notes}</p>
          </div>
        )}

        {/* Status timeline */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="font-semibold mb-4 text-right">ציר זמן הבקשה</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
              </div>
              <div className="flex-1 text-right">
                <p className="font-medium">הבקשה הוגשה</p>
                <p className="text-sm text-gray-500">
                  {new Date(application.submittedAt).toLocaleDateString("he-IL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {application.paymentStatus === "paid" && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
                </div>
                <div className="flex-1 text-right">
                  <p className="font-medium">התשלום התקבל</p>
                  <p className="text-sm text-gray-500">התשלום עבר בהצלחה</p>
                </div>
              </div>
            )}

            {application.status === "processing" && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5"></div>
                </div>
                <div className="flex-1 text-right">
                  <p className="font-medium">הבקשה בעיבוד</p>
                  {application.processedAt && (
                    <p className="text-sm text-gray-500">
                      {new Date(application.processedAt).toLocaleDateString("he-IL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            )}

            {(application.status === "approved" || application.status === "completed") && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
                </div>
                <div className="flex-1 text-right">
                  <p className="font-medium">הויזה מוכנה</p>
                  {application.completedAt && (
                    <p className="text-sm text-gray-500">
                      {new Date(application.completedAt).toLocaleDateString("he-IL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            )}

            {application.status === "pending" && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1.5"></div>
                </div>
                <div className="flex-1 text-right">
                  <p className="font-medium">ממתין לעיבוד</p>
                  <p className="text-sm text-gray-500">הבקשה ממתינה לעיבוד על ידי הצוות</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Help section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-right">צריך עזרה?</h4>
          <p className="text-sm text-gray-600 text-right">
            אם יש לך שאלות או בעיות, אנא צור איתנו קשר דרך האימייל או הטלפון שסיפקת בעת ההגשה.
          </p>
        </div>
      </div>
    </div>
  );
}