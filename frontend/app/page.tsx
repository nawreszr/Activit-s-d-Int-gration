import Link from 'next/link';
import { 
  Users, 
  Building2, 
  ArrowUpRight, 
  GraduationCap, 
  Activity, 
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { api } from '@/lib/api';

export default async function Home() {
  let stats = { etudiants: 0, departements: 0 };
  
  try {
    const [e, d] = await Promise.all([
      api.etudiants.getAll().catch(() => []),
      api.departements.getAll().catch(() => [])
    ]);
    stats = { etudiants: e.length, departements: d.length };
  } catch (err) {
    console.error("Failed to fetch stats", err);
  }

  const features = [
    {
      title: 'Neural Registry',
      subtitle: 'Student Management',
      description: 'Unified database for student records with real-time sync across microservices.',
      href: '/etudiants',
      icon: Users,
      color: 'from-blue-500 to-cyan-400',
      count: stats.etudiants,
      metric: 'Active Profiles'
    },
    {
      title: 'Core Structures',
      subtitle: 'Department Control',
      description: 'Architectural oversight of academic divisions and resource allocation.',
      href: '/departements',
      icon: Building2,
      color: 'from-purple-500 to-pink-500',
      count: stats.departements,
      metric: 'Operational Units'
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[3rem] p-8 lg:p-16 glass-dark border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            <span>Next-Gen System Active</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Elevating <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Academic Intelligence
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            Welcome to EduManager Nexus. A high-performance command center for managing the digital heartbeat of your institution.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/25 hover:scale-105 transition-all duration-300">
              Launch Overview
            </button>
            <button className="px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300">
              System Health
            </button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {features.map((item: any, i: number) => (
          <Link 
            key={item.title} 
            href={item.href}
            className="group relative overflow-hidden glass border-white/5 rounded-[2.5rem] p-10 hover:border-primary/30 transition-all duration-500"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
            
            <div className="flex justify-between items-start mb-12">
              <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-6 transition-transform duration-500`}>
                <item.icon size={28} />
              </div>
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-primary transition-all duration-500">
                <ArrowUpRight size={24} />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">{item.subtitle}</span>
              <h2 className="text-3xl font-bold text-white mb-4">{item.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-[280px]">
                {item.description}
              </p>
              
              <div className="flex items-end space-x-3">
                <span className="text-5xl font-black text-white tracking-tighter">{item.count}</span>
                <span className="text-xs text-slate-500 font-bold mb-2 uppercase tracking-wide">{item.metric}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Zap, title: 'Ultra-Fast Sync', desc: 'Low-latency microservice bridge' },
          { icon: ShieldCheck, title: 'Neural Security', desc: 'RBAC & encrypted data flow' },
          { icon: Activity, title: 'Real-time Analytics', desc: 'Live system performance metrics' },
        ].map((box: any, i: number) => (
          <div key={i} className="p-8 glass border-white/5 rounded-3xl group hover:bg-white/5 transition-colors">
            <box.icon className="text-primary mb-4 group-hover:scale-110 transition-transform" size={24} />
            <h3 className="font-bold text-white mb-2">{box.title}</h3>
            <p className="text-xs text-slate-500">{box.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="relative h-64 rounded-[3rem] overflow-hidden flex items-center justify-center text-center p-8 border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20" />
        <div className="relative z-10 space-y-4">
          <GraduationCap size={48} className="mx-auto text-primary animate-float" />
          <h2 className="text-3xl font-extrabold text-white">Ready to Expand the Nexus?</h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm">
            Access developer tools to integrate new modules and scale your academic infrastructure.
          </p>
        </div>
      </section>
    </div>
  );
}
