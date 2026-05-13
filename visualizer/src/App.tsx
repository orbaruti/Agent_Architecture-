import AppLayout from './components/Layout/AppLayout';
import { usePlayback } from './hooks/usePlayback';

export default function App() {
  const [playback, controls] = usePlayback();

  return <AppLayout playback={playback} controls={controls} />;
}
