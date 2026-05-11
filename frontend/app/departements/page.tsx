'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Departement } from '@/types';
import DepartementForm from '@/components/DepartementForm';
import { Building2, Edit2, Trash2, Search, Loader2, Sparkles, Layers } from 'lucide-react';

export default function DepartementsPage() {
  const [departements, setDepartements] = useState<Departement[]>([]);
  const [editingDept, setEditingDept] = useState<Departement | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadDepartements = async () => {
    setIsLoading(true);
    try {
      const data = await api.departements.getAll();
      setDepartements(data);
    } catch (error) {
      console.error('Error loading departements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDepartements();
  }, []);

  const handleSubmit = async (data: { nom: string }) => {
    try {
      if (editingDept) {
        await api.departements.update(editingDept.id, data);
      } else {
        await api.departements.create(data);
      }
      setEditingDept(undefined);
      loadDepartements();
    } catch (error) {
      console.error('Error saving departement:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce département ?')) return;
    try {
      await api.departements.delete(id);
      loadDepartements();
    } catch (error) {
      console.error('Error deleting departement:', error);
    }
  };

  const filteredDepartements = departements.filter((d: Departement) => 
    d.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest">
            <Layers size={12} />
            <span>Core Structures</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">Départements</h1>
          <p className="text-slate-400 max-w-md">Orchestration of academic units and structural hierarchies.</p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-secondary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search divisions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-6 py-4 glass border-white/5 rounded-2xl focus:ring-2 focus:ring-secondary/50 outline-none w-full lg:w-80 transition-all text-white placeholder:text-white/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-12 space-y-6">
            <div className="glass border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-3xl rounded-full" />
               <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Sparkles size={20} className="mr-2 text-secondary" />
                {editingDept ? 'Update Unit' : 'Initialize Unit'}
              </h2>
              <DepartementForm 
                departement={editingDept} 
                onSubmit={handleSubmit} 
                onCancel={editingDept ? () => setEditingDept(undefined) : undefined} 
              />
            </div>
            
            <div className="p-8 glass border-white/5 rounded-[2rem] bg-secondary/5">
              <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">Note</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Units can only be decommissioned if no active student records are linked to the specific structural ID.
              </p>
            </div>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 space-y-4">
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center text-slate-500">
               <Loader2 size={48} className="animate-spin text-secondary mb-4" />
               <p className="text-xs font-bold uppercase tracking-widest animate-pulse">Syncing Units...</p>
            </div>
          ) : filteredDepartements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDepartements.map((dept: Departement) => (
                <div 
                  key={dept.id} 
                  className="group glass border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-secondary/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/40 group-hover:bg-secondary/10 group-hover:text-secondary transition-all">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-secondary transition-colors">{dept.nom}</h3>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">Unit UUID: {dept.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingDept(dept)}
                      className="p-2.5 glass hover:bg-secondary hover:text-white rounded-xl transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="p-2.5 glass hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center glass border-white/5 rounded-[3rem] bg-white/[0.02]">
               <div className="mx-auto w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Structural Void</h3>
              <p className="text-slate-400 mt-1 text-sm">No departments match the current filter parameters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
