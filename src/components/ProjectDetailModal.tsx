import React, { useState } from 'react';
import { X, CheckCircle, Cpu, Activity, Play, Zap, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { ProfessionalProject } from '../types';

interface ProjectDetailModalProps {
  project: ProfessionalProject | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeDemoState, setActiveDemoState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [simMetric, setSimMetric] = useState<number>(0);

  if (!project) return null;

  const runSimulation = () => {
    setActiveDemoState('running');
    setSimMetric(0);
    const interval = setInterval(() => {
      setSimMetric((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveDemoState('completed');
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white flex items-start justify-between">
          <div className="space-y-1 max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              Engineering Deep Dive · {project.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">{project.title}</h2>
            <p className="text-xs text-neutral-300 leading-relaxed mt-1">{project.shortDescription}</p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((metric, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                <span className="text-[11px] font-semibold text-neutral-500 block uppercase tracking-wider">
                  {metric.label}
                </span>
                <span className="text-xl font-black text-emerald-600 tabular-nums mt-1 block">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="p-5 rounded-2xl bg-neutral-900 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold">Interactive Algorithm Benchmark Sandbox</h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                Mode: {project.demoType.toUpperCase()}
              </span>
            </div>

            {/* Sandbox Visual State */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
              {project.demoType === 'routing' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-neutral-400 font-mono">
                    <span>A* Pareto Traversal vs Dijkstra Baseline</span>
                    <span>{activeDemoState === 'running' ? 'Calculating Graph Paths...' : activeDemoState === 'completed' ? 'Optimal Route Found (82ms)' : 'Ready to benchmark'}</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-150"
                      style={{ width: `${simMetric}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300 pt-2 font-mono">
                    <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                      Standard Road Graph: 4.8 km · 28 mins
                    </div>
                    <div className="p-2 bg-emerald-950/60 rounded border border-emerald-500/40 text-emerald-300">
                      OmniRoute Optimized: 3.6 km · 19 mins (-32%)
                    </div>
                  </div>
                </div>
              )}

              {project.demoType === 'telemetry' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-neutral-400 font-mono">
                    <span>Client-Side Kalman GPS Smoothing Filter</span>
                    <span>Jitter: {activeDemoState === 'completed' ? '0.4m (Reduced from 12.2m)' : 'Evaluating 10Hz stream'}</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-150"
                      style={{ width: `${simMetric}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Calculated continuous polynomial spline curves over raw fluctuating phone GPS coordinates at 60 frames per second.
                  </p>
                </div>
              )}

              {project.demoType === 'kitchen' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-neutral-400 font-mono">
                    <span>Merchant Prep Load Queue Forecasting</span>
                    <span>Wok Station Latency: {activeDemoState === 'completed' ? 'Synced at 0 min idle' : 'Forecasting tickets...'}</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-150"
                      style={{ width: `${simMetric}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Gradient boosted regression models predicting hot dish extraction moment within ±45 seconds margin.
                  </p>
                </div>
              )}

              {project.demoType === 'safedrop' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-neutral-400 font-mono">
                    <span>Edge Vision Proof-of-Drop Verification</span>
                    <span>Confidence: {activeDemoState === 'completed' ? '99.4% Validated' : 'Awaiting drop image'}</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-150"
                      style={{ width: `${simMetric}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Geofence bounded within 12 meters of customer unit door · Seal intact</span>
                  </div>
                </div>
              )}

              <button
                onClick={runSimulation}
                disabled={activeDemoState === 'running'}
                className="mt-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-700 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{activeDemoState === 'running' ? 'Running Simulation...' : 'Execute Test Run'}</span>
              </button>
            </div>
          </div>

          {/* Architecture Overview */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-neutral-900">System Architecture & Design</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {project.fullDescription}
            </p>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 font-medium">
              <span className="font-bold text-neutral-900">Core Pattern: </span>
              {project.architectureHighlight}
            </div>
          </div>

          {/* Key Capabilities */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-neutral-900">Engineering Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-neutral-100 text-neutral-800 rounded-lg text-xs font-semibold font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
