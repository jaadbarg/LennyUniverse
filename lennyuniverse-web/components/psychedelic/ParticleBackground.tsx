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
          fpsLimit: 15, // Ultra-low FPS for minimal CPU usage
          particles: {
            color: {
              value: ["#FF00FF"],
            },
            links: {
              color: "#FF00FF",
              distance: 150,
              enable: false, // Disable connections completely
              opacity: 0.1,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "out",
              random: false,
              speed: 0.2, // Extremely slow movement
              straight: true, // Simplify motion calculations
              attract: {
                enable: false,
                rotateX: 0,
                rotateY: 0,
              },
            },
            number: {
              density: {
                enable: true,
                area: 2500, // Much higher area = far fewer particles
              },
              value: 10, // Absolute minimum particles
            },
            opacity: {
              value: 0.3,
              random: false, // No randomization
              anim: {
                enable: false,
                speed: 0,
                opacity_min: 0.3,
                sync: false,
              },
            },
            shape: {
              type: ["circle"],
            },
            size: {
              value: { min: 1, max: 2 }, // Even smaller particles
              random: false, // No randomization
              anim: {
                enable: false,
                speed: 0,
                size_min: 1,
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