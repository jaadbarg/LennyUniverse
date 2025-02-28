import { useCallback, useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';

const ParticleBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -1
          },
          background: {
            color: {
              value: "#0c0c0c",
            },
          },
          fpsLimit: 30, // Reduced from 120 to 30
          particles: {
            color: {
              value: ["#FF00FF", "#9D00FF", "#00FFFF"],
            },
            links: {
              color: "#FF00FF",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            collisions: {
              enable: false, // Disabled for performance
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "out",
              random: false,
              speed: 0.5, // Reduced from 1 to 0.5
              straight: false,
              attract: {
                enable: false, // Disabled for performance
                rotateX: 600,
                rotateY: 1200,
              },
            },
            number: {
              density: {
                enable: true,
                area: 1200, // Increased area = fewer particles
              },
              value: 30, // Reduced from 80 to 30
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: false, // Disabled for performance
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            shape: {
              type: ["circle"], // Simplified to just circles
            },
            size: {
              value: { min: 1, max: 3 }, // Smaller particles
              random: true,
              anim: {
                enable: false, // Disabled for performance
                speed: 2,
                size_min: 0.1,
                sync: false,
              },
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: false, // Disabled for performance
                mode: "grab",
                parallax: {
                  enable: false, // Disabled for performance
                  force: 60,
                  smooth: 10,
                },
              },
              onClick: {
                enable: false, // Disabled for performance
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 150,
                lineLinked: {
                  opacity: 0.5,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8,
              },
              repulse: {
                distance: 200,
              },
              push: {
                quantity: 4,
              },
              remove: {
                quantity: 2,
              },
            },
            detectRetina: false, // Disabled for performance
          },
        }}
      />
    </div>
  );
};

export default ParticleBackground;