import '../styles/globals.css';
import '../styles/psychedelic/effects.css';
import type { AppProps } from 'next/app';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import PsychedelicLayout from '../components/psychedelic/PsychedelicLayout';
import LoadingScreen from '../components/psychedelic/LoadingScreen';
import Head from 'next/head';
import { useEffect, useState } from 'react';

// Load fonts
import '@fontsource/audiowide';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [audioContextAllowed, setAudioContextAllowed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStarted, setLoadingStarted] = useState(false); // Add this to track loading state
  
  useEffect(() => {
    // Only initialize loading screen once
    if (!loadingStarted) {
      setLoadingStarted(true);
      setMounted(true);
    }
    
    // Set up a single user interaction requirement to initialize AudioContext
    const handleUserInteraction = () => {
      setAudioContextAllowed(true);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [loadingStarted]);
  
  // Create the audio visualization effect if allowed
  useEffect(() => {
    if (!audioContextAllowed || !mounted) return;
    
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array | null = null;
    let audioElement: HTMLAudioElement | null = null;
    let audioSource: MediaElementAudioSourceNode | null = null;
    let animationFrameId: number | null = null;
    
    try {
      // Create audio context
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      
      // Create a buffer for the frequency data
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      
      // Try to use an external ambient audio file
      // Using an ambient music file from a public URL
      const synthAudio = 'https://assets.codepen.io/1197275/ambient-minimalist-atmosphere-116186.mp3';
      
      // Create audio element and set properties
      audioElement = new Audio(synthAudio);
      audioElement.loop = true;
      audioElement.volume = 0.15; // Low-medium volume
      
      // Connect everything
      audioSource = audioContext.createMediaElementSource(audioElement);
      audioSource.connect(analyser);
      analyser.connect(audioContext.destination);
      
      // Play the audio with user gesture after a short delay
      setTimeout(() => {
        audioElement.play().catch(err => {
          console.log('Audio play failed:', err);
          // Fallback: try to play on user interaction
          const playAudio = () => {
            if (audioElement) {
              audioElement.play().catch(e => console.log('Failed on user gesture too:', e));
              // Remove event listeners after attempting to play
              document.removeEventListener('click', playAudio);
              document.removeEventListener('touchstart', playAudio);
            }
          };
          
          // Add event listeners for user interaction
          document.addEventListener('click', playAudio);
          document.addEventListener('touchstart', playAudio);
        });
      }, 1000);
      
      // Animate the background based on audio
      const animateBg = () => {
        if (!analyser || !dataArray) return;
        
        analyser.getByteFrequencyData(dataArray);
        
        // Calculate average frequency value
        const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        
        // Use the data to animate the background
        const bgElements = document.querySelectorAll('.audio-reactive');
        bgElements.forEach((el: Element) => {
          const htmlEl = el as HTMLElement;
          // Map the average to a reasonable scale (0.9 to 1.2)
          const scale = 0.9 + (average / 255) * 0.3;
          htmlEl.style.transform = `scale(${scale})`;
          
          // Also adjust opacity slightly
          const opacity = 0.6 + (average / 255) * 0.4;
          htmlEl.style.opacity = opacity.toString();
        });
        
        animationFrameId = requestAnimationFrame(animateBg);
      };
      
      animationFrameId = requestAnimationFrame(animateBg);
      
    } catch (err) {
      console.error('WebAudio API error:', err);
    }
    
    // Cleanup function
    return () => {
      if (audioElement) audioElement.pause();
      if (audioSource) audioSource.disconnect();
      if (analyser) analyser.disconnect();
      if (audioContext) audioContext.close();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [audioContextAllowed, mounted]);
  
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  return (
    <>
      <Head>
        <title>Lenny Universe - A Journey of Blissful Growth</title>
        <meta name="description" content="Embark on a journey of blissful growth with Lenny Universe. Mindfulness, personal growth, and authentic connection." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://i0.wp.com/lennyuniverse.com/wp-content/uploads/2023/11/LU-Logo_Black.png" />
      </Head>
      
      {/* Loading Screen - only show if we're loading and loading has started */}
      {isLoading && loadingStarted && (
        <LoadingScreen 
          onLoadingComplete={handleLoadingComplete}
          minDuration={3500}
        />
      )}
      
      {/* Main Content */}
      {!isLoading && (
        <div className="min-h-screen flex flex-col bg-black">
          <PsychedelicLayout>
            <Navbar />
            <main className="flex-grow pt-20">
              <Component {...pageProps} />
            </main>
            <Footer />
          </PsychedelicLayout>
        </div>
      )}
    </>
  );
}

export default MyApp;