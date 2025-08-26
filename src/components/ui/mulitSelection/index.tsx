import { Check, Plus, Search, X } from "lucide-react"

import React, { useEffect, useRef, useState } from "react"

// ===== Types =====
type Option = {
  value: string
  label: string
}

type MultiSelectProps = {
  options: Option[]
  value: Option[]
  onChange: (newValue: Option[]) => void
  placeholder?: string
  creatable?: boolean
  disabled?: boolean
  className?: string
}

// ===== MultiSelect Component =====
const MultiSelect: React.FC<MultiSelectProps> = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Select items...",
  creatable = false,
  disabled = false,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter options based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredOptions(options)
    } else {
      setFilteredOptions(options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())))
    }
  }, [searchTerm, options])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (option: Option) => {
    const isSelected = value.some((item) => item.value === option.value)
    if (isSelected) {
      onChange(value.filter((item) => item.value !== option.value))
    } else {
      onChange([...value, option])
    }
  }

  const handleRemove = (optionToRemove: Option) => {
    onChange(value.filter((item) => item.value !== optionToRemove.value))
  }

  const handleCreate = () => {
    if (creatable && searchTerm && !options.find((opt) => opt.label.toLowerCase() === searchTerm.toLowerCase())) {
      const newOption = { value: searchTerm.toLowerCase(), label: searchTerm }
      onChange([...value, newOption])
      setSearchTerm("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchTerm("")
    } else if (e.key === "Enter" && creatable && searchTerm) {
      e.preventDefault()
      handleCreate()
    }
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Input Container */}
      <div
        className={`
          min-h-[44px] w-full px-3 py-2 border rounded-lg cursor-text
          flex items-center gap-2 flex-wrap
          ${
            disabled
              ? "bg-gray-100 border-gray-300 cursor-not-allowed"
              : "bg-white border-gray-300 hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
          }
        `}
      >
        {value.map((item) => (
          <span
            key={item.value}
            className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs rounded-full border border-blue-200"
          >
            {item.label}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleRemove(item)
              }}
              className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : "Type to search..."}
          className="flex-1 border-none outline-none bg-transparent text-gray-700 placeholder-gray-400 min-w-[80px]"
          disabled={disabled}
        />
      </div>

      {/* Typing Indicator */}
      {searchTerm && (
        <div className="mt-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Search size={14} className="text-blue-500" />
            <span className="text-gray-600">Searching for:</span>
            <span className="font-medium text-blue-700 bg-white px-2 py-1 rounded border">"{searchTerm}"</span>
            {creatable && !options.find((opt) => opt.label.toLowerCase() === searchTerm.toLowerCase()) && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Press Enter to create</span>
            )}
          </div>
          {filteredOptions.length > 0 && (
            <div className="mt-2 text-xs text-gray-500">
              {filteredOptions.length} option
              {filteredOptions.length > 1 ? "s" : ""} found
            </div>
          )}
        </div>
      )}

      {/* Dropdown */}
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = value.some((item) => item.value === option.value)
                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`
                      px-3 py-2 cursor-pointer flex items-center justify-between
                      hover:bg-gray-50 transition-colors
                      ${isSelected ? "bg-blue-50 text-blue-700" : "text-gray-700"}
                    `}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check size={16} className="text-blue-600" />}
                  </div>
                )
              })
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
            )}

            {creatable &&
              searchTerm &&
              !options.find((opt) => opt.label.toLowerCase() === searchTerm.toLowerCase()) && (
                <div
                  onClick={handleCreate}
                  className="px-3 py-2 cursor-pointer flex items-center gap-2 text-blue-600 hover:bg-blue-50 border-t border-gray-200"
                >
                  <Plus size={16} />
                  <span>Create "{searchTerm}"</span>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  )
}

// ===== Demo =====
const MultiSelectDemo = () => {
  const [value, setValue] = useState<Option[]>([])

  const techOptions: Option[] = [
    
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">🔥 Multi-Select Input</h3>
          <MultiSelect
            options={techOptions}
            value={value}
            onChange={setValue}
            placeholder="Start typing to search..."
            creatable
          />
          <div className="mt-3 text-sm text-gray-500">
            Selected: {value.map((item) => item.label).join(", ") || "None"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiSelectDemo
