import React, { useState } from "react";
import { Building2, Save, AlertCircle } from "lucide-react";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import SectionCard from "../../components/common/SectionCard";
import InfoAlert from "../../components/common/InfoAlert";

const CompanySettings = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "Coca-Cola Distribution",
    phoneNumber: "+91 98765 43210",
    emailAddress: "info@cocacola-dist.com",
    website: "www.cocacola-dist.com",
    gstNumber: "27XXXXX1234X1Z5",
    logoUrl: "",
    address: "123 Business Park, Mumbai, India",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email";
    }

    if (!formData.gstNumber.trim()) {
      newErrors.gstNumber = "GST number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Save logic here
    console.log("Saving settings:", formData);
    alert("Settings saved successfully!");
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset errors when canceling edit
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
          <p className="mt-1 text-gray-600">
            Configure your company information
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEditToggle}
            className="bg-[#E31E24] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            Edit Settings
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleEditToggle}
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#E31E24] rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information Section */}
        <SectionCard
          icon={Building2}
          title="Company Information"
          description="Basic company details and registration"
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              disabled={!isEditing}
              error={errors.companyName}
              required
            />

            <Input
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+91 00000 00000"
              disabled={!isEditing}
              error={errors.phoneNumber}
              required
            />

            <Input
              label="Email Address"
              name="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="info@company.com"
              disabled={!isEditing}
              error={errors.emailAddress}
              required
            />

            <Input
              label="Website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder="www.company.com"
              disabled={!isEditing}
              error={errors.website}
            />

            <Input
              label="GST Number"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="27XXXXX1234X1Z5"
              disabled={!isEditing}
              error={errors.gstNumber}
              required
            />

            <Input
              label="Logo URL"
              name="logoUrl"
              type="url"
              value={formData.logoUrl}
              onChange={handleChange}
              placeholder="Enter logo URL (optional)"
              disabled={!isEditing}
              error={errors.logoUrl}
            />

            <Textarea
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter complete address"
              disabled={!isEditing}
              error={errors.address}
              required
              rows={3}
              className="md:col-span-2"
            />
          </div>
        </SectionCard>

        {/* Important Notes Section */}
        <InfoAlert
          title="Important Notes"
          variant="info"
          items={[
            "Company settings are displayed on invoices, reports, and official documents.",
            "GST number is required for tax calculations and compliance.",
            "Make sure all information is accurate and up-to-date.",
            "Logo URL should point to a valid image file (recommended size: 200x200px).",
          ]}
        />
      </form>
    </div>
  );
};

export default CompanySettings;
