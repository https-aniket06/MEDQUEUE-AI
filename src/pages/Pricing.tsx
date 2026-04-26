import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Users, Zap, ArrowLeft, Heart } from 'lucide-react';
import PixelButton from '../components/PixelButton';
import { useSubscription } from '../contexts/SubscriptionContext';
import { Link } from 'react-router-dom';

const Pricing = () => {
    const navigate = useNavigate();
    const { startTrial } = useSubscription();

    const plans = [
        {
            id: 'individual',
            name: 'Individual',
            price: '₹149',
            period: '/month',
            description: 'Best for individual learners and students.',
            features: [
                'Full Health Library (500+ topics)',
                '200+ Video Courses',
                'Unlimited AI Chatbot',
                'Downloadable PDFs & Guides',
                'Ad-free Experience',
                'Personal Health Tracker'
            ],
            color: 'primary',
            icon: Heart
        },
        {
            id: 'family',
            name: 'Family',
            price: '₹249',
            period: '/month',
            description: 'Perfect for families up to 5 members.',
            features: [
                'Everything in Individual',
                'Up to 5 Family Accounts',
                'Family Health Dashboard',
                'Shared Medication Reminders',
                'Child & Senior Care specialized content',
                'Shared Progress Tracking'
            ],
            color: 'secondary',
            icon: Users,
            popular: true
        },
        {
            id: 'plus',
            name: 'Plus',
            price: '₹499',
            period: '/month',
            description: 'For chronic care and personalized health.',
            features: [
                'Everything in Family',
                '2 Doctor Video Consultations/month',
                'AI-powered Health Risk Assessment',
                'Predictive Health Alerts',
                'Priority Customer Support',
                'Personalized Wellness Coach'
            ],
            color: 'orange-500',
            icon: Zap
        }
    ];

    const handleStartTrial = (planId: any) => {
        // In a real app, this would redirect to a checkout page
        // For now, we'll simulate the trial start
        startTrial(planId);
        navigate('/learn');
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20 overflow-x-hidden selection:bg-primary/20">
            {/* Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary rounded-full blur-[120px]" />
            </div>

            <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
                <Link to="/learn" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                    <ArrowLeft size={16} />
                    Back to Learn Hub
                </Link>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
                        Invest in Your <span className="text-primary italic">Health</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Choose a plan that fits your needs. Every plan starts with a <span className="text-slate-900 font-black">7-Day Free Trial</span>.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, i) => {
                        const Icon = plan.icon;
                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`glass rounded-[2.5rem] p-10 border-slate-200 bg-white shadow-2xl flex flex-col relative group hover:border-primary/50 transition-all ${plan.popular ? 'border-primary/30 ring-4 ring-primary/5' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-1.5 bg-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-primary/30">
                                        Most Popular
                                    </div>
                                )}
                                
                                <div className="mb-10 text-left">
                                    <div className={`w-16 h-16 rounded-[1.5rem] bg-${plan.id === 'plus' ? 'orange-500/10' : 'primary/10'} flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-primary/20 transition-colors`}>
                                        <Icon className={`text-${plan.id === 'plus' ? 'orange-500' : 'primary'}`} size={32} />
                                    </div>
                                    <h3 className="text-3xl font-black mb-2 uppercase tracking-tight text-slate-900 italic">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-6">
                                        <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                                        <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">{plan.period}</span>
                                    </div>
                                    <p className="text-slate-500 font-medium leading-relaxed">{plan.description}</p>
                                </div>

                                <div className="space-y-5 mb-auto pb-10 text-left">
                                    {plan.features.map((feature, j) => (
                                        <div key={j} className="flex gap-4 text-sm items-start">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 border border-green-500/20">
                                                <Check className="w-3 h-3 text-green-600 font-bold" />
                                            </div>
                                            <span className="text-slate-600 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <PixelButton 
                                    onClick={() => handleStartTrial(plan.id)}
                                    className="w-full mt-4" 
                                    color={plan.id === 'plus' ? 'primary' : plan.popular ? 'secondary' : 'primary'}
                                >
                                    Start 7-Day Trial
                                </PixelButton>
                                <p className="mt-6 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                                    No charge for 7 days • Cancel anytime
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* FAQ Section */}
                <div className="mt-32 max-w-4xl mx-auto text-left">
                    <h2 className="text-4xl font-black mb-16 tracking-tighter uppercase text-center italic">Frequently Asked <span className="text-primary italic underline underline-offset-8">Questions</span></h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { q: "How does the 7-day trial work?", a: "When you sign up for any plan, your first 7 days are completely free. You'll have full access to all premium features. We'll only charge you after the 7-day period is over." },
                            { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your subscription at any time from your account settings. If you cancel during the trial, you won't be charged at all." },
                            { q: "What payment methods do you accept?", a: "We accept all major Credit/Debit cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and popular digital wallets." },
                            { q: "Do you offer a student discount?", a: "Yes! Students can get the Individual plan for just ₹99/month. Please verify your student status in the account settings after signing up." }
                        ].map((faq, i) => (
                            <div key={i} className="glass p-8 rounded-3xl border-slate-100 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all border border-slate-200/50">
                                <h4 className="font-black text-lg mb-3 text-slate-900 uppercase tracking-tighter italic">{faq.q}</h4>
                                <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-20 border-t border-slate-100 py-12">
                <div className="max-w-7xl mx-auto px-8 flex justify-center">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Secure Payments • SSL Encrypted • 24/7 Support</p>
                </div>
            </footer>
        </div>
    );
};

export default Pricing;
