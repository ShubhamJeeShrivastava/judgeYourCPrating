import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Search, Code2, TrendingUp, Zap, Award } from 'lucide-react';

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
        const mockHistory = Array.from({ length: 10 }, (_, i) => ({
            name: `Contest ${i + 1}`,
            rating: 1200 + Math.floor(Math.random() * 400) + (i * 20),
            lcRating: 1500 + Math.floor(Math.random() * 200) + (i * 10)
        }));

        setData({
            message: "Data Loaded",
            history: mockHistory,
            cfRating: 1650,
            lcRating: 1840,
            verdict: "Specialist -> Knight"
        })
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                <header className="mb-20 text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <Zap className="w-4 h-4 text-purple-400 mr-2" />
                        <span className="text-sm font-medium text-purple-200">AI-Powered CP Analysis</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-6xl md:text-7xl font-extrabold tracking-tight"
                    >
                        <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            Judge Your
                        </span>
                        <br />
                        <span className="text-white">CP Rating</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-xl max-w-2xl mx-auto font-light"
                    >
                        Unify your Competitive Programming profiles. Compare Codeforces, LeetCode, and CodeChef stats with Gemini-powered insights.
                    </motion.p>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full max-w-3xl mx-auto mb-20"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                        <div className="relative bg-slate-900/80 backdrop-blur-xl ring-1 ring-white/10 rounded-xl p-8 shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300 ml-1">Codeforces Handle</label>
                                        <div className="relative">
                                            <Code2 className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                                            <input
                                                type="text"
                                                value={cfId}
                                                onChange={(e) => setCfId(e.target.value)}
                                                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-white placeholder-slate-600"
                                                placeholder="tourist"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300 ml-1">LeetCode Username</label>
                                        <div className="relative">
                                            <Code2 className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                                            <input
                                                type="text"
                                                value={lcId}
                                                onChange={(e) => setLcId(e.target.value)}
                                                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-white placeholder-slate-600"
                                                placeholder="username"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-4 rounded-lg shadow-lg shadow-purple-500/25 transition-all text-lg flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Analyzing Profile...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Search className="w-5 h-5" />
                                            <span>Generate Report</span>
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {data && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Codeforces Rating</p>
                                        <p className="text-2xl font-bold text-white">{data.cfRating}</p>
                                    </div>
                                </div>
                                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                                    <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">LeetCode Rating</p>
                                        <p className="text-2xl font-bold text-white">{data.lcRating}</p>
                                    </div>
                                </div>
                                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Predicted Rank</p>
                                        <p className="text-2xl font-bold text-white">Master</p>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Graph Section */}
                                <div className="lg:col-span-2 bg-slate-900/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-purple-400" />
                                        Rating Trajectory
                                    </h2>
                                    <div className="h-[400px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={data.history}>
                                                <defs>
                                                    <linearGradient id="colorCf" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorLc" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                                <XAxis dataKey="name" stroke="#94a3b8" />
                                                <YAxis stroke="#94a3b8" />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                                                    itemStyle={{ color: '#e2e8f0' }}
                                                />
                                                <Area type="monotone" dataKey="rating" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorCf)" name="Codeforces" />
                                                <Area type="monotone" dataKey="lcRating" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorLc)" name="LeetCode" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Gemini Insights */}
                                <div className="bg-gradient-to-br from-purple-900/20 to-slate-900/50 border border-purple-500/20 p-8 rounded-3xl backdrop-blur-sm">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-purple-400" />
                                        Gemini Insights
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl">
                                            <p className="text-purple-200 text-sm font-medium mb-1">Strength</p>
                                            <p className="text-slate-300">Your graph algorithms performance is top 5% on LeetCode. Strong potential for Codeforces Div 2 C/D problems.</p>
                                        </div>
                                        <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl">
                                            <p className="text-purple-200 text-sm font-medium mb-1">Focus Area</p>
                                            <p className="text-slate-300">Dynamic Programming speed is lagging. Suggest practicing `Codeforces 1400-1600` DP tag sets.</p>
                                        </div>
                                        <div className="mt-6 pt-6 border-t border-white/5">
                                            <p className="text-slate-400 text-sm">
                                                "Given your LeetCode consistency, you could reach <span className="text-purple-400 font-bold">Expert (1600+)</span> on Codeforces within 3 months."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default App
