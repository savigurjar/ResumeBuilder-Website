import { BriefcaseBusiness, Globe, Linkedin, MapPin, User, Mail, Phone } from 'lucide-react'
import React from 'react'

function PersonalInfoForm({ data = {}, onChange, removeBackground, setRemoveBackground }) {

    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const fields = [
        { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
        { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
        { key: "location", label: "Location", icon: MapPin, type: "text" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
        { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
        { key: "website", label: "Personal Website", icon: Globe, type: "url" },
    ]

    return (
        <div>
            <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
            <p className='text-sm text-gray-600'>Get Started with the personal information</p>

            <div className='flex items-center gap-4 mt-5'>
                {/* IMAGE */}
                <label className="cursor-pointer relative">
                    <img
                        src={
                            data.image
                                ? typeof data.image === "string"
                                    ? data.image
                                    : URL.createObjectURL(data.image)
                                : "https://via.placeholder.com/64" // placeholder if no image
                        }
                        alt="user"
                        className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
                    />

                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        className="hidden"
                        onChange={(e) => handleChange("image", e.target.files[0])}
                    />
                </label>

                {/* REMOVE BACKGROUND TOGGLE */}
                {data.image && typeof data.image === 'object' && (
                    <div className="flex flex-col text-sm">
                        <p className="text-gray-700 font-medium">Remove Background</p>

                        <label className="relative inline-flex items-center cursor-pointer gap-3 mt-1">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                onChange={() => setRemoveBackground(prev => !prev)}
                                checked={removeBackground}
                            />

                            <div className="w-10 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors"></div>
                            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                        </label>
                    </div>
                )}
            </div>

            {/* FORM FIELDS */}
            {fields.map((field) => {
                const Icon = field.icon
                return (
                    <div key={field.key} className='space-y-1 mt-5'>
                        <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                            <Icon size={16} />
                            {field.label}
                            {field.required && <span className='text-red-500'>*</span>}
                        </label>
                        <input
                            type={field.type}
                            value={data[field.key] || ""}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm'
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            required={field.required}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default PersonalInfoForm
