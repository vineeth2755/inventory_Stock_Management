import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  X, 
  PackagePlus, 
  Edit3, 
  AlertCircle, 
  CheckCircle2,
  Building,
  Layers,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { useInventory } from '../../context/InventoryContext';

export default function ItemFormScreen() {
  const { 
    formMode, 
    selectedItem, 
    items, 
    categories, 
    warehouses, 
    addItem, 
    updateItem, 
    navigateTo 
  } = useInventory();

  const isEdit = formMode === 'edit';

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: categories[0] || 'Consumables',
    description: '',
    unit: 'Units',
    warehouse: warehouses[0] || 'Warehouse A',
    zone: '',
    availableQty: '',
    reservedQty: '0',
    reorderLevel: '',
    supplier: ''
  });

  // Validation Errors state
  const [errors, setErrors] = useState({});
  // Success Toast state
  const [successMessage, setSuccessMessage] = useState(null);

  // Units list
  const UNITS = ['Units', 'Pieces', 'Boxes', 'Rolls', 'Cans', 'Packs', 'Tubes'];

  // Initialize form data when in Edit mode or generate unique ID for Add mode
  useEffect(() => {
    if (isEdit && selectedItem) {
      setFormData({
        id: selectedItem.id,
        name: selectedItem.name,
        category: selectedItem.category,
        description: selectedItem.description,
        unit: selectedItem.unit || 'Units',
        warehouse: selectedItem.warehouse || warehouses[0],
        zone: selectedItem.zone || '',
        availableQty: selectedItem.availableQty.toString(),
        reservedQty: (selectedItem.reservedQty || 0).toString(),
        reorderLevel: selectedItem.reorderLevel.toString(),
        supplier: selectedItem.supplier || ''
      });
    } else {
      // Auto-generate next unique ID for convenience (e.g. INV-1013)
      const nextNum = 1000 + items.length + 1;
      setFormData({
        id: `INV-${nextNum}`,
        name: '',
        category: categories[0] || 'Consumables',
        description: '',
        unit: 'Units',
        warehouse: warehouses[0] || 'Warehouse A',
        zone: 'Bay 01',
        availableQty: '',
        reservedQty: '0',
        reorderLevel: '',
        supplier: ''
      });
    }
    setErrors({});
  }, [formMode, selectedItem, items.length]);

  // Real-time input change handler with instant error clearing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Inline Validation Engine
  const validateForm = () => {
    const newErrors = {};

    // 1. Unique Item ID
    if (!formData.id.trim()) {
      newErrors.id = 'Item ID is required.';
    } else if (!isEdit) {
      const isDuplicate = items.some(
        item => item.id.trim().toLowerCase() === formData.id.trim().toLowerCase()
      );
      if (isDuplicate) {
        newErrors.id = 'This Item ID already exists. Please choose a unique SKU.';
      }
    }

    // 2. Item Name
    if (!formData.name.trim()) {
      newErrors.name = 'Item Name is required.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Item Name must be at least 3 characters.';
    }

    // 3. Description
    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a brief item description.';
    }

    // 4. Available Quantity
    if (formData.availableQty === '' || isNaN(formData.availableQty)) {
      newErrors.availableQty = 'Available quantity is required.';
    } else if (parseInt(formData.availableQty, 10) < 0) {
      newErrors.availableQty = 'Quantity cannot be negative.';
    }

    // 5. Reorder Level
    if (formData.reorderLevel === '' || isNaN(formData.reorderLevel)) {
      newErrors.reorderLevel = 'Reorder level is required.';
    } else if (parseInt(formData.reorderLevel, 10) < 0) {
      newErrors.reorderLevel = 'Reorder level cannot be negative.';
    }

    // 6. Zone / Location
    if (!formData.zone.trim()) {
      newErrors.zone = 'Zone or specific shelf/bay is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const available = parseInt(formData.availableQty, 10);
    const reorder = parseInt(formData.reorderLevel, 10);
    const reserved = parseInt(formData.reservedQty, 10) || 0;

    let computedStatus = 'In Stock';
    if (available === 0) {
      computedStatus = 'Out of Stock';
    } else if (available <= reorder) {
      computedStatus = 'Low Stock';
    }

    const payload = {
      id: formData.id.trim().toUpperCase(),
      name: formData.name.trim(),
      category: formData.category,
      description: formData.description.trim(),
      unit: formData.unit,
      warehouse: formData.warehouse,
      zone: formData.zone.trim(),
      location: `${formData.warehouse} - ${formData.zone.trim()}`,
      availableQty: available,
      reservedQty: reserved,
      reorderLevel: reorder,
      supplier: formData.supplier.trim() || 'Unassigned',
      status: computedStatus,
      lastUpdated: new Date().toISOString().split('T')[0],
      movements: isEdit && selectedItem?.movements ? selectedItem.movements : [
        {
          id: `MOV-${Date.now().toString().slice(-4)}`,
          type: 'Receipt',
          quantity: available,
          date: new Date().toISOString().split('T')[0],
          user: 'Operations User',
          notes: 'Initial inventory intake'
        }
      ]
    };

    if (isEdit) {
      updateItem(payload);
      setSuccessMessage(`Item "${payload.name}" updated successfully.`);
    } else {
      addItem(payload);
      setSuccessMessage(`New item "${payload.name}" created successfully.`);
    }

    // Redirect after 1 second
    setTimeout(() => {
      navigateTo('details', payload.id);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 1. Header & Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('list')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-[#5145E5] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel & Return to Catalog</span>
        </button>

        <span className="text-xs font-mono font-medium text-slate-400">
          {isEdit ? `Editing ${selectedItem?.id}` : 'Draft Mode'}
        </span>
      </div>

      {/* 2. Success Alert Feedback */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-semibold">{successMessage} Redirecting to inspection view...</span>
        </div>
      )}

      {/* 3. The Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Form Title Banner */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50 text-[#5145E5]">
              {isEdit ? <Edit3 className="w-5 h-5" /> : <PackagePlus className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {isEdit ? `Edit Item: ${selectedItem?.name}` : 'Register New Inventory Item'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Fill out the required specifications below. Fields marked with <span className="text-rose-500 font-bold">*</span> are required.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* SECTION 1: Item Identity & Classification */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Layers className="w-4 h-4 text-[#5145E5]" />
              <span>1. Item Identity & Classification</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Item ID */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Item ID / SKU <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  disabled={isEdit}
                  placeholder="e.g. INV-1020"
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-[#5145E5] ${
                    errors.id ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                  } ${isEdit ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'text-slate-900'}`}
                />
                {errors.id && <p className="text-xs text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.id}</p>}
              </div>

              {/* Item Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Item Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Industrial Air Filter AF-90"
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5145E5] ${
                    errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5145E5] cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Unit of Measure */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unit of Measure <span className="text-rose-500">*</span>
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5145E5] cursor-pointer"
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide physical specifications, tolerances, and typical use cases..."
                className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5145E5] ${
                  errors.description ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                }`}
              />
              {errors.description && <p className="text-xs text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>}
            </div>
          </div>

          {/* SECTION 2: Stock Levels & Thresholds */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Building className="w-4 h-4 text-[#5145E5]" />
              <span>2. Stock Levels & Thresholds</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Available Quantity */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Available Quantity <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  name="availableQty"
                  value={formData.availableQty}
                  onChange={handleChange}
                  placeholder="0"
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5145E5] ${
                    errors.availableQty ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.availableQty && <p className="text-xs text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.availableQty}</p>}
              </div>

              {/* Reserved Quantity */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reserved Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  name="reservedQty"
                  value={formData.reservedQty}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5145E5]"
                />
                <span className="text-[11px] text-slate-400">Allocated to production</span>
              </div>

              {/* Reorder Level */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reorder Level <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  name="reorderLevel"
                  value={formData.reorderLevel}
                  onChange={handleChange}
                  placeholder="e.g. 15"
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5145E5] ${
                    errors.reorderLevel ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.reorderLevel && <p className="text-xs text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.reorderLevel}</p>}
              </div>
            </div>
          </div>

          {/* SECTION 3: Storage Location & Supplier Reference */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 pb-2 border-b border-slate-100">
              <MapPin className="w-4 h-4 text-[#5145E5]" />
              <span>3. Storage Location & Supplier Reference</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Warehouse Facility */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Warehouse Facility <span className="text-rose-500">*</span>
                </label>
                <select
                  name="warehouse"
                  value={formData.warehouse}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5145E5] cursor-pointer"
                >
                  {warehouses.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>

              {/* Zone / Shelf / Bay */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Zone / Shelf / Bay <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  placeholder="e.g. Bay 12, Shelf 04"
                  className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5145E5] ${
                    errors.zone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                  }`}
                />
                {errors.zone && <p className="text-xs text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.zone}</p>}
              </div>
            </div>

            {/* Optional Supplier Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Supplier / Vendor Reference <span className="text-slate-400 text-[11px] font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                placeholder="e.g. AeroPure Filtration Ltd. or PO Reference"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5145E5]"
              />
            </div>
          </div>
        </div>

        {/* Form Action Buttons Bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigateTo('list')}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#5145E5] hover:bg-indigo-700 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isEdit ? 'Save Changes' : 'Create Inventory Item'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

