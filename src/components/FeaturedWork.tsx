import { useState } from 'react';
import { Play } from 'lucide-react';

type WorkType = 'directingEditing' | 'motion';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  videoUrl?: string;
  isFrameIo?: boolean;
  isYouTube?: boolean;
}

const projects: Record<WorkType, Project[]> = {
  directingEditing: [
    {
      id: '1',
      title: 'CU Link',
      subtitle: 'Director | Editor',
      thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      videoUrl: 'https://player.vimeo.com/video/1134482855?badge=0&autopause=0&player_id=0&app_id=58479',
      isFrameIo: true
    },
    { id: '2', title: 'DxRacer', subtitle: 'Director | Editor', thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', videoUrl: 'https://player.vimeo.com/video/1134481473?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '3', title: 'NAFCU', subtitle: 'Director | Editor', thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', videoUrl: 'https://player.vimeo.com/video/1134482892?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '4', title: 'JMC Landscaping', subtitle: 'Director', thumbnail: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', videoUrl: 'https://player.vimeo.com/video/1134483880?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '5', title: 'BORA', subtitle: 'Director', thumbnail: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', videoUrl: 'https://player.vimeo.com/video/1134482372?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '6', title: 'Ice Cream Social', subtitle: 'Director | Editor', thumbnail: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', videoUrl: 'https://player.vimeo.com/video/1134483343?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '7', title: 'EBX - Uninvited', subtitle: 'Director | Editor', thumbnail: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)', videoUrl: 'https://player.vimeo.com/video/1134482902?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '8', title: 'Mango Languages', subtitle: 'Director | Editor', thumbnail: 'linear-gradient(135deg, #00d2ff 0%, #3a47d5 100%)', videoUrl: 'https://player.vimeo.com/video/1134482096?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '9', title: 'NAFCU', subtitle: 'Director', thumbnail: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)', videoUrl: 'https://player.vimeo.com/video/1134482872?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
  ],
  motion: [
    { id: '19', title: 'Motion Graphics Showreel', subtitle: 'Motion Branding', thumbnail: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)', videoUrl: 'https://player.vimeo.com/video/1134989523?h=6bd308f7a3&badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '20', title: 'Captain D\'s', subtitle: 'Motion Graphics', thumbnail: 'linear-gradient(135deg, #00d2ff 0%, #3a47d5 100%)', videoUrl: 'https://player.vimeo.com/video/1134705575?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '21', title: 'Shoe Station', subtitle: 'Motion Graphics', thumbnail: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)', videoUrl: 'https://player.vimeo.com/video/1134706614?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '22', title: 'IEDC', subtitle: 'Motion Graphics', thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', videoUrl: 'https://player.vimeo.com/video/1134715439?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '23', title: 'Zyrtec', subtitle: 'Motion Graphics', thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', videoUrl: 'https://player.vimeo.com/video/1134712880?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '24', title: 'Parkside CU', subtitle: 'Motion Graphics', thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', videoUrl: 'https://player.vimeo.com/video/1134698722?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '25', title: 'Fairlife', subtitle: 'Motion Graphics', thumbnail: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', videoUrl: 'https://player.vimeo.com/video/1134714841?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '26', title: 'The UPS Store', subtitle: 'Motion Graphics', thumbnail: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', videoUrl: 'https://player.vimeo.com/video/1134715975?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
    { id: '27', title: 'Ice Mountain', subtitle: 'Motion Graphics', thumbnail: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', videoUrl: 'https://player.vimeo.com/video/1134716598?badge=0&autopause=0&player_id=0&app_id=58479', isFrameIo: true },
  ],
};

export default function FeaturedWork() {
  const [activeTab, setActiveTab] = useState<WorkType>('directingEditing');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section className="py-24 md:py-40 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white" style={{ letterSpacing: '0.5px' }}>Featured Work</h2>
            <p className="text-base md:text-xl text-white/60 font-light max-w-2xl">
              Three disciplines. One creative vision.
            </p>
          </div>

          <div className="flex gap-3 md:gap-4 mb-16 flex-wrap">
            <button
              onClick={() => setActiveTab('directingEditing')}
              className={`px-6 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${
                activeTab === 'directingEditing'
                  ? 'bg-[#E0F11F] text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              Directing & Editing
            </button>
            <button
              onClick={() => setActiveTab('motion')}
              className={`px-6 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${
                activeTab === 'motion'
                  ? 'bg-[#E0F11F] text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              Motion Graphics
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects[activeTab].map((project, index) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative aspect-video overflow-hidden cursor-pointer rounded-2xl"
                style={{
                  animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {project.videoUrl && (project.isFrameIo || project.isYouTube) ? (
                  <iframe
                    src={project.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : project.videoUrl ? (
                  <video
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={project.videoUrl}
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{ background: project.thumbnail }}
                  ></div>
                )}

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-xl font-extrabold text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-white/70">{project.subtitle}</p>
                </div>

                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-8 right-8 text-white/70 hover:text-white text-4xl font-light leading-none transition-colors"
          >
            ×
          </button>
          <div className="w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
            {selectedProject.videoUrl && (selectedProject.isFrameIo || selectedProject.isYouTube) ? (
              <iframe
                src={selectedProject.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : selectedProject.videoUrl ? (
              <video
                className="w-full h-full object-contain"
                src={selectedProject.videoUrl}
                controls
                autoPlay
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white text-xl">No video available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
