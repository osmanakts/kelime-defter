import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, PlusCircle, Trash2, Search, Bookmark } from 'lucide-react';

const CATEGORIES = [
  { name: 'Yabancı Dil', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { name: 'Yazılım', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { name: 'Tarih', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { name: 'Genel', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' }
];

export default function App() {
  const [words, setWords] = useState(() => {
    const saved = localStorage.getItem('vocab_vault_data');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        word: 'Resilience',
        meaning: 'Esneklik, dirençlilik, zorluklar karşısında toparlanma gücü.',
        example: 'System resilience is critical for distributed cloud architectures.',
        category: 'Yabancı Dil',
        isLearned: false
      },
      {
        id: '2',
        word: 'Idempotency',
        meaning: 'Bir işlemin birden fazla kez uygulanmasının sonucu değiştirmemesi özelliği.',
        example: 'HTTP GET, PUT, and DELETE methods are designed to be idempotent.',
        category: 'Yazılım',
        isLearned: true
      }
    ];
  });

  const [formData, setFormData] = useState({ word: '', meaning: '', example: '', category: 'Yabancı Dil' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [filterStatus, setFilterStatus] = useState('Tümü');

  useEffect(() => {
    localStorage.setItem('vocab_vault_data', JSON.stringify(words));
  }, [words]);

  const handleAddWord = (e) => {
    e.preventDefault();
    if (!formData.word.trim() || !formData.meaning.trim()) return;

    const newEntry = {
      id: Date.now().toString(),
      ...formData,
      isLearned: false
    };

    setWords([newEntry, ...words]);
    setFormData({ word: '', meaning: '', example: '', category: 'Yabancı Dil' });
  };

  const toggleLearned = (id) => {
    setWords(words.map(item => item.id === id ? { ...item, isLearned: !item.isLearned } : item));
  };

  const deleteWord = (id) => {
    setWords(words.filter(item => item.id !== id));
  };

  const filteredWords = words.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || item.category === selectedCategory;
    const matchesStatus = filterStatus === 'Tümü' ||
                          (filterStatus === 'Öğrenildi' && item.isLearned) ||
                          (filterStatus === 'Öğrenilecek' && !item.isLearned);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const learnedCount = words.filter(w => w.isLearned).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12">
      <header className="bg-slate-900 text-white py-6 px-4 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-400" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">VocabVault</h1>
              <p className="text-slate-400 text-sm">Akıllı Kelime ve Kavram Defteri</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="text-slate-400">Toplam:</span> <strong className="text-white ml-1">{words.length}</strong>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="text-slate-400">Öğrenilen:</span> <strong className="text-emerald-400 ml-1">{learnedCount}</strong>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="text-slate-400">Kalan:</span> <strong className="text-amber-400 ml-1">{words.length - learnedCount}</strong>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-1">
          <form onSubmit={handleAddWord} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
              <PlusCircle className="w-5 h-5 text-indigo-600" />
              Yeni Kavram / Kelime Ekle
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 uppercase mb-1">Kelime / Terim *</label>
                <input type="text" required value={formData.word} onChange={(e) => setFormData({ ...formData, word: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 uppercase mb-1">Kategori</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white">
                  {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 uppercase mb-1">Anlamı / Açıklaması *</label>
                <textarea rows="2" required value={formData.meaning} onChange={(e) => setFormData({ ...formData, meaning: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 uppercase mb-1">Örnek Cümle</label>
                <textarea rows="2" value={formData.example} onChange={(e) => setFormData({ ...formData, example: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm shadow-sm">
                Deftere Kaydet
              </button>
            </div>
          </form>
        </section>

        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input type="text" placeholder="Ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="Tümü">Tüm Kategoriler</option>
              {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="Tümü">Tüm Durumlar</option>
              <option value="Öğrenilecek">Öğrenilecek</option>
              <option value="Öğrenildi">Öğrenildi</option>
            </select>
          </div>

          {filteredWords.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-dashed border-slate-300 text-center text-slate-500">
              <Bookmark className="w-10 h-10 mx-auto mb-2 text-slate-400" />
              <p>Kayıt bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredWords.map((item) => {
                const badgeStyle = CATEGORIES.find(c => c.name === item.category)?.color || 'bg-slate-100 text-slate-800';
                return (
                  <div key={item.id} className={`bg-white p-5 rounded-xl border transition-all flex flex-col justify-between ${item.isLearned ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200 shadow-sm'}`}>
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>{item.category}</span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => toggleLearned(item.id)} className={`p-1.5 rounded-lg transition-colors ${item.isLearned ? 'text-emerald-600 bg-emerald-100' : 'text-slate-400 hover:bg-slate-100'}`}>
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteWord(item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h3 className={`text-lg font-bold mb-1 ${item.isLearned ? 'line-through text-slate-500' : 'text-slate-900'}`}>{item.word}</h3>
                      <p className="text-sm text-slate-700 mb-3">{item.meaning}</p>
                    </div>
                    {item.example && <div className="mt-2 pt-3 border-t border-slate-100 text-xs text-slate-500 italic">"{item.example}"</div>}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}