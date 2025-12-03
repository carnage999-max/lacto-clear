'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Package,
  DollarSign,
  Eye,
  EyeOff
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  features?: string;
  image?: string;
  color?: string;
  badge?: string;
  enabled: number;
  sort_order: number;
}

export default function ProductsAdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // App colors for the color picker
  const appColors = ['#00D036', '#00A3E8', '#FF7A00'];

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/admin/check-auth');
      if (!response.ok) {
        router.push('/admin/login?redirect=/admin/products');
        return;
      }
      fetchProducts();
    };
    checkAuth();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({
      ...product,
      features: product.features ? JSON.parse(product.features) : [],
    });
  };

  const handleSave = async (id: string) => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editForm }),
      });

      if (response.ok) {
        setEditingId(null);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleToggleEnabled = async (product: Product) => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: product.id, 
          enabled: product.enabled ? 0 : 1 
        }),
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error toggling product:', error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading products...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Header */}
      <section className="border-b border-[#9FA4A6]/20 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/admin"
            className="inline-flex items-center space-x-2 text-[#00A3E8] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin</span>
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold font-montserrat text-white mb-2">
                Product Management
              </h1>
              <p className="text-[#9FA4A6]">Edit prices, descriptions, and availability</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-[#00D036] text-white rounded-lg hover:shadow-[0_0_20px_rgba(0,208,54,0.5)] transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </section>

      {/* Add Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111111] rounded-2xl border border-[#9FA4A6]/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Add New Product</h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditForm({});
                  setImageFile(null);
                }}
                className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-[#9FA4A6]" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                    Product ID
                  </label>
                  <input
                    type="text"
                    value={editForm.id || ''}
                    onChange={(e) => setEditForm({ ...editForm, id: e.target.value })}
                    placeholder="e.g., core, mitofuel"
                    className="w-full px-4 py-2 bg-[#0D0D0D] border border-[#9FA4A6]/20 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="e.g., LactoClear® Core"
                    className="w-full px-4 py-2 bg-[#0D0D0D] border border-[#9FA4A6]/20 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.price || ''}
                    onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                    placeholder="49.99"
                    className="w-full px-4 py-2 bg-[#0D0D0D] border border-[#9FA4A6]/20 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                    Color
                  </label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      {appColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setEditForm({ ...editForm, color })}
                          className={`w-12 h-12 rounded-lg border-2 transition-all ${
                            editForm.color === color 
                              ? 'border-white scale-110' 
                              : 'border-[#9FA4A6]/20 hover:border-[#9FA4A6]/50'
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <input
                      type="text"
                      value={editForm.color || ''}
                      onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                      placeholder="#00D036"
                      className="w-full px-4 py-2 bg-[#0D0D0D] border border-[#9FA4A6]/20 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                    Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageFile(file);
                      }
                    }}
                    className="w-full px-4 py-2 bg-[#0D0D0D] border border-[#9FA4A6]/20 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#00A3E8]/10 file:text-[#00A3E8] hover:file:bg-[#00A3E8]/20"
                  />
                  {imageFile && (
                    <p className="text-xs text-[#00D036] mt-1">
                      Selected: {imageFile.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                    Badge (optional)
                  </label>
                  <input
                    type="text"
                    value={editForm.badge || ''}
                    onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                    placeholder="BEST VALUE"
                    className="w-full px-4 py-2 bg-[#0D0D0D] border border-[#9FA4A6]/20 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                  Description
                </label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  placeholder="Product description..."
                  className="w-full px-4 py-2 bg-[#0D0D0D] border border-[#9FA4A6]/20 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={async () => {
                    try {
                      setUploadingImage(true);
                      
                      // Upload image first if selected
                      let imagePath = editForm.image;
                      if (imageFile) {
                        const formData = new FormData();
                        formData.append('file', imageFile);

                        const uploadResponse = await fetch('/api/admin/upload-image', {
                          method: 'POST',
                          body: formData,
                        });

                        if (uploadResponse.ok) {
                          const { url } = await uploadResponse.json();
                          imagePath = url;
                        } else {
                          alert('Failed to upload image');
                          setUploadingImage(false);
                          return;
                        }
                      }

                      // Create product with image path
                      const response = await fetch('/api/admin/products', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          ...editForm,
                          image: imagePath,
                        }),
                      });

                      if (response.ok) {
                        setShowAddForm(false);
                        setEditForm({});
                        setImageFile(null);
                        fetchProducts();
                      } else {
                        alert('Failed to add product');
                      }
                    } catch (error) {
                      console.error('Error adding product:', error);
                      alert('Error adding product');
                    } finally {
                      setUploadingImage(false);
                    }
                  }}
                  disabled={uploadingImage}
                  className="flex-1 px-6 py-3 bg-[#00D036] text-white rounded-lg hover:shadow-[0_0_20px_rgba(0,208,54,0.5)] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingImage ? 'Uploading...' : 'Add Product'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditForm({});
                    setImageFile(null);
                  }}
                  disabled={uploadingImage}
                  className="px-6 py-3 bg-[#1a1a1a] text-[#9FA4A6] rounded-lg hover:bg-[#222222] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Products List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="bg-[#111111] rounded-xl border border-[#9FA4A6]/20 p-12 text-center">
              <Package className="w-16 h-16 text-[#9FA4A6] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Products Yet</h3>
              <p className="text-[#9FA4A6] mb-6">Get started by adding your first product</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#00D036] text-white rounded-lg hover:shadow-[0_0_20px_rgba(0,208,54,0.5)] transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Add Product</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#111111] rounded-xl border border-[#9FA4A6]/20 p-6"
                >
                  {editingId === product.id ? (
                    /* Edit Mode */
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                            Product Name
                          </label>
                          <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                            Price ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.price || ''}
                            onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                          Description
                        </label>
                        <textarea
                          value={editForm.description || ''}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                            Color
                          </label>
                          <input
                            type="text"
                            value={editForm.color || ''}
                            onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                            placeholder="#00D036"
                            className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                            Badge
                          </label>
                          <input
                            type="text"
                            value={editForm.badge || ''}
                            onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                            placeholder="BEST VALUE"
                            className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                            Sort Order
                          </label>
                          <input
                            type="number"
                            value={editForm.sort_order || 0}
                            onChange={(e) => setEditForm({ ...editForm, sort_order: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex items-center space-x-2 px-4 py-2 border border-[#9FA4A6]/20 rounded-lg text-[#9FA4A6] hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={() => handleSave(product.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-[#00D036] text-white rounded-lg hover:shadow-[0_0_20px_rgba(0,208,54,0.5)] transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                          {product.badge && (
                            <span className="px-3 py-1 bg-[#FFD400]/20 border border-[#FFD400]/40 rounded-full text-[#FFD400] text-xs font-semibold">
                              {product.badge}
                            </span>
                          )}
                          {!product.enabled && (
                            <span className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-red-500 text-xs font-semibold">
                              DISABLED
                            </span>
                          )}
                        </div>
                        <p className="text-[#9FA4A6] mb-3">{product.description}</p>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-[#00D036]" />
                            <span className="text-white font-semibold">${product.price.toFixed(2)}</span>
                          </div>
                          {product.color && (
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-4 h-4 rounded-full border border-white/20"
                                style={{ backgroundColor: product.color }}
                              />
                              <span className="text-[#9FA4A6]">{product.color}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleToggleEnabled(product)}
                          className={`p-2 rounded-lg border transition-all ${
                            product.enabled
                              ? 'border-[#00D036]/20 text-[#00D036] hover:bg-[#00D036]/10'
                              : 'border-[#9FA4A6]/20 text-[#9FA4A6] hover:bg-[#9FA4A6]/10'
                          }`}
                          title={product.enabled ? 'Disable product' : 'Enable product'}
                        >
                          {product.enabled ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 border border-[#00A3E8]/20 rounded-lg text-[#00A3E8] hover:bg-[#00A3E8]/10 transition-all"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 border border-red-500/20 rounded-lg text-red-500 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
