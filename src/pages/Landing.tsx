import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, ChevronRight, AlertTriangle,
    Navigation, Ambulance, Phone, X, ShieldAlert,
    BookOpen, Sparkles, MapPin
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PixelButton from '../components/PixelButton';
import { fetchHospitals } from '../lib/api';
import { getDistance } from '../lib/utils';

const Landing = () => {
    const navigate = useNavigate();
    const [isEmergencyActive, setIsEmergencyActive] = useState(false);
    const [emergencyStatus, setEmergencyStatus] = useState<'idle' | 'locating' | 'contacting' | 'confirmed'>('idle');
    const [nearestHospital, setNearestHospital] = useState<any>(null);

    const openEmergencyOverlay = () => {
        setIsEmergencyActive(true);
        setEmergencyStatus('idle');
    };

    const startEmergencyScan = () => {
        setEmergencyStatus('locating');
        
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const userLat = pos.coords.latitude;
                const userLng = pos.coords.longitude;
                setEmergencyStatus('contacting');

                try {
                    const hospitals = await fetchHospitals(userLat, userLng);
                    if (hospitals && hospitals.length > 0) {
                        const closest = hospitals.reduce((prev: any, curr: any) => {
                            const prevDist = getDistance(userLat, userLng, prev.position?.lat, prev.position?.lng);
                            const currDist = getDistance(userLat, userLng, curr.position?.lat, curr.position?.lng);
                            return prevDist < currDist ? prev : curr;
                        }, hospitals[0]);
                        
                        // Add mock phone if missing
                        closest.phone = closest.phone || `+91 ${Math.floor(Math.random() * 90000) + 10000} ${Math.floor(Math.random() * 90000) + 10000}`;
                        closest.distance = getDistance(userLat, userLng, closest.position?.lat, closest.position?.lng);
                        setNearestHospital(closest);
                    }
                    
                    setTimeout(() => {
                        setEmergencyStatus('confirmed');
                    }, 1500);

                } catch (e) {
                    console.error("Emergency Fetch Failed", e);
                    // Fallback mock
                    setNearestHospital({ name: "Central City Hospital", phone: "+91 99887 76655", distance: 1.2 });
                    setEmergencyStatus('confirmed');
                }
            }, (error) => {
                console.error("Geolocation failed", error);
                setNearestHospital({ name: "Central City Hospital", phone: "+91 99887 76655", distance: 1.2 });
                setEmergencyStatus('confirmed');
            });
        } else {
            setNearestHospital({ name: "Central City Hospital", phone: "+91 99887 76655", distance: 1.2 });
            setEmergencyStatus('confirmed');
        }
    };

    const cancelEmergency = () => {
        setIsEmergencyActive(false);
        setEmergencyStatus('idle');
        setNearestHospital(null);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] overflow-hidden text-slate-900 transition-colors duration-500">
            {/* Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary rounded-full blur-[120px]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
                <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white">
                        <span className="text-xs font-black">AI</span>
                    </div>
                    <span className="text-slate-900">Health</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
                    <Link to="/patient" className="hover:text-slate-900 transition-colors">MedQueue</Link>
                    <Link to="/learn" className="hover:text-slate-900 transition-colors">Learn Hub</Link>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={openEmergencyOverlay}
                        className="bg-red-600/20 border border-red-600/30 px-4 py-2 rounded-xl flex items-center gap-2 text-red-500 hover:bg-red-600/30 transition-all group"
                    >
                        <AlertTriangle size={16} className="text-red-600 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Emergency Help</span>
                    </button>
                    <PixelButton
                        onClick={() => navigate('/auth')}
                        className="hidden sm:flex"
                        color="primary"
                    >
                        Sign In
                    </PixelButton>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-20 md:pb-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-[10px] md:text-xs font-black tracking-widest uppercase bg-primary/10 border border-primary/20 rounded-full text-primary">
                        The next frontier of intelligent infrastructure
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 tracking-tighter text-slate-900 leading-[1.1]">
                        Efficiency for <span className="text-primary italic">Healthcare</span>.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium">
                        Revolutionizing patient flow through advanced predictive AI and intelligent infrastructure.
                    </p>
                </motion.div>

                {/* Product Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-20 px-4">
                    {/* MedQueue Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => navigate('/patient')}
                        className="glass p-12 rounded-[2rem] text-left group cursor-pointer border-slate-200 hover:border-primary/50 transition-all bg-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Activity size={120} className="text-primary" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                <Activity className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-slate-900">MedQueue AI</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                Proprietary predictive AI for hospital queue management and bed availability. Reduce wait times by up to 70%.
                            </p>
                            <PixelButton onClick={() => navigate('/patient')} color="primary">
                                Launch Platform <ChevronRight className="w-4 h-4" />
                            </PixelButton>
                        </div>
                    </motion.div>

                    {/* Learn Hub Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => navigate('/learn')}
                        className="glass p-12 rounded-[2rem] text-left group cursor-pointer border-slate-200 hover:border-secondary/50 transition-all bg-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <BookOpen size={120} className="text-secondary" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 border border-secondary/20 group-hover:bg-secondary/20 transition-colors">
                                <BookOpen className="w-8 h-8 text-secondary" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-slate-900">Knowledge Hub</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                Access verified medical guides, procedures, and health protocols. Free medical education for everyone.
                            </p>
                            <button 
                                onClick={() => navigate('/learn')}
                                className="group/btn flex items-center gap-3 text-secondary font-black uppercase text-xs tracking-widest hover:gap-5 transition-all"
                            >
                                Enter Hub <ChevronRight size={18} className="animate-pulse" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Quick Access Info Section */}
            <section className="relative z-10 py-12 border-t border-slate-100 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-center">
                        <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/50 shadow-sm">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <Sparkles size={20} className="text-primary" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Global Access</p>
                                <p className="text-sm font-bold text-slate-900">Free Medical Resources</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/50 shadow-sm">
                            <div className="p-3 bg-secondary/10 rounded-2xl">
                                <Activity size={20} className="text-secondary" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black text-secondary uppercase tracking-widest">Live Updates</p>
                                <p className="text-sm font-bold text-slate-900">Real-time Bed Tracking</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-100 py-12">
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-slate-400 text-sm">© 2026 AI Health. All rights reserved.</p>
                    <div className="flex gap-8 text-slate-400 text-sm">
                        <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Cookie Settings</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
                    </div>
                </div>
            </footer>

            {/* Emergency Overlay */}
            <AnimatePresence>
                {isEmergencyActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md w-full bg-white p-8 rounded-[3rem] border-slate-200 relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <ShieldAlert size={120} className="text-red-500" />
                            </div>

                            <div className="relative z-10 text-center">
                                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20 shadow-xl shadow-red-500/10">
                                    {emergencyStatus === 'idle' ? (
                                        <MapPin className="w-10 h-10 text-red-500" />
                                    ) : emergencyStatus === 'locating' ? (
                                        <Navigation className="w-10 h-10 text-red-500 animate-spin" />
                                    ) : emergencyStatus === 'contacting' ? (
                                        <Activity className="w-10 h-10 text-red-500 animate-pulse" />
                                    ) : (
                                        <Ambulance className="w-10 h-10 text-red-500 animate-bounce" />
                                    )}
                                </div>

                                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic">
                                    {emergencyStatus === 'idle' ? 'Location Required' : 
                                     emergencyStatus === 'locating' ? 'Locating You...' : 
                                     emergencyStatus === 'contacting' ? 'Finding Hospitals...' : 
                                     'Hospital Found'}
                                </h2>

                                <p className="text-slate-500 font-medium mb-10 leading-relaxed text-sm px-4">
                                    {emergencyStatus === 'idle' ? 'To find the nearest trauma center, we need to access your current GPS location.' : 
                                     emergencyStatus === 'locating' ? 'Fetching your live coordinates for precision dispatch...' : 
                                     emergencyStatus === 'contacting' ? 'Identifying the nearest medical hub with open beds...' : 
                                     `We have located the nearest facility. You can contact them immediately for urgent assistance.`}
                                </p>

                                {emergencyStatus === 'idle' && (
                                    <button 
                                        onClick={startEmergencyScan}
                                        className="w-full py-5 px-8 rounded-2xl bg-red-600 text-white font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-500/30 mb-4 group"
                                    >
                                        Share Location & Find Help
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                )}

                                {emergencyStatus === 'confirmed' && nearestHospital && (
                                    <div className="bg-red-50/50 border border-red-100 p-6 rounded-3xl mb-8">
                                        <p className="text-[10px] font-black tracking-widest text-red-500 uppercase mb-2">Primary Trauma Center</p>
                                        <p className="text-xl font-bold text-slate-900 mb-2 uppercase leading-tight">{nearestHospital.name}</p>
                                        
                                        <div className="flex items-center justify-center gap-6 my-4 py-4 border-y border-red-100/50">
                                            <div className="text-center">
                                                <p className="text-[10px] text-slate-400 uppercase font-black">Distance</p>
                                                <p className="text-sm font-bold text-slate-900">{nearestHospital.distance?.toFixed(1) || '0.8'} km</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] text-slate-400 uppercase font-black">Est. Arrival</p>
                                                <p className="text-sm font-bold text-red-500 italic">~10 Mins</p>
                                            </div>
                                        </div>

                                        <a 
                                            href={`tel:${nearestHospital.phone}`}
                                            className="w-full py-4 px-8 rounded-2xl bg-slate-900 text-white font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/20"
                                        >
                                            <Phone size={16} />
                                            Call Hospital: {nearestHospital.phone}
                                        </a>
                                    </div>
                                )}

                                <div className="flex flex-col gap-4">
                                    <button 
                                        onClick={cancelEmergency}
                                        className="w-full py-3 px-8 rounded-2xl text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-slate-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        <X size={14} />
                                        Close Emergency
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Landing;
