import React, { useState } from 'react';
import { PROFESSIONAL_PROJECTS } from '../data/mockData';
import { ProfessionalProject } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Code2, ArrowUpRight, Cpu, Layers, Zap, Gauge } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProfessionalProject | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Routing & Optimization', 'Real-Time Telemetry', 'Kitchen Logistics', 'Security & AI Verification'];

  const filteredProjects = activeCategory === 'All'
    ? PROFESSIONAL_PROJECTS
    : PROFESSIONAL_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
            <Code2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>FoodTech & Logistics Engineering Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Professional Projects & Architecture
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl leading-relaxed">
            Production-grade systems powering real-time courier dispatch, sub-second route calculation, live telemetry smoothing, and automated proof-of-delivery verification.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs hover:shadow-md hover:border-emerald-500/80 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md">
                  {project.category}
                </span>
                <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black text-neutral-900 group-hover:text-emerald-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                      {m.label}
                    </span>
                    <span className="text-sm font-black text-neutral-900 tabular-nums block mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tech Stack Tags */}
            <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="text-[10px] text-neutral-400 font-mono">
                    +{project.techStack.length - 4} more
                  </span>
                )}
              </div>

              <span className="text-xs font-bold text-emerald-600 group-hover:underline">
                Explore Demo →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
