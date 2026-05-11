import React from 'react';
import EtudiantForm from '@/components/EtudiantForm';
import { api } from '@/lib/api';
import { UserPlus, UserCircle2, Sparkles, AlertCircle } from 'lucide-react';

export default async function EtudiantDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const isNew = id === 'new';
  
  let etudiant = null;
  let departements = [];

  try {
    const [deptsData, etudiantData] = await Promise.all([
      api.departements.getAll(),
      isNew ? Promise.resolve(null) : api.etudiants.getOne(id)
    ]);
    
    departements = deptsData;
    etudiant = etudiantData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-[2rem] flex items-center justify-center text-white relative z-10 shadow-xl shadow-primary/20">
              {isNew ? <UserPlus size={36} /> : <UserCircle2 size={36} />}
            </div>
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
              <Sparkles size={12} />
              <span>Identity Interface</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
              {isNew ? 'New Identity' : 'Update Record'}
            </h1>
            <p className="text-slate-400 max-w-md">
              {isNew 
                ? 'Initialize a new student profile within the Nexus architecture.' 
                : `Modify structural parameters for student ${etudiant?.nom}.`}
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        {departements.length === 0 ? (
          <div className="p-12 glass border-white/5 rounded-[3rem] bg-amber-500/5 text-center">
            <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Architectural Requirement</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
              At least one active department must be registered in the core structure before a student profile can be initialized.
            </p>
          </div>
        ) : (
          <div className="glass border-white/5 rounded-[3rem] p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <EtudiantForm etudiant={etudiant} departements={departements} />
          </div>
        )}
      </div>
    </div>
  );
}
