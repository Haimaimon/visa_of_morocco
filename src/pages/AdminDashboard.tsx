import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  FileCheck,
  Eye,
  Loader2,
} from "lucide-react";

export function AdminDashboard() {
  const applications = useQuery(api.queries.getAllApplications);
  const updateStatus = useMutation(api.mutations.updateApplicationStatus);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (
    applicationId: string,
    newStatus: "processing" | "approved" | "rejected" | "completed"
  ) => {
    setIsUpdating(true);
    try {
      await updateStatus({
        applicationId: applicationId as any,
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { icon: Clock, color: "bg-yellow-100 text-yellow-800", label: "ממתין" },
      processing: { icon: Loader2, color: "bg-blue-100 text-blue-800", label: "בעיבוד" },
      approved: { icon: CheckCircle, color: "bg-green-100 text-green-800", label: "אושר" },
      completed: { icon: FileCheck, color: "bg-green-100 text-green-800", label: "הושלם" },
      rejected: { icon: XCircle, color: "bg-red-100 text-red-800", label: "נדחה" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className={`w-4 h-4 ${status === "processing" ? "animate-spin" : ""}`} />
        {config.label}
      </span>
    );
  };

  if (applications === undefined) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary-600" />
        <p className="mt-4 text-gray-600">טוען...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">לוח בקרה - ניהול בקשות</h1>
        <p className="text-gray-600">נהל את כל בקשות הויזה</p>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  מספר בקשה
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  שם מלא
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  דרכון
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  תשלום
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  תאריך הגשה
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications?.map((app: any) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {app._id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {app.passportNumber}
                  </td>
                  <td className="px-6 py-4 text-sm">{getStatusBadge(app.status)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`font-medium ${
                        app.paymentStatus === "paid"
                          ? "text-green-600"
                          : app.paymentStatus === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {app.paymentStatus === "paid"
                        ? "שולם"
                        : app.paymentStatus === "pending"
                        ? "ממתין"
                        : "נכשל"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(app.submittedAt).toLocaleDateString("he-IL")}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setSelectedApplication(
                            selectedApplication === app._id ? null : app._id
                          )
                        }
                        className="text-primary-600 hover:text-primary-800 p-2"
                        aria-label="הצג פרטים"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {app.status === "pending" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(app._id, "processing")
                          }
                          disabled={isUpdating}
                          className="btn-primary text-sm py-1 px-3"
                        >
                          התחל עיבוד
                        </button>
                      )}
                      {app.status === "processing" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(app._id, "approved")
                          }
                          disabled={isUpdating}
                          className="btn-primary text-sm py-1 px-3"
                        >
                          אישור
                        </button>
                      )}
                      {app.status === "approved" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(app._id, "completed")
                          }
                          disabled={isUpdating}
                          className="btn-primary text-sm py-1 px-3"
                        >
                          השלם
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">פרטי הבקשה</h2>
            {applications
              ?.find((app: any) => app._id === selectedApplication)
              ?.notes && (
              <div className="mb-4">
                <label className="block font-semibold mb-2">הערות:</label>
                <textarea
                  className="input-field"
                  rows={4}
                  defaultValue={
                    applications?.find((app: any) => app._id === selectedApplication)
                      ?.notes
                  }
                />
              </div>
            )}
            <button
              onClick={() => setSelectedApplication(null)}
              className="btn-secondary"
            >
              סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
}