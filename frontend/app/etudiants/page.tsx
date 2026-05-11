'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Etudiant } from '@/types';
import EtudiantCard from '@/components/EtudiantCard';
import { UserPlus, Search, Loader2, Sparkles } from 'lucide-react';

export default function EtudiantsPage() {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadEtudiants = async () => {
    setIsLoading(true);
    try {
      const data = await api.etudiants.getAll();
      setEtudiants(data);
    } catch (error) {
      console.error('Error loading etudiants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEtudiants();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) return;
    try {
      await api.etudiants.delete(id);
      loadEtudiants();
    } catch (error) {
      console.error('Error deleting etudiant:', error);
    }
  };

  const filteredEtudiants = etudiants.filter((e: Etudiant) => 
    e.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.departementNom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={12} />
            <span>Neural Registry</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">Étudiants</h1>
          <p className="text-slate-400 max-w-md">Management of student profiles and academic records within the Nexus.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="text"
              placeholder="Filter identity records..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 glass border-white/5 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none w-full sm:w-80 transition-all text-white placeholder:text-white/20"
            />
          </div>
          <Link
            href="/etudiants/new"
            className="flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <UserPlus size={20} className="mr-2" />
            New Entry
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="py-32 flex flex-col items-center justify-center text-slate-500">
          <div className="relative">
            <div className="absolute inset-0 bg-primary blur-2xl opacity-20 animate-pulse" />
            <Loader2 size={64} className="animate-spin relative z-10 text-primary" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest mt-8 animate-pulse">Syncing Database...</p>
        </div>
      ) : filteredEtudiants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEtudiants.map((etudiant: Etudiant) => (
            <EtudiantCard 
              key={etudiant.id} 
              etudiant={etudiant} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center glass border-white/5 rounded-[3rem] bg-white/[0.02]">
          <div className="mx-auto w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-white/20 mb-6">
            <Search size={40} />
          </div>
          <h3 className="text-2xl font-bold text-white">No Records Found</h3>
          <p className="text-slate-400 mt-2 max-w-sm mx-auto">
            {searchTerm 
              ? "The search query yielded no results in the current dataset." 
              : "The registry is empty. Initialize the first student record to begin."}
          </p>
          {!searchTerm && (
            <Link
              href="/etudiants/new"
              className="inline-flex items-center mt-8 px-10 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all"
            >
              Initialize Entry
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
