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
  MessageSquare,
  Star,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';

interface FAQ {
  id?: number;
  category: string;
  question: string;
  answer: string;
  color?: string;
  sort_order: number;
  enabled: number;
}

interface Testimonial {
  id?: number;
  name: string;
  location?: string;
  rating: number;
  text: string;
  highlight?: string;
  color?: string;
  enabled: number;
  sort_order: number;
}

export default function ContentAdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'faqs' | 'testimonials' | 'settings'>('faqs');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtext, setHeroSubtext] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/admin/check-auth');
      if (!response.ok) {
        router.push('/admin/login?redirect=/admin/content');
        return;
      }
      fetchData();
    };
    checkAuth();
  }, [router, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'faqs') {
        const response = await fetch('/api/admin/content?type=faqs');
        if (response.ok) {
          const data = await response.json();
          setFaqs(data);
        }
      } else if (activeTab === 'testimonials') {
        const response = await fetch('/api/admin/content?type=testimonials');
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data);
        }
      } else if (activeTab === 'settings') {
        const response = await fetch('/api/admin/content?type=settings');
        if (response.ok) {
          const data = await response.json();
          setHeroTitle(data.heroTitle);
          setHeroSubtext(data.heroSubtext);
        }
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFAQ = async (id?: number) => {
    try {
      const response = await fetch('/api/admin/content', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'faq', id, ...editForm }),
      });

      if (response.ok) {
        setEditingId(null);
        setEditForm({});
        fetchData();
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleSaveTestimonial = async (id?: number) => {
    try {
      const response = await fetch('/api/admin/content', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'testimonial', id, ...editForm }),
      });

      if (response.ok) {
        setEditingId(null);
        setEditForm({});
        fetchData();
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'settings', heroTitle, heroSubtext }),
      });

      if (response.ok) {
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleDelete = async (type: 'faq' | 'testimonial', id: number) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const response = await fetch(`/api/admin/content?type=${type}&id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const handleToggleEnabled = async (type: 'faq' | 'testimonial', item: any) => {
    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type, 
          id: item.id, 
          enabled: item.enabled ? 0 : 1 
        }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error toggling item:', error);
    }
  };

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
          <h1 className="text-4xl font-bold font-montserrat text-white mb-2">
            Content Management
          </h1>
          <p className="text-[#9FA4A6]">Manage FAQs, testimonials, and site content</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-[#9FA4A6]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('faqs')}
              className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                activeTab === 'faqs'
                  ? 'border-[#00D036] text-white'
                  : 'border-transparent text-[#9FA4A6] hover:text-white'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">FAQs</span>
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                activeTab === 'testimonials'
                  ? 'border-[#FF7A00] text-white'
                  : 'border-transparent text-[#9FA4A6] hover:text-white'
              }`}
            >
              <Star className="w-5 h-5" />
              <span className="font-medium">Testimonials</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-[#00A3E8] text-white'
                  : 'border-transparent text-[#9FA4A6] hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center text-white py-12">Loading...</div>
          ) : activeTab === 'settings' ? (
            /* Settings Tab */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111111] rounded-xl border border-[#9FA4A6]/20 p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Homepage Hero Section</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                    placeholder="CLEARING THE PATH FOR PEAK RECOVERY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#9FA4A6] mb-2">
                    Hero Subtext
                  </label>
                  <textarea
                    value={heroSubtext}
                    onChange={(e) => setHeroSubtext(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                    placeholder="Break through the lactate barrier..."
                  />
                </div>

                <button
                  onClick={handleSaveSettings}
                  className="flex items-center space-x-2 px-6 py-3 bg-[#00A3E8] text-white rounded-lg hover:shadow-[0_0_20px_rgba(0,163,232,0.5)] transition-all"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Settings</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {/* Add New Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => {
                    setEditingId(-1);
                    setEditForm({
                      enabled: 1,
                      sort_order: 0,
                      ...(activeTab === 'faqs' ? { category: 'general' } : { rating: 5 })
                    });
                  }}
                  className="flex items-center space-x-2 px-6 py-3 bg-[#00D036] text-white rounded-lg hover:shadow-[0_0_20px_rgba(0,208,54,0.5)] transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add {activeTab === 'faqs' ? 'FAQ' : 'Testimonial'}</span>
                </button>
              </div>

              {/* New Item Form */}
              {editingId === -1 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#111111] rounded-xl border-2 border-[#00D036] p-6 mb-6"
                >
                  {activeTab === 'faqs' ? (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white mb-4">New FAQ</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#9FA4A6] mb-2">Category</label>
                          <select
                            value={editForm.category || 'general'}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                          >
                            <option value="core">Core</option>
                            <option value="mitofuel">MitoFuel</option>
                            <option value="nasal">Nasal Spray</option>
                            <option value="general">General</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#9FA4A6] mb-2">Color</label>
                          <input
                            type="text"
                            value={editForm.color || ''}
                            onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                            placeholder="#00D036"
                            className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#9FA4A6] mb-2">Question</label>
                        <input
                          type="text"
                          value={editForm.question || ''}
                          onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                          className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#9FA4A6] mb-2">Answer</label>
                        <textarea
                          value={editForm.answer || ''}
                          onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => { setEditingId(null); setEditForm({}); }}
                          className="flex items-center space-x-2 px-4 py-2 border border-[#9FA4A6]/20 rounded-lg text-[#9FA4A6] hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={() => handleSaveFAQ()}
                          className="flex items-center space-x-2 px-4 py-2 bg-[#00D036] text-white rounded-lg hover:shadow-[0_0_20px_rgba(0,208,54,0.5)] transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save FAQ</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white mb-4">New Testimonial</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#9FA4A6] mb-2">Name</label>
                          <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#9FA4A6] mb-2">Location</label>
                          <input
                            type="text"
                            value={editForm.location || ''}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#9FA4A6] mb-2">Rating</label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={editForm.rating || 5}
                            onChange={(e) => setEditForm({ ...editForm, rating: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#9FA4A6] mb-2">Testimonial Text</label>
                        <textarea
                          value={editForm.text || ''}
                          onChange={(e) => setEditForm({ ...editForm, text: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#9FA4A6] mb-2">Highlight Word</label>
                          <input
                            type="text"
                            value={editForm.highlight || ''}
                            onChange={(e) => setEditForm({ ...editForm, highlight: e.target.value })}
                            className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#9FA4A6] mb-2">Color</label>
                          <input
                            type="text"
                            value={editForm.color || ''}
                            onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                            placeholder="#00D036"
                            className="w-full px-4 py-2 bg-black border border-[#9FA4A6]/30 rounded-lg text-white focus:border-[#00A3E8] focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => { setEditingId(null); setEditForm({}); }}
                          className="flex items-center space-x-2 px-4 py-2 border border-[#9FA4A6]/20 rounded-lg text-[#9FA4A6] hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={() => handleSaveTestimonial()}
                          className="flex items-center space-x-2 px-4 py-2 bg-[#FF7A00] text-white rounded-lg hover:shadow-[0_0_20px_rgba(255,122,0,0.5)] transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Testimonial</span>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* List Items */}
              {activeTab === 'faqs' ? (
                faqs.length === 0 ? (
                  <div className="text-center py-12 text-[#9FA4A6]">
                    No FAQs yet. Add your first one above.
                  </div>
                ) : (
                  faqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-[#111111] rounded-xl border border-[#9FA4A6]/20 p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span 
                              className="px-3 py-1 rounded-full text-xs font-semibold uppercase"
                              style={{ 
                                backgroundColor: `${faq.color || '#9FA4A6'}20`,
                                color: faq.color || '#9FA4A6',
                                borderWidth: '1px',
                                borderColor: `${faq.color || '#9FA4A6'}40`
                              }}
                            >
                              {faq.category}
                            </span>
                            {!faq.enabled && (
                              <span className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-red-500 text-xs font-semibold">
                                DISABLED
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                          <p className="text-[#9FA4A6]">{faq.answer}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleToggleEnabled('faq', faq)}
                            className={`p-2 rounded-lg border transition-all ${
                              faq.enabled
                                ? 'border-[#00D036]/20 text-[#00D036] hover:bg-[#00D036]/10'
                                : 'border-[#9FA4A6]/20 text-[#9FA4A6] hover:bg-[#9FA4A6]/10'
                            }`}
                          >
                            {faq.enabled ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={() => handleDelete('faq', faq.id!)}
                            className="p-2 border border-red-500/20 rounded-lg text-red-500 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )
              ) : (
                testimonials.length === 0 ? (
                  <div className="text-center py-12 text-[#9FA4A6]">
                    No testimonials yet. Add your first one above.
                  </div>
                ) : (
                  testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-[#111111] rounded-xl border border-[#9FA4A6]/20 p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                            {testimonial.location && (
                              <span className="text-[#9FA4A6] text-sm">• {testimonial.location}</span>
                            )}
                            <div className="flex items-center">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                            {!testimonial.enabled && (
                              <span className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-red-500 text-xs font-semibold">
                                DISABLED
                              </span>
                            )}
                          </div>
                          <p className="text-[#9FA4A6]">{testimonial.text}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleToggleEnabled('testimonial', testimonial)}
                            className={`p-2 rounded-lg border transition-all ${
                              testimonial.enabled
                                ? 'border-[#FF7A00]/20 text-[#FF7A00] hover:bg-[#FF7A00]/10'
                                : 'border-[#9FA4A6]/20 text-[#9FA4A6] hover:bg-[#9FA4A6]/10'
                            }`}
                          >
                            {testimonial.enabled ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={() => handleDelete('testimonial', testimonial.id!)}
                            className="p-2 border border-red-500/20 rounded-lg text-red-500 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
