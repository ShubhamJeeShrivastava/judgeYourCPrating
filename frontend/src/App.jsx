import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Search, Code2, TrendingUp, Zap, Award, BarChart3, ArrowRight, LayoutDashboard, User } from 'lucide-react';

function App() {
    const [cfId, setCfId] = useState('')
    const [lcId, setLcId] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // Mock API call
        await new Promise(r => setTimeout(r, 1500));
        const mockHistory = Array.from({ length: 15 }, (_, i) => ({
            name: `C ${i + 1}`,
            rating: 1200 + Math.floor(Math.random() * 400) + (i * 20),
            lcRating: 1500 + Math.floor(Math.random() * 200) + (i * 10)
        }));

        setData({
            message: "Data Loaded",
            history: mockHistory,
            cfRating: 1650,
            lcRating: 1840,
            verdict: "Strong Specialist",
            topTags: ["DP", "Graphs", "Greedy"]
        })
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#0B1120]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-600 rounded-lg">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight">JudgeCP</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="#" className="text-white hover:text-indigo-400 transition-colors">Dashboard</a>
                        <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Compare</a>
                        <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Resources</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hidden md:block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">Sign In</button>
                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-md transition-all shadow-lg shadow-indigo-500/20">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            <main className={`max-w-7xl mx-auto px-6 ${data ? 'py-8' : 'py-12'} relative transition-all duration-500`}>

                {/* Hero Text - Fades out when data is loaded */}
                <AnimatePresence>
                    {!data && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, height: 0, overflow: 'hidden', marginBottom: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-16 text-center max-w-3xl mx-auto"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                                Master your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Competitive Journey</span>
                            </h1>
                            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                                Aggregate your profiles from Codeforces, LeetCode, and CodeChef. Get AI-driven insights to break through your rating plateau.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Input Form - Transitions to corner */}
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`
                        w-full mx-auto backdrop-blur-sm border border-slate-800 shadow-2xl bg-slate-900/50 rounded-2xl
                        ${data
                            ? 'max-w-full flex-row p-4 mb-8 sticky top-20 z-40' // Compact State
                            : 'max-w-2xl p-2 mb-16' // Hero State
                        }
                    `}
                >
                    <form onSubmit={handleSubmit} className={`flex gap-2 ${data ? 'flex-row items-center w-full' : 'flex-col md:flex-row'}`}>
                        <div className={`relative group ${data ? 'w-48' : 'flex-1'}`}>
                            <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors`} />
                            <input
                                type="text"
                                value={cfId}
                                onChange={(e) => setCfId(e.target.value)}
                                placeholder="Codeforces Handle"
                                className={`w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors ${data ? 'py-2 text-sm' : 'py-3'}`}
                            />
                        </div>
                        <div className={`relative group ${data ? 'w-48' : 'flex-1'}`}>
                            <Code2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors`} />
                            <input
                                type="text"
                                value={lcId}
                                onChange={(e) => setLcId(e.target.value)}
                                placeholder="LeetCode Username"
                                className={`w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors ${data ? 'py-2 text-sm' : 'py-3'}`}
                            />
                        </div>
                        <button
                            disabled={loading}
                            className={`
                                bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-indigo-600/20 disabled:opacity-70
                                ${data ? 'px-4 py-2 text-sm ml-auto' : 'px-8 py-3'}
                            `}
                        >
                            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Search className="w-4 h-4" /> {data ? 'Update' : 'Analyze'}</>}
                        </button>
                    </form>
                </motion.div>

                {/* Dashboard Grid */}
                <AnimatePresence>
                    {data && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                                    Performance Overview
                                </h2>
                                <span className="text-sm text-slate-500">Last updated: Just now</span>
                            </div>

                            {/* Top Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/30 transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-400 rounded-full">+42 this week</span>
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">{data.cfRating}</div>
                                    <div className="text-sm text-slate-500">Codeforces Rating</div>
                                </div>
                                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-yellow-500/30 transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400 group-hover:bg-yellow-500/20 transition-colors">
                                            <Code2 className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-400 rounded-full">Top 5.2%</span>
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">{data.lcRating}</div>
                                    <div className="text-sm text-slate-500">LeetCode Rating</div>
                                </div>
                                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-purple-500/30 transition-colors group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-medium px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full">Prognosis</span>
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">{data.verdict}</div>
                                    <div className="text-sm text-slate-500">Predicted Rank</div>
                                </div>
                            </div>

                            {/* Main Content Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Chart Section */}
                                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-semibold text-white">Rating Trajectory</h3>
                                        <select className="bg-slate-950 border border-slate-700 text-xs rounded-lg px-2 py-1 outline-none focus:border-indigo-500">
                                            <option>Last 6 Months</option>
                                            <option>All Time</option>
                                        </select>
                                    </div>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={data.history}>
                                                <defs>
                                                    <linearGradient id="colorCf" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                                <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dy={10} />
                                                <YAxis stroke="#475569" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} dx={-10} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }}
                                                    itemStyle={{ color: '#e2e8f0' }}
                                                />
                                                <Area type="monotone" dataKey="rating" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorCf)" name="Rating" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Insights Column */}
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-br from-indigo-900/10 to-purple-900/10 border border-indigo-500/20 rounded-xl p-6 backdrop-blur-sm">
                                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-yellow-400" />
                                            AI Analysis
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="text-sm leading-relaxed text-slate-300">
                                                <p className="mb-2"><span className="text-indigo-400 font-medium">Strength:</span> Your graph theory problem solving is performing at <span className="text-white">Top 5%</span> level.</p>
                                                <p><span className="text-indigo-400 font-medium">Focus:</span> Dynamic Programming consistency is inconsistent. Recommend <span className="text-white underline decoration-indigo-500/50 underline-offset-2">CSES Problem Set</span>.</p>
                                            </div>
                                            <button className="w-full py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-medium rounded-lg transition-colors border border-indigo-500/20">
                                                View Detailed Report
                                            </button>
                                        </div>
                                    </div>

                                    {/* Topic Tags Pills (Mock) */}
                                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                                        <h3 className="font-semibold text-white mb-4 text-sm">Strongest Topics</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {data.topTags.map((tag) => (
                                                <span key={tag} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-full border border-slate-700 transition-colors cursor-default">
                                                    {tag}
                                                </span>
                                            ))}
                                            <span className="px-3 py-1 bg-slate-800/50 text-slate-500 text-xs rounded-full border border-slate-800/50 border-dashed">+4 more</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}

export default App
