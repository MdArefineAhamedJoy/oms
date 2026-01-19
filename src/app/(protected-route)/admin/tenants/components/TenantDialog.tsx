"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Tenant, SubscriptionPlan } from "@/types/admin";

interface TenantDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (tenant: Partial<Tenant>) => void;
  tenant?: Tenant;
}

export default function TenantDialog({ open, onClose, onSave, tenant }: TenantDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    subscriptionPlan: "BASIC" as SubscriptionPlan,
    maxSites: 10,
    maxUsers: 100,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (tenant) {
      setFormData({
        name: tenant.name,
        email: tenant.email,
        phone: tenant.phone,
        licenseNumber: tenant.licenseNumber,
        subscriptionPlan: tenant.subscriptionPlan,
        maxSites: tenant.maxSites,
        maxUsers: tenant.maxUsers,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        licenseNumber: "",
        subscriptionPlan: "BASIC",
        maxSites: 10,
        maxUsers: 100,
      });
    }
    setErrors({});
  }, [tenant, open]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "License number is required";
    }
    if (formData.maxSites < 1) {
      newErrors.maxSites = "Max sites must be at least 1";
    }
    if (formData.maxUsers < 1) {
      newErrors.maxUsers = "Max users must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-lg border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {tenant ? "Edit Tenant" : "Add New Tenant"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Tenant Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 ${
                errors.name ? "border-rose-500" : "border-zinc-200"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 ${
                errors.email ? "border-rose-500" : "border-zinc-200"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 ${
                errors.phone ? "border-rose-500" : "border-zinc-200"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              License Number *
            </label>
            <input
              type="text"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 ${
                errors.licenseNumber ? "border-rose-500" : "border-zinc-200"
              }`}
            />
            {errors.licenseNumber && (
              <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                {errors.licenseNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Subscription Plan
            </label>
            <select
              value={formData.subscriptionPlan}
              onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value as SubscriptionPlan })}
              className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <option value="BASIC">Basic</option>
              <option value="STANDARD">Standard</option>
              <option value="PREMIUM">Premium</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Max Sites *
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxSites}
                onChange={(e) => setFormData({ ...formData, maxSites: parseInt(e.target.value) })}
                className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 ${
                  errors.maxSites ? "border-rose-500" : "border-zinc-200"
                }`}
              />
              {errors.maxSites && (
                <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                  {errors.maxSites}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Max Users *
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxUsers}
                onChange={(e) => setFormData({ ...formData, maxUsers: parseInt(e.target.value) })}
                className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 ${
                  errors.maxUsers ? "border-rose-500" : "border-zinc-200"
                }`}
              />
              {errors.maxUsers && (
                <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                  {errors.maxUsers}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {tenant ? "Update Tenant" : "Create Tenant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
