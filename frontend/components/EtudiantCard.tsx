import React from 'react';
import Link from 'next/link';
import { User, Mail, Building2, Edit2, Trash2, Fingerprint } from 'lucide-react';
import { Etudiant } from '@/types';

interface EtudiantCardProps {
  etudiant: Etudiant;
  onDelete?: (id: number) => Promise<void> | void;
}

export default function EtudiantCard({ etudiant, onDelete }: EtudiantCardProps) {
  return (
    <div className="group relative overflow-hidden glass rounded-[2rem] border-white/5 hover:border-primary/20 transition-all duration-500">
      <div className="absolute top-0 right-0 p-4">
        {etudiant.age !== undefined && (
          <div className="px-3 py-1 glass rounded-full text-[10px] font-black text-primary uppercase tracking-widest border-primary/20">
            {etudiant.age} YRS
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="flex items-center space-x-5 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10 relative z-10 group-hover:scale-110 transition-transform">
              <User size={32} className="text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white leading-tight">
              {etudiant.nom}
            </h3>
            <div className="flex items-center text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">
              <Building2 size={12} className="mr-1.5 text-primary" />
              {etudiant.departementNom || 'Unassigned'}
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center mr-3">
              <Mail size={16} />
            </div>
            {etudiant.email}
          </div>
          <div className="flex items-center text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center mr-3">
              <Fingerprint size={16} />
            </div>
            <span className="font-mono">{etudiant.cin}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex space-x-2">
            <Link
              href={`/etudiants/${etudiant.id}`}
              className="p-3 glass hover:bg-primary hover:text-white rounded-xl transition-all"
              title="Edit Profile"
            >
              <Edit2 size={18} />
            </Link>
            <button
              onClick={() => onDelete?.(etudiant.id)}
              className="p-3 glass hover:bg-red-500 hover:text-white rounded-xl transition-all"
              title="Delete Record"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">
            ID: {etudiant.id}
          </div>
        </div>
      </div>
    </div>
  );
}
