"use client";

import { useState } from "react";
import { Plus, Copy, Trash2, Eye, EyeOff, Key } from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Production API Key",
      key: "sk_live_xxxxxxxxxxxxxxxx",
      createdAt: "2024-01-15T10:00:00Z",
      lastUsed: "2024-06-13T09:30:00Z",
    },
    {
      id: "2",
      name: "Test API Key",
      key: "sk_test_xxxxxxxxxxxxxxxx",
      createdAt: "2024-03-20T10:00:00Z",
      lastUsed: "2024-06-12T14:20:00Z",
    },
  ]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;

    const newKey: ApiKey = {
      id: String(Date.now()),
      name: newKeyName,
      key: `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      createdAt: new Date().toISOString(),
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    setShowCreateDialog(false);
  };

  const handleDeleteKey = (keyId: string) => {
    if (!confirm("Are you sure you want to delete this API key?")) return;
    setApiKeys(apiKeys.filter((k) => k.id !== keyId));
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    alert("API key copied to clipboard!");
  };

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const maskKey = (key: string) => {
    if (key.length <= 10) return key;
    return key.substring(0, 8) + "..." + key.substring(key.length - 4);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            API Keys
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Manage your API keys for external integrations
          </p>
        </div>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Create API Key
        </button>
      </div>

      {/* Info Card */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
        <div className="flex gap-3">
          <Key className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
              About API Keys
            </h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              API keys allow external applications to interact with the OMHS platform. Keep your keys secure and never share them publicly.
            </p>
          </div>
        </div>
      </div>

      {/* API Keys List */}
      <div className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">API Key</th>
                <th className="px-4 py-3 font-semibold">Created</th>
                <th className="px-4 py-3 font-semibold">Last Used</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {apiKeys.map((apiKey) => (
                <tr
                  key={apiKey.id}
                  className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      {apiKey.name}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <code className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-mono dark:bg-zinc-800">
                        {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="rounded p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                      >
                        {visibleKeys.has(apiKey.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {new Date(apiKey.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {apiKey.lastUsed
                      ? new Date(apiKey.lastUsed).toLocaleDateString()
                      : "Never"}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyKey(apiKey.key)}
                        className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                        title="Copy key"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteKey(apiKey.id)}
                        className="rounded-md p-1.5 text-rose-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-300"
                        title="Delete key"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {apiKeys.length === 0 && (
            <div className="py-12 text-center">
              <Key className="mx-auto h-12 w-12 text-zinc-400" />
              <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                No API keys yet
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Create your first API key to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowCreateDialog(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Create API Key
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Key Name
                </label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Production API Key"
                  className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
                />
              </div>

              <div className="rounded-md bg-amber-50 border border-amber-200 p-3 dark:bg-amber-950 dark:border-amber-900">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Important:</strong> Make sure to copy your API key now. You won't be able to see it again!
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateDialog(false);
                  setNewKeyName("");
                }}
                className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKey}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Create Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
