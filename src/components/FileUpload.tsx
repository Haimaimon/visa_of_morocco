import React, { useRef, useState } from "react";
import { Upload, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  accept?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  required?: boolean;
}

export function FileUpload({
  label,
  accept = "image/*",
  value,
  onChange,
  error,
  required = false,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Update preview when value changes
  React.useEffect(() => {
    if (value) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 text-right">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <div className="relative">
        {preview ? (
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="הסר תמונה"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full">
              <Check className="w-4 h-4" />
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
              error
                ? "border-red-500 bg-red-50"
                : "border-gray-300 bg-gray-50 hover:border-primary-500 hover:bg-primary-50"
            )}
          >
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">לחץ להעלאת קובץ</p>
            <p className="text-sm text-gray-500">
              תמונות בלבד (JPG, PNG, PDF)
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          required={required}
          aria-label={label}
        />
      </div>
      {error && <p className="text-sm text-red-500 text-right">{error}</p>}
    </div>
  );
}