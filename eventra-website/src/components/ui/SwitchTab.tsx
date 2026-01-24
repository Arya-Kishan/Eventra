"use client";

import { useState } from "react";

interface Tab {
  label: string;
  value: string;
}

interface SwitchTabProps {
  tabs: Tab[];
  defaultActive?: string;
  onChange?: (value: string) => void;
}

export default function SwitchTab({
  tabs,
  defaultActive,
  onChange,
}: SwitchTabProps) {
  const [active, setActive] = useState(defaultActive ?? tabs[0]?.value);

  const handleChange = (value: string) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className="flex gap-2 rounded-lg bg-gray-100 p-1 w-fit">
      {tabs.map((tab) => {
        const isActive = active === tab.value;

        return (
          <button
            key={tab.value}
            onClick={() => handleChange(tab.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all
              ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-white hover:text-black"
              }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
